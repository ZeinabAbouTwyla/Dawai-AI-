import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import {
  Check,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Heart,
  Volume2,
  Calendar,
  Pill,
  FileText,
  Utensils,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export const Screen18PatientHome: React.FC = () => {
  const {
    activePatient,
    todayDoses,
    medications,
    confirmDose,
    snoozeDose,
    navigateTo,
    language,
  } = useApp();

  const [confirmedJustNow, setConfirmedJustNow] = useState(false);
  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  // Find next pending dose
  const nextPendingDose = todayDoses.find((d) => d.status === 'pending');
  const nextMedication = nextPendingDose
    ? medications.find((m) => m.id === nextPendingDose.medicationId)
    : null;

  const totalDoses = todayDoses.length;
  const confirmedCount = todayDoses.filter((d) => d.status === 'confirmed').length;
  const progressPercent = totalDoses > 0 ? Math.round((confirmedCount / totalDoses) * 100) : 100;

  const handleTakeMedicine = () => {
    if (nextPendingDose) {
      confirmDose(nextPendingDose.id);
      setConfirmedJustNow(true);
      setTimeout(() => setConfirmedJustNow(false), 3000);
    }
  };

  const handleRemindLater = () => {
    if (nextPendingDose) {
      snoozeDose(nextPendingDose.id, 30);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      {/* Top Friendly Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#E8E3D8]/60 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <img
            src={activePatient.photo}
            alt={activePatient.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#52766B]"
          />
          <div>
            <span className="text-xs font-semibold text-[#737B74] block">
              {isAr ? 'صباح الخير،' : 'Good Morning,'}
            </span>
            <h1 className="text-lg font-bold text-[#454D46]">
              {isAr ? activePatient.nameAr : activePatient.name}
            </h1>
          </div>
        </div>

        {/* SOS Shortcut Button */}
        <button
          onClick={() => navigateTo('emergency_sos')}
          className="px-3 py-1.5 rounded-full bg-[#D5A18E]/20 text-[#9B4832] border border-[#D5A18E]/50 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
        >
          <AlertTriangle className="w-4 h-4 text-[#9B4832]" />
          <span>SOS</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Success Alert Banner when taken */}
        {confirmedJustNow && (
          <div className="bg-[#B7C6B0]/30 border-2 border-[#52766B] rounded-3xl p-4 flex items-center gap-3 shadow-soft animate-bounce">
            <div className="w-10 h-10 rounded-full bg-[#52766B] text-white flex items-center justify-center shrink-0">
              <Check className="w-6 h-6" strokeWidth={3} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#52766B]">
                {isAr ? 'أحسنت! تم تأكيد أخذ الجرعة' : 'Well done! Dose recorded'}
              </div>
              <div className="text-xs text-[#454D46]">
                {isAr ? 'تم إشعار مقدم الرعاية بنجاح.' : 'Your family caregiver has been notified.'}
              </div>
            </div>
          </div>
        )}

        {/* HERO: Next Scheduled Medication Card */}
        {nextPendingDose && nextMedication ? (
          <div className="bg-white rounded-3xl p-5 border-2 border-[#52766B]/50 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#52766B] uppercase tracking-wider bg-[#52766B]/10 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                <span>{isAr ? 'الجرعة القادمة' : 'Next Medication'}</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#454D46] bg-[#F7F5EF] px-2.5 py-1 rounded-xl border border-[#E8E3D8]">
                {nextPendingDose.scheduledTime}
              </span>
            </div>

            {/* Medicine Visual & Details */}
            <div className="flex items-start gap-4">
              <img
                src={nextMedication.packageImage}
                alt={nextMedication.brandName}
                className="w-24 h-24 rounded-2xl object-cover border border-[#E8E3D8] shrink-0 shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-[#454D46] leading-tight">
                  {isAr ? nextMedication.brandNameAr : nextMedication.brandName}
                </h2>
                <div className="text-sm font-bold text-[#52766B] mt-0.5">
                  {nextMedication.strength}
                </div>
                <div className="text-xs text-[#737B74] mt-1 font-medium">
                  {isAr ? nextMedication.prescribedDosageAr : nextMedication.prescribedDosage}
                </div>
                <div className="text-[11px] text-[#454D46] mt-2 bg-[#F7F5EF] p-2 rounded-xl border border-[#E8E3D8]">
                  💡 {isAr ? nextMedication.instructionsAr : nextMedication.instructions}
                </div>
              </div>
            </div>

            {/* PRIMARY ACCESSIBLE ACTION: Large "I Took My Medicine" */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleTakeMedicine}
                className="w-full py-4 px-6 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md active:scale-[0.98] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <span>{isAr ? 'تناولتُ دوائي الآن' : 'I Took My Medicine'}</span>
              </button>

              <button
                onClick={handleRemindLater}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#F7F5EF] text-[#737B74] hover:text-[#454D46] font-semibold text-xs border border-[#E8E3D8] transition-colors"
              >
                {isAr ? 'ذكرني بعد 30 دقيقة' : 'Remind Me Later (30 mins)'}
              </button>
            </div>
          </div>
        ) : (
          /* All doses confirmed for today */
          <div className="bg-white rounded-3xl p-6 border border-[#B7C6B0] shadow-soft text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#B7C6B0]/30 text-[#52766B] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" strokeWidth={3} />
            </div>
            <h2 className="text-lg font-bold text-[#454D46]">
              {isAr ? 'رائع جداً! تم أخذ جميع جرعات اليوم' : 'All medications taken today!'}
            </h2>
            <p className="text-xs text-[#737B74]">
              {isAr
                ? 'أنت منتظم بشكل ممتاز ومقدم الرعاية مطمئن عليك.'
                : 'Great job maintaining your health schedule. Your family is proud of you!'}
            </p>
          </div>
        )}

        {/* Daily Progress Indicator */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#454D46]">
              {isAr ? 'تقدم جرعات اليوم:' : "Today's Dose Progress:"}
            </span>
            <span className="font-bold text-[#52766B] font-mono">
              {confirmedCount} / {totalDoses} {isAr ? 'جرعات' : 'Doses'} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#E8E3D8] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#52766B] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Patient Drug Summary Shortcut Card */}
        <div
          onClick={() => navigateTo('patient_drug_summary')}
          className="bg-linear-to-r from-[#52766B]/15 via-[#B7C6B0]/20 to-[#E8E3D8]/50 rounded-3xl p-4 border-2 border-[#52766B]/30 shadow-soft cursor-pointer hover:border-[#52766B] transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#52766B] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6 text-[#F7F5EF]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-[#454D46]">
                    {isAr ? 'ملخص أدويتي الشامل' : 'My Medication Summary'}
                  </h3>
                  <span className="text-[10px] bg-[#52766B] text-white font-bold px-2 py-0.5 rounded-full">
                    {medications.length} {isAr ? 'أدوية' : 'meds'}
                  </span>
                </div>
                <p className="text-xs text-[#737B74] mt-0.5">
                  {isAr
                    ? 'دليلك المبسط بالصور والأوقات وبطاقة المحفظة'
                    : 'Visual guide, food timings & wallet card'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#52766B] group-hover:bg-[#52766B] group-hover:text-white transition-colors">
              <NextChevron className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Remaining Today's Schedule Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'جدول اليوم الكامل' : "Today's Medications"}
            </h3>
            <button
              onClick={() => navigateTo('patient_schedule')}
              className="text-xs font-bold text-[#52766B] hover:underline flex items-center"
            >
              <span>{isAr ? 'عرض الكل' : 'View Schedule'}</span>
              <NextChevron className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {todayDoses.map((dose) => {
              const med = medications.find((m) => m.id === dose.medicationId);
              if (!med) return null;
              const isTaken = dose.status === 'confirmed';

              return (
                <div
                  key={dose.id}
                  onClick={() => navigateTo('medication_details', { medId: med.id })}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isTaken
                      ? 'bg-[#F7F5EF]/60 border-[#E8E3D8] opacity-75'
                      : 'bg-white border-[#E8E3D8] hover:border-[#52766B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        isTaken
                          ? 'bg-[#52766B] text-white'
                          : 'border-2 border-[#E8E3D8] text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#454D46]">
                        {isAr ? med.brandNameAr : med.brandName}
                      </div>
                      <div className="text-[11px] text-[#737B74]">
                        {med.strength} • {dose.scheduledTime}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isTaken
                        ? 'bg-[#B7C6B0]/30 text-[#52766B]'
                        : 'bg-[#E8E3D8] text-[#454D46]'
                    }`}
                  >
                    {isTaken ? (isAr ? 'تم التناول' : 'Taken') : isAr ? 'قادم' : 'Upcoming'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education Prompt Banner */}
        <div
          onClick={() => navigateTo('health_education')}
          className="p-4 rounded-3xl bg-[#B7C6B0]/25 border border-[#52766B]/30 flex items-center justify-between cursor-pointer hover:bg-[#B7C6B0]/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#52766B] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#B7C6B0]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#454D46]">
                {isAr ? 'اسأل عن دوائك وتثقف صحياً' : 'Ask about your medications'}
              </div>
              <div className="text-[11px] text-[#737B74]">
                {isAr ? 'معلومات طبية مبسطة وموثوقة' : 'Simple, trustworthy health education'}
              </div>
            </div>
          </div>
          <NextChevron className="w-4 h-4 text-[#52766B]" />
        </div>
      </div>

      <PatientBottomNav />
    </div>
  );
};
