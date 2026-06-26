'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ThumbsUp, ThumbsDown, ChevronLeft, Check } from 'lucide-react';

interface DoctorReviewSubmitProps {
  doctorId: string;
}

export default function DoctorReviewSubmit({ doctorId }: DoctorReviewSubmitProps) {
  
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="w-full" dir="rtl">
      <form onSubmit={handleSubmit}>
       
        <div className="flex flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src="/images/DoctorPicture.png" 
                alt="دکتر زهرا وارسته"
                fill
                className="rounded-2xl object-cover border border-gray-100 shadow-sm"
              />
            </div>
            <div className="text-right">
              <h1 className="text-lg font-black text-gray-900">دکتر زهرا وارسته</h1>
              <p className="text-gray-400 font-bold text-sm mt-0.5">متخصص قلب و عروق</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm">
            <Image src="/icons/CheckCircle.svg" alt="نظام پزشکی" width={16} height={16} />
            <span>کد نظام پزشکی: ۴۳۳۶۳</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <span className="text-gray-500 font-bold text-sm">امتیاز شما به نوبت گرفته شده:</span>
          <div className="flex flex-row-reverse items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = 5 - index; 
              return (
                <button
                  type="button"
                  key={starValue}
                  className="focus:outline-none"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={26}
                    fill={starValue <= (hover || rating) ? '#facc15' : 'transparent'}
                    stroke={starValue <= (hover || rating) ? '#facc15' : '#d1d5db'}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRecommendation('no')}
            className={`flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold border transition-all ${
              recommendation === 'no' ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-gray-200 bg-white text-gray-500'
            }`}
          >
            <ThumbsDown size={18} />
            <span>پزشک را پیشنهاد نمی‌کنم</span>
          </button>

          <button
            type="button"
            onClick={() => setRecommendation('yes')}
            className={`flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold border transition-all ${
              recommendation === 'yes' ? 'border-emerald-500 bg-emerald-50/50 text-emerald-600' : 'border-gray-200 bg-white text-gray-500'
            }`}
          >
            <ThumbsUp size={18} />
            <span>پزشک را پیشنهاد می‌کنم</span>
          </button>
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-right text-gray-700 font-bold text-sm">
            نظر خود را در بخش زیر وارد کنید
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="نظر خود را اینجا وارد کنید"
            rows={5}
            className="w-full rounded-2xl border border-gray-200 p-4 text-sm font-medium text-gray-800 focus:border-blue-500 focus:outline-none text-right resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          
          <button
            type="submit"
            disabled={!acceptTerms || rating === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-black text-white shadow-md transition-all hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            <span>ارسال نظر</span>
            <ChevronLeft size={16} />
          </button>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm font-bold text-gray-600">
              قوانین ثبت نظر را خوانده‌ام و موافقم.
            </span>
          </label>

        </div>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white rounded-[24px] p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check size={22} strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-lg font-black text-gray-900 mb-2">نظر شما ثبت شد</h2>
            <p className="text-gray-500 font-medium text-sm leading-7 mb-6">
              نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.
            </p>
            <Link 
              href={`/doctors/${doctorId}`}
              className="inline-block text-sm font-black text-blue-600 hover:text-blue-700"
            >
              بازگشت به صفحه پزشک
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}