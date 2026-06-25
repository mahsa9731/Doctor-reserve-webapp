import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white px-6 md:px-16 lg:px-24 py-12 rtl">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
        <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-start justify-center">
          
          <span className="text-5xl md:text-6xl font-black text-gray-900 mb-4 block tracking-tight">
            Oops!
          </span>
          
          
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            صفحه مورد نظر در دسترس نیست!
          </h1>
          
       
          <p className="mb-8 text-base md:text-lg text-gray-500 font-bold max-w-md leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس اشتباه وارد شده است. لطفاً به صفحه اصلی بازگردید.
          </p>

          <Link
            href="/"
            className="inline-block rounded-full border border-blue-600 bg-white px-10 py-3 text-center text-sm font-black text-blue-600 transition-all hover:bg-blue-50/50 active:bg-blue-50"
          >
            بازگشت به خانه
          </Link>
        </div>

        <div className="w-full md:flex-1 flex justify-center items-center">
          <div className="w-full max-w-[420px] md:max-w-[500px] lg:max-w-[550px] aspect-square relative">
            <Image
              src="/images/404.png"
              alt="404 Error"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </main>
  );
};

export default NotFoundPage;