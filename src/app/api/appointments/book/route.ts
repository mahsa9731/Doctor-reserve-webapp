import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';
import Appointment from '@/models/Appointment';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { doctorId, date, time, userPhone, patientName, trackingCode } = await req.json();

    
    if (!doctorId || !date || !time || !userPhone || !patientName || !trackingCode) {
      return NextResponse.json({ message: "تمامی فیلدها الزامی هستند." }, { status: 400 });
    }

    
    const existingCode = await Appointment.findOne({ trackingCode });
    if (existingCode) {
      return NextResponse.json({ message: "این کد پیگیری قبلاً ثبت شده است." }, { status: 400 });
    }

   
    const doctor = await Doctor.findOne({
      _id: doctorId,
      "availableSlots": {
        $elemMatch: {
          date: date,
          times: { $elemMatch: { time: time, isBooked: false } }
        }
      }
    });

    if (!doctor) {
      return NextResponse.json({ message: "این نوبت دیگر ظرفیت ندارد یا قبلاً رزرو شده است." }, { status: 404 });
    }

    
    const newAppointment = await Appointment.create({
      userPhone,
      patientName,
      doctorId: doctor._id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorMedicalCode: doctor.medicalCode,
      doctorAvatar: doctor.avatar,
      doctorRating: doctor.rating,          
      doctorReviewsCount: doctor.reviewsCount, 
      doctorAddress: doctor.address,         
      date,
      time,
      trackingCode
    });

    
    await Doctor.updateOne(
      { _id: doctorId },
      { $set: { "availableSlots.$[outer].times.$[inner].isBooked": true } },
      {
        arrayFilters: [
          { "outer.date": date },
          { "inner.time": time }
        ]
      }
    );

    return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}