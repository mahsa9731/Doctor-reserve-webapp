<<<<<<< HEAD
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between px-4">
        
        <Link href="/" className="flex items-center">
          <Image 
            src="/brand/logo rezerve.png" 
            alt="دکتر رزرو" 
            width={140} 
            height={40} 
            priority 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-zinc-600">
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">لیست پزشکان</Link>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">سوالات متداول</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">تماس با ما</Link>
        </nav>

        <div>
          <Link 
            href="/auth" 
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-all"
          >
            ورود / ثبت نام
          </Link>
        </div>

      </div>
    </header>
  );
=======
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50" dir="rtl">
      <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between px-4 relative z-20 bg-white">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="/brand/logo rezerve.png" 
            alt="دکتر رزرو" 
            width={120} 
            height={34} 
            priority 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-zinc-600">
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">لیست پزشکان</Link>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">سوالات متداول</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">تماس با ما</Link>
        </nav>

        <div className="flex items-center gap-4">
          
          <Link 
            href="/auth" 
            className="border border-blue-600 text-blue-600 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-all shadow-sm shrink-0"
          >
            ورود / ثبت نام
          </Link>

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
>>>>>>> 6fbdd70fccd2399bda1d2c8e420c341b8c47eb07
}