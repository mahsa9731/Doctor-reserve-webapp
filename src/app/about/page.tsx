import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Clock, CheckCircle2, Smartphone, Send, Phone, MessageSquare, Mail, MapPin 
} from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Mohamad Reza Abiri", role: "UI/UX Designer", image: "/images/team1.jpg" },
    { name: "Mehdi Zarei", role: "UI/UX Designer", image: "/images/team2.jpg" },
    { name: "Zahra Moradian", role: "UI/UX Designer", image: "/images/team3.jpg" },
    { name: "Reza Sherafat", role: "UI/UX Designer", image: "/images/team4.jpg" },
    { name: "Majid Borhani", role: "UI/UX Designer", image: "/images/team5.jpg" },
  ];

  const stats = [
    { label: "کاربر فعال", value: "۱۰۰ هزار+" },
    { label: "متخصص تایید شده", value: "۲ هزار+" },
    { label: "نوبت ثبت شده", value: "۵۰۰ هزار+" },
    { label: "کلینیک فعال", value: "۳ هزار+" },
    { label: "پزشک در سیستم", value: "۵ هزار+" },
  ];

  return (
    <div className="min-h-screen bg-white font-[vazirmatn] text-right" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">درباره دکتر رزرو</h1>
          <h2 className="text-xl font-bold text-slate-600">نوبت‌دهی سریع و هوشمند برای پزشکان و بیماران</h2>
          <p className="text-gray-600 leading-8 text-justify text-sm md:text-base">
         
دکتر رزرو یک پلتفرم مدرن و کاربرپسند برای مدیریت نوبت‌دهی پزشکان و بیماران است. ما با ارائه یک سیستم هوشمند، به پزشکان کمک می‌کنیم تا زمان‌های خود را بهتر مدیریت کنند و به بیماران این امکان را می‌دهیم که بدون اتلاف وقت، نوبت خود را به‌صورت آنلاین رزرو کنند.
          </p>
        </div>
        <div className="flex-1">
          <Image 
            src="/images/hero-image.png" 
            alt="Doctor Reserve" 
            width={845} 
            height={426} 
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* 2. Why Doctor Rezerv Section */}
     
<section className="container mx-auto px-6 py-12">
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-slate-800">چرا دکتر رزرو؟</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">🕒</div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">دسترسی ۲۴ ساعته به پزشکان</h3>
        <p className="text-slate-500 text-sm">در هر زمانی می‌توانید نوبت خود را رزرو کنید</p>
      </div>
    </div>

    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">💬</div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">اطمینان از انتخاب مجرب‌ترین پزشکان</h3>
        <p className="text-slate-500 text-sm">بهترین پزشکان را با توجه به نظرات کاربران انتخاب کنید</p>
      </div>
    </div>

    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">📅</div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">مدیریت و تغییر نوبت‌ها به راحتی</h3>
        <p className="text-slate-500 text-sm">توانایی لغو، تغییر و مدیریت نوبت‌ها به راحتی</p>
      </div>
    </div>

  </div>
</section>


      {/* 3. Contact Info Section */}
<section className="container mx-auto px-6 py-12">

  <div className="flex justify-end mb-8">
    <h2 className="text-2xl font-bold text-slate-800">اطلاعات تماس</h2>
  </div>

  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
  
    <div className="border border-slate-100 rounded-xl p-8 flex justify-between items-center shadow-sm">
      {/* شماره‌ها در سمت چپِ کارت */}
      <div className="text-slate-700 font-medium space-y-1">
        <p dir="ltr">۰۹۱۲ ۳۴۵ ۶۷۸۹</p>
        <p dir="ltr">۰۹۱۲ ۳۴۵ ۶۷۹۰</p>
      </div>

     
      <div className="flex items-center gap-3">
        <span className="text-slate-800 font-bold">جهت مشاوره</span>
        <div className="text-xl text-slate-600">
          
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
        </div>
      </div>
    </div>

    
    <div className="border border-slate-100 rounded-xl p-8 flex justify-between items-center shadow-sm">
      {/* شماره‌ها در سمت چپِ کارت */}
      <div className="text-slate-700 font-medium space-y-1">
        <p dir="ltr">۰۲۱-۷۷ ۴۲۵۸۶۷</p>
        <p dir="ltr">۰۲۱-۷۷ ۴۲۵۸۶۸</p>
      </div>

      
      <div className="flex items-center gap-3">
        <span className="text-slate-800 font-bold">جهت شکایات و انتقادات</span>
        <div className="text-xl text-slate-600">
         
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* 4. Technology Section */}
<section className="container mx-auto px-6 py-16">
 <div className="flex justify-end mb-10"> 
  <h2 className="text-2xl font-bold text-slate-800">تکنولوژی در خدمت سلامت</h2>
</div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    
    
    <div className="relative aspect-video bg-slate-200 rounded-xl overflow-hidden">
      <Image 
        src="/images/technology-image.png" 
        alt="Technology" 
        fill 
        className="object-cover" 
      />
    </div>

    <div className="space-y-4">
      <p className="text-slate-600 text-sm">
        ما با استفاده از فناوری‌های روز، فرایند نوبت‌دهی پزشکی را به سطحی جدید ارتقا داده‌ایم. دکتر رزرو با بهره‌گیری از الگوریتم‌های هوشمند، سیستم یادآوری خودکار و داده‌های ایمن‌شده، بستری مطمئن و سریع برای دریافت خدمات پزشکی فراهم کرده است.
        طراحی کاربرپسند و دسترسی آسان به اطلاعات، باعث شده تا بیماران بدون پیچیدگی‌های اضافی و در کمترین زمان، نوبت موردنظر خود را رزرو کنند. همچنین، پزشکان می‌توانند با مدیریت دقیق‌تر زمان‌های خود، بهره‌وری بیشتری داشته باشند.
        با دکتر رزرو، نوبت‌دهی دیگر یک چالش نیست، بلکه تجربه‌ای راحت، سریع و بدون دغدغه است.
      </p>
    </div>

  </div>
</section>

      {/* 5. Stats Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.reverse().map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-16">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <h3 className="font-bold text-slate-800 text-center">{member.name}</h3>
              <p className="text-xs text-slate-400 text-center mt-1 uppercase tracking-wider">{member.role}</p>
              <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4">دکتر رزرو</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>درباره ما</li>
                <li>تماس با ما</li>
                <li>فرصت‌های شغلی</li>
                <li>سوالات متداول</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">خدمات</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>نوبت‌دهی پزشکی</li>
                <li>مشاوره آنلاین</li>
                <li>ثبت کلینیک</li>
                <li>پیگیری نوبت</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">منابع</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>بلاگ</li>
                <li>راهنما</li>
                <li>قوانین</li>
                <li>حریم خصوصی</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4">شبکه‌های اجتماعی</h3>
              <div className="flex gap-3">
               
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-400">
            <p>© تمام حقوق برای دکتر رزرو محفوظ است - ۲۰۲۴</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
