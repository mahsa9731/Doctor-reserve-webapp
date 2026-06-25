"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';

export default function DoctorReviews() {
  const params = useParams();
  const doctorId = params.id;
  const reviews = [
    { 
      id: 1, 
      name: "فاطمه علوی", 
      avatar: "/avatars/avatar1.png", 
      date: "۱۴ تیر ۱۴۰۲", 
      comment: "دکتر وارسته رو از اینستاگرام میشناختم و اینجا تونستم به راحتی نوبت رزرو کنم.", 
      rating: 5 
    },
    { 
      id: 2, 
      name: "مهسا اردکانی", 
      avatar: "/avatars/avatar2.png",
      date: "۱۰ تیر ۱۴۰۲", 
      comment: "نوبت گیری در سریعترین زمان ممکن انجام شد و واقعا برای من راضی کننده بود تشخیص پزشک هم عالی بود", 
      rating: 4 
    },
    { 
      id: 3, 
      name: "علی رضایی", 
      avatar: "/avatars/avatar3.png", 
      date: "۱۰ تیر ۱۴۰۲", 
      comment: "پزشک با تجربه ای بودن و با صبوری تمام معاینه کردن و بیماری رو تشخیص دادند و با یه نوبت دارو تا حد خوبی بهبودی رو شاهد بودیم", 
      rating: 4 
    },
  ];

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900">نظرات کاربران</h3>
        <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2.5 py-1 rounded-xl text-xs font-bold">
      <Image src="/icons/thumbs-up.svg" alt="پیشنهاد" width={14} height={14} />
      <span>۹۴٪ کاربران این پزشک را پیشنهاد داده‌اند</span>
    </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-gray-900">۴.۸</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <span className="text-gray-400 text-sm">(۱۰۵ نظر)</span>
          <Link 
  href={`/doctors/${doctorId}/comment`}
  className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-black hover:bg-blue-100 transition-colors"
>
  <Image src="/icons/comment-add.svg" alt="افزودن" width={14} height={14} />
  <span>ثبت نظر جدید</span>
</Link>
        </div>
             
      </div>

      <div className="space-y-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-2xl bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image 
                  src={rev.avatar} 
                  alt={rev.name} 
                  width={36} 
                  height={36} 
                  className="rounded-full object-cover" 
                />
                <span className="font-bold text-gray-800">{rev.name}</span>
              </div>
              <span className="text-xs text-gray-400">{rev.date}</span>
            </div>
            <div className="flex text-yellow-400">
              {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-sm text-gray-600 leading-6">{rev.comment}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 border border-blue-200 bg-blue-50/50 text-blue-600 rounded-2xl text-sm font-black flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors">
  <span>مشاهده نظرات بیشتر</span>
  <Image src="/icons/arrowdownC.svg" alt="بیشتر" width={16} height={16} />
</button>
    </div>
  );
}