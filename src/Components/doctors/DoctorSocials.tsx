"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';

interface DoctorSocialsProps {
  doctorId: string;
}

export default function DoctorSocials({ doctorId }: DoctorSocialsProps) {
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSocials() {
      if (!doctorId) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/doctors/${doctorId}`);
        const data = await res.json();

        if (data) {
          const contact = data.contactInfo || {};

          setSocials([
            { 
              id: 1, 
              title: "وب‌سایت رسمی",
              label: contact.website || "ثبت نشده", 
              iconPath: "/icons/chrome.svg", 
              color: "bg-blue-50/70 border-blue-100",
              animation: "group-hover:animate-bounce" 
            },
            { 
              id: 2, 
              title: "شماره تماس مطب",
              label: contact.officePhone || "ثبت نشده", 
              iconPath: "/icons/telephone.svg", 
              color: "bg-green-50/70 border-green-100", 
              animation: "group-hover:animate-bounce"
            },
            { 
              id: 3, 
              title: "صفحه اینستاگرام",
              label: contact.instagram || "ثبت نشده", 
              iconPath: "/icons/instagram.svg", 
              color: "bg-pink-50/70 border-pink-100",
              animation: "group-hover:animate-bounce" 
            },
          ]);
        }
      } catch (error) {
        console.error("خطا در دریافت راه‌های ارتباطی پزشک:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSocials();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 text-center text-xs text-gray-400 font-bold" dir="rtl">
        در حال بارگذاری راه‌های ارتباطی...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100" dir="rtl">
      
      <div className="mb-6">
        <h3 className="text-lg font-black text-gray-900">راه‌های ارتباطی</h3>
        <p className="text-xs text-gray-400 font-medium mt-1">شما می‌توانید از راه‌های زیر با پزشک در ارتباط باشید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {socials.map((item) => (
          <div 
            key={item.id} 
            className="bg-gray-50/50 p-4 rounded-[20px] border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md hover:bg-white hover:border-gray-200 transition-all duration-300 cursor-pointer group"
          >
            
          
            <div className={`${item.color} border p-2.5 rounded-xl w-11 h-11 flex items-center justify-center shrink-0 transition-transform duration-300 ${item.animation}`}>
              <Image 
                src={item.iconPath} 
                alt={item.title} 
                width={20} 
                height={20} 
                className="object-contain"
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-400 font-bold mb-0.5">{item.title}</span>
              <span className="text-[13px] font-black text-gray-700 truncate" dir="ltr">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}