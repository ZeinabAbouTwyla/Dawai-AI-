import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const Screen01Splash: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isAr = language === 'ar';

  return (
    <div
      onClick={() => navigateTo('welcome')}
      className="min-h-full flex flex-col items-center justify-between p-8 bg-[#F7F5EF] text-center select-none cursor-pointer"
    >
      <div className="pt-8">
        <span className="text-xs uppercase tracking-widest text-[#52766B] font-semibold bg-[#52766B]/10 px-3 py-1 rounded-full border border-[#52766B]/20">
          {isAr ? 'منظومة الرعاية العائلية' : 'Family Healthcare Platform'}
        </span>
      </div>

      <div className="flex flex-col items-center max-w-xs">
        {/* Logo Emblem */}
        <div className="w-24 h-24 rounded-3xl bg-white border border-[#E8E3D8] shadow-soft flex items-center justify-center p-4 relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#52766B] flex items-center justify-center text-white shadow-inner">
            <svg
              className="w-10 h-10"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" y="16" width="28" height="8" rx="4" fill="#F7F5EF" />
              <rect x="16" y="6" width="8" height="28" rx="4" fill="#F7F5EF" />
              <circle cx="20" cy="20" r="3" fill="#D5A18E" />
            </svg>
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#B7C6B0] flex items-center justify-center border-2 border-[#F7F5EF]">
            <Heart className="w-3 h-3 text-[#454D46]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#454D46] tracking-tight">
          DOAWY <span className="text-[#52766B]">AI</span>
        </h1>
        <h2 className="text-2xl font-bold text-[#52766B] mt-1 font-['IBM_Plex_Sans_Arabic']">
          دوائي
        </h2>

        <p className="text-sm text-[#737B74] mt-4 font-medium leading-relaxed">
          {isAr
            ? 'صحتك، منظمة ومحفوظة. عائلتك، متصلة ومطمئنة.'
            : 'Your Health, Organized. Your Family, Connected.'}
        </p>
      </div>

      <div className="w-full pb-4">
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#737B74]">
          <ShieldCheck className="w-4 h-4 text-[#52766B]" />
          <span>{isAr ? 'انقر للبدء' : 'Tap anywhere to start'}</span>
        </div>
      </div>
    </div>
  );
};

export const Screen02Welcome: React.FC = () => {
  const { navigateTo, language } = useApp();
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#F7F5EF]">
      {/* Top Graphic */}
      <div className="pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8E3D8] shadow-soft p-4">
          <img
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80"
            alt="Family Healthcare"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-[#F7F5EF]/95 backdrop-blur-sm rounded-xl p-3 border border-[#E8E3D8] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#52766B]/15 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#52766B]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#454D46]">
                {isAr ? 'عناية متكاملة للوالدين' : 'Holistic Family Care'}
              </div>
              <div className="text-[11px] text-[#737B74]">
                {isAr ? 'إدارة الجرعات ومتابعة فورية' : 'Smart dose schedules & peace of mind'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Copy */}
      <div className="my-6">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#52766B] bg-[#52766B]/10 px-2.5 py-1 rounded-full">
          {isAr ? 'مرحباً بك في دوائي' : 'Welcome to DOAWY'}
        </span>
        <h2 className="text-2xl font-bold text-[#454D46] mt-3 leading-snug">
          {isAr
            ? 'رعاية صحية عائلية هادئة وسلسة'
            : 'Care for those you love, without the worry.'}
        </h2>
        <p className="text-sm text-[#737B74] mt-2 font-normal leading-relaxed">
          {isAr
            ? 'يربط دوائي بين المرضى ومقدمي الرعاية لتسهيل تنظيم الأدوية، تتبع الالتزام بالجرعات، والحصول على تثقيف طبي موثوق.'
            : 'Connecting family caregivers and patients for seamless medication schedules, timely reminders, adherence tracking, and reliable health education.'}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3 pb-2">
        <button
          onClick={() => navigateTo('account_type')}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          <span>{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
          <NextIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('login')}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#E8E3D8]/30 text-[#454D46] font-semibold text-sm border border-[#E8E3D8] transition-colors"
        >
          {isAr ? 'تسجيل الدخول إلى حساب موجود' : 'I already have an account'}
        </button>
      </div>
    </div>
  );
};
