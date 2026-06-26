import React from 'react';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50/50 border-t border-slate-100 mt-20 pt-16 pb-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* لینک‌های سریع */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">لینک‌های سریع</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-600">صفحه اصلی</a></li>
              <li><a href="#" className="hover:text-blue-600">لیست پزشکان</a></li>
              <li><a href="#" className="hover:text-blue-600">سوالات متداول</a></li>
              <li><a href="#" className="hover:text-blue-600">درباره ما</a></li>
              <li><a href="#" className="hover:text-blue-600">تماس با ما</a></li>
            </ul>
          </div>

          {/* اطلاعات حقوقی */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">اطلاعات حقوقی</h4>
            <p className="text-slate-500 text-sm mb-4">تمامی حقوق محفوظ است.</p>
            <p className="text-slate-400 text-xs">سال تأسیس یا بروزرسانی: 2025</p>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">اطلاعات تماس</h4>
            <div className="space-y-6 text-slate-500 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-slate-400 mt-1" />
                <div>
                  <p dir="ltr">۰۹۱۲ ۳۴۵ ۶۷۸۹</p>
                  <p dir="ltr">۰۹۱۲ ۳۴۵ ۶۷۹۰</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-slate-400 mt-1" />
                <div>
                  <p dir="ltr">۰۲۱-۷۷ ۴۲۵۸۶۷</p>
                  <p dir="ltr">۰۲۱-۷۷ ۴۲۵۸۶۸</p>
                </div>
              </div>
            </div>
          </div>

          {/* خبرنامه */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 text-center">مشترک شوید</h4>
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="آدرس ایمیل" 
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button className="absolute left-1 top-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed text-center">
              اپلیکیشن رزرو نوبت برای گرفتن نوبت سریع و غیرحضوری از بهترین دکترهای متخصص با دکتر رزرو.
            </p>
          </div>
        </div>

        {/* کپی رایت و شبکه‌های اجتماعی */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <div className="text-white font-bold text-lg">+</div>
            </div>
            <span className="font-bold text-xl text-blue-900">دکتر <span className="text-blue-600">رزرو</span></span>
          </div>
          
          <div className="flex gap-6 text-slate-600">
           <Send size={22} className="cursor-pointer hover:text-blue-400" />
            <MessageCircle size={22} className="cursor-pointer hover:text-green-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
