import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';

export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find({});
    return NextResponse.json(doctors, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}