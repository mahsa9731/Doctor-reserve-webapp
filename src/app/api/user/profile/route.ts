import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/db';
import { jwtVerify } from 'jose';
import { ObjectId } from 'mongodb';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'یک_رشته_طولانی_و_بسیار_محرمانه_برای_امنیت_توکن'
);

// ۱. دریافت اطلاعات کاربر برای نمایش در صفحه پروفایل (GET)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'احراز هویت انجام نشده است.' }, { status: 401 });
    }

    // تایید و رمزگشایی توکن برای پیدا کردن شناسه کاربر
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ message: 'کاربر یافت نشد.' }, { status: 404 });
    }

    // بازگرداندن اطلاعات کاربر به فرانت‌اَند
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('Profile GET Error:', error);
    return NextResponse.json({ message: 'خطای سرور رخ داده است.' }, { status: 500 });
  }
}

// ۲. به‌روزرسانی اطلاعات کاربر وقتی دکمه ذخیره تغییرات را می‌زند (PUT)
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'احراز هویت انجام نشده است.' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;

    // دریافت اطلاعات جدید فرم از فرانت‌اَند
    const { firstName, lastName, nationalCode, birthYear, gender, city, email } = await request.json();

    // ولیدیشن اولیه سمت سرور (مولفه‌های اجباری)
    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json({ message: 'وارد کردن نام و نام خانوادگی الزامی است.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // آپدیت اطلاعات کاربر در منگودی‌بی
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          firstName,
          lastName,
          nationalCode,
          birthYear,
          gender,
          city,
          email,
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({ message: 'پروفایل با موفقیت به‌روزرسانی شد.' }, { status: 200 });

  } catch (error) {
    console.error('Profile PUT Error:', error);
    return NextResponse.json({ message: 'خطای سرور رخ داده است.' }, { status: 500 });
  }
}