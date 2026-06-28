import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your_secret_key");

export async function POST(request: Request) {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "عدم دسترسی. لطفاً مجدداً لاگین کنید." }, { status: 401 });
    }

   
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userPhoneFromToken = payload.phoneNumber || payload.phone; 
    const { trackingCode, appointmentId } = await request.json();

    if (!trackingCode && !appointmentId) {
      return NextResponse.json({ error: "اطلاعات نوبت معتبر نمی‌باشد." }, { status: 400 });
    }

    await connectDB();

    const query = appointmentId ? { _id: appointmentId } : { trackingCode };
    const appointment = await Appointment.findOne(query);

    if (!appointment) {
      return NextResponse.json({ error: "نوبت مورد نظر یافت نشد." }, { status: 404 });
    }

    
    if (appointment.userPhone && userPhoneFromToken && appointment.userPhone !== userPhoneFromToken) {
      return NextResponse.json({ error: "شما مجاز به لغو این نوبت نیستید." }, { status: 403 });
    }

    
    appointment.status = "canceled";
    await appointment.save();

    return NextResponse.json({ success: true, message: "نوبت با موفقیت لغو شد." });

  } catch (error) {
    console.error("Booking Cancel Error:", error);
    return NextResponse.json({ error: "خطای سرور در لغو نوبت" }, { status: 500 });
  }
}