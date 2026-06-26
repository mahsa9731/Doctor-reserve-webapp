"use client";
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Star, 
  ChevronDown, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  X,
  Plus
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
  // States برای مدیریت فیلترها
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'default' | 'popular' | 'nearest'>('default');
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState({
    hasSlot: false,
    online: false,
    inPerson: false,
  });

  const toggleExperience = (value: string) => {
    if (experience.includes(value)) {
      setExperience(experience.filter((x) => x !== value));
    } else {
      setExperience([...experience, value]);
    }
  };

  const doctors: Doctor[] = [
    { id: 1, name: "دکتر زهرا وارسته", specialty: "متخصص قلب و عروق", rating: "۴.۸", reviews: "۱۰۵", address: "تهران، ستارخان، پلاک ۴۰", nextSlot: "دوشنبه ۲۴ دی", image: "/images/doctor-1.jpg", nizamCode: "۴۰۲۲۳" },
    { id: 2, name: "دکتر علی راد", specialty: "متخصص ریه", rating: "۴.۸", reviews: "۱۰۵", address: "تهران، هفت تیر، پلاک ۳۶", nextSlot: "دوشنبه ۲۴ دی", image: "/images/doctor-2.jpg", nizamCode: "۵۹۳۰۲" },
    { id: 3, name: "دکتر بهنوش حسینی", specialty: "جراح گوش، حلق و بینی", rating: "۴.۸", reviews: "۱۰۵", address: "تهران، پیروزی، ساختمان پزشکان شفا", nextSlot: "دوشنبه ۲۴ دی", image: "/images/doctor-3.jpg", nizamCode: "۹۰۳۵۶" },
    { id: 4, name: "دکتر یاشار پناهی", specialty: "متخصص روانشناسی بالینی", rating: "۴.۸", reviews: "۱۰۵", address: "تهران، ونک، کوچه صائب تبریزی", nextSlot: "دوشنبه ۲۴ دی", image: "/images/doctor-4.jpg", nizamCode: "۹۴۰۲۳" },
    { id: 5, name: "دکتر زهرا سعادتی", specialty: "متخصص گوش و حلق و بینی", rating: "۴.۸", reviews: "۱۰۵", address: "تهران، ستارخان، پلاک ۴۰", nextSlot: "دوشنبه ۲۴ دی", image: "/images/doctor-5.jpg", nizamCode: "۴۰۲۲۳" }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-right" dir="rtl">
      
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters - جدید */}
          <aside className="hidden lg:block bg-white border border-gray-200 rounded-3xl p-6 space-y-6 h-fit sticky top-24 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                <h3 className="font-bold text-gray-800">فیلترها</h3>
                <button className="text-xs text-red-500 hover:underline">حذف همه</button>
            </div>

            {/* جستجو درون فیلتر */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">جستجوی نام پزشک</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثلا: دکتر حسینی"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pr-10 pl-4 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* تخصص */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">تخصص</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-2.5 px-3 border border-gray-100 bg-gray-50 rounded-xl text-sm outline-none cursor-pointer"
              >
                <option value="">همه تخصص‌ها</option>
                <option value="heart">قلب و عروق</option>
                <option value="internal">داخلی</option>
              </select>
            </div>

            {/* وضعیت نوبت دهی */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500">وضعیت نوبت‌دهی</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={status.hasSlot} onChange={(e) => setStatus({ ...status, hasSlot: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                <span>دارای نوبت خالی</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={status.online} onChange={(e) => setStatus({ ...status, online: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                <span>ویزیت آنلاین</span>
              </label>
            </div>

            {/* تجربه کاری */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">تجربه کاری</label>
              <div className="flex flex-wrap gap-2">
                {["5+", "10+", "15+"].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition border ${experience.includes(exp) ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"}`}
                  >
                    {exp.replace('+', '')} سال به بالا
                  </button>
                ))}
              </div>
            </div>

            {/* جنسیت */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">جنسیت پزشک</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="radio" name="gender" value="female" onChange={() => setGender("female")} className="w-4 h-4 text-blue-600" />
                  <span>خانم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="radio" name="gender" value="male" onChange={() => setGender("male")} className="w-4 h-4 text-blue-600" />
                  <span>آقا</span>
                </label>
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 text-sm">
              اعمال فیلترها
            </button>
          </aside>

          {/* Result Section */}
          <section className="lg:col-span-3 space-y-5">
            {/* Sort Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 p-4 rounded-3xl shadow-sm gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-gray-400">مرتب سازی:</span>
                <div className="flex gap-2">
                  <button onClick={() => setSortBy('default')} className={`px-4 py-2 text-xs font-bold rounded-xl transition ${sortBy === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>پیش فرض</button>
                  <button onClick={() => setSortBy('popular')} className={`px-4 py-2 text-xs font-bold rounded-xl transition ${sortBy === 'popular' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>محبوب‌ترین</button>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">۵ پزشک در این منطقه یافت شد</span>
            </div>

            {/* Doctors List */}
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// کامپوننت کارت پزشک
function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-6 items-center relative group">
      <div className="absolute top-5 left-6 text-[10px] text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
        کد نظام پزشکی: {doctor.nizamCode}
      </div>

      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-inner">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-grow space-y-3 text-right w-full">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-sm font-medium text-blue-500 mt-0.5">{doctor.specialty}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({doctor.reviews} نظر)</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span>{doctor.address}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50/50 w-fit px-3 py-1.5 rounded-lg">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>اولین نوبت: <span className="font-bold text-blue-700">{doctor.nextSlot}</span></span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-44 pt-4 md:pt-0 border-t md:border-t-0 md:border-r border-gray-100 md:pr-6">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition text-xs">
          رزرو نوبت نهایی
        </button>
        <button className="w-full py-3 bg-white hover:bg-gray-50 text-gray-600 font-bold border border-gray-200 rounded-2xl transition text-xs">
          مشاهده پروفایل
        </button>
      </div>
    </div>
  );
}
