import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Clock,
  Calendar,
  Package,
  FileText,
  Save,
  X,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  ShieldCheck,
  RotateCw,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export const Screen12MedicationScheduling: React.FC = () => {
  const {
    scannedDraft,
    addMedication,
    navigateTo,
    activePatient,
    language,
  } = useApp();

  const isAr = language === 'ar';

  const defaultDraft = scannedDraft || {
    brandName: 'Januvia',
    brandNameAr: 'جانوڤيا',
    activeIngredient: 'Sitagliptin Phosphate',
    activeIngredientAr: 'سيتاجليبتين فوسفات',
    strength: '100 mg',
    form: 'tablet' as const,
    formAr: 'أقراص فموية',
    packageImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    totalQuantity: 28,
    remainingQuantity: 28,
    unit: 'tablets',
    unitAr: 'قرص',
    instructions: 'Take once daily in the morning with a glass of water.',
    instructionsAr: 'تناول قرصاً واحداً صباحاً مع كوب من الماء.',
    frequency: 'Once daily',
    frequencyAr: 'مرة يومياً',
  };

  const [brandName, setBrandName] = useState(defaultDraft.brandName || '');
  const [activeIngredient, setActiveIngredient] = useState(defaultDraft.activeIngredient || '');
  const [strength, setStrength] = useState(defaultDraft.strength || '500 mg');
  const [prescribedDosage, setPrescribedDosage] = useState('1 tablet');
  const [frequency, setFrequency] = useState('Once daily');
  const [morning, setMorning] = useState(true);
  const [afternoon, setAfternoon] = useState(false);
  const [evening, setEvening] = useState(false);
  const [night, setNight] = useState(false);
  const [morningTime, setMorningTime] = useState('08:30 AM');
  const [afternoonTime, setAfternoonTime] = useState('02:00 PM');
  const [eveningTime, setEveningTime] = useState('08:00 PM');
  const [nightTime, setNightTime] = useState('10:00 PM');
  const [startDate, setStartDate] = useState('2026-11-06');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [totalQuantity, setTotalQuantity] = useState(defaultDraft.totalQuantity || 30);
  const [instructions, setInstructions] = useState(defaultDraft.instructions || 'Take with food.');
  const [isRenewable, setIsRenewable] = useState(true);
  const [autoRefill, setAutoRefill] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const scheduledTimes: Record<string, string> = {};
    if (morning) scheduledTimes.morning = morningTime;
    if (afternoon) scheduledTimes.afternoon = afternoonTime;
    if (evening) scheduledTimes.evening = eveningTime;
    if (night) scheduledTimes.night = nightTime;

    addMedication({
      patientId: activePatient.id,
      brandName: brandName || 'New Medicine',
      brandNameAr: defaultDraft.brandNameAr || brandName,
      activeIngredient: activeIngredient || 'Active compound',
      activeIngredientAr: defaultDraft.activeIngredientAr || activeIngredient,
      strength: strength || '10mg',
      form: defaultDraft.form || 'tablet',
      formAr: defaultDraft.formAr || 'أقراص',
      packageImage: defaultDraft.packageImage || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      prescribedDosage: `${prescribedDosage} (${frequency})`,
      prescribedDosageAr: `${prescribedDosage} (${frequency})`,
      frequency: frequency,
      frequencyAr: frequency,
      scheduledTimes,
      startDate,
      endDate,
      totalQuantity: Number(totalQuantity),
      remainingQuantity: Number(totalQuantity),
      unit: defaultDraft.unit || 'tablets',
      unitAr: defaultDraft.unitAr || 'قرص',
      instructions: instructions,
      instructionsAr: instructions,
      status: 'active',
      refillDate: '2026-12-05',
      isLowStock: false,
      isRenewable: isRenewable,
      autoRefill: isRenewable ? autoRefill : false,
      refillStatus: 'normal',
    });

    navigateTo('medication_schedule');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Medication & Schedule"
        titleAr="تفاصيل وجدول الدواء"
        subtitle={isAr ? `للمريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
      />

      <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Medicine Summary Header Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft flex items-center gap-3">
          <img
            src={defaultDraft.packageImage}
            alt={brandName}
            className="w-14 h-14 rounded-2xl object-cover border border-[#E8E3D8] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="text-sm font-bold text-[#454D46] w-full border-b border-transparent hover:border-[#E8E3D8] focus:border-[#52766B] focus:outline-none"
              placeholder="Brand Name"
            />
            <input
              type="text"
              value={activeIngredient}
              onChange={(e) => setActiveIngredient(e.target.value)}
              className="text-xs text-[#52766B] font-semibold w-full border-b border-transparent hover:border-[#E8E3D8] focus:border-[#52766B] focus:outline-none mt-0.5"
              placeholder="Active Ingredient"
            />
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="text-[11px] font-bold text-[#454D46] bg-[#F7F5EF] px-2 py-0.5 rounded-lg border border-[#E8E3D8] w-20 text-center"
              />
              <span className="text-[11px] text-[#737B74]">
                {isAr ? defaultDraft.formAr : defaultDraft.form}
              </span>
            </div>
          </div>
        </div>

        {/* Treatment & Dosage Form Section */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3.5">
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
            {isAr ? 'التعليمات العلاجية والجرعة' : 'Prescription & Dosage'}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#454D46] mb-1">
                {isAr ? 'الجرعة الموصوفة' : 'Prescribed Dose'}
              </label>
              <input
                type="text"
                value={prescribedDosage}
                onChange={(e) => setPrescribedDosage(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
                placeholder="e.g. 1 tablet"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#454D46] mb-1">
                {isAr ? 'عدد المرات (التكرار)' : 'Frequency'}
              </label>
              <select
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                  if (e.target.value === 'Twice daily') {
                    setMorning(true);
                    setEvening(true);
                  } else if (e.target.value === 'Three times daily') {
                    setMorning(true);
                    setAfternoon(true);
                    setEvening(true);
                  }
                }}
                className="w-full px-2.5 py-2 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
              >
                <option value="Once daily">Once daily (مرة يومياً)</option>
                <option value="Twice daily">Twice daily (مرتين يومياً)</option>
                <option value="Three times daily">Three times daily (3 مرات)</option>
                <option value="At bedtime">At bedtime (قبل النوم)</option>
                <option value="As needed">As needed / PRN (عند اللزوم)</option>
              </select>
            </div>
          </div>

          {/* Time Slots Selection */}
          <div>
            <label className="block text-[11px] font-bold text-[#454D46] mb-2">
              {isAr ? 'أوقات تناول الدواء اليومية:' : 'Scheduled Daily Slots:'}
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Morning */}
              <div
                className={`p-2.5 rounded-2xl border transition-all ${
                  morning
                    ? 'border-[#52766B] bg-[#52766B]/10'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#454D46]">
                    <Sunrise className="w-4 h-4 text-[#52766B]" />
                    <span>{isAr ? 'الصباح' : 'Morning'}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={morning}
                    onChange={(e) => setMorning(e.target.checked)}
                    className="w-4 h-4 accent-[#52766B]"
                  />
                </div>
                {morning && (
                  <input
                    type="text"
                    value={morningTime}
                    onChange={(e) => setMorningTime(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#E8E3D8] rounded-xl text-xs text-center font-mono font-bold text-[#52766B]"
                  />
                )}
              </div>

              {/* Afternoon */}
              <div
                className={`p-2.5 rounded-2xl border transition-all ${
                  afternoon
                    ? 'border-[#52766B] bg-[#52766B]/10'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#454D46]">
                    <Sun className="w-4 h-4 text-[#D5A18E]" />
                    <span>{isAr ? 'الظهيرة' : 'Afternoon'}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={afternoon}
                    onChange={(e) => setAfternoon(e.target.checked)}
                    className="w-4 h-4 accent-[#52766B]"
                  />
                </div>
                {afternoon && (
                  <input
                    type="text"
                    value={afternoonTime}
                    onChange={(e) => setAfternoonTime(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#E8E3D8] rounded-xl text-xs text-center font-mono font-bold text-[#52766B]"
                  />
                )}
              </div>

              {/* Evening */}
              <div
                className={`p-2.5 rounded-2xl border transition-all ${
                  evening
                    ? 'border-[#52766B] bg-[#52766B]/10'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#454D46]">
                    <Sunset className="w-4 h-4 text-[#52766B]" />
                    <span>{isAr ? 'المساء' : 'Evening'}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={evening}
                    onChange={(e) => setEvening(e.target.checked)}
                    className="w-4 h-4 accent-[#52766B]"
                  />
                </div>
                {evening && (
                  <input
                    type="text"
                    value={eveningTime}
                    onChange={(e) => setEveningTime(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#E8E3D8] rounded-xl text-xs text-center font-mono font-bold text-[#52766B]"
                  />
                )}
              </div>

              {/* Night */}
              <div
                className={`p-2.5 rounded-2xl border transition-all ${
                  night
                    ? 'border-[#52766B] bg-[#52766B]/10'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#454D46]">
                    <Moon className="w-4 h-4 text-[#454D46]" />
                    <span>{isAr ? 'قبل النوم' : 'Night'}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={night}
                    onChange={(e) => setNight(e.target.checked)}
                    className="w-4 h-4 accent-[#52766B]"
                  />
                </div>
                {night && (
                  <input
                    type="text"
                    value={nightTime}
                    onChange={(e) => setNightTime(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#E8E3D8] rounded-xl text-xs text-center font-mono font-bold text-[#52766B]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Dates & Stock */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-[#454D46] mb-1">
                {isAr ? 'تاريخ البدء' : 'Start Date'}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#454D46] mb-1">
                {isAr ? 'كمية العلبة (حبوب)' : 'Package Quantity'}
              </label>
              <input
                type="number"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-[11px] font-bold text-[#454D46] mb-1">
              {isAr ? 'تعليمات خاصة بالمريض' : 'Additional Patient Instructions'}
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
              placeholder="e.g. Take with a meal, avoid crushing."
            />
          </div>

          {/* Renewable Medicine Option (New User Feature) */}
          <div className="pt-2 border-t border-[#E8E3D8] space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-[#454D46] flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-[#52766B]" />
                <span>{isAr ? 'هل هذا الدواء متجدد؟ (إعادة الطلب عند النفاد)' : 'Is this a Renewable Medication?'}</span>
              </label>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isRenewable ? 'bg-[#52766B]/15 text-[#52766B]' : 'bg-[#E8E3D8] text-[#737B74]'
              }`}>
                {isRenewable ? (isAr ? 'متجدد تلقائياً' : 'Renewable') : (isAr ? 'غير متجدد' : 'One-time')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Option: Renewable */}
              <button
                type="button"
                onClick={() => setIsRenewable(true)}
                className={`p-3 rounded-2xl border text-right rtl:text-right ltr:text-left transition-all ${
                  isRenewable
                    ? 'border-[#52766B] bg-[#52766B]/10 shadow-xs ring-1 ring-[#52766B]'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#454D46]">
                    {isAr ? '🔄 دواء متجدد دائم' : '🔄 Renewable Drug'}
                  </span>
                  {isRenewable && <CheckCircle2 className="w-4 h-4 text-[#52766B]" />}
                </div>
                <p className="text-[10px] text-[#737B74] leading-tight">
                  {isAr
                    ? 'عندما تنتهي العلبة، يظهر زر إعادة الطلب وتنبيه الصيدلية تلقائياً (مثل أدوية الضغط والسكري).'
                    : 'Show re-order button and low-stock alerts when finished (chronic meds).'}
                </p>
              </button>

              {/* Option: Non-renewable */}
              <button
                type="button"
                onClick={() => setIsRenewable(false)}
                className={`p-3 rounded-2xl border text-right rtl:text-right ltr:text-left transition-all ${
                  !isRenewable
                    ? 'border-[#D5A18E] bg-[#D5A18E]/15 shadow-xs ring-1 ring-[#D5A18E]'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#454D46]">
                    {isAr ? '⏱️ كورس محدد فقط' : '⏱️ One-Time Course'}
                  </span>
                  {!isRenewable && <CheckCircle2 className="w-4 h-4 text-[#9B4832]" />}
                </div>
                <p className="text-[10px] text-[#737B74] leading-tight">
                  {isAr
                    ? 'ينتهي العلاج بانتهاء الكمية ولا يتكرر طلبه (مثل المضادات الحيوية والمسكنات المؤقتة).'
                    : 'Treatment ends with package, no automatic refill button (e.g. antibiotics).'}
                </p>
              </button>
            </div>

            {/* Auto-refill Sub-checkbox if renewable */}
            {isRenewable && (
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#52766B]/5 border border-[#52766B]/20 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefill}
                  onChange={(e) => setAutoRefill(e.target.checked)}
                  className="w-4 h-4 accent-[#52766B] rounded"
                />
                <span className="text-[#454D46] font-medium text-[11px]">
                  {isAr
                    ? 'تفعيل تنبيه إعادة الطلب المسبق (قبل نفاد العلبة بيومين)'
                    : 'Enable proactive refill reminder 2 days before stock runs out'}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Verification guarantee */}
        <div className="bg-[#B7C6B0]/20 border border-[#B7C6B0]/60 rounded-2xl p-3 flex items-start gap-2 text-[11px] text-[#454D46]">
          <ShieldCheck className="w-4 h-4 text-[#52766B] shrink-0 mt-0.5" />
          <p>
            {isAr
              ? 'يتم حفظ هذا الجدول لإنشاء تذكيرات دقيقة للمريض وإرسال تنبيهات تلقائية في حال التأخر.'
              : 'Saving this schedule will automatically generate patient daily reminders and trigger missed dose alerts if unconfirmed.'}
          </p>
        </div>

        {/* Save & Cancel Actions */}
        <div className="space-y-2 pb-4">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            <Save className="w-4 h-4" />
            <span>{isAr ? 'حفظ وتفعيل جدول الدواء' : 'Save & Activate Medication'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('medication_management')}
            className="w-full py-2.5 px-4 rounded-2xl bg-white border border-[#E8E3D8] text-[#737B74] font-semibold text-xs hover:bg-[#F7F5EF] transition-colors"
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};
