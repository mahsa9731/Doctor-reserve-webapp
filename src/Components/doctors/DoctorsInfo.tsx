import Image from 'next/image';
import { Star } from 'lucide-react'; 

interface DoctorInfoCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  medicalCode: string;
  address: string;
  imageUrl: string;
  selectedDate?: string; 
  selectedTime?: string; 
}

export default function DoctorInfoCard({
  name,
  specialty,
  rating,
  reviewsCount,
  medicalCode,
  address,
  imageUrl,
}: DoctorInfoCardProps) {
  
  const toPersianNumber = (num: number | string) => {
    return num.toLocaleString('fa-IR');
  };
  
  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm transition-all hover:shadow-md" dir="rtl">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6">
        
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className="text-[20px] sm:text-[24px] font-black text-gray-900">{name}</h2>
            <p className="text-gray-400 font-bold text-[14px]">{specialty}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">{toPersianNumber(rating)}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-400 text-xs font-bold">({toPersianNumber(reviewsCount)} نظر)</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-xl border border-gray-100">
            <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={16} height={16} />
            <span className="text-[12px] text-gray-600 font-black">کد نظام پزشکی: {medicalCode}</span>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-50">
            <div className="flex items-start gap-3">
              <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={18} height={18} className="mt-0.5 shrink-0" />
              <p className="text-[13px] text-gray-600 leading-6 font-bold">
                آدرس مطب: {address}
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full sm:w-[140px] h-[140px] shrink-0 mx-auto sm:mx-0">
          <Image
            src={imageUrl || "/images/DoctorPicture.png"} 
            alt={name}
            fill
            className="rounded-[20px] object-cover border-2 border-gray-50 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}