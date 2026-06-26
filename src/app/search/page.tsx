"use client";
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Star, 
  ChevronDown, 
  ChevronUp,
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  X,
  Phone,
  Mail,
  Send,
} from 'lucide-react';


interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  address: string;
  nextSlot: string;
  image: string;
  nizamCode: string;
}

export default function SearchPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openSection, setOpenSection] = useState({
    specialty: true,
    insurance: true,
    experience: true,
    status: true,
    city: true,
    gender: true
  });

  const toggleSection = (section: keyof typeof openSection) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const [sortBy, setSortBy] = useState<'default' | 'popular' | 'nearest'>('default');

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "دکتر زهرا وارسته",
      specialty: "متخصص قلب و عروق",
      rating: "۴.۸",
      reviews: "۱۰۵",
      address: "تهران، ستارخان، خیابان هفتم، پلاک ۴۰",
      nextSlot: "دوشنبه ۲۴ دی",
      image: "/images/doctor-1.jpg",
      nizamCode: "۴۰۲۲۳"
    },
    {
      id: 2,
      name: "دکتر علی راد",
      specialty: "متخصص ریه",
      rating: "۴.۸",
      reviews: "۱۰۵",
      address: "تهران، هفت تیر، خیابان بهار شیراز، پلاک ۳۶",
      nextSlot: "دوشنبه ۲۴ دی",
      image: "/images/doctor-2.jpg",
      nizamCode: "۵۹۳۰۲"
    },
    {
      id: 3,
      name: "دکتر بهنوش حسینی",
      specialty: "جراح گوش، حلق و بینی",
      rating: "۴.۸",
      reviews: "۱۰۵",
      address: "تهران، پیروزی، خیابان کوکاکولا، کوچه احمدی، ساختمان پزشکان شفا",
      nextSlot: "دوشنبه ۲۴ دی",
      image: "/images/doctor-3.jpg",
      nizamCode: "۹۰۳۵۶"
    },
    {
      id: 4,
      name: "دکتر یاشار پناهی",
      specialty: "متخصص روانشناسی بالینی",
      rating: "۴.۸",
      reviews: "۱۰۵",
      address: "تهران، ونک، خیابان ملاصدرا، کوچه صائب تبریزی غربی",
      nextSlot: "دوشنبه ۲۴ دی",
      image: "/images/doctor-4.jpg",
      nizamCode: "۹۴۰۲۳"
    },
    {
      id: 5,
      name: "دکتر زهرا سعادتی",
      specialty: "متخصص گوش و حلق و بینی",
      rating: "۴.۸",
      reviews: "۱۰۵",
      address: "تهران، ستارخان، خیابان هفتم، پلاک ۴۰",
      nextSlot: "دوشنبه ۲۴ دی",
      image: "/images/doctor-5.jpg",
      nizamCode: "۴۰۲۲۳"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-right font-sans" dir="rtl">
      
      {/* Header Implementation */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg">
                <PlusIcon className="w-5 h-5" />
              </span>
              <span>دکتر رزرو</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
              <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">لیست پزشکان</a>
              <a href="#" className="hover:text-blue-600 transition">سوالات متداول</a>
              <a href="#" className="hover:text-blue-600 transition">درباره ما</a>
              <a href="#" className="hover:text-blue-600 transition">تماس با ما</a>
            </nav>
          </div>

          <button className="text-sm font-semibold text-blue-600 border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-50 transition">
            ورود / ثبت نام
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <div 
        className="relative bg-cover bg-center py-20 px-6 text-center text-white" 
        style={{ backgroundImage: `linear-gradient(rgba(15, 32, 67, 0.65), rgba(15, 32, 67, 0.65)), url('/images/search-bg.jpg')` }}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-xl md:text-3xl font-extrabold leading-relaxed">
            فقط یک جستجو با بهترین پزشکان فاصله دارید
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            در کمتر از ۱ دقیقه نوبت خود را رزرو کنید
          </p>

          <div className="mt-8 flex items-center bg-white rounded-2xl p-2 shadow-lg max-w-xl mx-auto">
            <span className="p-3 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..." 
              className="w-full py-2 bg-transparent text-gray-800 text-sm focus:outline-none placeholder:text-gray-400 text-right pr-1"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="md:hidden flex items-center justify-between bg-white border border-gray-100 p-3 rounded-2xl mb-4 shadow-sm">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2.5 rounded-xl w-[48%] justify-center border border-gray-100"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            فیلترها
          </button>
          
          <button 
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2.5 rounded-xl w-[48%] justify-center border border-gray-100"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            مرتب‌سازی
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-1 bg-white border border-gray-200/80 rounded-2xl p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="font-bold text-gray-800 text-base">فیلترها</span>
              <button className="text-xs text-red-500 hover:text-red-600 transition font-medium">
                حذف همه فیلترها ×
              </button>
            </div>
            
            {/* Filter sections omitted for brevity in summary, see source code for full logic */}
            {/* [Filter UI logic goes here] */}
          </aside>

          <section className="lg:col-span-3 space-y-5">
            <div className="hidden md:flex items-center justify-between bg-white border border-gray-200/80 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-500">مرتب سازی بر اساس:</span>
                <div className="flex gap-2">
                  <button onClick={() => setSortBy('default')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${sortBy === 'default' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>پیش فرض</button>
                  <button onClick={() => setSortBy('popular')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${sortBy === 'popular' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>محبوب‌ترین</button>
                  <button onClick={() => setSortBy('nearest')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${sortBy === 'nearest' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>نزدیک‌ترین نوبت آزاد</button>
                </div>
              </div>
              <span className="text-xs text-gray-400">۵ پزشک یافت شد</span>
            </div>

            <div className="space-y-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer & Modals Omitted for Brevity in this documentation preview */}
    </div>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5 items-start md:items-center relative">
      <div className="hidden md:flex items-center gap-1 absolute top-5 left-5 text-[11px] text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-lg">
        <Check className="w-3.5 h-3.5 text-emerald-500" />
        <span>کد نظام پزشکی: {doctor.nizamCode}</span>
      </div>

      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 mx-auto md:mx-0">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-grow space-y-2 text-right w-full">
        <div>
          <h2 className="text-base font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-xs font-semibold text-gray-400 mt-1">{doctor.specialty}</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({doctor.reviews} نظر)</span>
        </div>

        <div className="flex items-start gap-1.5 text-xs text-gray-500 pt-1">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">آدرس مطب: {doctor.address}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>اولین نوبت در دسترس: <span className="font-bold text-gray-800">{doctor.nextSlot}</span></span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[150px] pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-50 transition text-xs">
          رزرو نوبت ←
        </button>
        <button className="w-full py-2.5 bg-white hover:bg-gray-50 text-gray-600 font-semibold border border-gray-200 rounded-xl transition text-xs">
          مشاهده پروفایل
        </button>
      </div>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
