import DoctorCard from '@/Components/doctors/DoctorCard';
import HealthTestBanner from '@/Components/doctors/HealthTestBanner';
import FAQ from '@/Components/Faq';
import ReviewCard from '@/Components/ReviewCard';
import ArticleCard from '@/Components/ArticleCard';
import Link from 'next/link';
import { Clock, Calendar , CheckCircle2} from 'lucide-react';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            سلامت شما،رسالت ما 
          </h1>
          <p className="text-gray-600 text-lg">
            بهترین پزشکان را در دسترس شما.
            <br />
            نوبت دهی آنلاین مطمئن فقط با چند کلیک.
          </p>

          <Link href="/search">
         <button className="bg-blue-100/70 text-blue-600 border border-blue-100/50 px-10 py-3.5 rounded-xl font-black text-[14px] transition-all hover:bg-blue-100/60 hover:text-blue-700 active:scale-[0.98] shadow-sm shadow-blue-50/40">
            رزرو نوبت
         </button> 
          </Link>
           <Link href="/contact">
          <button className="bg-blue-100/70 text-blue-600 border border-blue-100/50 px-10 py-3.5 rounded-xl font-black text-[14px] transition-all hover:bg-blue-100/60 hover:text-blue-700 active:scale-[0.98] shadow-sm shadow-blue-50/40">
            پشتیبانی
          </button>
        </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="/images/hospital-profession-people.png" alt="Hero" className="w-full rounded-2xl" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">
        <Clock className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">دسترسی ۲۴ ساعته به پزشکان</h3>
        <p className="text-slate-500 text-sm">در هر زمانی می‌توانید نوبت خود را رزرو کنید</p>
      </div>
    </div>

    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">
        <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">اطمینان از انتخاب مجرب‌ترین پزشکان</h3>
        <p className="text-slate-500 text-sm">بهترین پزشکان را با توجه به نظرات کاربران انتخاب کنید</p>
      </div>
    </div>

    <div className="border border-slate-200 rounded-xl p-6 flex items-start gap-4">
      <div className="text-2xl">
        <Calendar className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 mb-1">مدیریت و تغییر نوبت‌ها به راحتی</h3>
        <p className="text-slate-500 text-sm">توانایی لغو، تغییر و مدیریت نوبت‌ها به راحتی</p>
      </div>
    </div>

  </div>
</section>

      {/* Search Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden rounded-2xl mt-6">
 
  <div className="absolute inset-0 z-0">
    <img 
      src="/images/search-bar.png" 
      alt="Doctor Background" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40"></div> 
  </div>

  <div className="relative z-10 w-full max-w-3xl px-4 text-center text-white">
    <h2 className="text-xl md:text-3xl font-bold mb-2 drop-shadow-md">
      فقط یک جستجو با بهترین پزشکان فاصله دارید
    </h2>
    <p className="text-sm md:text-lg mb-8 opacity-90">
      در کمتر از ۱ دقیقه نوبت خود را رزرو کنید
    </p>

    <div className="relative w-full max-w-2xl mx-auto group">
      <input
        type="text"
        placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..."
        className="w-full py-4 px-6 pr-12 rounded-full bg-white/95 text-gray-800 text-right shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
      />
      
     
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
  </div>
</section>

{/* Popular Doctors Section */}
<section className="container mx-auto px-4 py-10">
  <h2 className="text-2xl font-bold mb-8 text-right">جدیدترین پزشک‌ها</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <DoctorCard 
      name="دکتر ماهان گروسی" 
      specialty="فوق تخصص دندانپزشکی" 
      rating={4.8} 
      reviewsCount="۲۹۰" 
      location="تهران"
      image="/images/doctor-1.jpg" 
    />
    <DoctorCard 
      name="دکتر زهرا سعادتی" 
      specialty="متخصص گوش و حلق و بینی" 
      rating={4.6} 
      reviewsCount="۱۷۰" 
      location="تهران"
      image="/images/doctor-2.jpg" 
    />
    <DoctorCard 
      name="دکتر یاشار پناهی" 
      specialty="متخصص روانشناس بالینی" 
      rating={4.9} 
      reviewsCount="۳۵۰" 
      location="تهران"
      image="/images/doctor-3.jpg" 
    />
    <DoctorCard 
      name="دکتر لعیا رنگنه" 
      specialty="متخصص قلب و عروق" 
      rating={4.5} 
      reviewsCount="۲۱۰" 
      location="تهران"
      image="/images/doctor-4.jpg" 
    />
  </div>
</section>


  {/* test*/}
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-row items-center overflow-hidden my-8 w-full max-w-4xl mx-auto">
  <div className="w-1/3 h-40">
    <img 
      src="/images/medical-papers.png" 
      alt="Health Test" 
      className="w-full h-full object-cover"
    />
  </div>
  
  <div className="w-2/3 p-6 text-right">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      همین حالا رایگان تست سلامت بگیرید!
    </h2>
    <p className="text-gray-500 text-sm mb-4">
      در کمتر از دو دقیقه سلامت خود را ارزیابی کنید
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all">
      شروع تست سلامت
    </button>
  </div>
</div>

<section className="container mx-auto px-4 py-10">
  <h2 className="text-2xl font-bold mb-8 text-right">جدیدترین پزشک‌ها</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <DoctorCard 
      name="دکتر ماهان گروسی" 
      specialty="فوق تخصص دندانپزشکی" 
      rating={4.8} 
      reviewsCount="۲۹۰"
      location="تهران"
      image="/images/doctor-1.jpg" 
    />
    <DoctorCard 
      name="دکتر زهرا سعادتی" 
      specialty="متخصص گوش و حلق و بینی" 
      rating={4.6} 
      reviewsCount="۱۷۰"
      location="تهران"
      image="/images/doctor-2.jpg" 
    />
  
  </div>
</section>

<section className="container mx-auto px-4 py-10">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold">نظرات کاربران</h2>
    <a href="#" className="text-gray-500 text-sm">مشاهده همه</a>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ReviewCard 
      userName="حسن احمدی"
      date="۱۴۰۲/۱۲/۱۰"
      comment="دکتر عالی هستند و تشخیصشون درست بود و زود خوب شدم."
      doctorName="دکتر علی وارسته"
      rating={5}
      avatar="/images/p1.png"
    />
    <ReviewCard 
      userName="میترا"
      date="۱۴۰۲/۱۲/۱۰"
      comment="دکتر عالی هستند و تشخیصشون درست در اولین معاینه بیماری با تشخیص دادند و با تجویز یک نسخه درمان کردند..."
      doctorName="دکتر محمود محمودی"
      rating={5}
      avatar="/images/p2.png"
    />
    <ReviewCard 
      userName="رها مرادی"
      date="۱۴۰۲/۱۲/۱۰"
      comment="سلام دکتر بسیار خون گرم و مهربون بود."
      doctorName="دکتر زهرا وارسته"
      rating={5}
      avatar="/images/p3.png"
    />
  </div>
</section>

    <div className="bg-zinc-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">     
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
             <span className="text-[400px] font-bold text-zinc-900">؟</span>
          </div>

          <div className="divide-y divide-zinc-100 relative z-10">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  
<section className="container mx-auto px-4 py-16">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold">آخرین مقالات</h2>
    <a href="#" className="text-gray-500 text-sm">مشاهده همه</a>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ArticleCard 
     image="/images/article-1.png"
      title="۱۰ نشانه هشدار دهنده مشکلات قلبی"
      excerpt="اگر این ۱۰ نشانه را دارید حتما به پزشک مراجعه کنید..."
      date="۱۴۰۳/۰۳/۱۵"
    />
    <ArticleCard 
      image="/images/article-2.png"
      title="۵ گام ساده برای پیشگیری از دیابت"
      excerpt="دیابت نوع ۲ با تغییر سبک زندگی قابل پیشگیری است..."
      date="۱۴۰۳/۰۳/۱۰"
    />
    <ArticleCard 
    image="/images/article-3.png"
      title="چگونه بهترین دکتر را برای نیازهای خود پیدا کنیم؟"
      excerpt="در این مقاله بهترین روش‌های جستجوی پزشک متخصص را بررسی می‌کنیم..."
      date="۱۴۰۳/۰۳/۰۵"
    />
  </div>
</section>


 
      

    </div>
  );
}
