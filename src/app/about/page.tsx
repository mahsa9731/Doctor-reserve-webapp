'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Clock, CheckCircle2, Smartphone, MessageSquare, Mail, MapPin, PhoneCall, UserCheck, CalendarRange 
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
    <div className="min-h-screen bg-white font-[vazirmatn] text-right antialiased selection:bg-blue-500 selection:text-white" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 border-b border-zinc-50">
        <div className="flex-1 space-y-6">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block">به دکتـر رزرو خوش‌آمدید</span>
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900 leading-snug">درباره دکتر رزرو</h1>
          <h2 className="text-lg md:text-xl font-bold text-zinc-500">نوبت‌دهی سریع، هوشمند و بی‌دغدغه برای پزشکان و بیماران</h2>
          <p className="text-zinc-600 leading-8 text-justify text-sm md:text-base">
            دکتر رزرو یک پلتفرم مدرن و کاربرپسند برای مدیریت نوبت‌دهی پزشکان و بیماران است. ما با ارائه یک سیستم هوشمند، به پزشکان کمک می‌کنیم تا زمان‌های خود را بهتر مدیریت کنند و به بیماران این امکان را می‌دهیم که بدون اتلاف وقت و در تمام طول شبانه‌روز، نوبت خود را به‌صورت آنلاین از بهترین متخصصین رزرو کنند.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="relative w-full max-w-[550px] aspect-[5/4]">
            <Image 
              src="/images/hero-image.png" 
              alt="Doctor Reserve" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Why Doctor Rezerv Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-b from-white to-zinc-50/50 rounded-3xl my-6">
        <div className="mb-12 text-right space-y-2">
          <h2 className="text-2xl font-black text-zinc-900">چرا دکتر رزرو؟</h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* کارت ۱ - دکمه دسترسی ۲۴ ساعته */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-blue-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-800 mb-1.5 text-[15px]">دسترسی ۲۴ ساعته به پزشکان</h3>
              <p className="text-zinc-500 text-xs leading-6">در هر ساعت از شبانه‌روز می‌توانید نوبت پزشک مورد نظر خود را ثبت و نهایی کنید.</p>
            </div>
          </div>

          {/* کارت ۲ - مجرب‌ترین پزشکان */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-blue-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-800 mb-1.5 text-[15px]">اطمینان از انتخاب بهترین متخصصان</h3>
              <p className="text-zinc-500 text-xs leading-6">پزشکان را بر اساس سیستم نظرسنجی پیشرفته و تجربه‌ی واقعی سایر بیماران بسنجید.</p>
            </div>
          </div>

          {/* کارت ۳ - مدیریت و تغییر نوبت‌ها */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-blue-500/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform shrink-0">
              <CalendarRange className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-800 mb-1.5 text-[15px]">مدیریت و تغییر آسان نوبت‌ها</h3>
              <p className="text-zinc-500 text-xs leading-6">امکان لغو، جابجایی زمان یا پیگیری آنی نوبت‌های رزرو شده بدون نیاز به تماس تلفنی.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Info Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-12 text-right space-y-2">
          <h2 className="text-2xl font-black text-zinc-900">اطلاعات تماس و پشتیبانی</h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* کارت اول: مشاوره */}
          <div className="border border-zinc-100 rounded-2xl p-8 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-zinc-700 font-bold space-y-2 text-left" dir="ltr">
              <p className="hover:text-blue-600 transition-colors cursor-pointer">0912 345 6789</p>
              <p className="hover:text-blue-600 transition-colors cursor-pointer">0912 345 6790</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-zinc-800 font-black text-sm">جهت مشاوره تلفنی</span>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* کارت دوم: انتقادات و شکایات */}
          <div className="border border-zinc-100 rounded-2xl p-8 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-zinc-700 font-bold space-y-2 text-left" dir="ltr">
              <p className="hover:text-red-500 transition-colors cursor-pointer">021-77 425867</p>
              <p className="hover:text-red-500 transition-colors cursor-pointer">021-77 425868</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-zinc-800 font-black text-sm">پیگیری شکایات و انتقادات</span>
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shadow-sm">
                <PhoneCall className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Technology Section */}
      <section className="container mx-auto px-6 py-20 border-t border-zinc-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[16/10] bg-zinc-100 rounded-2xl overflow-hidden shadow-inner border border-zinc-100/60">
            <Image 
              src="/images/technology-image.png" 
              alt="Technology in Doctor Reserve" 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-zinc-900">تکنولوژی در خدمت سلامت</h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-zinc-600 text-sm leading-8 text-justify">
              ما با استفاده از فناوری‌های نوین، فرایند نوبت‌دهی پزشکی را به سطحی مدرن و کارآمد ارتقا داده‌ایم. دکتر رزرو با بهره‌گیری از الگوریتم‌های هوشمند تخصیص زمان، سیستم یادآوری خودکار پیامکی و رمزنگاری داده‌های ایمن بیمار، بستری مطمئن برای دریافت بی‌دغدغه‌ی خدمات سلامت فراهم کرده است.
            </p>
            <p className="text-zinc-600 text-sm leading-8 text-justify">
              طراحی کاربرپسند و دسترسی یکپارچه به فیلترهای تخصصی، باعث شده تا بیماران بدون پیچیدگی‌های اداری قدیمی، در کوتاه‌ترین زمان نوبت ایده‌آل خود را رزرو کنند. هدف ما کاهش صف‌های انتظار و ایجاد تجربه‌ای روان برای جامعه پزشکی کشور است.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Stats Section */}
      <section className="bg-zinc-900 text-white py-14 my-10 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.reverse().map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <div className="text-2xl md:text-3xl font-black text-blue-400 group-hover:scale-105 transition-transform inline-block">{stat.value}</div>
                <div className="text-xs text-zinc-400 font-medium block">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl font-black text-zinc-900">تیم توسعه و دیزاین پلتفرم</h2>
          <p className="text-sm text-zinc-400 font-medium">خالقان و طراحان تجربه کاربری بر اساس استانداردهای بین‌المللی</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-zinc-100 p-3 shadow-[0_4px_25px_rgba(0,0,0,0.005)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:border-zinc-200/80 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-zinc-50 border border-zinc-100">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                />
              </div>
              <h3 className="font-bold text-zinc-800 text-center text-[14px] truncate">{member.name}</h3>
              <p className="text-[11px] text-blue-600 font-semibold text-center mt-1.5 uppercase tracking-wider bg-blue-50/60 px-2 py-0.5 rounded-md inline-block mx-auto w-max block">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-100 py-12 text-zinc-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-zinc-900 text-sm mb-4 border-r-2 border-blue-600 pr-2">دکتر رزرو</h3>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">درباره ما</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">تماس با ما</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">فرصت‌های شغلی</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">سوالات متداول</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm mb-4 border-r-2 border-blue-600 pr-2">خدمات</h3>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">نوبت‌دهی پزشکی</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">مشاوره آنلاین</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">ثبت کلینیک</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">پیگیری نوبت</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm mb-4 border-r-2 border-blue-600 pr-2">منابع</h3>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-500">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">بلاگ آموزشی</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">راهنمای بیماران</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">قوانین و مقررات</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">حریم خصوصی</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm mb-4 border-r-2 border-blue-600 pr-2">شبکه‌های اجتماعی</h3>
              <p className="text-xs text-zinc-400 font-medium leading-5">آخرین اخبار سلامت و ویژگی‌های جدید پلتفرم را در کانال‌های ارتباطی ما دنبال کنید.</p>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-zinc-200/60 text-center text-xs text-zinc-400 font-medium">
            <p>© تمام حقوق مادی و معنوی این پلتفرم برای دکتر رزرو محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}