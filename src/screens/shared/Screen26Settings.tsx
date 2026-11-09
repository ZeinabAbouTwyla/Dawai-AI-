import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  User,
  Globe,
  Bell,
  Lock,
  Shield,
  Users,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Heart,
  Check,
  RefreshCw,
} from 'lucide-react';

export const Screen26Settings: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    patients,
    navigateTo,
    resetDemoData,
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Settings & Account"
        titleAr="الإعدادات والحساب"
        showBack
        showSOS={false}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#52766B] text-white flex items-center justify-center font-bold text-lg shrink-0">
            {role === 'caregiver' ? 'TR' : 'IB'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#454D46] truncate">
              {role === 'caregiver'
                ? isAr ? 'طارق المنصور' : 'Tariq Al-Mansour'
                : isAr ? 'إبراهيم المنصور' : 'Ibrahim Al-Mansour'}
            </h3>
            <p className="text-xs text-[#737B74]">
              {role === 'caregiver'
                ? isAr ? 'مقدم رعاية عائلي معتمد' : 'Family Caregiver (Son)'
                : isAr ? 'مريض مسجل' : 'Registered Patient'}
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-[#B7C6B0]/30 text-[#52766B] px-2 py-0.5 rounded-full">
              {role === 'caregiver' ? 'Caregiver Account' : 'Patient Account'}
            </span>
          </div>
        </div>

        {/* Experience Mode Switcher */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-2">
          <div className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
            {isAr ? 'تجربة الاستخدام الحالية' : 'Active Experience Mode'}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setRole('caregiver')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center text-center transition-all ${
                role === 'caregiver'
                  ? 'bg-[#52766B] text-white border-[#52766B] shadow-xs'
                  : 'bg-[#F7F5EF] text-[#454D46] border-[#E8E3D8] hover:bg-white'
              }`}
            >
              <span>{isAr ? 'مقدم الرعاية' : 'Caregiver'}</span>
              <span className="text-[10px] font-normal opacity-80 mt-0.5">
                {isAr ? 'إدارة وتحليلات' : 'Operational'}
              </span>
            </button>

            <button
              onClick={() => setRole('patient')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center text-center transition-all ${
                role === 'patient'
                  ? 'bg-[#52766B] text-white border-[#52766B] shadow-xs'
                  : 'bg-[#F7F5EF] text-[#454D46] border-[#E8E3D8] hover:bg-white'
              }`}
            >
              <span>{isAr ? 'المريض' : 'Patient'}</span>
              <span className="text-[10px] font-normal opacity-80 mt-0.5">
                {isAr ? 'واجهة ميسرة' : 'Accessible'}
              </span>
            </button>
          </div>
        </div>

        {/* General Settings List */}
        <div className="bg-white rounded-3xl p-2 border border-[#E8E3D8] shadow-soft space-y-1">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="w-full p-3 rounded-2xl hover:bg-[#F7F5EF] flex items-center justify-between text-xs text-[#454D46] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#52766B]/15 text-[#52766B] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'لغة التطبيق' : 'Language'}</span>
            </div>
            <span className="text-xs font-bold text-[#52766B]">
              {isAr ? 'العربية (RTL)' : 'English (LTR)'}
            </span>
          </button>

          {/* Connected Family Members */}
          <button
            onClick={() => navigateTo('patient_linking')}
            className="w-full p-3 rounded-2xl hover:bg-[#F7F5EF] flex items-center justify-between text-xs text-[#454D46] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B7C6B0]/30 text-[#52766B] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'أفراد العائلة المرتبطون' : 'Family Members'}</span>
            </div>
            <span className="text-xs text-[#737B74]">
              {patients.length} {isAr ? 'مرضى' : 'connected'}
            </span>
          </button>

          {/* Notifications Toggle */}
          <div className="p-3 rounded-2xl flex items-center justify-between text-xs text-[#454D46]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8E3D8] text-[#454D46] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'إشعارات التذكير وتنبيه الجرعات' : 'Dose Reminders'}</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#52766B]"
            />
          </div>

          {/* Biometrics & Privacy */}
          <div className="p-3 rounded-2xl flex items-center justify-between text-xs text-[#454D46]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8E3D8] text-[#454D46] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'قفل البصمة والخصوصية' : 'Biometric Security'}</span>
            </div>
            <input
              type="checkbox"
              checked={biometricsEnabled}
              onChange={(e) => setBiometricsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#52766B]"
            />
          </div>

          {/* Privacy & Medical Data */}
          <div className="p-3 rounded-2xl flex items-center justify-between text-xs text-[#454D46]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#52766B]/15 text-[#52766B] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'سياسة حماية البيانات الصحية' : 'Health Data Privacy'}</span>
            </div>
            <NextChevron className="w-4 h-4 text-[#737B74]" />
          </div>
        </div>

        {/* Demo Data Reset */}
        <button
          onClick={resetDemoData}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-[#E8E3D8] text-[#737B74] hover:text-[#454D46] text-xs font-bold hover:bg-[#F7F5EF] transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isAr ? 'إعادة ضبط البيانات التجريبية' : 'Reset Demo Medical Data'}</span>
        </button>

        {/* Logout */}
        <button
          onClick={() => navigateTo('login')}
          className="w-full py-3 px-4 rounded-2xl bg-[#D5A18E]/20 text-[#9B4832] border border-[#D5A18E]/50 text-xs font-bold hover:bg-[#D5A18E]/30 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
        </button>
      </div>

      {role === 'caregiver' && <CaregiverBottomNav />}
    </div>
  );
};
