import React from 'react';

interface ReviewCardProps {
  userName: string;
  date: string;
  comment: string;
  doctorName: string;
  rating: number;
  avatar: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userName, date, comment, doctorName, rating, avatar }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* هدر نظرات (نام کاربر، امتیاز و تاریخ) */}
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-400">{date}</span>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h4 className="font-bold text-sm text-gray-900">{userName}</h4>
            <div className="text-yellow-400 text-xs">{"★".repeat(rating)}</div>
          </div>
          <img src={avatar} alt={userName} className="w-10 h-10 rounded-full object-cover" />
        </div>
      </div>

      {/* متن نظر */}
      <p className="text-gray-600 text-sm leading-relaxed text-right min-h-[60px]">
        {comment}
      </p>

      {/* فوتر نظرات (دکمه‌ها) */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-50">
        <a href="#" className="text-blue-600 text-xs font-semibold">مشاهده دکتر</a>
        <span className="text-gray-400 text-xs">درباره {doctorName}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
