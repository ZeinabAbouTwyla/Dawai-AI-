import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Phone,
  AlertTriangle,
  Pill,
  Heart,
  TrendingUp,
  FileText,
  Calendar,
  Share2,
  Edit3,
  CheckCircle2,
} from 'lucide-react';

export const Screen09PatientProfile: React.FC = () => {
  const { activePatient, patientMedications, navigateTo, language } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'meds' | 'allergies'>('info');
  const isAr = language === 'ar';

  const activeMeds = patientMedications.filter((m) => m.status === 'active');
  const pastMeds = patientMedications.filter((m) => m.status !== 'active');

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title={isAr ? activePatient.nameAr : activePatient.name}
        titleAr={activePatient.nameAr}
        subtitle={isAr ? activePatient.relationAr : activePatient.relation}
        subtitleAr={activePatient.relationAr}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Hero Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
          <div className="flex items-start gap-4">
            <img
              src={activePatient.photo}
              alt={activePatient.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8E3D8]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#454D46]">
                  {isAr ? activePatient.nameAr : activePatient.name}
                </h2>
                <button className="text-[#52766B] p-1 hover:bg-[#52766B]/10 rounded-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#737B74]">
                {activePatient.age} {isAr ? 'سنة' : 'years'} • {activePatient.gender === 'male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')} • {isAr ? 'فصيلة الدم' : 'Blood'}: {activePatient.bloodType}
              </p>
              <div className="mt-2 text-xs text-[#454D46] font-medium">
                🏥 {activePatient.hospital}
              </div>
              <div className="text-[11px] text-[#737B74]">
                👨‍⚕️ {activePatient.doctorName}
              </div>
            </div>
          </div>

          {/* Adherence & Metrics Bar */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E8E3D8]">
            <div className="bg-[#B7C6B0]/20 p-2.5 rounded-2xl text-center">
              <span className="text-[10px] text-[#52766B] font-bold block">
                {isAr ? 'نسبة الالتزام الشهري' : 'Adherence Rate'}
              </span>
              <span className="text-base font-extrabold text-[#52766B] flex items-center justify-center gap-1 mt-0.5">
                <TrendingUp className="w-4 h-4" />
                {activePatient.adherenceRate}%
              </span>
            </div>

            <div className="bg-[#F7F5EF] p-2.5 rounded-2xl text-center">
              <span className="text-[10px] text-[#737B74] font-bold block">
                {isAr ? 'الأدوية النشطة' : 'Active Medicines'}
              </span>
              <span className="text-base font-extrabold text-[#454D46] mt-0.5 block">
                {activeMeds.length} {isAr ? 'أدوية' : 'meds'}
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Quick Box */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D5A18E]/20 text-[#9B4832] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#737B74] tracking-wider block">
                  {isAr ? 'جهة اتصال الطوارئ' : 'Emergency Contact'}
                </span>
                <span className="text-xs font-bold text-[#454D46]">
                  {activePatient.emergencyContact.name} ({activePatient.emergencyContact.relation})
                </span>
                <span className="text-[11px] text-[#737B74] block">
                  {activePatient.emergencyContact.phone}
                </span>
              </div>
            </div>

            <a
              href={`tel:${activePatient.emergencyContact.phone}`}
              className="px-3 py-1.5 bg-[#52766B] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs hover:bg-[#3F5C53]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isAr ? 'اتصال' : 'Call'}</span>
            </a>
          </div>
        </div>

        {/* Allergies Highlight Box */}
        <div className="bg-[#D5A18E]/15 border border-[#D5A18E]/40 rounded-3xl p-4">
          <div className="flex items-center gap-2 mb-2 text-[#9B4832]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold">
              {isAr ? 'الحساسية الدوائية والتحذيرات' : 'Drug Allergies & Warnings'}
            </span>
          </div>
          <div className="space-y-1">
            {(isAr ? activePatient.allergiesAr : activePatient.allergies).map((a, i) => (
              <div
                key={i}
                className="text-xs font-semibold text-[#9B4832] bg-white/80 px-2.5 py-1 rounded-xl inline-block mr-1.5 mb-1 border border-[#D5A18E]/30"
              >
                ⚠️ {a}
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider mb-2">
            {isAr ? 'الأمراض المزمنة المسجلة' : 'Documented Conditions'}
          </h3>
          <div className="space-y-2">
            {(isAr ? activePatient.conditionsAr : activePatient.conditions).map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5EF] text-xs text-[#454D46] font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-[#52766B]" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Medications Preview */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'الأدوية الموصوفة حالياً' : 'Current Active Medications'}
            </h3>
            <button
              onClick={() => navigateTo('medication_management')}
              className="text-xs font-bold text-[#52766B] hover:underline"
            >
              {isAr ? 'إدارة الأدوية' : 'Manage'}
            </button>
          </div>

          <div className="space-y-2.5">
            {activeMeds.map((m) => (
              <div
                key={m.id}
                onClick={() => navigateTo('medication_schedule')}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F7F5EF] hover:bg-[#E8E3D8]/40 cursor-pointer transition-colors"
              >
                <img
                  src={m.packageImage}
                  alt={m.brandName}
                  className="w-10 h-10 rounded-xl object-cover border border-[#E8E3D8]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#454D46] truncate">
                    {isAr ? m.brandNameAr : m.brandName} ({m.strength})
                  </div>
                  <div className="text-[11px] text-[#737B74] truncate">
                    {isAr ? m.frequencyAr : m.frequency} • {m.remainingQuantity} {isAr ? m.unitAr : m.unit}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B7C6B0]/30 text-[#52766B]">
                  {isAr ? 'نشط' : 'Active'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex gap-2">
          <button
            onClick={() => navigateTo('medical_summary')}
            className="flex-1 py-3 px-3 rounded-2xl bg-white border border-[#E8E3D8] text-[#454D46] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#F7F5EF] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#52766B]" />
            <span>{isAr ? 'الملف الطبي الشامل' : 'Medical Summary'}</span>
          </button>
          <button
            onClick={() => navigateTo('add_medication')}
            className="flex-1 py-3 px-3 rounded-2xl bg-[#52766B] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#3F5C53] transition-colors shadow-xs"
          >
            <Pill className="w-4 h-4" />
            <span>{isAr ? 'إضافة دواء' : 'Add Medication'}</span>
          </button>
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
