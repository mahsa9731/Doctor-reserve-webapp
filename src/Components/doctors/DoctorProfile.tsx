"use client";
import Image from "next/image";
import { Star,ChevronDown,} from "lucide-react";
import React, { useState } from 'react';

export default function DoctorProfile() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100" dir="rtl">
     
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
            <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی:۴۳۳۶۳</span>
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

     
<div className="mt-10 pt-8 border-t border-gray-50 relative">
  <h3 className="text-[18px] font-black text-gray-900 mb-4">درباره دکتر زهرا وارسته</h3>
  
  <div className="relative">
    <p 
      className={`text-gray-600 text-[14px] leading-8 text-justify font-medium transition-all duration-300 ${
        isExpanded ? 'max-h-[1000px]' : 'max-h-[96px] overflow-hidden line-clamp-3'
      }`}
    >
      دارای بورد تخصصی بیماری‌های قلب و عروق، فلوشیپ اقدامات مداخله‌ای قلب و عروق (اینترونشنال کاردیولوژی) بزرگسالان، آنژیوگرافی و آنژیوپلاستی عروق قلبی و کلیه تنگی‌های عروق محیطی. دکتر زهرا وارسته با بیش از سال‌ها تجربه در زمینه تشخیص و درمان بیماری‌های پیچیده دریچه‌ای، نارسایی قلب، کنترل فشار خون‌های مقاوم به درمان و پیشگیری از سکته‌های قلبی، خدمات پیشرفته‌ای را به مراجعین ارائه می‌دهند. در مطب ایشان علاوه بر معاینات تخصصی، خدماتی چون اکوکاردیوگرافی پیشرفته، تست ورزش، هولتر مانیتورینگ ریتم و فشار خون با بهره‌گیری از مدرن‌ترین تجهیزات روز دنیا انجام می‌پذیرد تا دقیق‌ترین روند درمانی برای بیماران برنامه‌ریزی شود.
    </p>
    
    {!isExpanded && (
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    )}
  </div>
  
  <div className="mt-4 flex justify-center">
    <button 
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all duration-200 hover:text-gray-600 hover:border-gray-300"
    >
      <ChevronDown 
        size={18} 
        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
      />
    </button>
  </div>
</div>
    </div>
  );
}