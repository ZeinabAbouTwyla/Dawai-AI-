import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { Mail, Lock, Phone, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

export const Screen03Login: React.FC = () => {
  const { navigateTo, language } = useApp();
  const [identifier, setIdentifier] = useState('tariq@familycare.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('caregiver_dashboard');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Sign In"
        titleAr="تسجيل الدخول"
        showBack
        showNotifications={false}
        showSOS={false}
      />

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#454D46]">
              {isAr ? 'مرحباً بعودتك' : 'Welcome back'}
            </h2>
            <p className="text-sm text-[#737B74] mt-1">
              {isAr
                ? 'أدخل بريدك الإلكتروني أو رقم هاتفك لمتابعة عائلتك'
                : 'Enter your credentials to continue managing medication'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#454D46] mb-1.5">
                {isAr ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737B74]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B] transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#454D46]">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <button
                  type="button"
                  className="text-xs text-[#52766B] font-medium hover:underline"
                >
                  {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737B74]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#737B74] hover:text-[#454D46]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <span>{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="pt-6 text-center border-t border-[#E8E3D8]/80">
          <p className="text-xs text-[#737B74]">
            {isAr ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
            <button
              onClick={() => navigateTo('register')}
              className="text-[#52766B] font-bold hover:underline"
            >
              {isAr ? 'إنشاء حساب جديد' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Screen04Register: React.FC = () => {
  const { navigateTo, language } = useApp();
  const [fullName, setFullName] = useState('Tariq Al-Mansour');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [email, setEmail] = useState('tariq@familycare.org');
  const [password, setPassword] = useState('');
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('account_type');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Create Account"
        titleAr="إنشاء حساب جديد"
        showBack
        showNotifications={false}
        showSOS={false}
      />

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#454D46]">
              {isAr ? 'انضم إلى عائلة دوائي' : 'Join DOAWY AI'}
            </h2>
            <p className="text-xs text-[#737B74] mt-1">
              {isAr
                ? 'خطوتك الأولى نحو رعاية آمنة ومنتظمة لعائلتك'
                : 'A calm, dedicated platform for family medication care'}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#454D46] mb-1">
                {isAr ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B]"
                placeholder="e.g. Tariq Al-Mansour"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#454D46] mb-1">
                {isAr ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737B74]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#454D46] mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737B74]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#454D46] mb-1">
                {isAr ? 'كلمة المرور' : 'Create Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737B74]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-sm text-[#454D46] focus:outline-none focus:border-[#52766B]"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <span>{isAr ? 'إنشاء الحساب والمتابعة' : 'Create Account & Continue'}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="pt-4 text-center border-t border-[#E8E3D8]/80">
          <p className="text-xs text-[#737B74]">
            {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
            <button
              onClick={() => navigateTo('login')}
              className="text-[#52766B] font-bold hover:underline"
            >
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
