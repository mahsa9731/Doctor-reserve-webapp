import DoctorCard from '@/Components/doctors/DoctorCard';
import HealthTestBanner from '@/Components/doctors/HealthTestBanner';
import FAQ from '@/Components/Faq';
import ReviewCard from '@/Components/ReviewCard';
import ArticleCard from '@/Components/ArticleCard';
import Link from 'next/link';
import { Clock, Calendar , CheckCircle2} from 'lucide-react';

interface DoctorHomeData {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  location: string;
  image: string;
}

export default async function HomePage() {
 
  let doctorsList: any[] = [];
  let newDoctorsList: any[] = [];

  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/doctors`, {
      cache: 'no-store' 
    });
    const data = await res.json();

    if (data && Array.isArray(data)) {
      
      doctorsList = data.map((doc: any) => ({
        id: doc._id,
        name: doc.name,
        specialty: doc.specialty,
        rating: doc.rating ? Number(doc.rating) : 4.8,
        reviewsCount: doc.reviewsCount || doc.reviews || 105,
        image: doc.image || doc.avatar || "/images/default-doctor.png"
      }));

      
      newDoctorsList = [...doctorsList].reverse();
    }
  } catch (error) {
    console.error("خطا در دریافت اطلاعات پزشکان از API:", error);
  }
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
      <Link href="/search" className="block w-full cursor-pointer">
     <input
    type="text"
    readOnly 
    tabIndex={-1} 
    placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..."
    className="w-full py-4 px-6 pr-12 rounded-full bg-white/95 text-gray-800 text-right shadow-lg focus:outline-none transition-all placeholder:text-gray-400 cursor-pointer pointer-events-none" 
      />
    </Link>
      
     
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </div>
  </div>
</section>

{/* Specialties Section */}
<section className="container mx-auto px-4 py-12" dir="rtl">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-xl md:text-2xl font-black text-gray-950">لیست تخصص‌ها</h2>
    <Link href="#" className="text-gray-400 hover:text-gray-600 transition-all text-sm font-bold flex items-center gap-1">
      <span>مشاهده همه</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </Link>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
    {[
      { id: 1, name: 'قلب و عروق', icon: '/images/heartS.png', bgColor: 'bg-red-50' },
      { id: 2, name: 'ارتوپد', icon: '/images/orthopedics.png', bgColor: 'bg-blue-50' },
      { id: 3, name: 'مغز و اعصاب', icon: '/images/brain.png', bgColor: 'bg-pink-50' },
      { id: 4, name: 'دستگاه تنفسی', icon: '/images/pulmonology.png', bgColor: 'bg-purple-50' },
      { id: 5, name: 'چشم پزشکی', icon: '/images/eye-test.png', bgColor: 'bg-cyan-50' },
      { id: 6, name: 'اطفال', icon: '/images/pediatrics.png', bgColor: 'bg-orange-50' },
      { id: 7, name: 'گوش، حلق، بینی', icon: '/images/specialties.png', bgColor: 'bg-emerald-50' },
    ].map((spec) => (
      <Link 
        href={`/search?specialty=${spec.name}`} 
        key={spec.id}
        className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:shadow-gray-100/70 group active:scale-[0.98] cursor-pointer min-h-[160px]"
      >
        <div className={`w-16 h-16 rounded-[18px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 p-3.5 ${spec.bgColor}`}>
          <img 
            src={spec.icon} 
            alt={spec.name} 
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-base font-bold text-gray-900 transition-colors">
          {spec.name}
        </h3>
      </Link>
    ))}
  </div>
</section>

{/* Popular Doctors Section */}
<div className="w-full max-w-6xl mx-auto py-8 px-4 text-center space-y-8" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctorsList.slice(0, 4).map((doctor) => (
          <DoctorCard 
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            specialty={doctor.specialty}
            rating={doctor.rating}
            reviewsCount={doctor.reviewsCount}
            image={doctor.image}
          />
        ))}
      </div>

      <div className="pt-2">
        <Link href="/doctors">
          <button className="px-8 py-3 bg-white text-blue-600 border border-blue-100 rounded-xl font-black text-[13px] shadow-sm shadow-blue-50/50 hover:bg-blue-50/50 hover:border-blue-200 active:scale-[0.98] transition-all cursor-pointer">
            مشاهده بیشتر پزشکان
          </button>
        </Link>
      </div>

    </div>

  {/* test*/}
  <div className="bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col sm:flex-row-reverse items-center overflow-hidden my-12 w-full max-w-5xl mx-auto min-h-[200px] transition-all hover:shadow-lg">
    <div className="w-full sm:w-1/3 h-48 sm:h-full min-h-[180px]">
      <img 
        src="/images/medical-papers.png" 
        alt="Health Test" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="w-full sm:w-2/3 p-6 sm:p-8 text-right flex flex-col justify-center items-start space-y-3" dir="rtl">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
        همین حالا رایگان تست سلامت بگیرید!
      </h2>
      <p className="text-gray-500 text-sm font-semibold opacity-90">
        در کمتر از دو دقیقه سلامت خود را ارزیابی کنید
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-[13px] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-sm shadow-blue-600/20 cursor-pointer">
        شروع تست سلامت
      </button>
    </div>
  </div>

<section className="container mx-auto px-4 py-10">
  <h2 className="text-2xl font-bold mb-8 text-right">جدیدترین پزشک‌ها</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {newDoctorsList.slice(0, 4).map((doctor) => (
      <DoctorCard 
        key={doctor.id}
        id={doctor.id}
        name={doctor.name}
        specialty={doctor.specialty}
        rating={doctor.rating}
        reviewsCount={doctor.reviewsCount}
        image={doctor.image}
      />
    ))}
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
      excerpt="دیابت نوع ۲ با تغییر سبک lifestyle قابل پیشگیری است..."
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