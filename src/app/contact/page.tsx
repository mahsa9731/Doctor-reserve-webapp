'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100/60 shadow-sm mb-2 animate-in fade-in duration-300">
            <MessageSquare className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-black text-gray-900">تماس با پشتیبانی دکتر رزرو</h1>
          <p className="text-[13px] sm:text-[14px] text-gray-400 font-medium leading-6">
            سوال، پیشنهاد یا مشکلی دارید؟ تیم پشتیبانی ما در تمام روزهای هفته آماده پاسخگویی و راهنمایی شما پزشکان و مراجعین گرامی است.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4 w-full">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:border-gray-200">
              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="space-y-1 text-right">
                <h4 className="text-[14px] font-black text-gray-900">شماره‌های تماس</h4>
                <p className="text-[13px] text-gray-600 font-bold font-mono text-left" dir="ltr">۰۲۱ - ۴۴۵۵۶۶۷۷</p>
                <p className="text-[13px] text-gray-600 font-bold font-mono text-left" dir="ltr">۰۹۱۲ - ۳۴۵۶۷۸۹</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:border-gray-200">
              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="space-y-1 text-right">
                <h4 className="text-[14px] font-black text-gray-900">پشتیبانی ایمیلی</h4>
                <p className="text-[13px] text-gray-600 font-bold font-mono">support@doctorreserve.ir</p>
                <p className="text-[11px] text-gray-400 font-medium">پاسخگویی حداکثر ظرف ۲۴ ساعت کاری</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:border-gray-200">
              <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="space-y-1 text-right">
                <h4 className="text-[14px] font-black text-gray-900">ساعات پاسخگویی</h4>
                <p className="text-[13px] text-gray-600 font-bold">شنبه تا پنجشنبه: از ساعت ۸:۰۰ الی ۲۰:۰۰</p>
                <p className="text-[13px] text-gray-600 font-bold">روزهای تعطیل: از ساعت ۱۰:۰۰ الی ۱۶:۰۰</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:border-gray-200">
              <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="space-y-1 text-right-1 w-full">
                <h4 className="text-[14px] font-black text-gray-900">دفتر مرکزی</h4>
                <p className="text-[13px] text-gray-600 font-bold leading-6">
                  تهران، میدان ونک، خیابان خدامی، پلاک ۴۲، واحد ۵
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm w-full">
            <h3 className="text-[18px] font-black text-gray-900 border-b border-gray-50 pb-4 mb-6 text-right">
              ارسال پیام مستقیم
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1.5 mr-1">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: علی محمدی"
                    className="w-full px-4 h-11 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 text-[13px] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1.5 mr-1">نشانی ایمیل (اختیاری)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full px-4 h-11 rounded-xl border border-gray-200 bg-gray-50/50 text-left font-mono focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 text-[13px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 mr-1">موضوع پیام</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع درخواست خود را وارد کنید"
                  className="w-full px-4 h-11 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 text-[13px] font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 mr-1">متن پیام شما</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="توضیحات خود را به طور کامل در این بخش بنویسید..."
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 text-[13px] font-bold leading-6 resize-none"
                />
              </div>

             
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl font-black text-[14px] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>{isSubmitting ? "در حال ارسال پیام..." : "ارسال پیام"}</span>
              </button>

            </form>
          </div>

        </div>
      </div>

      
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowSuccessModal(false)}></div>
          
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-zinc-100 relative z-10 scale-in animate-in duration-200 zoom-in-95 text-center space-y-4">
            
            <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-zinc-900">پیام شما با موفقیت دریافت شد</h4>
              <p className="text-[13px] text-zinc-500 leading-6">
                کارشناسان بخش پشتیبانی دکتر رزرو درخواست شما را بررسی کرده و در اولین فرصت با شما ارتباط برقرار خواهند کرد. از شکیبایی شما سپاسگزاریم.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-emerald-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-100"
              >
                متوجه شدم
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}