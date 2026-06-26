import React from 'react';

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: string;
  location: string;
  image: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, rating, reviewsCount, location, image }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow">
      {/* تصویر پزشک */}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      
      {/* اطلاعات پزشک */}
      <div className="flex-grow text-right">
        <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-3">{specialty}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1 text-yellow-500 font-medium">
            <span>★</span> {rating} <span className="text-gray-400">({reviewsCount} نظر)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span> {location}
          </div>
        </div>
      </div>

      {/* دکمه دریافت نوبت */}
      <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
        دریافت نوبت
      </button>
    </div>
  );
};

export default DoctorCard;
