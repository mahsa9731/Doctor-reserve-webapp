import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';
import Appointment from '@/models/Appointment';

export async function POST(req: Request) {
  try {
    
    await connectDB();
    
   
    const { doctorId, date, time, userPhone, patientName, trackingCode } = await req.json();

    
    if (!trackingCode) {
      return NextResponse.json({ message: "کد پیگیری فرانت‌اَند ارسال نشده است." }, { status: 400 });
    }

    
    const existingCode = await Appointment.findOne({ trackingCode });
    if (existingCode) {
      return NextResponse.json({ message: "این کد پیگیری قبلاً ثبت شده است." }, { status: 400 });
    }

   
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return NextResponse.json({ message: "پزشک مورد نظر یافت نشد." }, { status: 404 });
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
      { _id: doctorId, "availableSlots.date": date },
      { $pull: { "availableSlots.$.times": time } }
    );

  
    return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}