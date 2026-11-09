import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Pill,
  Clock,
  Calendar,
  AlertTriangle,
  Info,
  ShieldCheck,
  Package,
  ShoppingBag,
  RotateCw,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export const Screen20MedicationDetails: React.FC = () => {
  const { screenParams, medications, language, navigateTo, requestRefill } = useApp();
  const [reordered, setReordered] = useState(false);
  const isAr = language === 'ar';

  const medId = screenParams?.medId || 'med1';
  const med = medications.find((m) => m.id === medId) || medications[0];

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title={isAr ? med.brandNameAr : med.brandName}
        titleAr={med.brandNameAr}
        subtitle={med.strength}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Large Medication Image */}
        <div className="rounded-3xl overflow-hidden bg-white border border-[#E8E3D8] shadow-soft p-3">
          <img
            src={med.packageImage}
            alt={med.brandName}
            className="w-full h-52 object-cover rounded-2xl"
          />
        </div>

        {/* Title & Core Details Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E3D8] shadow-soft space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-[#454D46]">
                {isAr ? med.brandNameAr : med.brandName}
              </h2>
              <span className="text-sm font-bold text-[#52766B] bg-[#52766B]/10 px-3 py-1 rounded-xl">
                {med.strength}
              </span>
            </div>
            <p className="text-sm text-[#52766B] font-semibold mt-1">
              {isAr ? med.activeIngredientAr : med.activeIngredient}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E8E3D8] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737B74] font-medium">{isAr ? 'الشكل الدوائي:' : 'Form:'}</span>
              <span className="font-bold text-[#454D46]">{isAr ? med.formAr : med.form}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737B74] font-medium">{isAr ? 'عدد المرات:' : 'Frequency:'}</span>
              <span className="font-bold text-[#454D46]">{isAr ? med.frequencyAr : med.frequency}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737B74] font-medium">{isAr ? 'المخزون المتبقي:' : 'Stock left:'}</span>
              <span className="font-bold text-[#52766B]">{med.remainingQuantity} / {med.totalQuantity} {isAr ? med.unitAr : med.unit}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E3D8]/50">
              <span className="text-[#737B74] font-medium">{isAr ? 'حالة التجديد:' : 'Refill Type:'}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                med.isRenewable ? 'bg-[#52766B]/15 text-[#52766B]' : 'bg-[#E8E3D8] text-[#737B74]'
              }`}>
                {med.isRenewable
                  ? (isAr ? '🔄 دواء متجدد (يُعاد طلبه عند النفاد)' : 'Renewable on finish')
                  : (isAr ? '⏱️ كورس محدد (لا يتكرر طلبه)' : 'One-time course')}
              </span>
            </div>
          </div>
        </div>

        {/* Re-order Action Card for Renewable Medicines */}
        {med.isRenewable && (
          <div className="bg-white rounded-3xl p-4 border-2 border-[#52766B]/30 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#52766B]/10 text-[#52766B] flex items-center justify-center">
                  <RotateCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#454D46]">
                    {isAr ? 'طلب إعادة صرف الدواء' : 'Prescription Re-order'}
                  </h4>
                  <p className="text-[10px] text-[#737B74]">
                    {isAr ? 'اطلب عبوة جديدة فوراً تصلك قبل نفاد المخزون' : 'Order a new package before your supply ends'}
                  </p>
                </div>
              </div>

              {med.isLowStock && (
                <span className="text-[10px] bg-[#D5A18E]/20 text-[#9B4832] font-bold px-2 py-0.5 rounded-full">
                  {isAr ? 'مخزون منخفض ⚠️' : 'Low Stock ⚠️'}
                </span>
              )}
            </div>

            {reordered ? (
              <div className="p-3 rounded-2xl bg-[#B7C6B0]/30 border border-[#52766B] flex items-center gap-2 text-xs text-[#52766B] font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#52766B]" />
                <span>{isAr ? 'تم إرسال طلب إعادة صرف الدواء بنجاح!' : 'Refill order successfully submitted!'}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  requestRefill(med.id);
                  setReordered(true);
                  setTimeout(() => setReordered(false), 3500);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAr ? 'إعادة طلب هذا الدواء الآن' : 'Re-order This Medication Now'}</span>
              </button>
            )}
          </div>
        )}

        {/* Prescribed Instructions Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E3D8] shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#52766B] uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>{isAr ? 'تعليمات الطبيب وكيفية التناول' : 'How to Take this Medicine'}</span>
          </div>
          <p className="text-sm text-[#454D46] font-medium leading-relaxed bg-[#F7F5EF] p-3 rounded-2xl border border-[#E8E3D8]">
            {isAr ? med.instructionsAr : med.instructions}
          </p>
        </div>

        {/* General Medicine Info & Safety */}
        <div className="bg-[#B7C6B0]/20 border border-[#B7C6B0]/60 rounded-3xl p-4 flex items-start gap-3 text-xs text-[#454D46]">
          <ShieldCheck className="w-5 h-5 text-[#52766B] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block mb-0.5">
              {isAr ? 'معلومة هامة عن هذا الدواء' : 'Important Safety Note'}
            </span>
            <p className="text-[11px] text-[#737B74]">
              {isAr
                ? 'حافظ على تناول الدواء في نفس الوقت يومياً مع كوب ماء كامل. لا توقف الدواء دون استشارة طبيبك.'
                : 'Take at the same time each day with a full glass of water. Never adjust your dosage without consulting your doctor.'}
            </p>
          </div>
        </div>

        {/* Ask Educational AI shortcut */}
        <button
          onClick={() => navigateTo('health_education_chat', { query: `Tell me about ${med.brandName}` })}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#3F5C53] transition-colors"
        >
          <span>{isAr ? `اسأل المساعد التعليمي عن ${med.brandNameAr}` : `Learn more about ${med.brandName}`}</span>
        </button>
      </div>

      <PatientBottomNav />
    </div>
  );
};
