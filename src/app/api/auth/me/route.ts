import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectToDatabase } from "@/lib/db"; 
import User from "@/models/User"; 

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "YOUR_STRONG_JWT_SECRET_KEY_HERE"
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      await connectToDatabase();
      
     
      const dbUser = await User.findById(payload.userId);

      if (!dbUser) {
        return NextResponse.json({ authenticated: false, user: null });
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          name: `${dbUser.firstName || ''} ${dbUser.lastName || ''}`.trim() || "کاربر دکتر رزرو",
          phone: payload.phoneNumber as string
        }
      });

    } catch (jwtError) {
      return NextResponse.json({ authenticated: false, user: null });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}