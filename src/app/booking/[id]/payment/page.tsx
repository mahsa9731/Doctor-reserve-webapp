'use client';
import DoctorInfoCard from "@/Components/doctors/DoctorsInfo";
import PaymentSummary from "@/Components/payment/PaymentSummery";
import OnlineGateway from "@/Components/payment/OnlineGateway";
import FinalChecking from "@/Components/payment/FinalChecking";
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from "next/image";
import { Verified } from 'lucide-react';


export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="!bg-white min-h-screen w-full !text-gray-950 block" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="flex flex-col gap-0.5 mb-8">
                <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
                  <a href="/doctors/${id}" className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" title="بازگشت به صفحه اصلی">
                    <Image 
                      src="/icons/arrow-right-title.png" 
                      alt="لوگو" 
                      width={26} 
                      height={26} 
                      className="object-contain"
                    />
                  </a>
                  <span>پرداخت و ثبت رزرو</span>
                </h1>
              </div>
        
        <div className="bg-red-50 border border-red-100 rounded-[20px] p-4 flex items-center gap-3 mb-8">
          <div className="bg-red-100/60 p-2 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p className="text-red-900 text-sm font-black">
            نوبت شما هنوز تکمیل نشده است، برای ادامه پرداخت را انجام دهید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <PaymentSummary />

            
            <OnlineGateway />
          </div>

          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            
            <DoctorInfoCard />

            <FinalChecking 
            dynamicDate={searchParams.get('date')}
            dynamicTime={searchParams.get('time')}
            patientName={searchParams.get('patient') || 'علی مهدوی'}
            />
           
            <div className="bg-gray-50/70 border border-gray-100 rounded-[24px] p-6 space-y-4 text-right">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-xl">
                  <Verified size={24} className="text-blue-600" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900">با اطمینان نوبت خود را ثبت کنید</h3>
              </div>
              
              <ul className="space-y-3 pr-9 list-disc text-xs font-bold text-gray-600">
                <li>امکان لغو نوبت تا ۲۴ ساعت قبل از موعد</li>
                <li>امکان بازگشت وجه به کیف پول یا حساب بانکی</li>
                <li>امکان ویرایش نوبت (تغییر زمان) بدون هزینه اضافی</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}