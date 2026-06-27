import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // ۱. دسترسی به کوکی‌های سرور و حذف کامل توکن
    const cookieStore = await cookies();
    cookieStore.delete('token');

    // ۲. ارسال پاسخ موفقیت با هدرهایی که کش مرورگر را کاملا باطل می‌کنند
    const response = NextResponse.json({ message: 'خروج موفقیت‌آمیز بود.' }, { status: 200 });
    
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'خطا در خروج از حساب' }, { status: 500 });
  }
}