'use client';
import DoctorInfoCard from "@/Components/doctors/DoctorsInfo";
import PaymentSummary from "@/Components/payment/PaymentSummery";
import OnlineGateway from "@/Components/payment/OnlineGateway";
import FinalChecking from "@/Components/payment/FinalChecking";
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { Verified } from 'lucide-react';

export default function PaymentPage() { 
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const doctorId = params.id as string;
  const selectedDate = searchParams.get('date') || '';
  const selectedTime = searchParams.get('time') || '';
  const urlPatientName = searchParams.get('patient') || 'علی مهدوی';

  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = fetch(`/api/doctors/${doctorId}`).then((res) => res.json());
    
    const fetchAuth = fetch('/api/auth/me').then((res) => res.json());

    Promise.all([fetchDoctor, fetchAuth])
      .then(([doctorData, authData]) => {
        if (!doctorData.error) {
          setDoctor(doctorData);
        }
        if (authData.authenticated && authData.user) {
          setUser(authData.user);
        } else {
          
          router.push('/auth/login');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در لود دیتای صفحه پرداخت:", err);
        setLoading(false);
      });
  }, [doctorId, router]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4" dir="rtl">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold animate-pulse">در حال برقراری اتصال امن با درگاه پرداخت...</p>
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
    <div className="!bg-white min-h-screen w-full !text-gray-950 block" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="flex flex-col gap-0.5 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
            <a href={`/booking/${doctorId}/info?date=${selectedDate}&time=${selectedTime}`} className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" title="بازگشت به مرحله قبل">
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
        
        <div className="bg-red-50 border border-red-100 rounded-[20px] p-4 flex items-center gap-3 mb-8 payment-alert-shake">
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
          
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 payment-left-column">
            <PaymentSummary />
            <OnlineGateway />
          </div>

          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6 payment-right-column">
            
            <DoctorInfoCard 
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

            <FinalChecking 
              dynamicDate={selectedDate}
              dynamicTime={selectedTime}
              patientName={user ? user.name : urlPatientName}
              docaddress={doctor.address}
            />
            
            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50 border border-gray-100 rounded-[28px] p-6 shadow-[0_16px_32px_rgba(0,0,0,0.01)] text-right transition-all duration-300 hover:shadow-md hover:border-blue-100/50 group">
  
  <div className="flex items-center gap-3 mb-5">
    <div className="bg-blue-50/80 p-2.5 rounded-2xl border border-blue-100/40 transition-transform duration-300 group-hover:scale-110">
      <Verified size={22} className="text-blue-600" />
    </div>
    <div className="space-y-0.5">
      <h3 className="text-[15px] font-black text-gray-900 tracking-tight">با اطمینان نوبت خود را ثبت کنید</h3>
      <p className="text-[11px] text-gray-400 font-bold">قوانین انعطاف‌پذیر و پشتیبانی ۲۴ ساعته دکتر رزرو</p>
    </div>
  </div>
  
 
  <div className="space-y-3">
    <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all duration-200 hover:bg-blue-50/20 hover:border-blue-50">
      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
      <p className="text-xs font-bold text-gray-700 leading-relaxed">
        امکان لغو نوبت تا <span className="font-black text-blue-950">۲۴ ساعت</span> قبل از موعد ویزیت
      </p>
    </div>
    <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all duration-200 hover:bg-blue-50/20 hover:border-blue-50">
      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
      <p className="text-xs font-bold text-gray-700 leading-relaxed">
        امکان بازگشت کامل وجه به <span className="font-black text-blue-950">کیف پول</span> یا حساب بانکی
      </p>
    </div>
    <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-all duration-200 hover:bg-blue-50/20 hover:border-blue-50">
      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
      <p className="text-xs font-bold text-gray-700 leading-relaxed">
        امکان ویرایش نوبت و تغییر زمان <span className="font-black text-blue-950">بدون هزینه اضافی</span>
      </p>
    </div>
  </div>
</div>

          </div>

        </div>
      </div>

      <style jsx global>{`
        .payment-alert-shake {
          animation: alertSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .payment-left-column {
          animation: oneUiUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .payment-right-column {
          animation: oneUiUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        @keyframes alertSlideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes oneUiUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}