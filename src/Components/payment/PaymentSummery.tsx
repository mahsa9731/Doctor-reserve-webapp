import React from 'react';

interface PaymentSummaryProps {
  visitPrice?: number;
  platformFee?: number;
}

export default function PaymentSummary({ 
  visitPrice = 200000, 
  platformFee = 20000 
}: PaymentSummaryProps) {
  const totalPrice = visitPrice + platformFee;

  const formatNumber = (num: number) => num.toLocaleString('fa-IR');

  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm text-right space-y-6" dir="rtl">
      <h3 className="text-[18px] font-black text-gray-900 border-b border-gray-50 pb-3">
        جزئیات پرداخت
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-bold">مبلغ ویزیت:</span>
          <span className="text-gray-800 font-black tracking-wide">
            {formatNumber(visitPrice)} <span className="text-[11px] font-bold text-gray-500">تومان</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-4">
          <span className="text-gray-400 font-bold">هزینه پلتفرم:</span>
          <span className="text-gray-800 font-black tracking-wide">
            {formatNumber(platformFee)} <span className="text-[11px] font-bold text-gray-500">تومان</span>
          </span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-900 font-black text-base">مبلغ نهایی:</span>
          <span className="text-blue-600 font-black text-[18px] tracking-wide">
            {formatNumber(totalPrice)} <span className="text-[12px] font-bold text-blue-600">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}