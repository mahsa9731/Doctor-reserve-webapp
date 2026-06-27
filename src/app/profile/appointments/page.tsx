'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorProps {
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  medicalCode: string;
  address: string;
  availableDate: string;
}

interface BookingCardProps {
  doctor?: DoctorProps;
  trackingCode?: string;
  profileUrl?: string; // آدرس داینامیک برای مشاهده پروفایل پزشک
  onConfirmCancel?: () => void; // فانکشن اختیاری برای زمانی که کاربر لغو را تایید میکند
}

export default function AppointmentCard({
  doctor = {
    name: "دکتر زهرا وارسته",
    specialty: "متخصص قلب و عروق",
    rating: 4.8,
    reviewsCount: 105,
    medicalCode: "۴۳۳۶۳",
    address: "تهران، ستارخان، خیابان هشتم، پلاک ۲۰",
    availableDate: "دوشنبه ۲۴ دی ساعت ۱۴:۳۰"
  },
  trackingCode = "۲۴۶۷۵۸۹۳",
  profileUrl = "/doctors/dr-zahra-varasteh", // مقدار پیش‌فرض آدرس پروفایل
  onConfirmCancel
}: BookingCardProps) {
  
  // وضعیت باز یا بسته بودن پاپ‌آپ لغو نوبت
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    if (onConfirmCancel) onConfirmCancel();
    setIsCancelModalOpen(false);
    // اینجا می‌توانی لاجیک حذف از دیتابیس یا ریکوئست به API را هم اضافه کنی
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-4 relative" dir="rtl">
      
      {/* چیدمان عریض مشابه فیگما */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        
        {/* سمت راست: کد نظام پزشکی */}
        <div className="flex items-center gap-2 bg-gray-50/60 px-3 py-1.5 rounded-xl border border-gray-100 shrink-0 self-start md:self-auto">
          <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={16} height={16} />
          <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی: {doctor.medicalCode}</span>
        </div>

        {/* وسط: اطلاعات پزشک و آدرس */}
        <div className="flex-1 w-full space-y-4">
          
          {/* مشخصات اصلی و عکس در یک ردیف */}
          <div className="flex items-center gap-4 justify-between md:justify-start">
            
            {/* متون مشخصات */}
            <div className="space-y-1">
              <h3 className="text-[18px] sm:text-[20px] font-black text-gray-900">{doctor.name}</h3>
              <p className="text-gray-500 font-bold text-[14px]">{doctor.specialty}</p>
              
              {/* ستاره‌ها و نظرات */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545-4.755-4.636 6.568-.955 2.942-5.954 2.942 5.954 6.568.955-4.755 4.636 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 text-xs font-medium">({doctor.reviewsCount} نظر)</span>
              </div>
            </div>

            {/* عکس پزشک */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
              <Image
                src="/images/DoctorPicture.png" 
                alt={doctor.name}
                fill
                className="rounded-2xl object-cover border border-gray-100 shadow-sm"
              />
            </div>

          </div>

          {/* جزئیات آدرس، تاریخ و کد پیگیری */}
          <div className="space-y-2.5 pt-2 border-t border-gray-50">
            <div className="flex items-start gap-2.5 text-zinc-600">
              <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={18} height={18} className="mt-0.5 shrink-0" />
              <p className="text-[13px] font-medium leading-5">
                آدرس مطب: {doctor.address}
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-600">
              <Image src="/icons/alarm-clock.svg" alt="تاریخ" width={18} height={18} className="shrink-0" />
              <p className="text-[13px] font-medium">
                تاریخ نوبت: <span className="font-bold text-zinc-900">{doctor.availableDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-600">
              <Image src="/icons/trackingcode.png" alt="کد پیگیری" width={18} height={18} className="shrink-0" />
              <p className="text-[13px] font-medium">
                کد پیگیری: <span className="font-mono font-black text-zinc-900">{trackingCode}</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* بخش دکمه‌های عملیاتی پایین کارت (جای دکمه‌ها برعکس شد) */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row-reverse items-center gap-3 w-full md:max-w-[50%] mr-auto">
        
        {/* دکمه مشاهده پروفایل (سمت چپ در چیدمان نهایی) */}
        <Link 
          href={profileUrl}
          className="w-full sm:w-1/2 bg-blue-600 text-white font-bold text-[13px] py-2.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-100 flex items-center justify-center gap-1"
        >
          مشاهده پروفایل
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        
        {/* دکمه لغو نوبت (سمت راست در چیدمان نهایی) */}
        <button 
          onClick={handleCancelClick}
          className="w-full sm:w-1/2 bg-red-50 text-red-600 border border-red-100 font-bold text-[13px] py-2.5 px-4 rounded-xl hover:bg-red-100/70 active:scale-[0.98] transition-all"
        >
          لغو نوبت
        </button>
      </div>

      {/* ================= پاپ‌آپ شیک لغو نوبت ================= */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          {/* لایه کلیک بیرون پاپ‌آپ برای بستن آن */}
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          
          {/* باکس اصلی مدال */}
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-100 relative z-10 scale-in animate-in duration-200 zoom-in-95 text-center space-y-4">
            
            {/* آیکون هشدار */}
            <div className="mx-auto w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>

            {/* متون پاپ‌آپ */}
            <div className="space-y-1">
              <h4 className="text-base font-black text-zinc-900">آیا از لغو این نوبت اطمینان دارید؟</h4>
              <p className="text-[13px] text-zinc-500 leading-6">
                با لغو نوبت، زمان رزرو شده شما آزاد می‌شود و این عمل قابل بازگشت نخواهد بود.
              </p>
            </div>

            {/* دکمه‌های عملیاتی داخل پاپ‌آپ */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button 
                onClick={handleConfirmCancel}
                className="w-full bg-red-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all"
              >
                بله، لغو شود
              </button>
              <button 
                onClick={handleCloseModal}
                className="w-full bg-zinc-100 text-zinc-700 font-bold text-[13px] py-2.5 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all"
              >
                خیر، منصرف شدم
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}