import React from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Check,
  Clock,
  AlertCircle,
  Pill,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const Screen19PatientSchedule: React.FC = () => {
  const {
    todayDoses,
    medications,
    activePatient,
    confirmDose,
    navigateTo,
    language,
  } = useApp();

  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="My Daily Schedule"
        titleAr="جدول مواعيدي اليومية"
        subtitle={isAr ? 'الأدوية المجدولة لهذا اليوم' : 'Medications for today'}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Link to Full Drug Summary */}
        <div
          onClick={() => navigateTo('patient_drug_summary')}
          className="bg-white rounded-2xl p-3 border border-[#52766B]/30 flex items-center justify-between cursor-pointer hover:bg-[#F7F5EF] transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#52766B] text-white flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#454D46]">
                {isAr ? 'عرض ملخص أدويتي مع بطاقة المحفظة' : 'View Full Drug Summary & Wallet Card'}
              </div>
              <div className="text-[10px] text-[#737B74]">
                {isAr ? 'أوقات الجرعات بالصور وتعليمات الأكل' : 'Photos, timings, and dietary instructions'}
              </div>
            </div>
          </div>
          <NextChevron className="w-4 h-4 text-[#52766B]" />
        </div>

        {todayDoses.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#E8E3D8]">
            <Pill className="w-12 h-12 text-[#737B74] mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold text-[#454D46]">
              {isAr ? 'لا توجد أدوية متبقية لليوم' : 'No medications scheduled for today'}
            </p>
          </div>
        ) : (
          todayDoses.map((dose) => {
            const med = medications.find((m) => m.id === dose.medicationId);
            if (!med) return null;

            const isConfirmed = dose.status === 'confirmed';
            const isMissed = dose.status === 'missed';
            const isPending = dose.status === 'pending';

            return (
              <div
                key={dose.id}
                className={`bg-white rounded-3xl p-4 border-2 shadow-soft space-y-3 transition-all ${
                  isConfirmed
                    ? 'border-[#B7C6B0] bg-[#F7F5EF]/60'
                    : isMissed
                    ? 'border-[#D5A18E] bg-[#D5A18E]/10'
                    : 'border-[#52766B]/50'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono font-extrabold text-[#52766B] bg-[#52766B]/10 px-3 py-1 rounded-xl">
                    ⏰ {dose.scheduledTime}
                  </span>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isConfirmed
                        ? 'bg-[#B7C6B0]/40 text-[#52766B]'
                        : isMissed
                        ? 'bg-[#D5A18E] text-white'
                        : 'bg-[#E8E3D8] text-[#454D46]'
                    }`}
                  >
                    {isConfirmed
                      ? isAr ? 'تم أخذها ✓' : 'Taken ✓'
                      : isMissed
                      ? isAr ? 'فائتة ⚠️' : 'Missed ⚠️'
                      : isAr ? 'قادمة' : 'Upcoming'}
                  </span>
                </div>

                {/* Medicine Content */}
                <div
                  onClick={() => navigateTo('medication_details', { medId: med.id })}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <img
                    src={med.packageImage}
                    alt={med.brandName}
                    className="w-18 h-18 rounded-2xl object-cover border border-[#E8E3D8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-extrabold text-[#454D46] truncate leading-tight">
                      {isAr ? med.brandNameAr : med.brandName}
                    </h3>
                    <div className="text-xs font-bold text-[#52766B] mt-0.5">
                      {med.strength} • {isAr ? med.formAr : med.form}
                    </div>
                    <p className="text-xs text-[#737B74] mt-1 line-clamp-2">
                      {isAr ? med.instructionsAr : med.instructions}
                    </p>
                  </div>
                </div>

                {/* Quick Confirmation Action if pending */}
                {isPending && (
                  <button
                    onClick={() => confirmDose(dose.id)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98]"
                  >
                    <Check className="w-5 h-5" strokeWidth={3} />
                    <span>{isAr ? 'أخذت هذه الحبة الآن' : 'I Took This Medicine'}</span>
                  </button>
                )}

                {isConfirmed && dose.confirmedAt && (
                  <div className="text-xs text-[#52766B] font-semibold flex items-center gap-1.5 pt-1">
                    <Check className="w-4 h-4" />
                    <span>{isAr ? `أكّدت التناول في ${dose.confirmedAt}` : `Confirmed at ${dose.confirmedAt}`}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <PatientBottomNav />
    </div>
  );
};
