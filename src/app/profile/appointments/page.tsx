'use client';

import React, { useState, useEffect } from 'react';
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
  avatar?: string; 
}

interface BookingCardProps {
  id?: string;          
  doctorId?: string;    
  doctor?: DoctorProps; 
  trackingCode?: string; 
  onConfirmCancel?: () => void; 
}

export default function AppointmentCard({
  id: initialId,
  doctorId: initialDoctorId,
  doctor: initialDoctor,
  trackingCode: initialTrackingCode,
  onConfirmCancel
}: BookingCardProps) {
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false); 
  const [selectedAppointment, setSelectedAppointment] = useState<{ id: string; trackingCode: string } | null>(null);

  useEffect(() => {
    async function fetchUserAppointments() {
      try {
        const response = await fetch('/api/booking/user-list'); 
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments || []);
        }
      } catch (err) {
        console.error("خطا در دریافت نوبت‌ها:", err);
      } finally {
        setLoading(false);
      }
    }

    if (initialDoctor) {
      setLoading(false);
    } else {
      fetchUserAppointments();
    }
  }, [initialDoctor]);

  const handleCancelClick = (appId: string, tCode: string) => {
    setSelectedAppointment({ id: appId, trackingCode: tCode });
    setIsCancelModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isCanceling) return; 
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;
    setIsCanceling(true);
    try {
      const response = await fetch('/api/booking/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          trackingCode: selectedAppointment.trackingCode, 
          appointmentId: selectedAppointment.id 
        }),
      });

      if (response.ok) {
        setAppointments(prev => prev.filter(item => item._id !== selectedAppointment.id));
        if (onConfirmCancel) onConfirmCancel();
      } else {
        const errData = await response.json();
        console.error("خطا در لغو نوبت:", errData.error);
        alert("مشکلی در ثبت لغو نوبت در دیتابیس رخ داد.");
      }
    } catch (err) {
      console.error("خطای ارتباط با سرور برای لغو نوبت:", err);
      alert("خطای ارتباط با سرور. لطفاً مجدداً تلاش کنید.");
    } finally {
      setIsCanceling(false);
      setIsCancelModalOpen(false);
      setSelectedAppointment(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center text-gray-500 font-bold" dir="rtl">
        در حال بارگذاری نوبت‌های شما...
      </div>
    );
  }

  const renderList = initialDoctor 
    ? [{ _id: initialId, doctorId: initialDoctorId, trackingCode: initialTrackingCode, ...initialDoctor }]
    : appointments.map(app => ({
        _id: app._id,
        doctorId: app.doctorId,
        trackingCode: app.trackingCode,
        name: app.doctorName,
        specialty: app.doctorSpecialty,
        medicalCode: app.doctorMedicalCode,
        address: app.doctorAddress,
        availableDate: `${app.date} ساعت ${app.time}`,
        rating: app.doctorRating || 5,
        reviewsCount: app.doctorReviewsCount || 0,
        avatar: app.doctorAvatar 
      }));

  if (renderList.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center text-gray-400 font-bold" dir="rtl">
        هیچ نوبت فعال و رزرو شده‌ای یافت نشد.
      </div>
    );
  }

  return (
    <>
      {renderList.map((item) => (
        <div key={item._id} className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-4 relative" dir="rtl">
          
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-2 bg-gray-50/60 px-3 py-1.5 rounded-xl border border-gray-100 shrink-0 self-start md:self-auto">
              <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={16} height={16} />
              <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی: {item.medicalCode}</span>
            </div>

            <div className="flex-1 w-full space-y-4">
              
              <div className="flex items-center gap-4 justify-between md:justify-start">
                <div className="space-y-1">
                  <h3 className="text-[18px] sm:text-[20px] font-black text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 font-bold text-[14px]">{item.specialty}</p>
                  
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545-4.755-4.636 6.568-.955 2.942-5.954 2.942 5.954 6.568.955-4.755 4.636 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs font-medium">({item.reviewsCount} نظر)</span>
                  </div>
                </div>

                
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                  <Image
                    src={item.avatar || "/images/DoctorPicture.png"} 
                    alt={item.name}
                    fill
                    unoptimized
                    className="rounded-2xl object-cover border border-gray-100 shadow-sm"
                  />
                </div>

              </div>

              <div className="space-y-2.5 pt-2 border-t border-gray-50">
                <div className="flex items-start gap-2.5 text-zinc-600">
                  <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={18} height={18} className="mt-0.5 shrink-0" />
                  <p className="text-[13px] font-medium leading-5">
                    آدرس مطب: {item.address}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-600">
                  <Image src="/icons/alarm-clock.svg" alt="تاریخ" width={18} height={18} className="shrink-0" />
                  <p className="text-[13px] font-medium">
                    تاریخ نوبت: <span className="font-bold text-zinc-900">{item.availableDate}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-600">
                  <Image src="/icons/trackingcode.png" alt="کد پیگیری" width={18} height={18} className="shrink-0" />
                  <p className="text-[13px] font-medium">
                    کد پیگیری: <span className="font-mono font-black text-zinc-900">{item.trackingCode}</span>
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row-reverse items-center gap-3 w-full md:max-w-[50%] mr-auto">
            
            <Link 
              href={`/doctors/${item.doctorId}`}
              className="w-full sm:w-1/2 bg-blue-600 text-white font-bold text-[13px] py-2.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-100 flex items-center justify-center gap-1"
            >
              مشاهده پروفایل
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
            
            <button 
              onClick={() => handleCancelClick(item._id, item.trackingCode)}
              className="w-full sm:w-1/2 bg-red-50 text-red-600 border border-red-100 font-bold text-[13px] py-2.5 px-4 rounded-xl hover:bg-red-100/70 active:scale-[0.98] transition-all"
            >
              لغو نوبت
            </button>
          </div>

        </div>
      ))}

      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-100 relative z-10 scale-in animate-in duration-200 zoom-in-95 text-center space-y-4">
            
            <div className="mx-auto w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-zinc-900">آیا از لغو این نوبت اطمینان دارید؟</h4>
              <p className="text-[13px] text-zinc-500 leading-6">
                با لغو نوبت، زمان رزرو شده شما آزاد می‌شود و این عمل قابل بازگشت نخواهد بود.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button 
                onClick={handleConfirmCancel}
                disabled={isCanceling}
                className={`w-full bg-red-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all ${isCanceling ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isCanceling ? "در حال لغو نوبت..." : "بله، لغو شود"}
              </button>
              <button 
                onClick={handleCloseModal}
                disabled={isCanceling}
                className="w-full bg-zinc-100 text-zinc-700 font-bold text-[13px] py-2.5 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all"
              >
                خیر، منصرف شدم
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}