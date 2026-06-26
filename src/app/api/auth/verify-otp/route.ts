import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SignJWT } from 'jose';


const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'یک_رشته_طولانی_و_بسیار_محرمانه_برای_امنیت_توکن'
);

export async function POST(request: Request) {
  try {
    const { phoneNumber, code } = await request.json();

    
    if (!phoneNumber || !code) {
      return NextResponse.json({ message: 'شماره موبایل و کد تایید الزامی هستند.' }, { status: 400 });
    }

    
    const { db } = await connectToDatabase();

    
    const otpRecord = await db.collection('otpRequests').findOne({
      phoneNumber,
      code,
      isUsed: false,
    });

    if (!otpRecord) {
      return NextResponse.json({ message: 'کد وارد شده اشتباه است یا قبلاً استفاده شده.' }, { status: 400 });
    }

   
    const now = new Date();
    if (now > new Date(otpRecord.expiresAt)) {
      return NextResponse.json({ message: 'کد تایید منقضی شده است. لطفا مجددا تلاش کنید.' }, { status: 400 });
    }

    
    await db.collection('otpRequests').updateOne(
      { _id: otpRecord._id },
      { $set: { isUsed: true } }
    );

  
    let user = await db.collection('users').findOne({ phoneNumber });

    if (!user) {
      const newUser = {
        phoneNumber,
        role: 'patient', 
        createdAt: new Date(),
      };
      const result = await db.collection('users').insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    
    const token = await new SignJWT({ 
        userId: user._id.toString(), 
        phoneNumber: user.phoneNumber,
        role: user.role 
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

   
    return NextResponse.json({
      message: 'ورود با موفقیت انجام شد.',
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ message: 'خطای سرور رخ داده است.' }, { status: 500 });
  }
}