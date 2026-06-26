export default function HealthTestBanner() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 my-10">
      {/* تصویر */}
      <div className="w-full md:w-1/3 h-48 overflow-hidden rounded-xl">
        <img src="/images/medical-test.jpg" alt="Health Test" className="w-full h-full object-cover" />
      </div>
      
      {/* متن و دکمه */}
      <div className="flex-1 space-y-4 text-right">
        <h2 className="text-2xl font-bold text-gray-900">همین حالا رایگان تست سلامت بگیرید!</h2>
        <p className="text-gray-600">در کمتر از دو دقیقه سلامت خود را ارزیابی کنید.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          شروع تست سلامت
        </button>
      </div>
    </div>
  );
}
