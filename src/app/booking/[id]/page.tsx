'use client';
import { Star } from "lucide-react";
import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // گرفتن اطلاعات فرستاده شده از صفحه قبل
  const doctorId = params.id;
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');

  return (
    <div className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6">
        
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="text-[22px] sm:text-[26px] font-black text-gray-900">دکتر زهرا وارسته</h1>
            <p className="text-gray-500 font-bold text-[15px]">متخصص قلب و عروق</p>
          </div>
          <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-gray-900">۴.۸</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <span className="text-gray-400 text-sm">(۱۰۵ نظر)</span>
        </div>

          <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-xl border border-gray-100">
            <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={18} height={18} />
            <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی:-۴۳۳۶۳</span>
          </div>

          <div className="space-y-4 pt-2">
           
            <div className="flex items-start gap-3">
              <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={20} height={20} className="mt-1 shrink-0" />
              <p className="text-[14px] text-gray-700 leading-6 font-medium">
                آدرس مطب: تهران، ستارخان، خیابان هشتم، پلاک ۲۰
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/icons/alarm-clock.svg" alt="نوبت" width={20} height={20} className="shrink-0" />
              <p className="text-[14px] text-gray-700 font-medium">
                اولین نوبت در دسترس: <span className="font-black text-gray-900">دوشنبه ۲۷ دی</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full sm:w-[160px] h-[160px] shrink-0">
          <Image
            src="/images/DoctorPicture.png" 
            alt="دکتر زهرا وارسته"
            fill
            className="rounded-[22px] object-cover border-4 border-gray-50 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm text-right">
        <h2 className="text-xl font-black text-gray-900">انتخاب مراجع</h2>
        {/* اطلاعات پزشک و زمان انتخاب شده (selectedDate و selectedTime) را اینجا نشان دهید */}
      </div>

      {/* کانتینر انتخاب مراجعه کننده */}
      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-6 text-right mt-6">
        <div>
          <h3 className="text-lg font-black text-gray-900">مراجعه کننده</h3>
          <p className="text-xs text-gray-400 font-bold mt-1">برای چه کسی نوبت می‌گیرید؟</p>
        </div>

        {/* کارت انتخاب کاربر */}
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

        {/* دکمه افزودن شخص دیگر */}
        <button className="flex items-center gap-1.5 text-blue-600 text-xs font-black mx-auto hover:text-blue-700 transition-colors">
          <span className="text-base">+</span>
          <span>دریافت نوبت برای شخص دیگر</span>
        </button>

        {/* دکمه اصلی ادامه */}
        <button className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
          <span>ادامه</span>
          <span className="text-xs">◀</span>
        </button>
      </div>

    </div>
  );
}
