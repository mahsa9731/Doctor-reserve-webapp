
import React from 'react';

interface ArticleProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ image, title, excerpt, date }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{excerpt}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <a href="#" className="text-blue-600 font-medium">ادامه مطلب</a>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
