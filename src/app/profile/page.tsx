'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // کنترل نمایش مدال موفقیت

  // وضعیت تصویر آواتار
  const [avatar, setAvatar] = useState('/avatars/default.png'); // تصویر پیش‌فرض
  const fileInputRef = useRef<HTMLInputElement>(null); // برای دسترسی به اینپوت فایل

  // وضعیت اطلاعات کاربر
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    birthYear: '',
    gender: 'خانم',
    city: '',
    email: '',
    phoneNumber: '',
  });

  // ۱. واکشی اطلاعات واقعی کاربر از دیتابیس هنگام لود صفحه
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            nationalCode: data.nationalCode || '',
            birthYear: data.birthYear || '',
            gender: data.gender || 'خانم',
            city: data.city || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
          });
          // اگر تصویر آواتار در دیتابیس بود، آن را ست کن
          if (data.avatar) {
            setAvatar(data.avatar);
          }
        } else {
          setError('خطا در دریافت اطلاعات کاربری از سرور.');
        }
      } catch (err) {
        console.error('خطا در دریافت اطلاعات پروفایل', err);
        setError('مشکل در ارتباط با سرور.');
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  // ۲. ارسال اطلاعات ویرایش شده به دیتابیس منگودی‌بی
  const handleUpdateProfile = async () => {
    setError('');

    // ولیدیشن فیلدهای اجباری
    if (!formData.firstName.trim()) {
      setError('وارد کردن «نام» الزامی است.');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('وارد کردن «نام خانوادگی» الزامی است.');
      return;
    }

    setSaveLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, avatar }), // تصویر آواتار را هم بفرست
      });

      const data = await res.json();

      if (res.ok) {
        setIsEditing(false);
        setShowSuccessModal(true); // به جای alert، مدال زیبا را نشان بده
      } else {
        setError(data.message || 'خطا در ذخیره‌سازی اطلاعات.');
      }
    } catch (err) {
      setError('خطا در ذخیره‌سازی اطلاعات. لطفا مجددا تلاش کنید.');
    } finally {
      setSaveLoading(false);
    }
  };

  // ۳. هندل کردن انتخاب فایل تصویر
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // ولیدیشن نوع فایل (فقط تصویر)
      if (!file.type.startsWith('image/')) {
        setError('لطفاً یک فایل تصویر انتخاب کنید.');
        return;
      }
      // ولیدیشن حجم فایل (مثلاً حداکثر ۲ مگابایت)
      if (file.size > 2 * 1024 * 1024) {
        setError('حجم تصویر نباید بیشتر از ۲ مگابایت باشد.');
        return;
      }

      // آپلود فایل به سرور
      const reader = new FileReader();
      reader.onloadend = async () => {
        // تبدیل تصویر به فرمت Base64 برای ارسال به سرور
        const base64Image = reader.result as string;

        try {
          const res = await fetch('/api/user/profile', {
            method: 'PUT', // یا POST، بسته به API طراحی شده
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, avatar: base64Image }),
          });

          if (res.ok) {
            setAvatar(base64Image); // تصویر را در کامپوننت ست کن
            setShowSuccessModal(true); // نشان دادن موفقیت
          } else {
            const data = await res.json();
            setError(data.message || 'خطا در آپلود تصویر.');
          }
        } catch (err) {
          setError('خطا در ارتباط با سرور.');
        }
      };
      reader.readAsDataURL(file); // شروع خواندن فایل
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[14px] font-bold text-gray-500 bg-gray-50/50">
        در حال بارگذاری اطلاعات پروفایل...
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white font-sans antialiased relative min-h-screen pb-12"
      dir="rtl"
    >
      {/* بدنه اصلی صفحه پروفایل */}
      <main className="max-w-[1000px] mx-auto mt-12 px-6">
        <h1 className="text-[20px] font-black text-gray-900 mb-8 text-right">
          پروفایل کاربری
        </h1>

        {/* باکس اصلی اطلاعات با ساختار گرید فیگما */}
        <div className="w-full border border-blue-100 rounded-2xl p-8 flex flex-row gap-8 items-start relative bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          {/* بخش راست: فیلدهای اطلاعاتی */}
          <div className="flex-1 grid grid-cols-2 gap-y-8 gap-x-12 text-right">
            {/* نام */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                نام <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.firstName || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* نام خانوادگی */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                نام خانوادگی <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.lastName || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* کد ملی */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                کد ملی:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nationalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, nationalCode: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.nationalCode || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* سال تولد */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                سال تولد:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.birthYear}
                  onChange={(e) =>
                    setFormData({ ...formData, birthYear: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.birthYear || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* جنسیت */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                جنسیت:
              </label>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                >
                  <option value="خانم">خانم</option>
                  <option value="آقا">آقا</option>
                </select>
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.gender || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* شهر */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                شهر:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              ) : (
                <span className="text-[14px] font-bold text-gray-800 block h-11 flex items-center">
                  {formData.city || 'وارد نشده'}
                </span>
              )}
            </div>

            {/* شماره موبایل (غیر قابل ویرایش) */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                شماره موبایل:
              </label>
              <span
                className="text-[14px] font-bold text-gray-600 tracking-wide block h-11 flex items-center"
                dir="ltr"
              >
                {formData.phoneNumber}
              </span>
            </div>

            {/* ایمیل */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5">
                ایمیل:
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-11 border border-gray-200 rounded-xl px-4 text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left"
                  dir="ltr"
                />
              ) : (
                <span className="text-[13px] text-gray-500 block h-11 flex items-center">
                  {formData.email || 'ایمیل خود را وارد کن'}
                </span>
              )}
            </div>

            {/* دکمه‌ها و کادر خطا */}
            <div className="col-span-2 mt-4 flex flex-col gap-3">
              {error && (
                <p className="text-[12px] font-bold text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
                  {error}
                </p>
              )}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={saveLoading}
                      className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-md shadow-blue-100 disabled:bg-blue-400 flex items-center justify-center"
                    >
                      {saveLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setError('');
                      }}
                      className="px-6 h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-[13px] font-bold transition-all"
                    >
                      انصراف
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-md shadow-blue-100"
                  >
                    ویرایش اطلاعات
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* بخش چپ: تصویر آواتار */}
          <div className="w-[180px] flex flex-col items-center gap-4 border-r border-gray-100 pr-8 self-stretch justify-start pt-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-100 p-1 bg-gray-50">
              <img
                src="/avatars/uploadpic.png" 
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* اینپوت مخفی برای آپلود فایل */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} // پنهان کن
            />

            <button
              onClick={() => fileInputRef.current?.click()} // کلیک بر روی اینپوت فایل
              className="w-full h-9 border border-blue-200 hover:bg-blue-50/50 rounded-xl text-[11px] font-bold text-blue-600 flex items-center justify-center gap-1.5 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              آپلود تصویر
            </button>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* لایه تاریک بک‌گراند با افکت بلور */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          ></div>

          {/* بدنه اصلی مدال پاپ‌آپ */}
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-center relative z-10 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            {/* دایره سبز و تیک متحرک */}
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
              <svg
                className="w-8 h-8 text-green-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h3 className="text-[16px] font-black text-gray-900 mb-2">
              ثبت موفقیت‌آمیز اطلاعات
            </h3>
            <p className="text-[13px] font-medium text-gray-500 leading-6 mb-6">
              اطلاعات کاربری شما با موفقیت در دکتر رزرو به‌روزرسانی و
              ذخیره شد.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-md shadow-green-100"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}