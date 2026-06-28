'use client';
import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-500"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

interface PaymentSuccessPageProps {
  params: {
    id: string;
  };
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ params }) => {
  const bookingId = params.id;
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get('code') || '---';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black/60 p-4 rtl backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-blue-600 p-6 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4">
            <CheckCircleIcon />
          </div>
          <h1 className="text-2xl font-bold text-white">
            پرداخت موفق
          </h1>
        </div>

        <div className="p-8 text-center">
          <p className="mb-6 text-gray-700 leading-relaxed">
            تراکنش شما با موفقیت انجام شد. از اینکه به ما اعتماد کردید، سپاسگزاریم.
            
            <span className="block mt-4 text-sm font-bold text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
              شماره پیگیری: <span className="text-gray-900 font-black tracking-widest">{trackingCode}</span>
            </span>
          </p>

          <Link
            href={`/profile/appointments`} 
            className="inline-block w-full rounded-lg bg-emerald-500 px-6 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 active:bg-emerald-700"
          >
            مشاهده نوبت‌ها
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;