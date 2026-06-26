import React from 'react';
import Image from 'next/image';
import Footer from '@/Components/Footer';


const UserProfile = () => {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
   
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 mr-4">پروفایل کاربری</h1>

        <div className="flex flex-col md:flex-row gap-8">
         
          <div className="flex-1 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              
              
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">نام:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">نام خانوادگی:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>

              
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">کد ملی:</label>
                <p className="font-semibold tracking-widest text-slate-800"></p>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">سال تولد:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>

             
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">جنسیت:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">شهر:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>

              
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">شماره موبایل:</label>
                <p className="font-semibold text-slate-800"></p>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 text-sm block">ایمیل:</label>
                <p className="text-slate-400 text-sm italic">ایمیل خود را وارد کن</p>
              </div>
            </div>

           
            <div className="mt-12">
              <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                ویرایش اطلاعات
              </button>
            </div>
          </div>

          
          <div className="w-full md:w-80 flex flex-col items-center">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm w-full flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <Image
                  src="/images/user-profile.png" 
                  alt="User Avatar"
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <button className="w-full py-2.5 border border-blue-400 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-sm font-medium">
                <span>+</span> آپلود تصویر
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
