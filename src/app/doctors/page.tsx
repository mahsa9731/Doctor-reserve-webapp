"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Star,
  ChevronDown,
  Filter,
} from "lucide-react";

// تعریف ساختار داده پزشک
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  address: string;
  nextSlot: string;
  image: string;
}
// Sample data for doctors - replace with your actual data fetching logic
const doctors = [
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

export default function DoctorListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  
  // وضعیت‌های فیلتر
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* عنوان صفحه */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">لیست پزشکان متخصص</h1>

        {/* گرید اصلی: ۳ ستون برای سایدبار فیلترها (راست) و ۹ ستون برای کارت‌ها (چپ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= سایدبار فیلترها (سمت راست) ================= */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit space-y-6">
            
            {/* ۱. باکس جستجوی پزشک */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                جستجو پزشک
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="نام پزشک یا تخصص..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ۲. فیلتر تخصص */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                تخصص
              </label>
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="">همه تخصص‌ها</option>
                  <option value="heart">قلب و عروق</option>
                  <option value="internal">داخلی</option>
                  <option value="pediatrics">اطفال</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* ۳. فیلتر بیمه */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                بیمه طرف قرارداد
              </label>
              <div className="relative">
                <select
                  value={selectedInsurance}
                  onChange={(e) => setSelectedInsurance(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="">همه بیمه‌ها</option>
                  <option value="tamin">تامین اجتماعی</option>
                  <option value="salamat">بیمه سلامت</option>
                  <option value="iran">بیمه ایران</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* ۴. فیلتر تجربه کاری */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                تجربه کاری
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleExperience("5+")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    experience.includes("5+")
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  ۵ سال به بالا
                </button>
                <button
                  onClick={() => toggleExperience("10+")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    experience.includes("10+")
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  ۱۰ سال به بالا
                </button>
              </div>
            </div>

            {/* ۵. وضعیت نوبت‌دهی (چک‌باکس‌ها) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                وضعیت نوبت‌دهی
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={status.hasSlot}
                    onChange={(e) => setStatus({ ...status, hasSlot: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>پزشکان دارای نوبت خالی</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={status.online}
                    onChange={(e) => setStatus({ ...status, online: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>امکان ویزیت آنلاین</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={status.inPerson}
                    onChange={(e) => setStatus({ ...status, inPerson: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>امکان رزرو حضوری</span>
                </label>
              </div>
            </div>

            {/* ۶. موقعیت مکانی */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                موقعیت مکانی
              </label>
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="">انتخاب استان</option>
                  <option value="tehran">تهران</option>
                  <option value="azarbaijan">آذربایجان غربی</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="">انتخاب شهر</option>
                  <option value="tehran-c">تهران</option>
                  <option value="urmia">ارومیه</option>
                  <option value="khoy">خوی</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* ۷. جنسیت پزشک */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                جنسیت پزشک
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>خانم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span>آقا</span>
                </label>
              </div>
            </div>

            {/* دکمه اعمال فیلتر */}
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition duration-200 text-sm">
              اعمال فیلترها
            </button>
          </aside>

          {/* ================= بخش لیست پزشکان (سمت چپ) ================= */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* نوار مرتب‌سازی */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">مرتب‌سازی بر اساس:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortOrder("default")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      sortOrder === "default"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    پیش‌فرض
                  </button>
                  <button
                    onClick={() => setSortOrder("popular")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      sortOrder === "popular"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    محبوب‌ترین
                  </button>
                  <button
                    onClick={() => setSortOrder("nearest")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      sortOrder === "nearest"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    نزدیک‌ترین نوبت آزاد
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-400">۲ پزشک یافت شد</span>
            </div>

            {/* لیست کارت‌ها */}
            <div className="space-y-4">
             {doctors.map((doctor) => (

                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

// کامپوننت کارت پزشک
function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5 items-start md:items-center">
      
      {/* عکس پزشک */}
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 mx-auto md:mx-0">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* اطلاعات پزشک */}
      <div className="flex-grow space-y-1.5 text-right w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
          
          {/* امتیاز */}
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
            <span className="text-[10px] text-gray-400">({doctor.reviews} نظر)</span>
          </div>
        </div>

        <p className="text-sm font-semibold text-blue-600">{doctor.specialty}</p>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{doctor.address}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2">
          <Calendar className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="font-semibold">{doctor.nextSlot}</span>
        </div>
      </div>

      {/* دکمه‌های عملیاتی سمت چپ */}
      <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[160px] justify-center">
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition text-sm">
          رزرو نوبت
        </button>
        <button className="w-full py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-200 rounded-xl transition text-sm">
          مشاهده پروفایل
        </button>
      </div>

    </div>
  );
}