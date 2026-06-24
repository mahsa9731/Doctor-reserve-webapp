'use client';

import { useParams } from 'next/navigation';

export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = params.id; 

  return (
    <div className="bg-white min-h-screen w-full" dir="rtl">
      
    </div>
  );
}