import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const doctor = await Doctor.findById(id).lean();
    
    if (!doctor) {
      return NextResponse.json({ error: "پزشک یافت نشد" }, { status: 404 });
    }
    
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}