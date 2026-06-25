import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold text-zinc-800 mb-2">صفحه مورد نظر یافت نشد</h2>
      <p className="text-zinc-500 mb-6">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
      <Link 
        href="/" 
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}