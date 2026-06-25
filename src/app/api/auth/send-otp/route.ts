import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const phoneRegex = /^09\d{9}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return NextResponse.json({ message: 'شماره موبایل معتبر نیست.' }, { status: 400 });
    }

    const otpCode = Math.floor(10000 + Math.random() * 90000).toString();

    const { db } = await connectToDatabase();
    
    await db.collection('otpRequests').deleteMany({ phoneNumber });

    await db.collection('otpRequests').insertOne({
      phoneNumber,
      code: otpCode,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
      isUsed: false
    });

   
    const data = JSON.stringify({
      mobile: phoneNumber,
      templateId: Number(process.env.SMS_TEMPLATE_ID),
      parameters: [
        {
          name: 'CODE', 
          value: otpCode
        }
      ]
    });

    const config = {
      method: 'post',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'text/plain', 
        'x-api-key': process.env.SMS_API_KEY as string
      },
      data: data
    };

    const response = await axios(config);

    
    if (response.status === 200 && response.data?.status === 1) {
      return NextResponse.json({ message: 'کد تایید با موفقیت ارسال شد.' }, { status: 200 });
    } else {
      console.error('SMS Panel Rejection:', response.data);
      return NextResponse.json({ message: response.data?.message || 'خطا در تایید ارسال پیامک.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('SMS API Error:', error?.response?.data || error.message);
    return NextResponse.json({ message: 'خطای سرور در فرآیند ارسال پیامک.' }, { status: 500 });
  }
}