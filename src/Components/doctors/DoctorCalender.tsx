"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

interface AvailableSlot {
  date: string;
  times: any[]; 
}

interface DoctorCalendarProps {
  doctorId: string | number;
  doctorSlots: AvailableSlot[];
}

export default function DoctorCalendar({ doctorId, doctorSlots = [] }: DoctorCalendarProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentSlots, setCurrentSlots] = useState<TimeSlot[]>([]);
  
  const today = new DateObject({ calendar: persian, locale: persian_fa });

  const handleDateChange = (date: any) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedTime(null);

    const formattedSelectedDate = date.format("dddd DD MMMM");

    const matchedSlot = doctorSlots.find(
      (slot) => slot.date === formattedSelectedDate
    );

    if (matchedSlot) {
      
      const mappedTimes = matchedSlot.times.map((t: any) => {
        if (typeof t === "string") {
          return { time: t, isBooked: false };
        }
      
        const isSlotBooked = t.status === 'scheduled' || t.isBooked === true;
        return { time: t.time, isBooked: isSlotBooked };
      });
      setCurrentSlots(mappedTimes);
    } else {
      setCurrentSlots([]);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 max-w-md mx-auto w-full" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] sm:text-[18px] font-bold text-gray-900">تقویم و نوبت‌دهی</h2>
        <span className="text-[11px] sm:text-[12px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          امروز: {today.format("DD MMMM")}
        </span>
      </div>

      <div className="w-full mb-6 bg-gray-50/50 p-4 sm:p-5 rounded-2xl custom-calendar-wrapper">
        <div className="w-full flex flex-col">
          <Calendar
            calendar={persian}
            locale={persian_fa}
            value={selectedDate}
            onChange={handleDateChange}
            minDate={today}
            shadow={false}
            className="modern-calendar-core"
            />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-700">ساعت‌های موجود</h3>
            {selectedDate && <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium">{selectedDate.format("dddd DD MMMM")}</span>}
        </div>

        {selectedDate ? (
          currentSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {currentSlots.map((slot, index) => {
                const isSelected = slot.time === selectedTime;
                return (
                  <button
                    key={`${slot.time}-${index}`}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`relative py-2.5 sm:py-3 rounded-2xl text-[13px] sm:text-[14px] font-bold transition-all duration-200 border-2 overflow-hidden ${
                      slot.isBooked
                        ? "bg-gray-100 text-gray-300 border-transparent cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-[0_10px_20px_rgba(37,99,235,0.2)] scale-105 z-10"
                        : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    {slot.time}
                    {slot.isBooked && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[120%] h-[1.5px] bg-gray-300 -rotate-12"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-6 sm:py-8 text-center bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-100">
              <p className="text-[12px] sm:text-[13px] text-gray-400">نوبت خالی برای این روز تعریف نشده است</p>
            </div>
          )
        ) : (
          <div className="py-6 sm:py-8 text-center bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-100">
            <p className="text-[12px] sm:text-[13px] text-gray-400">لطفاً برای مشاهده ساعت‌ها، یک روز را انتخاب کنید</p>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push(`/booking/${doctorId}/info?date=${selectedDate.format("dddd DD MMMM")}&time=${selectedTime}`)}
        disabled={!selectedDate || !selectedTime}
        className={`w-full mt-6 sm:mt-8 py-3.5 sm:py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold transition-all duration-300 ${
          selectedDate && selectedTime
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_12px_24px_rgba(37,99,235,0.25)]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        رزرو نوبت
      </button>

      <style jsx global>{`
        .custom-calendar-wrapper .rmdp-wrapper {
          margin: 0 auto !important;
          display: block !important;
          max-width: 100% !important;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        .custom-calendar-wrapper .rmdp-container {
          width: 100% !important;
          display: block !important;
        }

        .modern-calendar-core.rmdp-calendar {
          width: 100% !important;
          background-color: transparent !important;
          border: none !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .modern-calendar-core.rmdp-calendar > div:first-child {
          width: 100% !important;
        }

        .rmdp-calendar-container {
          width: 100% !important;
          padding: 0 !important;
        }

        .rmdp-day-picker {
          width: 100% !important;
          padding: 0 !important;
        }

        .rmdp-day-picker > div {
          width: 100% !important;
        }
        .custom-calendar-wrapper .rmdp-header {
          width: 100% !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 0 4px !important;
          margin-bottom: 20px !important;
          height: auto !important;
          box-sizing: border-box !important;
        }

        .custom-calendar-wrapper .rmdp-header-values {
          font-size: 16px !important;
          color: #111827 !important;
          font-weight: 800 !important;
          display: block !important;
          order: 2 !important; 
          margin: 0 !important;
        }

        .custom-calendar-wrapper .rmdp-arrow-container {
          width: 36px !important;
          height: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          transition: background-color 0.2s !important;
          cursor: pointer !important;
        }

        .custom-calendar-wrapper .rmdp-arrow-container:hover {
          background-color: #f9fafb !important;
        }

        .custom-calendar-wrapper .rmdp-left {
          order: 1 !important;
          margin: 0 !important;
        }

        .custom-calendar-wrapper .rmdp-right {
          order: 3 !important;
          margin: 0 !important;
        }

        .custom-calendar-wrapper .rmdp-arrow {
          border: solid #4b5563 !important;
          border-width: 0 2px 2px 0 !important;
          padding: 3px !important;
        }

        .custom-calendar-wrapper .rmdp-left .rmdp-arrow {
          transform: rotate(-45deg) !important;
        }

        .custom-calendar-wrapper .rmdp-right .rmdp-arrow {
          transform: rotate(135deg) !important;
        }

        .rmdp-week {
          width: 100% !important;
          display: flex !important;
          justify-content: space-between !important;
          margin: 4px 0 !important;
        }

        .rmdp-day, .rmdp-week-day {
          flex: 1 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          height: auto !important;
          aspect-ratio: 1 / 1 !important;
        }

        .rmdp-day span {
            font-size: 14px !important;
            font-weight: 600 !important;
            border-radius: 12px !important;
            width: 80% !important;
            height: 80% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .rmdp-week-day {
            color: #9ca3af !important;
            font-weight: 700 !important;
            font-size: 13px !important;
        }

        .rmdp-day.rmdp-selected span {
            background-color: #2563eb !important;
            color: white !important;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25) !important;
        }

        .rmdp-day.rmdp-today span {
            color: #2563eb !important;
            background-color: #eff6ff !important;
            border: 1px solid #bfdbfe !important;
        }

        .rmdp-day.rmdp-disabled span {
            color: #cbd5e1 !important;
            background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}