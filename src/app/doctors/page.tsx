"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Star, 
  ChevronDown, 
} from 'lucide-react';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: string;
  address: string;
  nextSlot: string;
  image: string;
  nizamCode: string;
  gender?: string;
  province?: string;
  city?: string;
}

export default function SearchPage() {
  const router = useRouter();
  
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

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        if (Array.isArray(data)) {
          const mappedDoctors = data.map((doc: any) => ({
            _id: doc._id,
            name: doc.name,
            specialty: doc.specialty,
            rating: doc.rating ? String(doc.rating) : "۵.۰",
            reviews: doc.reviewsCount ? String(doc.reviewsCount) : "۰",
            address: doc.address,
            nextSlot: doc.availableSlots && doc.availableSlots[0] ? doc.availableSlots[0].date : "به زودی",
            image: doc.avatar || "/images/default-avatar.jpg",
            nizamCode: doc.medicalCode || "ثبت نشده",
            gender: doc.gender || (doc.name.includes("زهرا") || doc.name.includes("فرنوش") || doc.name.includes("بهنوش") || doc.name.includes("مریم") ? "female" : "male"),
            province: doc.province || "tehran",
            city: doc.city || "tehran-c"
          }));
          setDoctors(mappedDoctors);
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات پزشکان:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const toggleExperience = (value: string) => {
    if (experience.includes(value)) {
      setExperience(experience.filter((x) => x !== value));
    } else {
      setExperience([...experience, value]);
    }
  };

  
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setSelectedInsurance("");
    setExperience([]);
    setSelectedProvince("");
    setSelectedCity("");
    setGender("");
    setStatus({ hasSlot: false, online: false, inPerson: false });
    setCurrentPage(1);
  };

 
  const filteredDoctors = doctors.filter((doctor) => {
   
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    
    const matchesSpecialty = selectedSpecialty === "" || 
      (selectedSpecialty === "heart" && doctor.specialty.includes("قلب")) ||
      (selectedSpecialty === "internal" && doctor.specialty.includes("داخلی")) ||
      (selectedSpecialty === "pediatrics" && doctor.specialty.includes("اطفال"));

    
    const matchesProvince = selectedProvince === "" || doctor.province === selectedProvince;
    const matchesCity = selectedCity === "" || doctor.city === selectedCity;

   
    const matchesGender = gender === "" || doctor.gender === gender;

   
    const matchesSlot = !status.hasSlot || doctor.nextSlot !== "به زودی";

    return matchesSearch && matchesSpecialty && matchesProvince && matchesCity && matchesGender && matchesSlot;
  });

  // محاسبات مربوط به نمایش پزشکان در صفحه فعلی (صفحه‌بندی)
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-right" dir="rtl">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block bg-white border border-gray-200 rounded-3xl p-6 space-y-6 h-fit sticky top-24 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                <h3 className="font-bold text-gray-800">فیلترها</h3>
                <button onClick={handleResetFilters} className="text-xs text-red-500 hover:underline">حذف همه</button>
            </div>

           
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">جستجوی نام پزشک</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثلا: دکتر حسینی"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full py-2.5 pr-10 pl-4 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

           
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">تخصص</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => { setSelectedSpecialty(e.target.value); setCurrentPage(1); }}
                className="w-full py-2.5 px-3 border border-gray-100 bg-gray-50 rounded-xl text-sm outline-none cursor-pointer text-gray-700"
              >
                <option value="">همه تخصص‌ها</option>
                <option value="heart">قلب و عروق</option>
                <option value="internal">داخلی</option>
                <option value="pediatrics">اطفال</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">بیمه طرف قرارداد</label>
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="w-full py-2.5 px-3 border border-gray-100 bg-gray-50 rounded-xl text-sm outline-none cursor-pointer text-gray-700"
              >
                <option value="">همه بیمه‌ها</option>
                <option value="tamin">تامین اجتماعی</option>
                <option value="salamat">بیمه سلامت</option>
                <option value="iran">بیمه ایران</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500">وضعیت نوبت‌دهی</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={status.hasSlot} onChange={(e) => { setStatus({ ...status, hasSlot: e.target.checked }); setCurrentPage(1); }} className="w-4 h-4 rounded text-blue-600" />
                <span>دارای نوبت خالی</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={status.online} onChange={(e) => setStatus({ ...status, online: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                <span>ویزیت آنلاین</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={status.inPerson} onChange={(e) => setStatus({ ...status, inPerson: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                <span>امکان رزرو حضوری</span>
              </label>
            </div>

           
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

           
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500">موقعیت مکانی</label>
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => { setSelectedProvince(e.target.value); setCurrentPage(1); }}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-100 bg-gray-50 rounded-xl text-sm appearance-none cursor-pointer text-gray-700"
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
                  onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none cursor-pointer bg-white text-gray-700 font-medium transition-all duration-200 hover:border-gray-400"
                >
                  <option value="" className="text-gray-400 font-sans bg-white py-2">انتخاب شهر</option>
                  
                  <option value="tehran-c" className="text-gray-800 font-semibold bg-white py-2 hover:bg-blue-50">تهران</option>
                  <option value="reye" className="text-gray-700 font-medium bg-white py-2">ری</option>
                  <option value="shemiranat" className="text-gray-700 font-medium bg-white py-2">شمیرانات</option>
                  <option value="eslamshahr" className="text-gray-700 font-medium bg-white py-2">اسلامشهر</option>
                  <option value="shahriar" className="text-gray-700 font-medium bg-white py-2">شهریار</option>
                  
                  <option value="urmia" className="text-gray-800 font-semibold bg-white py-2 hover:bg-blue-50">ارومیه</option>
                  <option value="khoy" className="text-gray-700 font-medium bg-white py-2">خوی</option>
                  <option value="mahabad" className="text-gray-700 font-medium bg-white py-2">مهاباد</option>
                  <option value="bukan" className="text-gray-700 font-medium bg-white py-2">بوکان</option>
                  <option value="miandoab" className="text-gray-700 font-medium bg-white py-2">میاندوآب</option>
                  <option value="salmas" className="text-gray-700 font-medium bg-white py-2">سلماس</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">جنسیت پزشک</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => { setGender("female"); setCurrentPage(1); }} className="w-4 h-4 text-blue-600" />
                  <span>خانم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => { setGender("male"); setCurrentPage(1); }} className="w-4 h-4 text-blue-600" />
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
              <span className="text-xs text-gray-400 font-medium">{filteredDoctors.length} پزشک یافت شد</span>
            </div>

            {/* Doctors List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-sm text-gray-400 font-bold">در حال بارگذاری لیست پزشکان...</div>
              ) : currentDoctors.length === 0 ? (
                <div className="text-center py-12 text-sm text-gray-400 font-bold">پزشکی با فیلترهای انتخاب شده یافت نشد.</div>
              ) : (
                currentDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} router={router} />
                ))
              )}
            </div>

           
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-6">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition flex items-center justify-center ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}


function DoctorCard({ doctor, router }: { doctor: Doctor; router: any }) {
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
        <button 
          onClick={() => router.push(`/doctors/${doctor._id}`)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition text-xs"
        >
          رزرو نوبت
        </button>
        <button 
          onClick={() => router.push(`/search/`)}
          className="w-full py-3 bg-white hover:bg-gray-50 text-gray-600 font-bold border border-gray-200 rounded-2xl transition text-xs"
        >
         جستجو پزشکان
        </button>
      </div>
    </div>
  );
}