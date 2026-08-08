import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface DoctorCardProps {
  id: string; 
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: string | number; 
  image: string;
}

// 👈 ❗ کلید حل مشکل: reviewsCount اینجا اضافه شد
const DoctorCard: React.FC<DoctorCardProps> = ({ 
  id, 
  name, 
  specialty, 
  rating, 
  reviewsCount, 
  image 
}) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex flex-col hover:shadow-md transition-all group" dir="rtl">
      
      <div className="w-full h-48 overflow-hidden rounded-2xl mb-4 relative bg-gray-50">
        <img 
          src={image || "/images/default-doctor.png"} 
          alt={name || "پزشک"} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex-grow text-right space-y-1">
        <h3 className="font-black text-gray-900 text-base">{name}</h3>
        <p className="text-gray-400 text-[13px] font-bold pb-2">{specialty}</p>
        
        <div className="flex items-center justify-between text-[12px] text-gray-500 pb-3" dir="rtl">
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" strokeWidth={2} />
            <span>{rating}</span>
            {/* نمایش تعداد نظرها (اختیاری) */}
            {reviewsCount && (
              <span className="text-gray-400 text-[11px] mr-1">({reviewsCount} نظر)</span>
            )}
          </div>
        </div>
      </div>

      <Link href={`/doctors/${id || '#'}`} className="w-full mt-2">
        <button className="w-full bg-blue-100/70 text-blue-700 border border-blue-200/40 py-2.5 rounded-xl font-black text-[13px] transition-all hover:bg-blue-200/60 hover:text-blue-800 active:scale-[0.98]">
          دریافت نوبت
        </button>
      </Link>
    </div>
  );
};

export default DoctorCard;