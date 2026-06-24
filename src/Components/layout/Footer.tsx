import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100 pt-16 pb-8" dir="rtl">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 justify-items-center md:justify-items-start text-center md:text-right">
          
          
          <div className="flex flex-col gap-4 w-full items-center md:items-start">
            <h3 className="font-bold text-zinc-800 text-base">لینک‌های سریع</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-blue-600">صفحه اصلی</Link></li>
              <li><Link href="/doctors" className="hover:text-blue-600">لیست پزشکان</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">سوالات متداول</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">تماس با ما</Link></li>
            </ul>
          </div>

          
          <div className="flex flex-col gap-4 w-full items-center md:items-start">
            <h3 className="font-bold text-zinc-800 text-base">اطلاعات حقوقی</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              تمامی حقوق محفوظ است.
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              سال تاسیس یا بروزرسانی: ۲۰۲۶
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center w-full">
            <h3 className="font-bold text-zinc-800 text-base">اطلاعات تماس</h3>
            <div className="flex flex-col gap-6 text-sm text-zinc-500 w-full items-center">
              
              <div className="flex flex-col gap-2 items-center">
                <Image src="/icons/smart-phone.png" alt="موبایل" width={20} height={20} />
                <div className="flex flex-col gap-1 tracking-wide font-medium text-[15px] select-text" style={{ direction: 'ltr' }}>
                  <span>۰۹۱۲ ۳۴۵ ۶۷۸۹</span>
                  <span>۰۹۱۲ ۳۴۵ ۶۷۹۰</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <Image src="/icons/phonecall.png" alt="تلفن" width={20} height={20} />
                <div className="flex flex-col gap-1 tracking-wide font-medium text-[15px] select-text" style={{ direction: 'ltr' }}>
                  <span>۰۲۱-۷۷ ۴۲۵۸۶۷</span>
                  <span>۰۲۱-۷۷ ۴۲۵۸۶۸</span>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-zinc-50/60 p-6 rounded-2xl border border-zinc-100 flex flex-col gap-4 w-full max-w-sm md:max-w-none">
            <h3 className="font-bold text-zinc-800 text-right text-base">مشترک شوید</h3>
            
            <div className="flex items-center bg-white border border-zinc-200 rounded-xl overflow-hidden p-1 focus-within:border-blue-500 transition-colors">
              <input 
                type="email" 
                placeholder="آدرس ایمیل" 
                className="w-full px-3 py-2 text-sm text-zinc-700 outline-none bg-transparent text-right"
              />
              <button className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shrink-0">
                <Image 
                   src="/icons/arrow-left.png" 
                   alt="ارسال" 
                   width={18} 
                   height={18} 
                   className="brightness-0 invert" 
                />
              </button>
            </div>
            
            <p className="text-[11px] text-zinc-400 text-right leading-relaxed">
              اپلیکیشن رزرو نوبت برای گرفتن نوبت سریع و غیرحضوری و بهترین دکترهای متخصص با دکتر رزرو.
            </p>
          </div>

        </div>
        
        <div className="border-t border-zinc-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:border-blue-600 transition-all opacity-70 hover:opacity-100">
              <Image src="/icons/linkedin-01.png" alt="لینکدین" width={18} height={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:border-blue-600 transition-all opacity-70 hover:opacity-100">
              <Image src="/icons/telegram.png" alt="تلگرام" width={18} height={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:border-blue-600 transition-all opacity-70 hover:opacity-100">
              <Image src="/icons/instagram.png" alt="اینستاگرام" width={18} height={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:border-blue-600 transition-all opacity-70 hover:opacity-100">
              <Image src="/icons/whatsapp.png" alt="واتس‌اپ" width={18} height={18} />
            </a>
          </div>

          <div className="opacity-80">
            <Image src="/brand/logo rezerve.png" alt="دکتر رزرو" width={110} height={32} />
          </div>
        </div>

      </div>
    </footer>
  );
}