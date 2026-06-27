'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // کنترل منوی کشویی کاربر
  const [user, setUser] = useState<{ firstName: string; lastName: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // بررسی وضعیت لاگین کاربر هنگام لود شدن کامپوننت
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/user/profile', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          // اگر نام و فامیل هنوز پر نشده بود، به صورت پیش‌فرض مقادیر زیر را نشان دهد
          setUser({
            firstName: data.firstName || 'کاربر',
            lastName: data.lastName || 'عزیز',
            avatar: data.avatar || '/avatars/uploadpic.png', // تصویر پیش‌فرض از مسیر public/avatars
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('خطا در بررسی وضعیت سشن کاربر:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // عملیات خروج از حساب کاربری
  const handleLogout = async () => {
    try {
      // پاک کردن کوکی توکن
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
      
      setUser(null);
      setIsUserMenuOpen(false);
      router.refresh();
      router.push('/');
    }
      
    } catch (err) {
      console.error('خطا در خروج از حساب:', err);
    }
  };

  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50" dir="rtl">
      <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between px-4 relative z-20 bg-white">
        
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="/brand/logo rezerve.png" 
            alt="دکتر رزرو" 
            width={120} 
            height={34} 
            priority 
          />
        </Link>

        {/* منوی ناوبری دسکتاپ */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-zinc-600">
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">لیست پزشکان</Link>
          <Link href="/FAQ" className="hover:text-blue-600 transition-colors">سوالات متداول</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">تماس با ما</Link>
        </nav>

        {/* بخش دکمه ورود یا آواتار کاربر */}
        <div className="flex items-center gap-4">
          
          {loading ? (
            // لودینگ کامپوننت تا وضعیت دیتابیس مشخص شود
            <div className="w-24 h-9 bg-zinc-100 rounded-xl animate-pulse hidden sm:block"></div>
          ) : user ? (
            /* ================= بخش کاربر وارد شده (آواتار و نام) ================= */
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 pl-2 pr-1.5 py-1.5 hover:bg-zinc-50 rounded-xl transition-all border border-transparent hover:border-zinc-100 select-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-100 bg-zinc-50 shrink-0">
                  <img 
                    src={user.avatar} 
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[13px] font-bold text-zinc-800 hidden sm:inline-block">
                  {user.firstName} {user.lastName}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                  <div className="absolute left-0 mt-2 w-52 bg-white border border-zinc-100 rounded-xl shadow-xl py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                    
                    <Link 
                      href="/profile" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex w-full px-4 py-2.5 text-[13px] font-bold text-zinc-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      پروفایل کاربری
                    </Link>

                    <Link 
                      href="/profile/appointments" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex w-full px-4 py-2.5 text-[13px] font-bold text-zinc-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-t border-zinc-50/50"
                    >
                      نوبت‌های رزرو شده
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="flex w-full px-4 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all border-t border-zinc-50 mt-1"
                    >
                     خروج از حساب
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            
            <Link 
              href="/auth/login" 
              className="border border-blue-600 text-blue-600 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-all shadow-sm shrink-0"
            >
              ورود / ثبت نام
            </Link>
          )}

          {/* دکمه منوی موبایل */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-zinc-600 p-2.5 w-10 h-10 rounded-xl hover:bg-zinc-100 active:scale-95 transition-all relative z-30 flex items-center justify-center"
            aria-label="منو"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute right-0 top-1 w-full h-0.5 bg-zinc-700 rounded transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`} />
              
              <span className={`absolute right-0 top-3 w-full h-0.5 bg-zinc-700 rounded transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`} />
              
              <span className={`absolute right-0 bottom-1 w-full h-0.5 bg-zinc-700 rounded transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 bottom-3' : 'bottom-1'
              }`} />
            </div>
          </button>
        </div>

      </div>

      {/* منوی کشویی موبایل */}
      <div 
        className={`md:hidden overflow-hidden bg-white border-b border-zinc-100 shadow-xl transition-all duration-300 ease-in-out relative z-10 ${
          isMenuOpen ? 'max-h-[350px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 border-transparent shadow-none'
        }`}
      >
        <div className="px-6 flex flex-col">
          <nav className="flex flex-col text-base font-semibold text-zinc-700">
            <Link 
              href="/doctors" 
              onClick={() => setIsMenuOpen(false)} 
              className="py-4 border-b border-zinc-50 hover:text-blue-600 active:bg-zinc-50 transition-colors"
            >
              لیست پزشکان
            </Link>
            <Link 
              href="/faq" 
              onClick={() => setIsMenuOpen(false)} 
              className="py-4 border-b border-zinc-50 hover:text-blue-600 active:bg-zinc-50 transition-colors"
            >
              سوالات متداول
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)} 
              className="py-4 border-b border-zinc-50 hover:text-blue-600 active:bg-zinc-50 transition-colors"
            >
              درباره ما
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)} 
              className="py-4 border-b border-zinc-50 hover:text-blue-600 active:bg-zinc-50 transition-colors"
            >
              تماس با ما
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}