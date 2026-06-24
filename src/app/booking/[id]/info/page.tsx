'use client';
import { useSearchParams, useParams } from 'next/navigation';
import DoctorsInfo from "@/Components/doctors/DoctorsInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId = params.id;
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');

  return (
    
    <div className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <div className="flex flex-col gap-0.5 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
          <a href={`/doctors/${doctorId}`} className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" title="بازگشت به صفحه اصلی">
            <Image 
              src="/icons/arrow-right-title.png" 
              alt="لوگو" 
              width={26} 
              height={26} 
              className="object-contain"
            />
          </a>
          <span>انتخاب مراجع</span>
        </h1>
      </div>
      
      <DoctorsInfo />

      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm text-right mt-6 flex flex-col gap-4">
  <h3 className="text-[16px] font-black text-gray-900 border-b border-gray-50 pb-3">
    جزئیات نوبت انتخاب شده
  </h3>
  
  <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
    <div>
      <span className="text-xs text-gray-400 font-bold block">روز و ساعت ویزیت</span>
      <span className="text-sm font-black text-gray-800 mt-1 block">
        {selectedDate ? selectedDate : "در حال بارگذاری..."} - ساعت {selectedTime ? selectedTime : ""}
      </span>
    </div>
    <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg text-xs font-black">
      تایید موقت
    </div>
  </div>
</div>

      
      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-6 text-right mt-6">
        <div>
          <h3 className="text-lg font-black text-gray-900">مراجعه کننده</h3>
          <p className="text-xs text-gray-400 font-bold mt-1">برای چه کسی نوبت می‌گیرید؟</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50/30 border border-blue-100 rounded-2xl">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black text-gray-800">علی مهدوی (خودم)</span>
            <span className="text-xs text-gray-400 font-bold" dir="ltr">۰۹۱۲۳۴۵۶۷۸۹</span>
          </div>
          <input 
            type="radio" 
            defaultChecked 
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600" 
          />
        </div>

        <button className="flex items-center gap-1.5 text-blue-600 text-xs font-black mx-auto hover:text-blue-700 transition-colors">
          <span className="text-base">+</span>
          <span>دریافت نوبت برای شخص دیگر</span>
        </button>

        <button 
  onClick={() => router.push(`/booking/${doctorId}/payment?date=${selectedDate}&time=${selectedTime}&patient=علی مهدوی`)}
  className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
>
  <span>ادامه</span>
  <span className="text-xs">◀</span>
</button>
      </div>

    </div>
  );
}
