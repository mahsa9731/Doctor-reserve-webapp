'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function OnlineGateway() {
  const [selectedBank, setSelectedBank] = useState<'saman' | 'parsian'>('saman');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handlePayment = () => {
    if (!acceptedTerms) {
      alert("لطفاً ابتدا قوانین و شرایط را تایید کنید.");
      return;
    }

    alert(`در حال هدایت به درگاه بانک ${selectedBank === 'saman' ? 'سامان' : 'پارسیان'}...`);
  };

  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm text-right space-y-6 mt-6 lg:mt-0" dir="rtl">
      <h3 className="text-[18px] font-black text-gray-900 border-b border-gray-50 pb-3">
        درگاه پرداخت آنلاین
      </h3>

      
      <div 
        onClick={() => setSelectedBank('saman')}
        className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          selectedBank === 'saman' 
            ? 'border-blue-500 bg-blue-50/20' 
            : 'border-gray-100 bg-gray-50/40 hover:bg-gray-50'
        }`}
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
          className="w-5 h-5 accent-blue-600" 
        />
      </div>

     
      <div 
        onClick={() => setSelectedBank('parsian')}
        className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          selectedBank === 'parsian' 
            ? 'border-blue-500 bg-blue-50/20' 
            : 'border-gray-100 bg-gray-50/40 hover:bg-gray-50'
        }`}
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
          className="w-5 h-5 accent-blue-600" 
        />
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
        <input 
          type="checkbox" 
          id="terms" 
          checked={acceptedTerms} 
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600" 
        />
        <label htmlFor="terms" className="text-[12px] text-gray-600 font-bold cursor-pointer select-none">
          پرداخت به منزله پذیرش <span className="text-blue-600 font-black">شرایط و قوانین</span> است.
        </label>
      </div>

      <button 
        onClick={handlePayment}
        className={`w-full py-4 rounded-2xl font-black text-base transition-all shadow-md flex items-center justify-center gap-2 ${
          acceptedTerms 
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 cursor-pointer" 
            : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
        }`}
      >
        <span>پرداخت</span>
      </button>
    </div>
  );
}