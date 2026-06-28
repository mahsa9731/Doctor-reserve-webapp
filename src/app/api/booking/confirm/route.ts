import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectToDatabase } from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor"; 
import User from "@/models/User"; 

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "YOUR_STRONG_JWT_SECRET_KEY_HERE"
);

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const { doctorId, date, time } = await request.json();

    await connectToDatabase();

    const user = await User.findById(payload.userId);
    const patientName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "کاربر دکتر رزرو";
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return NextResponse.json({ error: "پزشک یافت نشد" }, { status: 404 });
    }

    
    const trackingCode = "DR-" + Math.floor(100000 + Math.random() * 900000).toString();

    
    const newAppointment = new Appointment({
      userPhone: payload.phoneNumber ,
      patientName: patientName,
      doctorId: doctor._id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorMedicalCode: doctor.medicalCode,
      doctorAvatar: doctor.avatar,
      doctorRating: doctor.rating || 5,
      doctorReviewsCount: doctor.reviewsCount || 0,
      doctorAddress: doctor.address,
      date,
      time,
      trackingCode,
      status: 'scheduled'
    });

    await newAppointment.save();

    
    return NextResponse.json({ success: true, trackingCode });

  } catch (error) {
    console.error("Booking Confirm Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}