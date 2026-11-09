import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { TimeOfDay } from '../../types';

export const Screen14MedicationSchedule: React.FC = () => {
  const {
    todayDoses,
    medications,
    activePatient,
    confirmDose,
    markDoseMissed,
    language,
    navigateTo,
  } = useApp();

  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [selectedDayOffset, setSelectedDayOffset] = useState(0); // 0 = Today
  const isAr = language === 'ar';

  const periods: { key: TimeOfDay; label: string; labelAr: string; icon: any; color: string }[] = [
    { key: 'morning', label: 'Morning (06:00 - 12:00)', labelAr: 'الصباح (06:00 - 12:00)', icon: Sunrise, color: '#52766B' },
    { key: 'afternoon', label: 'Afternoon (12:00 - 17:00)', labelAr: 'الظهيرة (12:00 - 17:00)', icon: Sun, color: '#D5A18E' },
    { key: 'evening', label: 'Evening (17:00 - 21:00)', labelAr: 'المساء (17:00 - 21:00)', icon: Sunset, color: '#52766B' },
    { key: 'night', label: 'Night (21:00 - 06:00)', labelAr: 'الليل وقبل النوم', icon: Moon, color: '#454D46' },
  ];

  // Helper days of week
  const days = [
    { day: 'Mon', dayAr: 'الإثنين', date: '3 Nov', active: false },
    { day: 'Tue', dayAr: 'الثلاثاء', date: '4 Nov', active: false },
    { day: 'Wed', dayAr: 'الأربعاء', date: '5 Nov', active: true }, // Today
    { day: 'Thu', dayAr: 'الخميس', date: '6 Nov', active: false },
    { day: 'Fri', dayAr: 'الجمعة', date: '7 Nov', active: false },
    { day: 'Sat', dayAr: 'السبت', date: '8 Nov', active: false },
    { day: 'Sun', dayAr: 'الأحد', date: '9 Nov', active: false },
  ];

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Medication Schedule"
        titleAr="جدول مواعيد الأدوية"
        subtitle={isAr ? `المريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Daily vs Weekly Toggle */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#E8E3D8] shadow-xs">
          <button
            onClick={() => setViewMode('daily')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'daily'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            {isAr ? 'الجدول اليومي' : 'Daily Timeline'}
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'weekly'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            {isAr ? 'التقويم الأسبوعي' : 'Weekly View'}
          </button>
        </div>

        {/* Days of week selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {days.map((d, idx) => (
            <button
              key={idx}
              className={`flex-1 min-w-[48px] py-2 px-1 rounded-2xl text-center border transition-all ${
                d.active
                  ? 'bg-[#52766B] text-white border-[#52766B] shadow-soft'
                  : 'bg-white text-[#454D46] border-[#E8E3D8] hover:bg-[#F7F5EF]'
              }`}
            >
              <div className="text-[10px] font-medium opacity-80">
                {isAr ? d.dayAr : d.day}
              </div>
              <div className="text-xs font-extrabold mt-0.5">{d.date.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Timeline by periods: Morning, Afternoon, Evening, Night */}
        <div className="space-y-4">
          {periods.map((period) => {
            const PeriodIcon = period.icon;
            const periodDoses = todayDoses.filter((d) => d.scheduledPeriod === period.key);

            return (
              <div key={period.key} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#454D46]">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: period.color }}
                  >
                    <PeriodIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>{isAr ? period.labelAr : period.label}</span>
                  <span className="text-[11px] font-normal text-[#737B74]">
                    ({periodDoses.length})
                  </span>
                </div>

                {periodDoses.length === 0 ? (
                  <div className="bg-white/60 rounded-2xl p-3 border border-dashed border-[#E8E3D8] text-[11px] text-[#737B74] text-center">
                    {isAr ? 'لا توجد جرعات مجدولة في هذه الفترة' : 'No doses scheduled for this period'}
                  </div>
                ) : (
                  periodDoses.map((dose) => {
                    const med = medications.find((m) => m.id === dose.medicationId);
                    if (!med) return null;

                    const isConfirmed = dose.status === 'confirmed';
                    const isMissed = dose.status === 'missed';
                    const isPending = dose.status === 'pending';

                    return (
                      <div
                        key={dose.id}
                        className={`bg-white rounded-3xl p-4 border transition-all shadow-soft space-y-3 ${
                          isConfirmed
                            ? 'border-[#B7C6B0] bg-[#F7F5EF]/70'
                            : isMissed
                            ? 'border-[#D5A18E] bg-[#D5A18E]/10'
                            : 'border-[#E8E3D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={med.packageImage}
                              alt={med.brandName}
                              className="w-12 h-12 rounded-2xl object-cover border border-[#E8E3D8]"
                            />
                            <div>
                              <div className="text-sm font-bold text-[#454D46]">
                                {isAr ? med.brandNameAr : med.brandName}
                              </div>
                              <div className="text-xs text-[#737B74]">
                                {med.strength} • {isAr ? med.formAr : med.form}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-mono font-bold text-[#52766B]">
                              {dose.scheduledTime}
                            </div>
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                                isConfirmed
                                  ? 'bg-[#B7C6B0]/40 text-[#52766B]'
                                  : isMissed
                                  ? 'bg-[#D5A18E] text-white'
                                  : 'bg-[#E8E3D8] text-[#454D46]'
                              }`}
                            >
                              {isConfirmed
                                ? isAr ? 'تم التأكيد' : 'Taken'
                                : isMissed
                                ? isAr ? 'فائتة' : 'Missed'
                                : isAr ? 'قادمة' : 'Pending'}
                            </span>
                          </div>
                        </div>

                        {/* Confirmation note or instructions */}
                        <div className="text-[11px] text-[#737B74] bg-[#F7F5EF] p-2 rounded-xl flex items-center justify-between">
                          <span>
                            {isConfirmed && dose.confirmedAt
                              ? isAr
                                ? `أكّد المريض التناول الساعة ${dose.confirmedAt}`
                                : `Confirmed by patient at ${dose.confirmedAt}`
                              : isAr
                              ? med.instructionsAr
                              : med.instructions}
                          </span>
                        </div>

                        {/* Action buttons for caregiver */}
                        {isPending && (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => confirmDose(dose.id)}
                              className="flex-1 py-2 px-3 rounded-xl bg-[#52766B] hover:bg-[#3F5C53] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isAr ? 'تأكيد أخذ الجرعة نيابة عنه' : 'Confirm Dose Taken'}</span>
                            </button>
                            <button
                              onClick={() => markDoseMissed(dose.id)}
                              className="py-2 px-3 rounded-xl bg-white border border-[#D5A18E] text-[#9B4832] text-xs font-bold hover:bg-[#D5A18E]/10 transition-colors"
                            >
                              {isAr ? 'تسجيل كفائتة' : 'Mark Missed'}
                            </button>
                          </div>
                        )}

                        {isMissed && (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-[#9B4832] font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{isAr ? 'بحاجة للمتابعة والاتصال' : 'Requires follow-up call'}</span>
                            </span>
                            <a
                              href={`tel:${activePatient.emergencyContact.phone}`}
                              className="px-3 py-1.5 rounded-xl bg-[#52766B] text-white text-xs font-bold flex items-center gap-1"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>{isAr ? 'اتصال بالمريض' : 'Call Patient'}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
