import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your_secret_key");

export async function GET() {
  try {
   
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "عدم دسترسی. لطفاً لاگین کنید." }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userPhone = payload.phoneNumber || payload.phone;

    if (!userPhone) {
      return NextResponse.json({ error: "شماره تلفن کاربر یافت نشد." }, { status: 400 });
    }

    await connectDB();

   
    const appointments = await Appointment.find({
      userPhone: userPhone,
      status: "scheduled"
    }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, appointments });

  } catch (error) {
    console.error("Fetch User Appointments Error:", error);
    return NextResponse.json({ error: "خطای سرور در دریافت نوبت‌ها" }, { status: 500 });
  }
}