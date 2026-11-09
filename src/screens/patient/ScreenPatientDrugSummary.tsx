import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Pill,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Clock,
  Heart,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Utensils,
  Droplets,
  Share2,
  Download,
  CheckCircle2,
  Info,
  Calendar,
  Sparkles,
  Volume2,
  VolumeX,
  Printer,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  ShoppingBag,
} from 'lucide-react';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

export const ScreenPatientDrugSummary: React.FC = () => {
  const {
    activePatient,
    patientMedications,
    language,
    navigateTo,
    requestRefill,
  } = useApp();

  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;
  const [activeTab, setActiveTab] = useState<'all' | 'schedule' | 'wallet'>('all');
  const [copiedCard, setCopiedCard] = useState(false);
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const { speakText, isSpeaking, speakingMessageId } = useVoiceAssistant({
    lang: language,
  });

  const activeMeds = patientMedications.filter((m) => m.status === 'active');

  // Purpose tags helper with friendly medical icons
  const getMedPurpose = (medId: string) => {
    switch (medId) {
      case 'med1': // Glucophage
        return {
          label: isAr ? 'علاج السكري وتثبيت سكر الدم' : 'Type 2 Diabetes Control',
          icon: Activity,
          color: '#52766B',
          bg: '#52766B]/15',
          tips: isAr ? 'مع وجبة الإفطار والعشاء مباشرة' : 'With breakfast & dinner meals',
          precaution: isAr ? 'احرص على شرب الماء ولا تطحن الحبة' : 'Take with water; do not crush',
          purposeIcon: '🩺',
        };
      case 'med2': // Norvasc
        return {
          label: isAr ? 'ضغط الدم وحماية الشرايين' : 'Blood Pressure Regulation',
          icon: Heart,
          color: '#52766B',
          bg: '#52766B]/15',
          tips: isAr ? 'صباحاً في نفس الموعد يومياً' : 'Every morning at the same time',
          precaution: isAr ? 'تجنب الوقوف السريع لتفادي الدوار' : 'Avoid sudden standing to prevent dizziness',
          purposeIcon: '❤️',
        };
      case 'med3': // Lipitor
        return {
          label: isAr ? 'تنظيم الكولسترول والدهون' : 'Cholesterol & Lipid Shield',
          icon: ShieldCheck,
          color: '#B7C6B0',
          bg: '#B7C6B0]/25',
          tips: isAr ? 'ليلاً قبل النوم' : 'At bedtime',
          precaution: isAr ? 'تجنب الجريب فروت وعصيره تماماً' : 'Strictly avoid grapefruit/juice',
          purposeIcon: '🫀',
        };
      case 'med4': // Aspirin Protect
        return {
          label: isAr ? 'حماية القلب والسيولة' : 'Cardiovascular Circulation Protection',
          icon: Heart,
          color: '#D5A18E',
          bg: '#D5A18E]/25',
          tips: isAr ? 'بعد وجبة الغداء مباشرة' : 'Directly after lunch',
          precaution: isAr ? 'حبة مغلفة؛ ابلعها كاملة بالماء' : 'Enteric coated; swallow whole',
          purposeIcon: '🩸',
        };
      default:
        return {
          label: isAr ? 'علاج منتظم موصوف' : 'Prescribed Regular Medicine',
          icon: Pill,
          color: '#52766B',
          bg: '#52766B]/15',
          tips: isAr ? 'حسب تعليمات الطبيب' : 'As prescribed by physician',
          precaution: isAr ? 'احفظه في مكان جاف' : 'Store in a cool dry place',
          purposeIcon: '💊',
        };
    }
  };

  const timeSlots = [
    {
      slot: 'morning',
      label: isAr ? 'أدوية الصباح (مع الإفطار)' : 'Morning Medicines',
      icon: Sunrise,
      color: '#52766B',
      meds: activeMeds.filter((m) => m.scheduledTimes.morning),
    },
    {
      slot: 'afternoon',
      label: isAr ? 'أدوية الظهيرة (بعد الغداء)' : 'Afternoon Medicines',
      icon: Sun,
      color: '#D5A18E',
      meds: activeMeds.filter((m) => m.scheduledTimes.afternoon),
    },
    {
      slot: 'evening',
      label: isAr ? 'أدوية المساء (مع العشاء)' : 'Evening Medicines',
      icon: Sunset,
      color: '#52766B',
      meds: activeMeds.filter((m) => m.scheduledTimes.evening),
    },
    {
      slot: 'night',
      label: isAr ? 'أدوية الليل (قبل النوم)' : 'Bedtime Medicines',
      icon: Moon,
      color: '#454D46',
      meds: activeMeds.filter((m) => m.scheduledTimes.night),
    },
  ];

  const handleShareCard = () => {
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="My Medication Summary"
        titleAr="ملخص أدويتي الشامل"
        subtitle={isAr ? `للمريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
        rightAction={
          <button
            onClick={handleShareCard}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E3D8] text-[#52766B] flex items-center justify-center hover:bg-[#E8E3D8]/40 shadow-xs"
            title={isAr ? 'مشاركة بطاقة الأدوية' : 'Share Medicine Card'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Top Patient Header with Photo & Quick Stat */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft flex items-center gap-3.5">
          <img
            src={activePatient.photo}
            alt={activePatient.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#52766B] shadow-xs shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-[#454D46] truncate">
                {isAr ? activePatient.nameAr : activePatient.name}
              </h2>
              <span className="text-xs bg-[#B7C6B0]/30 text-[#52766B] font-bold px-2 py-0.5 rounded-full border border-[#B7C6B0]/50">
                {activeMeds.length} {isAr ? 'أدوية' : 'meds'}
              </span>
            </div>
            <p className="text-xs text-[#737B74] mt-0.5">
              {activePatient.age} {isAr ? 'سنة' : 'years'} • {isAr ? 'فصيلة الدم' : 'Blood'}: {activePatient.bloodType}
            </p>
            <div className="text-[11px] text-[#52766B] font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'خطة علاجية نشطة ومحدثة' : 'Active verified prescription'}</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#E8E3D8] shadow-xs text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>{isAr ? 'جميع الأدوية' : 'All Medicines'}</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? 'حسب الأوقات' : 'By Time Slot'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isAr ? 'بطاقة المحفظة' : 'Wallet Card'}</span>
          </button>
        </div>

        {/* Tab 1: All Medicines Detailed Cards */}
        {activeTab === 'all' && (
          <div className="space-y-3.5">
            {activeMeds.map((med) => {
              const purpose = getMedPurpose(med.id);
              const isSpeakingThis = isSpeaking && speakingMessageId === med.id;
              const timesText = Object.entries(med.scheduledTimes)
                .map(([slot, time]) => `${isAr ? (slot === 'morning' ? 'الصباح' : slot === 'afternoon' ? 'الظهيرة' : slot === 'evening' ? 'المساء' : 'الليل') : slot}: ${time}`)
                .join(' • ');

              return (
                <div
                  key={med.id}
                  className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3 hover:border-[#52766B]/50 transition-all"
                >
                  {/* Top Row: Photo + Name + Purpose */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={med.packageImage}
                      alt={med.brandName}
                      className="w-18 h-18 rounded-2xl object-cover border border-[#E8E3D8] shrink-0 shadow-xs"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-[#454D46] truncate">
                          {isAr ? med.brandNameAr : med.brandName}
                        </h3>
                        <span className="text-xs font-mono font-bold text-[#52766B] bg-[#52766B]/10 px-2.5 py-0.5 rounded-lg border border-[#52766B]/20">
                          {med.strength}
                        </span>
                      </div>

                      <div className="text-xs text-[#52766B] font-semibold mt-0.5">
                        {isAr ? med.activeIngredientAr : med.activeIngredient}
                      </div>

                      {/* Purpose Tag */}
                      <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold bg-[#F7F5EF] px-2.5 py-1 rounded-xl border border-[#E8E3D8] text-[#454D46]">
                        <span>{purpose.purposeIcon}</span>
                        <span>{purpose.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Times & Dosage */}
                  <div className="bg-[#F7F5EF] p-3 rounded-2xl border border-[#E8E3D8]/80 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-[#454D46] font-semibold">
                      <Clock className="w-4 h-4 text-[#52766B] shrink-0" />
                      <span>{isAr ? 'المواعيد:' : 'Schedule:'}</span>
                      <span className="font-bold text-[#52766B]">{timesText}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#737B74]">
                      <Utensils className="w-4 h-4 text-[#D5A18E] shrink-0" />
                      <span>{purpose.tips}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#9B4832] font-medium pt-0.5">
                      <AlertTriangle className="w-4 h-4 text-[#9B4832] shrink-0" />
                      <span>{purpose.precaution}</span>
                    </div>
                  </div>

                  {/* Renewable Status & Re-order Row */}
                  <div className="pt-2 border-t border-[#E8E3D8]/60 flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      med.isRenewable
                        ? 'bg-[#52766B]/15 text-[#52766B]'
                        : 'bg-[#E8E3D8] text-[#737B74]'
                    }`}>
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>{med.isRenewable ? (isAr ? 'دواء متجدد (يُعاد طلبه)' : 'Renewable') : (isAr ? 'كورس محدد' : 'One-time')}</span>
                    </span>

                    {med.isRenewable ? (
                      <button
                        onClick={() => {
                          requestRefill(med.id);
                          setReorderedId(med.id);
                          setTimeout(() => setReorderedId(null), 3000);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all ${
                          reorderedId === med.id
                            ? 'bg-[#B7C6B0] text-[#52766B]'
                            : med.isLowStock
                            ? 'bg-[#D5A18E] text-white hover:bg-[#c38c7b] animate-pulse'
                            : 'bg-[#52766B] hover:bg-[#3F5C53] text-white'
                        }`}
                      >
                        {reorderedId === med.id ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-[#52766B]" />
                            <span>{isAr ? 'تم طلب العبوة ✓' : 'Ordered ✓'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3" />
                            <span>{isAr ? 'إعادة طلب الدواء' : 'Re-order Refill'}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#737B74] italic">
                        {isAr ? 'ينتهي بانتهاء الكورس' : 'No re-order'}
                      </span>
                    )}
                  </div>

                  {/* Bottom Bar: Stock + Read Out Loud Button */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="text-[11px] text-[#737B74] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#52766B]" />
                      <span>{isAr ? 'المخزون:' : 'Stock:'}</span>
                      <span className="font-bold text-[#454D46]">
                        {med.remainingQuantity} {isAr ? med.unitAr : med.unit}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        speakText(
                          isAr
                            ? `دواء ${med.brandNameAr} بتركيز ${med.strength}. الغرض منه: ${purpose.label}. الموعد: ${timesText}. ${med.isRenewable ? 'هذا دواء متجدد يتم إعادة طلبه عند قرب انتهاء العلبة.' : 'هذا كورس محدد المدة.'} تنبيه: ${purpose.precaution}.`
                            : `${med.brandName} ${med.strength}. Purpose: ${purpose.label}. Schedule: ${timesText}. ${med.isRenewable ? 'This is a renewable medication.' : 'This is a one-time course.'} Note: ${purpose.precaution}.`,
                          med.id
                        )
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isSpeakingThis
                          ? 'bg-[#52766B] text-white shadow-xs'
                          : 'bg-white hover:bg-[#F7F5EF] text-[#52766B] border border-[#E8E3D8]'
                      }`}
                    >
                      {isSpeakingThis ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إيقاف' : 'Stop'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#52766B]" />
                          <span>{isAr ? 'استمع للتعليمات' : 'Listen'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: By Time of Day */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {timeSlots.map((slot) => {
              const Icon = slot.icon;
              return (
                <div key={slot.slot} className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8E3D8]">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: slot.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#454D46]">{slot.label}</h4>
                      <p className="text-[11px] text-[#737B74]">
                        {slot.meds.length} {isAr ? 'حبوب في هذا الموعد' : 'pills in this slot'}
                      </p>
                    </div>
                  </div>

                  {slot.meds.length === 0 ? (
                    <p className="text-xs text-[#737B74] text-center py-2">
                      {isAr ? 'لا توجد أدوية مقررة في هذا التوقيت' : 'No medicines in this slot'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {slot.meds.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-2xl bg-[#F7F5EF] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={m.packageImage}
                              alt={m.brandName}
                              className="w-10 h-10 rounded-xl object-cover border border-[#E8E3D8]"
                            />
                            <div>
                              <div className="text-xs font-bold text-[#454D46]">
                                {isAr ? m.brandNameAr : m.brandName} ({m.strength})
                              </div>
                              <div className="text-[11px] text-[#737B74]">
                                {isAr ? m.prescribedDosageAr : m.prescribedDosage}
                              </div>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-[#52766B] font-mono bg-white px-2 py-1 rounded-xl border border-[#E8E3D8]">
                            {m.scheduledTimes[slot.slot as keyof typeof m.scheduledTimes]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Printable / Shareable Wallet Medicine Card */}
        {activeTab === 'wallet' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#52766B] to-[#364239] text-white rounded-3xl p-5 shadow-xl space-y-4 border-2 border-[#B7C6B0]/50 relative overflow-hidden">
              {/* Card Watermark */}
              <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                <Pill className="w-32 h-32" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                    D
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold tracking-wider uppercase">
                      DOAWY AI • بطاقة أدوية المريض
                    </h3>
                    <p className="text-[10px] text-[#E8E3D8]">Official Patient Medical Card</p>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                  {activePatient.bloodType}
                </span>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#E8E3D8] block">{isAr ? 'اسم المريض:' : 'Patient Name:'}</span>
                  <span className="font-bold">{activePatient.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#E8E3D8] block">{isAr ? 'العمر والصلة:' : 'Age:'}</span>
                  <span className="font-bold">{activePatient.age} yrs • {activePatient.relation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#E8E3D8] block">{isAr ? 'الطوارئ والعائلة:' : 'Emergency:'}</span>
                  <span className="font-bold">{activePatient.emergencyContact.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#E8E3D8] block">{isAr ? 'المستشفى:' : 'Hospital:'}</span>
                  <span className="font-bold truncate">{activePatient.hospital}</span>
                </div>
              </div>

              {/* Prescribed Drug List */}
              <div className="bg-black/20 rounded-2xl p-3 space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B7C6B0] border-b border-white/10 pb-1">
                  {isAr ? 'قائمة الأدوية المعتمدة الحالية:' : 'Active Prescribed Drugs:'}
                </div>
                {activeMeds.map((m) => (
                  <div key={m.id} className="flex justify-between items-center text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">
                        • {isAr ? m.brandNameAr : m.brandName} ({m.strength})
                      </span>
                      <span className="text-[9px] bg-white/15 px-1.5 py-0.2 rounded-md">
                        {m.isRenewable ? (isAr ? 'متجدد' : 'Renewable') : (isAr ? 'محدد' : 'Course')}
                      </span>
                    </div>
                    <span className="text-[#E8E3D8] font-mono">
                      {isAr ? m.frequencyAr : m.frequency}
                    </span>
                  </div>
                ))}
              </div>

              {/* Allergies Warning on Card */}
              <div className="bg-[#D5A18E]/30 rounded-xl p-2 text-[10px] text-[#F7F5EF] flex items-center gap-1.5 border border-[#D5A18E]/50">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F7F5EF] shrink-0" />
                <span>
                  {isAr ? 'الحساسية:' : 'Allergies:'} {(isAr ? activePatient.allergiesAr : activePatient.allergies).join(', ')}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleShareCard}
                className="flex-1 py-3 px-4 bg-[#52766B] hover:bg-[#3F5C53] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {copiedCard ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{isAr ? 'تم نسخ ومشاركة البطاقة!' : 'Card Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>{isAr ? 'مشاركة بطاقة الأدوية' : 'Share Medicine Card'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print?.()}
                className="py-3 px-4 bg-white border border-[#E8E3D8] text-[#454D46] hover:bg-[#F7F5EF] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Printer className="w-4 h-4 text-[#52766B]" />
                <span>{isAr ? 'طباعة' : 'Print'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <PatientBottomNav />
    </div>
  );
};
