import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  User,
  HeartHandshake,
  Phone,
  FileText,
  Globe,
  Bell,
  Eye,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  ShieldCheck,
  Pill,
} from 'lucide-react';

export const Screen23PatientProfile: React.FC = () => {
  const {
    activePatient,
    language,
    setLanguage,
    setRole,
    navigateTo,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [largeFont, setLargeFont] = useState(true);
  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(activePatient.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="My Profile"
        titleAr="ملفي الشخصي"
        subtitle={isAr ? activePatient.nameAr : activePatient.name}
        showBack={false}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient Photo & Info Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E3D8] shadow-soft flex items-center gap-4">
          <img
            src={activePatient.photo}
            alt={activePatient.name}
            className="w-18 h-18 rounded-2xl object-cover border-2 border-[#52766B]"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#454D46]">
              {isAr ? activePatient.nameAr : activePatient.name}
            </h2>
            <p className="text-xs text-[#737B74] mt-0.5">
              {activePatient.age} {isAr ? 'سنة' : 'years old'} • {isAr ? 'فصيلة' : 'Blood'}: {activePatient.bloodType}
            </p>
            <div className="mt-2 text-xs text-[#52766B] font-bold">
              🏥 {activePatient.hospital}
            </div>
          </div>
        </div>

        {/* Connected Caregiver Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#737B74] uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#52766B]" />
            <span>{isAr ? 'مقدم الرعاية المسؤول عني' : 'My Family Caregiver'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#52766B] text-white flex items-center justify-center font-bold text-sm">
                T
              </div>
              <div>
                <div className="text-xs font-bold text-[#454D46]">
                  {activePatient.emergencyContact.name}
                </div>
                <div className="text-[11px] text-[#737B74]">
                  {activePatient.emergencyContact.relation} • {activePatient.emergencyContact.phone}
                </div>
              </div>
            </div>

            <a
              href={`tel:${activePatient.emergencyContact.phone}`}
              className="p-2.5 rounded-xl bg-[#52766B] text-white hover:bg-[#3F5C53]"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Family Connection Code */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[#737B74]">
              {isAr ? 'رمز ربط الحساب العائلي:' : 'Family Link Code:'}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 font-mono font-bold text-[#52766B] bg-[#52766B]/10 px-2.5 py-1 rounded-xl"
            >
              <span>{activePatient.inviteCode}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Settings & Accessibility List */}
        <div className="bg-white rounded-3xl p-2 border border-[#E8E3D8] shadow-soft space-y-1">
          {/* Patient Drug Summary Shortcut */}
          <button
            onClick={() => navigateTo('patient_drug_summary')}
            className="w-full p-3 rounded-2xl hover:bg-[#F7F5EF] flex items-center justify-between text-xs text-[#454D46] transition-colors border-b border-[#E8E3D8]/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#52766B] text-white flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </div>
              <div className="text-right rtl:text-right ltr:text-left">
                <span className="font-extrabold text-[#454D46] block">{isAr ? 'ملخص أدويتي وجدول الجرعات' : 'My Drug Summary & Doses'}</span>
                <span className="text-[10px] text-[#737B74] block">{isAr ? 'عرض بطاقة المحفظة والأوقات والتعليمات' : 'Wallet card, meal instructions & timings'}</span>
              </div>
            </div>
            <NextChevron className="w-4 h-4 text-[#737B74]" />
          </button>

          {/* Medical Summary Shortcut */}
          <button
            onClick={() => navigateTo('medical_summary')}
            className="w-full p-3 rounded-2xl hover:bg-[#F7F5EF] flex items-center justify-between text-xs text-[#454D46] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#52766B]/15 text-[#52766B] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'عرض ملفي الطبي الشامل' : 'View Medical Summary'}</span>
            </div>
            <NextChevron className="w-4 h-4 text-[#737B74]" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="w-full p-3 rounded-2xl hover:bg-[#F7F5EF] flex items-center justify-between text-xs text-[#454D46] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#B7C6B0]/30 text-[#52766B] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'اللغة (Language)' : 'Language (العربية)'}</span>
            </div>
            <span className="text-xs text-[#52766B] font-bold">
              {isAr ? 'العربية (RTL)' : 'English'}
            </span>
          </button>

          {/* Large text toggle */}
          <div className="p-3 rounded-2xl flex items-center justify-between text-xs text-[#454D46]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E8E3D8] text-[#454D46] flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="font-bold">{isAr ? 'تكبير حجم الخط لكبار السن' : 'Large Text for Seniors'}</span>
            </div>
            <input
              type="checkbox"
              checked={largeFont}
              onChange={(e) => setLargeFont(e.target.checked)}
              className="w-4 h-4 accent-[#52766B]"
            />
          </div>

          {/* Emergency SOS Shortcut */}
          <button
            onClick={() => navigateTo('emergency_sos')}
            className="w-full p-3 rounded-2xl hover:bg-[#D5A18E]/20 flex items-center justify-between text-xs text-[#9B4832] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D5A18E]/30 text-[#9B4832] flex items-center justify-center font-bold">
                SOS
              </div>
              <span className="font-bold">{isAr ? 'نداء الطوارئ السريع' : 'Emergency SOS'}</span>
            </div>
            <NextChevron className="w-4 h-4 text-[#9B4832]" />
          </button>
        </div>

        {/* Switch Persona / Logout */}
        <button
          onClick={() => setRole('caregiver')}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-[#E8E3D8] text-[#52766B] text-xs font-bold hover:bg-[#F7F5EF] transition-colors flex items-center justify-center gap-2"
        >
          <span>{isAr ? 'التبديل إلى حساب مقدم الرعاية' : 'Switch to Caregiver Experience'}</span>
        </button>
      </div>

      <PatientBottomNav />
    </div>
  );
};
