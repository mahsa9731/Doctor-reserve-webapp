'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Brain,
  Activity,
  Wind,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Stethoscope,
  AlertCircle,
  Home,
  Briefcase,
  User,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface Question {
  id: number;
  category: 'cardio' | 'neuro' | 'respiratory' | 'general';
  categoryTitle: string;
  question: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'cardio',
    categoryTitle: 'قلب و عروق',
    question: 'آیا در هنگام فعالیت بدنی یا بالا رفتن از پله‌ها دچار درد، فشار یا احساس سنگینی در قفسه سینه می‌شوید؟',
    options: [
      { label: 'هرگز', score: 0 },
      { label: 'گاهی اوقات (خفیف)', score: 1 },
      { label: 'اکثر اوقات (شدید)', score: 2 },
    ],
  },
  {
    id: 2,
    category: 'cardio',
    categoryTitle: 'قلب و عروق',
    question: 'آیا سابقه تپش قلب ناگهانی، احساس افت فشار، سرگیجه یا ورم در ناحیه پاها داشته‌اید؟',
    options: [
      { label: 'خیر، هیچ‌کدام', score: 0 },
      { label: 'گاهی در اثر استرس یا خستگی', score: 1 },
      { label: 'بله، به‌صورت مداوم', score: 2 },
    ],
  },
  {
    id: 3,
    category: 'neuro',
    categoryTitle: 'مغز و اعصاب',
    question: 'کیفیت خواب شبانه و میزان احساس شادابی و انرژی شما پس از بیدار شدن چگونه است؟',
    options: [
      { label: 'خواب عمیق و پرانرژی', score: 0 },
      { label: 'گاهی بدخوابی و احساس خستگی', score: 1 },
      { label: 'اختلال شدید خواب و عدم تمرکز', score: 2 },
    ],
  },
  {
    id: 4,
    category: 'neuro',
    categoryTitle: 'مغز و اعصاب',
    question: 'در یک ماه گذشته چقدر دچار سردردهای مداوم، سرگیجه یا احساس اضطراب و استرس شدید شده‌اید؟',
    options: [
      { label: 'اصلاً یا بسیار نادر', score: 0 },
      { label: 'گاهی اوقات در شرایط کاری/تحصیلی', score: 1 },
      { label: 'اکثر روزها و با شدت زیاد', score: 2 },
    ],
  },
  {
    id: 5,
    category: 'respiratory',
    categoryTitle: 'دستگاه تنفسی',
    question: 'آیا دچار سرفه‌های مداوم، خلط‌دار، خس‌خس سینه یا تنگی نفس در محیط‌های بسته می‌شوید؟',
    options: [
      { label: 'خیر، تنفس کاملاً طبیعی است', score: 0 },
      { label: 'گاهی هنگام سرماخوردگی یا حساسیت', score: 1 },
      { label: 'بله، بدون سابقه قبلی و مداوم', score: 2 },
    ],
  },
  {
    id: 6,
    category: 'general',
    categoryTitle: 'سلامت عمومی',
    question: 'وضعیت اشتهای شما و تغییرات وزنی در سه ماه گذشته چگونه بوده است؟',
    options: [
      { label: 'وزن و اشتهای ثابت و متعادل', score: 0 },
      { label: 'نوسانات خفیف وزن یا اشتها', score: 1 },
      { label: 'کاهش یا افزایش ناگهانی و غیرعادی وزن', score: 2 },
    ],
  },
  {
    id: 7,
    category: 'general',
    categoryTitle: 'سلامت عمومی',
    question: 'آیا در طول هفته به طور مداوم با سوزش معده، دل درد یا مشکلات گوارشی مواجه هستید؟',
    options: [
      { label: 'خیر، عملکرد گوارشی خوب است', score: 0 },
      { label: 'گاهی پس از مصرف برخی غذاها', score: 1 },
      { label: 'بله، درد و سوزش مداوم دارم', score: 2 },
    ],
  },
  {
    id: 8,
    category: 'general',
    categoryTitle: 'سلامت عمومی',
    question: 'سطح انرژی روزانه خود را جهت انجام فعالیت‌های روزمره چگونه ارزیابی می‌کنید؟',
    options: [
      { label: 'انرژی کافی و انگیزه بالا', score: 0 },
      { label: 'افت انرژی در میانه روز', score: 1 },
      { label: 'خستگی مفرط و بی‌حالی از ابتدای روز', score: 2 },
    ],
  },
];

export default function HealthTestPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, { score: number; category: string }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentStep];

  const handleSelect = (score: number, category: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { score, category },
    }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  const calculateResult = () => {
    let totalScore = 0;
    const catScores: Record<string, number> = {
      cardio: 0,
      neuro: 0,
      respiratory: 0,
      general: 0,
    };

    Object.values(answers).forEach((ans) => {
      totalScore += ans.score;
      if (catScores[ans.category] !== undefined) {
        catScores[ans.category] += ans.score;
      }
    });

    const maxScore = QUESTIONS.length * 2;
    const healthPercentage = Math.max(15, Math.round(((maxScore - totalScore) / maxScore) * 100));

    let status = 'عالی';
    let summary = 'شاخص‌های ارزیابی اولیه سلامت شما در سطح بالایی قرار دارد. توصیه می‌شود چکاپ‌های دوره‌ای سالانه را جهت حفظ این روند ادامه دهید.';
    let recommendedSpecialty = 'عمومی';

    if (catScores.cardio >= 3) {
      recommendedSpecialty = 'قلب و عروق';
    } else if (catScores.neuro >= 3) {
      recommendedSpecialty = 'مغز و اعصاب';
    } else if (catScores.respiratory >= 2) {
      recommendedSpecialty = 'دستگاه تنفسی';
    } else if (catScores.general >= 4) {
      recommendedSpecialty = 'داخلی';
    }

    if (healthPercentage < 55) {
      status = ' نیازمند بررسی تخصصی';
      summary = 'برخی پاسخ‌ها نشان‌دهنده وجود علائمی است که نیاز به بررسی علمی‌تر توسط پزشک متخصص دارد. رزرو یک نوبت چکاپ برای شما مفید خواهد بود.';
    } else if (healthPercentage < 80) {
      status = 'خوب و پایدار';
      summary = 'وضعیت کلی بدن شما مناسب است؛ اما با اصلاح الگوی خواب، کاهش استرس و بهبود رژیم غذایی می‌توانید شادابی بیشتری کسب کنید.';
    }

    return { healthPercentage, status, summary, recommendedSpecialty };
  };

  const result = isFinished ? calculateResult() : null;

  return (
    <div className="min-h-screen bg-[#F4F7FF] text-slate-800 flex flex-col justify-between relative overflow-hidden pb-24" dir="rtl">
      {/* Background Ambient Glows */}
      <div className="fixed -top-20 right-1/4 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -left-20 w-[450px] h-[450px] bg-indigo-300/25 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[350px] h-[350px] bg-purple-200/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="container mx-auto px-4 pt-10 pb-6 max-w-4xl">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            تست هوشمند سلامت
          </h1>
          <p className="text-slate-500 font-semibold text-sm sm:text-base">
            پاسخ به سوالات در کمتر از ۵ دقیقه
          </p>
        </motion.div>

        {/* Glassmorphism Outer Card */}
        <div className="relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-blue-500/5">
          {!isFinished ? (
            <>
              {/* Top Progress Indicator */}
              <div className="w-full max-w-lg mx-auto mb-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
                  <span>سوال {currentStep + 1} از {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/70 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs font-bold mb-8 flex-wrap">
                <span className={currentQ.category === 'cardio' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-400'}>
                  قلب و عروق
                </span>
                <span className="text-slate-300">•</span>
                <span className={currentQ.category === 'neuro' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-400'}>
                  مغز و اعصاب
                </span>
                <span className="text-slate-300">•</span>
                <span className={currentQ.category === 'respiratory' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-400'}>
                  تنفس
                </span>
                <span className="text-slate-300">•</span>
                <span className={currentQ.category === 'general' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-400'}>
                  سلامت عمومی
                </span>
              </div>

              {/* Central Glowing Icon Sphere */}
              <div className="relative flex justify-center items-center mb-8">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-blue-100 via-indigo-50 to-white border border-white flex items-center justify-center shadow-inner">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 text-white"
                  >
                    {currentQ.category === 'cardio' && <Heart className="w-8 h-8 sm:w-10 sm:h-10" />}
                    {currentQ.category === 'neuro' && <Brain className="w-8 h-8 sm:w-10 sm:h-10" />}
                    {currentQ.category === 'respiratory' && <Wind className="w-8 h-8 sm:w-10 sm:h-10" />}
                    {currentQ.category === 'general' && <Activity className="w-8 h-8 sm:w-10 sm:h-10" />}
                  </motion.div>

                  <div className="absolute -top-1 -right-1 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-blue-600 border border-slate-100">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-indigo-600 border border-slate-100">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 max-w-xl mx-auto space-y-6"
                >
                  <h2 className="text-base sm:text-lg font-bold text-slate-800 text-center leading-relaxed">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = answers[currentQ.id]?.score === opt.score;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelect(opt.score, currentQ.category)}
                          className={`w-full p-4 rounded-xl border text-sm font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                              : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white bg-white text-blue-600' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center max-w-xl mx-auto pt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 px-4 py-2 text-slate-500 hover:text-slate-800 font-bold text-sm disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  قبلی
                </button>

                <button
                  onClick={handleNext}
                  disabled={answers[currentQ.id] === undefined}
                  className="flex items-center gap-1.5 px-7 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
                >
                  <span>{currentStep === QUESTIONS.length - 1 ? 'مشاهده نتیجه' : 'بعدی'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Result Panel View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >

              <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <ChevronLeft className="w-4 h-4" />
                  <span>کارنامه ارزیابی سلامت</span>
                </div>

                <div className="text-center space-y-2 pt-2">
                  <div className="text-slate-500 text-xs font-bold">نمره سلامت شما</div>
                  <div className="text-3xl font-black text-emerald-600">
                    {result?.status} ({result?.healthPercentage}٪)
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${result?.healthPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>بررسی شده بر اساس پاسخ به ۸ شاخص کلیدی</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Activity className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>سنجش هم‌زمان سیستم قلبی، عصبی، تنفسی و عمومی</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">تحلیل هوشمند:</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{result?.summary}</p>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    تخصص پیشنهادی جهت رزرو نوبت:
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    پیشنهاد می‌شود جهت معاینه حضوری یا مشاوره آنلاین با پزشکان بخش{' '}
                    <span className="font-black text-blue-600">{result?.recommendedSpecialty}</span> گفتگو کنید.
                  </p>
                  <Link href={`/search?specialty=${result?.recommendedSpecialty}`} className="block pt-1">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer">
                      مشاهده پزشکان متخصص {result?.recommendedSpecialty}
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>ارزیابی هوشمند اولیه</span>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    شروع مجدد
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Glassmorphism Bottom Navigation Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-full px-6 py-2.5 shadow-2xl shadow-slate-900/10 flex items-center gap-8 text-xs font-bold text-slate-500">
          <Link href="/" className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            <span>خانه</span>
          </Link>
          <Link href="/doctors" className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
            <Briefcase className="w-4 h-4" />
            <span>پزشکان</span>
          </Link>
          <div className="relative">
            <div className="w-10 h-10 -mt-6 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <Link href="/health-test" className="flex flex-col items-center gap-1 text-blue-600">
            <Sparkles className="w-4 h-4" />
            <span>تست سلامت</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
            <User className="w-4 h-4" />
            <span>پشتیبانی</span>
          </Link>
        </div>
      </div>
    </div>
  );
}