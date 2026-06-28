'use client';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DoctorsInfo from "@/Components/doctors/DoctorsInfo";
import Image from "next/image";

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const doctorId = params.id as string;
  const selectedDate = searchParams.get('date') || '';
  const selectedTime = searchParams.get('time') || '';
  
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toPersianDigits = (str: string) => {
  return str.replace(/[0-9]/g, (w) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+w]);
};

  useEffect(() => {
    if (!doctorId) return;

    fetch(`/api/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setDoctor(data);
        }
      })
      .catch((err) => console.error("خطا در دریافت اطلاعات پزشک:", err));

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user); 
          setShowLoginModal(false);
        } else {
          setUser(null);
          setShowLoginModal(true); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در بررسی وضعیت لاگین:", err);
        setLoading(false);
      });

  }, [doctorId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center" dir="rtl">
        <p className="text-gray-400 font-bold">در حال بررسی اطلاعات کاربری و پزشک...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center" dir="rtl">
        <p className="text-gray-500 font-bold">پزشک مورد نظر یافت نشد.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <div className="flex flex-col gap-0.5 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
          <a href={`/doctors/${doctorId}`} className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" title="بازگشت ">
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
      
      <DoctorsInfo
        name={doctor.name}
        specialty={doctor.specialty}
        rating={doctor.rating}
        reviewsCount={doctor.reviewsCount}
        medicalCode={doctor.medicalCode}
        address={doctor.address}
        imageUrl={doctor.avatar}
        selectedDate={selectedDate}
        selectedTime={selectedTime} 
      />

    
      <div className="bg-white rounded-[24px] p-6 border border-blue-100 shadow-[0_12px_40px_rgba(37,99,235,0.04)] text-right mt-6 flex flex-col gap-4 appointment-card-pop" dir="rtl">
        <h3 className="text-[16px] font-black text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          جزئیات نوبت انتخاب شده
        </h3>
        
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-50/70 to-blue-50/20 p-4 rounded-xl border border-blue-100/70 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs text-blue-600 font-bold block">روز و ساعت ویزیت</span>
            <span className="text-sm sm:text-[15px] font-black text-blue-950 block tracking-tight">
              {selectedDate ? selectedDate : "در حال بارگذاری..."} <span className="text-blue-300 mx-1">|</span> ساعت {selectedTime ? selectedTime : ""}
            </span>
          </div>
          <div className="relative flex items-center justify-center bg-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] px-3 py-1.5 rounded-xl text-xs font-black tracking-wide overflow-hidden">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-20 animate-ping"></span>
            تایید موقت
          </div>
        </div>
      </div>

     
      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-6 text-right mt-6 appointment-card-pop"
      style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        <div>
          <h3 className="text-lg font-black text-gray-900">مراجعه کننده</h3>
          <p className="text-xs text-gray-400 font-bold mt-1">برای چه کسی نوبت می‌گیرید؟</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50/30 border border-blue-100 rounded-2xl transition-all">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black text-gray-800">
              {user ? user.name : "در حال بارگذاری اطلاعات مراجع..."}
            </span>
            <span className="text-xs text-gray-400 font-bold" dir="ltr">
              {user ? toPersianDigits(user.phone) : ""}
            </span>
          </div>
          <input 
            type="radio" 
            checked={!!user}
            readOnly
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600" 
          />
        </div>

        <button className="flex items-center gap-1.5 text-blue-600 text-xs font-black mx-auto hover:text-blue-700 transition-colors">
          <span className="text-base">+</span>
          <span>دریافت نوبت برای شخص دیگر</span>
        </button>

        <button 
          onClick={() => {
            if (!user) {
              setShowLoginModal(true);
            } else {
              router.push(`/booking/${doctorId}/payment?date=${selectedDate}&time=${selectedTime}&patient=${user.name}`);
            }
          }}
          className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>ادامه</span>
          <span className="text-xs">◀</span>
        </button>
      </div>

      
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-[modalFadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-sm rounded-[28px] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.12)] border border-gray-100 text-center flex flex-col gap-5 modal-pop-up">
            
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>

            <div className="space-y-2">
              <h4 className="text-[18px] font-black text-gray-900">ورود به حساب کاربری</h4>
              <p className="text-[13px] text-gray-400 font-medium leading-6 px-2">
                برای رزرو نوبت و ثبت اطلاعات مراجع، ابتدا باید وارد حساب کاربری خود شوید.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full py-3.5 bg-blue-600 text-white rounded-2xl text-[15px] font-black shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 active:scale-[0.98] transition-all duration-200"
              >
                ورود / ثبت‌نام در دکتر رزرو
              </button>
              <button
                onClick={() => router.back()}
                className="w-full py-3 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-2xl text-[14px] font-bold transition-all duration-200"
              >
                بازگشت
              </button>
            </div>
          </div>
        </div>
      )}

      
      <style jsx global>{`
        /* انیمیشن کارت نوبت */
        .appointment-card-pop {
          animation: totalEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes totalEntrance {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          70% {
            transform: translateY(-2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* انیمیشن‌های پاپ آپ لاگین */
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-pop-up {
          animation: samsungElastic 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes samsungElastic {
          from {
            transform: scale(0.88) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}