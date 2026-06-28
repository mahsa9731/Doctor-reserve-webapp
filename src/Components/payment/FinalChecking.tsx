import { MapPin, Stethoscope, Clock, User } from 'lucide-react';

interface FinalCheckingProps {
  dynamicDate: string | null;
  dynamicTime: string | null;
  patientName: string;
  docaddress: string;
}

export default function FinalChecking({ dynamicDate, dynamicTime, patientName , docaddress }: FinalCheckingProps) {
  const address = {docaddress};
  const visitType = "حضوری";

  const displayDate = dynamicDate || "تعیین نشده";
  const displayTime = dynamicTime || "--:--";

  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6 text-right" dir="rtl">
      
      <div className="flex items-start gap-3">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 shrink-0">
        <MapPin size={20} className="text-gray-600" />
        </div>
        <div>
          <span className="text-xs text-gray-400 font-bold block">آدرس مطب</span>
          <p className="text-[13px] text-gray-800 font-black mt-1 leading-6">
            {docaddress || 'در حال بارگذاری آدرس...'}
          </p>
        </div>
      </div>

      
      <div className="flex items-start gap-3">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 shrink-0">
          <Stethoscope size={20} className="text-gray-600" />
        </div>
        <div>
          <span className="text-xs text-gray-400 font-bold block">نوع نوبت</span>
          <p className="text-[13px] text-gray-800 font-black mt-1">{visitType}</p>
        </div>
      </div>

    
      <div className="flex items-start gap-3">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 shrink-0">
          <Clock size={20} className="text-gray-600" />
        </div>
        <div>
          <span className="text-xs text-gray-400 font-bold block">زمان نوبت</span>
          <p className="text-[13px] text-gray-800 font-black mt-1">
            {displayDate} ساعت {displayTime}
          </p>
        </div>
      </div>

      
      <div className="flex items-start gap-3">
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 shrink-0">
          <User size={20} className="text-gray-600" />
        </div>
        <div>
          <span className="text-xs text-gray-400 font-bold block">مراجعه کننده</span>
          <p className="text-[13px] text-gray-800 font-black mt-1">{patientName}</p>
        </div>
      </div>

    </div>
  );
}