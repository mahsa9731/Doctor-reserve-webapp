"use client";
import Image from "next/image";
import { Star, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from 'react';

interface DoctorData {
  _id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  address: string;
  nextSlot: string;
  image: string;
  nizamCode: string;
  bio?: string;
}

interface DoctorProfileProps {
  doctorId: string;
}

 const toPersianNumber = (num: number | string) => {
    return num.toLocaleString('fa-IR');
  };

export default function DoctorProfile({ doctorId }: DoctorProfileProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getDoctorDetails() {
      if (!doctorId) return;
      
      try {
        setLoading(true);
        
        const res = await fetch(`/api/doctors/${doctorId}`);
        const data = await res.json();

        if (data) {
          setDoctor({
            _id: data._id,
            name: data.name ,
            specialty: data.specialty ,
            rating: data.rating ? String(data.rating) : "۴.۸",
            reviews: data.reviewsCount ? String(data.reviewsCount) : "۱۰۵",
            address: data.address ,
            nextSlot: data.availableSlots && data.availableSlots[0] ? data.availableSlots[0].date : "دوشنبه ۲۷ دی",
            image: data.avatar ,
            nizamCode: data.medicalCode ,
            bio: data.description || "توضیحاتی برای این پزشک ثبت نشده است."
          });
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات پزشک:", error);
      } finally {
        setLoading(false);
      }
    }

    getDoctorDetails();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 text-center text-sm font-bold text-gray-400" dir="rtl">
        در حال بارگذاری اطلاعات پزشک...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 text-center text-sm font-bold text-red-500" dir="rtl">
        پزشک مورد نظر یافت نشد.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100" dir="rtl">
       
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6">
        
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="text-[22px] sm:text-[26px] font-black text-gray-900">{doctor.name}</h1>
            <p className="text-gray-500 font-bold text-[15px]">{doctor.specialty}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">{toPersianNumber(doctor.rating)}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-gray-400 text-sm">({toPersianNumber(doctor.reviews)} نظر)</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-xl border border-gray-100">
            <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={18} height={18} />
            <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی: {doctor.nizamCode}</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={20} height={20} className="mt-1 shrink-0" />
              <p className="text-[14px] text-gray-700 leading-6 font-medium">
                آدرس مطب: {doctor.address}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/icons/alarm-clock.svg" alt="نوبت" width={20} height={20} className="shrink-0" />
              <p className="text-[14px] text-gray-700 font-medium">
                اولین نوبت در دسترس: <span className="font-black text-gray-900">{doctor.nextSlot}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full sm:w-[160px] h-[160px] shrink-0">
          <Image
            src={doctor.image} 
            alt={doctor.name}
            fill
            className="rounded-[22px] object-cover border-4 border-gray-50 shadow-sm"
          />
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-50 relative">
        <h3 className="text-[18px] font-black text-gray-900 mb-4">درباره {doctor.name}</h3>
        
        <div className="relative">
          <p 
            className={`text-gray-600 text-[14px] leading-8 text-justify font-medium transition-all duration-300 ${
              isExpanded ? 'max-h-[1000px]' : 'max-h-[96px] overflow-hidden line-clamp-3'
            }`}
          >
            {doctor.bio}
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