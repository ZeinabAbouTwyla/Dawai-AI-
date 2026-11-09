import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Camera,
  Upload,
  Edit3,
  Scan,
  Sparkles,
  Check,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Medication } from '../../types';

export const Screen10AddMedication: React.FC = () => {
  const { navigateTo, setScannedDraft, language, activePatient } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const isAr = language === 'ar';

  // Demo medicine packages to test real optical recognition
  const demoPills = [
    {
      brandName: 'Januvia',
      brandNameAr: 'جانوڤيا',
      activeIngredient: 'Sitagliptin Phosphate',
      activeIngredientAr: 'سيتاجليبتين فوسفات',
      strength: '100 mg',
      form: 'tablet' as const,
      formAr: 'أقراص فموية',
      packageImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      totalQuantity: 28,
      unit: 'tablets',
      unitAr: 'قرص',
      instructions: 'Take once daily in the morning with or without food.',
      instructionsAr: 'تناول قرصاً واحداً صباحاً مع الطعام أو بدونه.',
      frequency: 'Once daily',
      frequencyAr: 'مرة يومياً',
      confidenceScore: 98,
    },
    {
      brandName: 'Concor',
      brandNameAr: 'كونكور',
      activeIngredient: 'Bisoprolol Fumarate',
      activeIngredientAr: 'بيسوبرولول فومارات',
      strength: '5 mg',
      form: 'tablet' as const,
      formAr: 'أقراص مغلفة',
      packageImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
      totalQuantity: 30,
      unit: 'tablets',
      unitAr: 'قرص',
      instructions: 'Take in the morning with breakfast for heart rate regulation.',
      instructionsAr: 'تناوله صباحاً مع الإفطار لتنظيم نبضات القلب.',
      frequency: 'Once daily in morning',
      frequencyAr: 'مرة صباحاً',
      confidenceScore: 96,
    },
    {
      brandName: 'Nexium',
      brandNameAr: 'نيكسيوم',
      activeIngredient: 'Esomeprazole Magnesium',
      activeIngredientAr: 'إيزوميبرازول مغنيسيوم',
      strength: '40 mg',
      form: 'capsule' as const,
      formAr: 'كبسولات معوية',
      packageImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
      totalQuantity: 28,
      unit: 'capsules',
      unitAr: 'كبسولة',
      instructions: 'Take at least 1 hour before breakfast on an empty stomach.',
      instructionsAr: 'تناول كبسولة واحدة قبل الإفطار بساعة على معدة خاوية.',
      frequency: 'Once daily before breakfast',
      frequencyAr: 'مرة يومياً على الريق',
      confidenceScore: 99,
    },
  ];

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const chosen = demoPills[selectedPreset];
      setScannedDraft({
        ...chosen,
        patientId: activePatient.id,
        status: 'active',
        remainingQuantity: chosen.totalQuantity,
        refillDate: '2026-12-05',
        isLowStock: false,
        scheduledTimes: {
          morning: '08:30 AM',
        },
        startDate: '2026-11-06',
        endDate: '2026-12-31',
        prescribedDosage: chosen.instructions,
        prescribedDosageAr: chosen.instructionsAr,
      });
      navigateTo('medicine_id_results');
    }, 1200);
  };

  const handleManualEntry = () => {
    setScannedDraft({
      brandName: '',
      brandNameAr: '',
      activeIngredient: '',
      activeIngredientAr: '',
      strength: '',
      form: 'tablet',
      formAr: 'أقراص',
      packageImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      totalQuantity: 30,
      remainingQuantity: 30,
      unit: 'tablets',
      unitAr: 'قرص',
      patientId: activePatient.id,
      status: 'active',
      isLowStock: false,
      refillDate: '2026-12-05',
      confidenceScore: 100,
    });
    navigateTo('medication_scheduling');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Add Medication"
        titleAr="إضافة دواء جديد"
        subtitle={isAr ? `للمريض: ${activePatient.nameAr}` : `For: ${activePatient.name}`}
        showBack
        showSOS={false}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Camera Viewfinder Card */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border-2 border-[#52766B] shadow-soft aspect-[4/3] flex flex-col justify-between p-4">
          {/* Background simulated camera preview */}
          <img
            src={demoPills[selectedPreset].packageImage}
            alt="Medication Box Preview"
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter contrast-125"
          />

          {/* Scanner Viewfinder Target Frame */}
          <div className="absolute inset-8 border-2 border-dashed border-white/70 rounded-2xl pointer-events-none flex items-center justify-center">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#B7C6B0] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#B7C6B0] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#B7C6B0] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#B7C6B0] rounded-br-lg" />

            {/* Scanning Laser Line */}
            {isScanning && (
              <div className="absolute inset-x-2 h-0.5 bg-[#52766B] shadow-[0_0_12px_#52766B] animate-pulse" />
            )}

            {!isScanning && (
              <span className="bg-black/60 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                {isAr ? 'وجّه الكاميرا نحو علبة الدواء' : 'Align medicine package in frame'}
              </span>
            )}
          </div>

          {/* Top Status */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-[#52766B]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#B7C6B0]" />
              <span>{isAr ? 'التعرف البصري الذكي' : 'Optical Medicine AI'}</span>
            </span>
            <span className="text-white text-[11px] font-mono bg-black/40 px-2 py-0.5 rounded-md">
              HD 60FPS
            </span>
          </div>

          {/* Bottom helper */}
          <div className="relative z-10 text-center">
            <p className="text-white/90 text-xs font-medium drop-shadow-md">
              {isAr
                ? 'صور علبة الدواء أو شريط الحبوب وليس الروشتة المكتوبة'
                : 'Photograph the medicine package or blister, not handwritten prescriptions.'}
            </p>
          </div>
        </div>

        {/* Demo pill selector for instant testing */}
        <div className="bg-white rounded-3xl p-3.5 border border-[#E8E3D8] shadow-soft">
          <div className="text-[11px] font-bold text-[#737B74] uppercase tracking-wider mb-2">
            {isAr ? 'اختر علبة دواء للتجربة السريعة:' : 'Choose a demo package to scan:'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {demoPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPreset(idx)}
                className={`p-2 rounded-2xl border text-left transition-all ${
                  selectedPreset === idx
                    ? 'border-[#52766B] bg-[#52766B]/10 font-bold'
                    : 'border-[#E8E3D8] bg-[#F7F5EF] text-[#454D46]'
                }`}
              >
                <div className="text-xs truncate text-[#454D46]">
                  {isAr ? pill.brandNameAr : pill.brandName}
                </div>
                <div className="text-[10px] text-[#737B74] truncate">{pill.strength}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action: Capture Button */}
        <div className="space-y-2.5">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري التعرف على الدواء...' : 'Scanning & Analyzing Box...'}</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>{isAr ? 'التقاط صورة للعلبة والتعرف' : 'Take Photo & Identify'}</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleTriggerScan}
              className="py-3 px-3 rounded-2xl bg-white border border-[#E8E3D8] text-[#454D46] hover:bg-[#F7F5EF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-4 h-4 text-[#52766B]" />
              <span>{isAr ? 'رفع من المعرض' : 'Upload Image'}</span>
            </button>

            <button
              onClick={handleManualEntry}
              className="py-3 px-3 rounded-2xl bg-white border border-[#E8E3D8] text-[#454D46] hover:bg-[#F7F5EF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-[#52766B]" />
              <span>{isAr ? 'إدخال يدوي' : 'Enter Manually'}</span>
            </button>
          </div>
        </div>

        {/* Clinical Disclaimer Note */}
        <div className="bg-[#E8E3D8]/40 border border-[#E8E3D8] rounded-2xl p-3 flex items-start gap-2 text-xs text-[#737B74]">
          <Info className="w-4 h-4 text-[#52766B] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {isAr
              ? 'يقوم النظام بقراءة الاسم والتركيز والمادة الفعالة لمساعدتك، ولكن يجب دوماً التحقق من مطابقة العلبة لتعليمات الطبيب.'
              : 'Our scanner assists by reading the active ingredient and strength. Caregivers must verify with medical prescription.'}
          </p>
        </div>
      </div>
    </div>
  );
};
