import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

interface PaymentFailedPageProps {
  params: {
    id: string;
  };
}

const PaymentFailedPage: React.FC<PaymentFailedPageProps> = ({ params }) => {
 
  const bookingId = params.id;


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black/60 p-4 rtl backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="bg-red-500 p-6 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4">
            <AlertCircle className="text-red-500" size={50} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            پرداخت ناموفق
          </h1>
        </div>

        <div className="p-8 text-center">
          <p className="mb-8 text-gray-700 leading-relaxed">
            متأسفانه تراکنش شما با خطا مواجه شد و پرداخت انجام نشد. لطفا دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
          </p>

         
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            
            <Link
              href={`/booking/${bookingId}/payment`} 
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800"
            >
              تلاش مجدد
            </Link>

            <Link
              href={`/`}
              className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-200"
            >
              انصراف
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailedPage;