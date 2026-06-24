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
}