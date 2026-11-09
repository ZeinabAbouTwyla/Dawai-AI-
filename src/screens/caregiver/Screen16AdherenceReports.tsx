import React from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const Screen16AdherenceReports: React.FC = () => {
  const { activePatient, patientMedications, language } = useApp();
  const isAr = language === 'ar';

  const weeklyRate = 94;
  const monthlyRate = activePatient.adherenceRate || 92;

  // Day-by-day weekly breakdown
  const weeklyDays = [
    { name: 'Mon', nameAr: 'الإثنين', rate: 100 },
    { name: 'Tue', nameAr: 'الثلاثاء', rate: 100 },
    { name: 'Wed', nameAr: 'الأربعاء', rate: 80 }, // Missed one
    { name: 'Thu', nameAr: 'الخميس', rate: 100 },
    { name: 'Fri', nameAr: 'الجمعة', rate: 95 },
    { name: 'Sat', nameAr: 'السبت', rate: 90 },
    { name: 'Sun', nameAr: 'الأحد', rate: 100 },
  ];

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Adherence Reports"
        titleAr="تقارير الالتزام الدوائي"
        subtitle={isAr ? `المريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Adherence Score Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
            <span className="text-[11px] font-bold text-[#737B74] uppercase tracking-wider block">
              {isAr ? 'الالتزام الأسبوعي' : 'Weekly Adherence'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-[#52766B]">{weeklyRate}%</span>
              <span className="text-xs text-[#52766B] font-bold">↑ +2%</span>
            </div>
            <p className="text-[10px] text-[#737B74] mt-1">
              {isAr ? '28 من 30 جرعة مؤكدة' : '28 of 30 doses confirmed'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
            <span className="text-[11px] font-bold text-[#737B74] uppercase tracking-wider block">
              {isAr ? 'الالتزام الشهري' : 'Monthly Adherence'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-[#52766B]">{monthlyRate}%</span>
              <span className="text-xs text-[#52766B] font-bold">Stable</span>
            </div>
            <p className="text-[10px] text-[#737B74] mt-1">
              {isAr ? 'ممتاز، أعلى من المعدل' : 'Consistent adherence'}
            </p>
          </div>
        </div>

        {/* Minimal Weekly Bar Chart */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#454D46]">
              {isAr ? 'معدل الالتزام بالأيام (آخر 7 أيام)' : '7-Day Dose Compliance'}
            </h3>
            <span className="text-[11px] font-bold text-[#52766B] bg-[#B7C6B0]/30 px-2 py-0.5 rounded-full">
              {weeklyRate}% Avg
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end justify-between h-32 pt-4 px-2 border-b border-[#E8E3D8]">
            {weeklyDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[9px] text-[#737B74] font-mono">{d.rate}%</span>
                <div className="w-5 bg-[#E8E3D8] rounded-t-lg relative flex items-end h-20">
                  <div
                    style={{ height: `${d.rate}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      d.rate >= 90 ? 'bg-[#52766B]' : 'bg-[#D5A18E]'
                    }`}
                  />
                </div>
                <span className="text-[10px] font-bold text-[#454D46]">
                  {isAr ? d.nameAr[0] : d.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-around text-[11px] text-[#737B74] pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52766B]" />
              {isAr ? 'التزام كامل (≥90%)' : 'High Adherence'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5A18E]" />
              {isAr ? 'جرعة فائتة / تأخير' : 'Missed / Delayed'}
            </span>
          </div>
        </div>

        {/* Medication-Specific Adherence Breakdown */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
            {isAr ? 'الالتزام حسب كل دواء' : 'Medication-Specific Breakdown'}
          </h3>

          <div className="space-y-3">
            {patientMedications
              .filter((m) => m.status === 'active')
              .map((med, index) => {
                const medRate = [98, 95, 90, 96][index % 4];
                return (
                  <div key={med.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#454D46]">
                        {isAr ? med.brandNameAr : med.brandName} ({med.strength})
                      </span>
                      <span className="font-mono font-bold text-[#52766B]">{medRate}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#E8E3D8] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#52766B] transition-all"
                        style={{ width: `${medRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Milestone Award Card */}
        <div className="bg-[#B7C6B0]/20 border border-[#B7C6B0]/50 rounded-3xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#52766B] text-white flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#454D46]">
              {isAr ? 'وسام الانتظام الممتاز' : 'High Consistency Ribbon'}
            </div>
            <p className="text-[11px] text-[#737B74] mt-0.5">
              {isAr
                ? 'حافظ إبراهيم على التزام يتجاوز 90% للشهر الثالث على التوالي.'
                : 'Ibrahim maintained >90% dose consistency for 3 consecutive months.'}
            </p>
          </div>
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
