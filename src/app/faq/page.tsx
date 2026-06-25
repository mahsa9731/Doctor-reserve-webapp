import { ChevronDown } from "lucide-react"; // اگر این کتابخانه را نداری، میتوانی از یک متن ساده یا svg استفاده کنی

export default function FAQPage() 
{
  const faqs = [
    "چگونه می‌توانم نوبت رزرو کنم؟",
    "چگونه می‌توانم پزشک مورد نظرم را پیدا کنم؟",
    "آیا دکتر رزرو اپلیکیشن موبایل هم دارد؟",
    "آیا دکتر رزرو فقط برای شهر خاصی است؟",
    "چگونه می‌توانم نوبت خود را لغو یا جابجا کنم؟",
    "آیا می‌توانم برای شخص دیگری نوبت رزرو کنم؟",
    "چگونه می‌توانم از زمان‌بندی پزشکان مطلع شوم؟",
    "آیا می‌توانم نظرات سایر بیماران را درباره پزشکان بخوانم؟",
    "آیا اطلاعات شخصی و پزشکی من در وب‌سایت شما محفوظ می‌ماند؟",
    "چگونه می‌توانم هزینه ویزیت را پرداخت کنم؟",
    "چگونه می‌توانم از عضویت پزشکان در وب‌سایت شما اطمینان حاصل کنم؟",
    "آیا می‌توانم بدون اینترنت نوبت رزرو کنم؟",
    "چگونه می‌توانم نزدیک‌ترین پزشک به محل سکونت خود را پیدا کنم؟",
    "آیا می‌توانم نسخه‌های الکترونیکی خود را از طریق وب‌سایت دریافت کنم؟",
    "در صورت بروز مشکل در رزرو نوبت، چگونه می‌توانم با پشتیبانی تماس بگیرم؟",
  ];

  return (
    <div className="bg-zinc-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* تیتر صفحه */}
        <h1 className="text-2xl font-bold text-zinc-800 mb-8 text-left md:text-right">
          سوالات متداول
        </h1>

        {/* کانتینر اصلی سوالات */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden relative">
          
          {/* علامت سوال بزرگ پس‌زمینه (واترمارک) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
             <span className="text-[400px] font-bold text-zinc-900">؟</span>
          </div>

          <div className="divide-y divide-zinc-100 relative z-10">
            {faqs.map((question, index) => (
              <details key={index} className="group p-4 md:p-6 transition-all hover:bg-zinc-50">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-zinc-700 font-medium text-sm md:text-base leading-7">
                    {question}
                  </span>
                  <span className="text-zinc-400 group-open:rotate-180 transition-transform duration-300">
                    {/* آیکون فلش */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </summary>
                <div className="mt-4 text-zinc-500 text-sm leading-7 text-justify">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
