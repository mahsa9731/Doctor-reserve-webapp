import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'یک_رشته_طولانی_و_بسیار_محرمانه_برای_امنیت_توکن'
);

export async function POST(request: Request) {
  try {
    const { phoneNumber, otp } = await request.json();
    const code = otp; // هماهنگ با متغیر ارسالی از فرانت‌اند

    if (!phoneNumber || !code) {
      return NextResponse.json({ message: 'شماره موبایل و کد تایید الزامی هستند.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // ۱. بررسی کد تایید در جدول otpRequests
    const otpRecord = await db.collection('otpRequests').findOne({
      phoneNumber,
      code,
      isUsed: false,
    });

    // اگر کد اشتباه باشد، سرور همینجا متوقف می‌شود
    if (!otpRecord) {
      return NextResponse.json({ message: 'کد وارد شده اشتباه است یا قبلاً استفاده شده.' }, { status: 400 });
    }

    // ۲. بررسی منقضی شدن کد تایید
    const now = new Date();
    if (now > new Date(otpRecord.expiresAt)) {
      return NextResponse.json({ message: 'کد تایید منقضی شده است. لطفا مجددا تلاش کنید.' }, { status: 400 });
    }

    // ۳. به روزرسانی کد تایید در دیتابیس (باطل کردن کد استفاده شده)
    await db.collection('otpRequests').updateOne(
      { _id: otpRecord._id },
      { $set: { isUsed: true } }
    );

    // ۴. بررسی وضعیت کاربر در کالکشن users (اگر نبود ساخته می‌شود، اگر بود اطلاعاتش لود می‌شود)
    let user = await db.collection('users').findOne({ phoneNumber });

    if (!user) {
      const newUser = {
        phoneNumber,
        role: 'patient',
        firstName: '',     // خالی می‌گذاریم تا در صفحه پروفایل پر شود
        lastName: '',
        nationalCode: '',
        birthYear: '',
        gender: 'خانم',
        city: '',
        email: '',
        createdAt: new Date(),
      };
      
      // ذخیره و ثبت شماره کاربر در کالکشن users برای اولین بار
      const result = await db.collection('users').insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
      console.log('کاربر جدید با موفقیت در دیتابیس ثبت شد!');
    } else {
      console.log('کاربر قدیمی با موفقیت وارد شد و اطلاعاتش لود گردید.');
    }

    // ۵. ساخت توکن سشن (JWT) برای کاربر
    const token = await new SignJWT({ 
        userId: user._id.toString(), 
        phoneNumber: user.phoneNumber,
        role: user.role 
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // ۶. ارسال پاسخ به فرانت‌اَند و ست کردن کوکی مرورگر
    const response = NextResponse.json({
      message: 'ورود با موفقیت انجام شد.',
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // ماندگاری ۷ روز
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ message: 'خطای سرور رخ داده است.' }, { status: 500 });
  }
}