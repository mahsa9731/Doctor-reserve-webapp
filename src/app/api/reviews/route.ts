import { NextResponse } from 'next/server';
import db from '@/lib/db'; 
import Review from '@/models/Review';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    
    const body = await request.json();
    const { doctorId, rating, recommendation, comment } = body;

    if (!doctorId || !rating || !comment) {
      return NextResponse.json(
        { message: 'لطفاً تمامی فیلدهای الزامی (امتیاز، نظر و مشخصات پزشک) را وارد کنید.' },
        { status: 400 }
      );
    }

    await db; 

    const newReview = new Review({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      rating: Number(rating),
      recommendation: recommendation || null,
      comment: comment.trim(),
      isApproved: false 
    });

    await newReview.save();

    return NextResponse.json(
      { message: 'نظر شما با موفقیت ثبت شد و پس از تایید منتشر می‌شود.', reviewId: newReview._id },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('خطا در اجرای API ثبت نظر:', error);
    return NextResponse.json(
      { message: 'خطایی در سرور رخ داده است.', error: error.message },
      { status: 500 }
    );
  }
}