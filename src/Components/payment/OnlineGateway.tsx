'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';

export default function OnlineGateway() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const doctorId = params.id;
  const selectedDate = searchParams.get('date') || '';
  const selectedTime = searchParams.get('time') || '';

  const [selectedBank, setSelectedBank] = useState<'saman' | 'parsian'>('saman');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handlePayment = async () => {
    if (!acceptedTerms) {
      setIsTermsModalOpen(true); 
      return;
    }

    setIsPending(true);
    const randomNumber = Math.random();

    if (randomNumber < 0.7) {
      try {
        const response = await fetch('/api/booking/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doctorId,
            date: selectedDate,
            time: selectedTime,
          }),
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          router.push(`/booking/${doctorId}/paymentsuccess?date=${selectedDate}&time=${selectedTime}&code=${data.trackingCode}`);
        } else {
          console.error("خطا در ثبت نوبت دیتابیس:", data.error);
          router.push(`/booking/${doctorId}/paymentfailed`);
        }
      } catch (err) {
        console.error("خطای ارتباط با سرور:", err);
        router.push(`/booking/${doctorId}/paymentfailed`);
      } finally {
        setIsPending(false);
      }
    } else {
      setIsPending(false);
      router.push(`/booking/${doctorId}/paymentfailed`);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm text-right space-y-6 mt-6 lg:mt-0" dir="rtl">
      <h3 className="text-[18px] font-black text-gray-900 border-b border-gray-50 pb-3">
        درگاه پرداخت آنلاین
      </h3>

      <div 
        onClick={() => !isPending && setSelectedBank('saman')}
        className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          selectedBank === 'saman' 
            ? 'border-blue-500 bg-blue-50/20' 
            : 'border-gray-100 bg-gray-50/40 hover:bg-gray-50'
        } ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
            <Image 
              src="/icons/saman.png" 
              alt="لوگوی بانک" 
              width={30} 
              height={30} 
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-black text-gray-900 block">درگاه پرداخت بانک سامان</span>
            <span className="text-[11px] text-gray-400 font-bold">امن و مطمئن</span>
          </div>
        </div>
        <input 
          type="radio" 
          checked={selectedBank === 'saman'} 
          onChange={() => setSelectedBank('saman')}
          disabled={isPending}
          className="w-5 h-5 accent-blue-600" 
        />
      </div>

      <div 
        onClick={() => !isPending && setSelectedBank('parsian')}
        className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          selectedBank === 'parsian' 
            ? 'border-blue-500 bg-blue-50/20' 
            : 'border-gray-100 bg-gray-50/40 hover:bg-gray-50'
        } ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
             <Image 
              src="/icons/parseian.png" 
              alt="لوگوی بانک" 
              width={30} 
              height={30} 
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-black text-gray-900 block">درگاه پرداخت بانک پارسیان</span>
            <span className="text-[11px] text-gray-400 font-bold">پشتیبانی از تمامی کارت‌ها</span>
          </div>
        </div>
        <input 
          type="radio" 
          checked={selectedBank === 'parsian'} 
          onChange={() => setSelectedBank('parsian')}
          disabled={isPending}
          className="w-5 h-5 accent-blue-600" 
        />
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
        <input 
          type="checkbox" 
          id="terms" 
          checked={acceptedTerms} 
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          disabled={isPending}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600" 
        />
        <label htmlFor="terms" className="text-[12px] text-gray-600 font-bold cursor-pointer select-none">
          پرداخت به منزله پذیرش <span className="text-blue-600 font-black">شرایط و قوانین</span> است.
        </label>
      </div>

      <button 
        onClick={handlePayment}
        disabled={isPending}
        className={`w-full py-4 rounded-2xl font-black text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 ${
          isPending ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <span>{isPending ? "در حال ثبت نوبت..." : "پرداخت"}</span>
      </button>

      
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setIsTermsModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-zinc-100 relative z-10 scale-in animate-in duration-200 zoom-in-95 text-center space-y-4">
            
            <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-zinc-900">تایید قوانین الزامی است</h4>
              <p className="text-[13px] text-zinc-500 leading-6">
                لطفاً برای ادامه فرآیند نوبت‌دهی و اتصال به درگاه پرداخت، ابتدا تیک موافقت با شرایط و قوانین را بزنید.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="w-full bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-100"
              >
                متوجه شدم
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}