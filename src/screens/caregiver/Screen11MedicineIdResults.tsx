import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Edit2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Pill,
} from 'lucide-react';

export const Screen11MedicineIdResults: React.FC = () => {
  const { scannedDraft, setScannedDraft, navigateTo, language, activePatient } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  if (!scannedDraft) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 bg-[#F7F5EF] text-center">
        <Pill className="w-12 h-12 text-[#52766B] mb-3" />
        <p className="text-sm text-[#454D46] font-bold">
          {isAr ? 'لم يتم مسح أي دواء بعد' : 'No medication scanned yet.'}
        </p>
        <button
          onClick={() => navigateTo('add_medication')}
          className="mt-4 px-4 py-2 bg-[#52766B] text-white text-xs font-bold rounded-xl"
        >
          {isAr ? 'بدء المسح' : 'Start Scanner'}
        </button>
      </div>
    );
  }

  const confidence = scannedDraft.confidenceScore || 96;
  const isHighConfidence = confidence >= 90;

  const handleConfirm = () => {
    navigateTo('medication_scheduling');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Identification Results"
        titleAr="نتيجة فحص الدواء"
        subtitle={isAr ? 'تحقق من صحة الدواء الممسوح' : 'Verify Identified Medication'}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Verification Alert Banner */}
        <div
          className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
            isHighConfidence
              ? 'bg-[#B7C6B0]/25 border-[#52766B]/30 text-[#454D46]'
              : 'bg-[#D5A18E]/20 border-[#D5A18E]/60 text-[#9B4832]'
          }`}
        >
          {isHighConfidence ? (
            <ShieldCheck className="w-5 h-5 text-[#52766B] shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-[#9B4832] shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-xs font-bold">
              {isHighConfidence
                ? isAr
                  ? `تم التعرف بنجاح (دقة ${confidence}%)`
                  : `High Confidence Match (${confidence}%)`
                : isAr
                ? 'تنبيه: دقة التعرف متوسطة - يرجى المراجعة اليدوية'
                : 'Attention: Review package details with care'}
            </div>
            <p className="text-[11px] text-[#737B74] mt-0.5 leading-relaxed">
              {isAr
                ? 'لا تعتمد كلياً على التعرف الآلي. تأكد من مطابقة الاسم والتركيز للروشتة الطبية.'
                : 'Never assume automated identification is completely error-free. Always compare with the physician prescription.'}
            </p>
          </div>
        </div>

        {/* Identified Medication Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-[#F7F5EF] border border-[#E8E3D8] h-48">
            <img
              src={scannedDraft.packageImage}
              alt={scannedDraft.brandName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {isAr ? 'الصورة الممسوحة' : 'Captured Image'}
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3 pt-1">
            <div className="border-b border-[#E8E3D8]/80 pb-2 flex items-center justify-between">
              <span className="text-xs text-[#737B74] font-medium">
                {isAr ? 'الاسم التجاري' : 'Brand Name'}
              </span>
              <span className="text-sm font-bold text-[#454D46]">
                {isAr ? scannedDraft.brandNameAr || scannedDraft.brandName : scannedDraft.brandName}
              </span>
            </div>

            <div className="border-b border-[#E8E3D8]/80 pb-2 flex items-center justify-between">
              <span className="text-xs text-[#737B74] font-medium">
                {isAr ? 'المادة الفعالة' : 'Active Ingredient'}
              </span>
              <span className="text-xs font-semibold text-[#52766B] max-w-[65%] text-right">
                {isAr
                  ? scannedDraft.activeIngredientAr || scannedDraft.activeIngredient
                  : scannedDraft.activeIngredient}
              </span>
            </div>

            <div className="border-b border-[#E8E3D8]/80 pb-2 flex items-center justify-between">
              <span className="text-xs text-[#737B74] font-medium">
                {isAr ? 'التركيز المكتشف' : 'Strength'}
              </span>
              <span className="text-xs font-bold text-[#454D46] bg-[#F7F5EF] px-2.5 py-1 rounded-lg border border-[#E8E3D8]">
                {scannedDraft.strength}
              </span>
            </div>

            <div className="border-b border-[#E8E3D8]/80 pb-2 flex items-center justify-between">
              <span className="text-xs text-[#737B74] font-medium">
                {isAr ? 'الشكل الصيدلاني' : 'Pharmaceutical Form'}
              </span>
              <span className="text-xs text-[#454D46] font-medium">
                {isAr ? scannedDraft.formAr || scannedDraft.form : scannedDraft.form}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#737B74] font-medium">
                {isAr ? 'المريض المستهدف' : 'Target Patient'}
              </span>
              <span className="text-xs font-bold text-[#52766B]">
                {isAr ? activePatient.nameAr : activePatient.name}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isAr ? 'تأكيد ومتابعة ضبط الجرعات' : 'Confirm & Set Schedule'}</span>
            <NextIcon className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigateTo('medication_scheduling')}
              className="py-3 px-3 rounded-2xl bg-white border border-[#E8E3D8] text-[#454D46] hover:bg-[#F7F5EF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#52766B]" />
              <span>{isAr ? 'تعديل البيانات' : 'Edit Information'}</span>
            </button>

            <button
              onClick={() => navigateTo('add_medication')}
              className="py-3 px-3 rounded-2xl bg-white border border-[#E8E3D8] text-[#454D46] hover:bg-[#F7F5EF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-[#737B74]" />
              <span>{isAr ? 'إعادة المسح' : 'Scan Again'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
