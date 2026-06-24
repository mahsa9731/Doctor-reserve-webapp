import DoctorCalender from "@/Components/doctors/DoctorCalender";
import DoctorProfile from "@/Components/doctors/DoctorProfile";
import DoctorSocials from "@/Components/doctors/DoctorSocials";
import DoctorReviews from "@/Components/doctors/DoctorReviews";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DoctorDetailPage({ params }: PageProps) {
  const doctorId = params.id;
    return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20" dir="rtl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col gap-0.5 mb-8">
  <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
    <a href="/" className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" title="بازگشت به صفحه اصلی">
      <Image 
        src="/icons/arrow-right-title.png" 
        alt="لوگو" 
        width={26} 
        height={26} 
        className="object-contain"
      />
    </a>
    <span>صفحه پزشک</span>
  </h1>
</div>
  
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 order-1 space-y-6">
            <DoctorProfile />
            <DoctorSocials />
          </div>

          <div className="lg:col-span-4 order-2 lg:sticky lg:top-10">
             <DoctorCalender doctorId={doctorId} />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-8">
             <DoctorReviews />
          </div>
        </div>

      </div>
    </main>
  );
}