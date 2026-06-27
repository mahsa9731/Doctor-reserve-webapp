import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  medicalCode: string;
  address: string;
  availableDate: string;
}

interface AppointmentCardProps {
  doctor: Doctor;
  trackingCode: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ doctor, trackingCode }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-6">
        
        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-1">
            <h2 className="text-[22px] sm:text-[26px] font-black text-gray-900">{doctor.name}</h2>
            <p className="text-gray-500 font-bold text-[15px]">{doctor.specialty}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">{doctor.rating.toFixed(1)}</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15l-5.878 3.09 1.123-6.545-4.755-4.636 6.568-.955 2.942-5.954 2.942 5.954 6.568.955-4.755 4.636 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-sm">({doctor.reviewsCount} نظر)</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-xl border border-gray-100">
            <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={18} height={18} />
            <span className="text-[13px] text-gray-600 font-bold">کد نظام پزشکی: {doctor.medicalCode}</span>
          </div>

          <div className="space-y-4 pt-2 border-t border-gray-50 mt-2">
            <div className="flex items-start gap-3">
              <Image src="/icons/map-pinpoint-02.svg" alt="آدرس" width={20} height={20} className="mt-1 shrink-0" />
              <p className="text-[14px] text-gray-700 leading-6 font-medium">
                آدرس مطب: {doctor.address}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/icons/alarm-clock.svg" alt="نوبت" width={20} height={20} className="shrink-0" />
              <p className="text-[14px] text-gray-700 font-medium">
                زمان نوبت رزرو شده: <span className="font-black text-gray-900">{doctor.availableDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* تصویر پزشک */}
        <div className="relative w-full sm:w-[160px] h-[160px] shrink-0 flex justify-center sm:block">
          <div className="relative w-[160px] h-[160px]">
            <Image
              src="/images/DoctorPicture.png" 
              alt={doctor.name}
              fill
              className="rounded-[22px] object-cover border-4 border-gray-50 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* کد رهگیری */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icons/trackingcode.png" alt="کد رهگیری" width={22} height={22} />
          <p className="text-[13px] text-gray-500 font-bold">کد رهگیری نوبت</p>
        </div>
        <Link href={`/appointments/${trackingCode}`} className="text-lg font-black text-blue-600 hover:underline">
          {trackingCode}
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCard;