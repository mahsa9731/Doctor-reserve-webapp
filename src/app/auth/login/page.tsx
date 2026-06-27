'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'otp'>('login'); // مدیریت مراحل لاگین
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // مدیریت کادرهای ۵ رقمی کد تایید مطابق طرح فیگما
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  // تایمر معکوس (۱:۳۵ زمان فیگما = ۹۵ ثانیه)
  const [timeLeft, setTimeLeft] = useState(300);

  // افکت برای مدیریت زمان تایمر OTP
  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, step]);

  // فرمت زمان به MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPhoneNumber = (phone: string) => {
  if (phone.length === 11) {
    // استفاده از کاراکترهای کنترل جهت (RLO) برای تثبیت نمایش صحیح شماره موبایل در متن فارسی
    return `\u202B${phone.substring(0, 4)}***${phone.substring(7)}\u20AC`;
  }
  return phone;
};
  // هندلر ارسال پیامک (مرحله اول)
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
        setTimeLeft(300); 
        setStep('otp'); 
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

  // جابجایی خودکار بین کادرهای ورودی کد تایید
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // فوکوس روی کادر بعدی در صورت پر شدن (چون چپ به راست است، به ایندکس بعدی می‌رود)
    if (value !== '' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // برگشت به کادر قبلی در صورت زدن پاک‌کن
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // هندلر تایید نهایی کد (مرحله دوم)
  const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  const fullOtp = otp.join(''); // چسباندن آرایه ۵ رقمی به یک رشته واحد

  if (fullOtp.length < 5) {
    setError('لطفاً کد تایید ۵ رقمی را کامل وارد کنید.');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp: fullOtp }), // ارسال شماره و کد به بک‌اند
    });

    const data = await res.json();

    if (res.ok) {
      router.refresh();
      // ذخیره توکن در لوکال استوریج (علاوه بر کلوکی که بک‌اند ست کرده) برای دسترسی‌های احتمالی فرانت
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      setTimeout(() => {
    router.push('/profile');
  }, 100); 
    } else {
      setError(data.message || 'کد تایید اشتباه است.');
    }
  } catch (err) {
    setError('خطا در ارتباط با سرور. لطفا مجددا تلاش کنید.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white flex items-center font-sans antialiased select-none p-4 overflow-auto" dir="rtl">
      
      <div className="w-full max-w-[730px] h-[640px] flex flex-row rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 bg-white mx-auto flex-shrink-0" dir="rtl">
        
        {/* ستون سمت راست: بخش فرم‌ها (پویا بر اساس Step) */}
        <div className="w-1/2 h-full bg-white flex flex-col items-center justify-center px-10 box-border">
          <div className="w-full max-w-[280px] text-center flex flex-col items-center justify-center">
            
            {/* لوگو یا آیکون مثبت بر اساس طرح فیگما */}
            {step === 'login' ? (
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100/60 shadow-sm p-2.5 mb-5">
                <img src="/brand/Logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              // آیکون پلاس دقیقاً مطابق تصویر فیگما برای بخش OTP
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100/60 shadow-sm mb-5 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            )}

            <h2 className="text-[18px] font-black text-gray-900 mb-1.5">به دکتر رزرو خوش آمدید</h2>
            
            <p className="text-[12px] text-gray-400 mb-6 leading-5">
  {step === 'login' ? (
    'برای ادامه شماره موبایل خود را وارد نمایید.'
  ) : (
    <span className="flex items-center justify-center gap-1 flex-wrap" dir="rtl">
      <span>کد ارسال شده به شماره</span>
      <span className="font-semibold text-gray-700 tracking-wide inline-block" dir="rtl">
        {formatPhoneNumber(phoneNumber)}
      </span>
      <span>را وارد کنید</span>
    </span>
  )}
</p>

            {error && (
              <div className="w-full mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-[11px] font-bold text-right border border-red-100">
                {error}
              </div>
            )}

            {/* مرحله اول: فرم دریافت شماره موبایل */}
            {step === 'login' && (
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
            )}

            {/* مرحله دوم: فرم ۵ رقمی تایید کدهای OTP مطابق فیگما */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center">
                
                {/* باکس ۵ ورودی با جهت چپ به راست */}
                <div className="flex gap-2 mb-4 justify-center" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => { if (el) inputRefs.current[index] = el; }}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      disabled={loading}
                      className="h-11 w-11 rounded-xl border border-gray-200 text-center font-mono text-[16px] font-bold text-gray-800 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* بخش تایمر معکوس طرح فیگما */}
                <div className="text-center mb-5">
                  <div className="text-[13px] font-mono font-bold text-gray-700">{formatTime(timeLeft)}</div>
                  {timeLeft > 0 ? (
                    <span className="text-[11px] text-gray-400 font-medium">تا دریافت مجدد کد</span>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleSendOtp} 
                      className="text-[11px] text-blue-600 font-bold hover:underline"
                    >
                      ارسال مجدد کد تایید
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[13px] transition-all shadow-md shadow-blue-100 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? 'در حال بررسی...' : 'ورود'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="mt-3 text-[11px] text-gray-400 font-bold hover:text-gray-600 transition-all"
                >
                  ویرایش شماره موبایل
                </button>
              </form>
            )}

          </div>
        </div>

        <div className="w-1/2 h-full bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden box-border border-r border-gray-50">
          <img 
            src="/images/Stethoscope.svg" 
            alt="Stethoscope" 
            className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[85%] h-[75%] object-contain opacity-70 pointer-events-none z-0"
          />
          
          <div className="flex flex-row gap-3.5 items-center justify-center mx-auto z-10 relative px-4" dir="ltr">
            <div className="w-[82px] h-[220px] rounded-[40px] overflow-hidden transform -translate-y-6 flex-shrink-0 bg-transparent">
              <img src="/images/frame1.png" alt="Doctor Right" className="w-full h-full object-cover" />
            </div>
            <div className="w-[100px] h-[270px] rounded-[50px] overflow-hidden flex-shrink-0 bg-transparent">
              <img src="/images/frame2.png" alt="Doctor Center" className="w-full h-full object-cover" />
            </div>
            <div className="w-[82px] h-[220px] rounded-[40px] overflow-hidden transform translate-y-6 flex-shrink-0 bg-transparent">
              <img src="/images/frame3.png" alt="Doctor Left" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}