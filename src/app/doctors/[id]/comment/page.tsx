import React from 'react';
import Image from 'next/image';
import DoctorReviewSubmit from '@/Components/comment/SubmitComment';

interface CommentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CommentPage({ params }: CommentPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen w-full bg-white py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto" dir="rtl">
        
        <div className="flex flex-col gap-0.5 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-3">
            <a 
              href={`/doctors/${id}`} 
              className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 shrink-0" 
              title="بازگشت به صفحه پزشک"
            >
              <Image 
                src="/icons/arrow-right-title.png" 
                alt="بازگشت" 
                width={26} 
                height={26} 
                className="object-contain"
              />
            </a>
            <span>بازگشت</span>
          </h1>
        </div>

        <DoctorReviewSubmit doctorId={id} />

      </div>
    </main>
  );
}