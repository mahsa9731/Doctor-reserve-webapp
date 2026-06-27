import { NextResponse } from "next/server"; 
import connectToDatabase from '@/lib/db';
import Doctor from '@/models/Doctor';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
   
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { error: "شناسه پزشک ارسال نشده است." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const doctor = await Doctor.findById(id);
    
   
    if (!doctor) {
      return NextResponse.json(
        { error: "پزشکی با این مشخصات یافت نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);

  } catch (error) {
    console.error("خطا در API مشخصات پزشک:", error);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داده است." },
      { status: 500 }
    );
  }
}