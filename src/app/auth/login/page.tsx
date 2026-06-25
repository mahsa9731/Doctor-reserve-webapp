'use client';
//فقعخغعفغفغفالذتلنذدلتنذدتنذدنلذ

import { useState } from 'react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!/^09\d{9}$/.test(phoneNumber)) {
      setError('لطفاً یک شماره موبایل معتبر وارد کنید.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      if (res.ok) {
        alert('کد تایید با موفقیت ارسال شد!');
      } else {
        const data = await res.json();
        setError(data.message || 'خطایی رخ داد.');
      }
    } catch (err) {
      setError('ارتباط با سرور برقرار نشد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* پوشش تمام‌صفحه با سنتر عمودی (items-center) و هدایت خودکار باکس به وسط افقی با mx-auto */
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white flex items-center font-sans antialiased select-none p-4 overflow-auto" dir="rtl">
      
      {/* اضافه شدن mx-auto برای وسط‌چین شدن قطعی و بی قید و شرط در محور افقی */}
      <div className="w-full max-w-[730px] h-[640px] flex flex-row rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 bg-white mx-auto flex-shrink-0" dir="rtl">
        
        {/* ─── سمت راست: فرم عملکردی ورود ─── */}
        <div className="w-1/2 h-full bg-white flex flex-col items-center justify-center px-10 box-border">
          <div className="w-full max-w-[280px] text-center flex flex-col items-center justify-center">
            
            {/* لوگوی پلاس برند */}
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100/60 shadow-sm p-2.5 mb-5">
              <img
                src="/brand/Logo.png" 
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-[18px] font-black text-gray-900 mb-1.5">به دکتر رزرو خوش آمدید</h2>
            <p className="text-[12px] text-gray-400 mb-6 leading-5">
              برای ادامه شماره موبایل خود را وارد نمایید.
            </p>

            {error && (
              <div className="w-full mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-[11px] font-bold text-right border border-red-100">
                {error}
              </div>
            )}

            {/* فرم اصلی شماره موبایل */}
            <form onSubmit={handleSendOtp} className="w-full space-y-4 text-right">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 mr-1">شماره موبایل</label>
                <input
                  type="text"
                  maxLength={11}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="مثال: 0933456789"
                  disabled={loading}
                  className="w-full px-4 h-11 rounded-xl border border-gray-200 bg-gray-50/50 text-left font-mono tracking-wider focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-300 placeholder:font-sans placeholder:tracking-normal text-gray-700 text-[13px]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[13px] transition-all shadow-md shadow-blue-100 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? 'در حال ارسال...' : 'دریافت کد تایید'}
              </button>
            </form>

          </div>
        </div>

        {/* ─── سمت چپ: بخش گرافیکی پزشکان (۳ کپسول و تصویر گوشی پزشکی) ─── */}
        <div className="w-1/2 h-full bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden box-border border-r border-gray-50">
          
          {/* تصویر پس‌زمینه گوشی پزشکی */}
          <img 
            src="/images/Stethoscope.svg" 
            alt="Stethoscope" 
            className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[85%] h-[75%] object-contain opacity-70 pointer-events-none z-0"
          />
          
          {/* کپسول‌های سه تایی پزشکان در مرکز */}
          <div className="flex flex-row gap-3.5 items-center justify-center mx-auto z-10 relative px-4" dir="ltr">
            
            {/* پزشک راست (فریم ۳) - مایل به بالا */}
            <div className="w-[82px] h-[220px] rounded-[40px] overflow-hidden transform -translate-y-6 flex-shrink-0 bg-transparent">
              <img 
                src="/images/frame3.png" 
                alt="Doctor Right" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* پزشک وسط (فریم ۲) - اصلی و کشیده‌تر */}
            <div className="w-[100px] h-[270px] rounded-[50px] overflow-hidden flex-shrink-0 bg-transparent">
              <img 
                src="/images/frame2.png" 
                alt="Doctor Center" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* پزشک چپ (فریم ۱) - مایل به پایین */}
            <div className="w-[82px] h-[220px] rounded-[40px] overflow-hidden transform translate-y-6 flex-shrink-0 bg-transparent">
              <img 
                src="/images/frame1.png" 
                alt="Doctor Left" 
                className="w-full h-full object-cover" 
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}