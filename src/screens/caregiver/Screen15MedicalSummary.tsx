import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  FileText,
  Share2,
  Download,
  AlertTriangle,
  Pill,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';

export const Screen15MedicalSummary: React.FC = () => {
  const { activePatient, patientMedications, medicalRecords, language } = useApp();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'conditions' | 'allergies' | 'currentMeds' | 'history' | 'timeline'
  >('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const isAr = language === 'ar';

  const activeMeds = patientMedications.filter((m) => m.status === 'active');
  const completedMeds = patientMedications.filter((m) => m.status === 'completed');
  const discontinuedMeds = patientMedications.filter((m) => m.status === 'discontinued');

  const tabs: { id: typeof activeTab; label: string; labelAr: string }[] = [
    { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة' },
    { id: 'conditions', label: 'Conditions', labelAr: 'الحالات' },
    { id: 'allergies', label: 'Allergies', labelAr: 'الحساسية' },
    { id: 'currentMeds', label: 'Current Meds', labelAr: 'الأدوية الحالية' },
    { id: 'history', label: 'Med History', labelAr: 'السجل الدوائي' },
    { id: 'timeline', label: 'Timeline', labelAr: 'الخط الزمني' },
  ];

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 1800);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Comprehensive Medical Summary"
        titleAr="الملف والسجل الطبي الشامل"
        subtitle={isAr ? `المريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
        rightAction={
          <button
            onClick={() => setShowShareModal(true)}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E3D8] text-[#52766B] flex items-center justify-center hover:bg-[#E8E3D8]/40"
            title={isAr ? 'مشاركة وتصدير' : 'Export & Share'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Horizontal Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded-2xl whitespace-nowrap font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#52766B] text-white border-[#52766B] shadow-xs'
                    : 'bg-white text-[#737B74] border-[#E8E3D8] hover:bg-[#F7F5EF]'
                }`}
              >
                {isAr ? tab.labelAr : tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Patient Header Card */}
            <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
              <div className="flex items-center gap-3">
                <img
                  src={activePatient.photo}
                  alt={activePatient.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#E8E3D8]"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#454D46]">
                    {isAr ? activePatient.nameAr : activePatient.name}
                  </h3>
                  <p className="text-xs text-[#737B74]">
                    {activePatient.age} {isAr ? 'سنة' : 'yrs'} • {isAr ? 'فصيلة' : 'Blood'}: {activePatient.bloodType} • {activePatient.gender}
                  </p>
                  <p className="text-[11px] text-[#52766B] font-medium mt-0.5">
                    🏥 {activePatient.hospital}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E8E3D8] text-center">
                <div className="bg-[#F7F5EF] p-2 rounded-xl">
                  <span className="text-[10px] text-[#737B74] block">{isAr ? 'الأمراض' : 'Conditions'}</span>
                  <span className="text-xs font-bold text-[#454D46]">{activePatient.conditions.length}</span>
                </div>
                <div className="bg-[#F7F5EF] p-2 rounded-xl">
                  <span className="text-[10px] text-[#737B74] block">{isAr ? 'أدوية حالية' : 'Active Meds'}</span>
                  <span className="text-xs font-bold text-[#52766B]">{activeMeds.length}</span>
                </div>
                <div className="bg-[#F7F5EF] p-2 rounded-xl">
                  <span className="text-[10px] text-[#737B74] block">{isAr ? 'نسبة الالتزام' : 'Adherence'}</span>
                  <span className="text-xs font-bold text-[#52766B]">{activePatient.adherenceRate}%</span>
                </div>
              </div>
            </div>

            {/* Quick Allergies Warning Banner */}
            <div className="bg-[#D5A18E]/15 border border-[#D5A18E]/40 rounded-3xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#9B4832] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#9B4832] block">
                  {isAr ? 'الحساسية الدوائية الموثقة' : 'Documented Drug Allergies'}
                </span>
                <span className="text-xs font-semibold text-[#454D46] mt-0.5 block">
                  {(isAr ? activePatient.allergiesAr : activePatient.allergies).join(' • ')}
                </span>
              </div>
            </div>

            {/* Current Medicines Preview */}
            <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-2">
              <h4 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
                {isAr ? 'ملخص الأدوية الحالية' : 'Current Active Regimen'}
              </h4>
              {activeMeds.map((m) => (
                <div key={m.id} className="p-2.5 rounded-2xl bg-[#F7F5EF] text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#454D46] block">{isAr ? m.brandNameAr : m.brandName}</span>
                    <span className="text-[11px] text-[#737B74]">{m.strength} • {isAr ? m.frequencyAr : m.frequency}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B7C6B0]/40 text-[#52766B]">
                    {isAr ? 'منتظم' : 'On Track'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Conditions */}
        {activeTab === 'conditions' && (
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
            <h4 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'الأمراض المزمنة المشخصة' : 'Diagnosed Chronic Conditions'}
            </h4>
            {(isAr ? activePatient.conditionsAr : activePatient.conditions).map((c, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#52766B]" />
                  <span className="text-xs font-bold text-[#454D46]">{c}</span>
                </div>
                <span className="text-[10px] text-[#737B74]">
                  {isAr ? 'تحت العلاج والمتابعة' : 'Managed'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Allergies */}
        {activeTab === 'allergies' && (
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
            <h4 className="text-xs font-bold text-[#9B4832] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>{isAr ? 'سجل الحساسية الدوائية' : 'Adverse Drug Reaction History'}</span>
            </h4>
            {(isAr ? activePatient.allergiesAr : activePatient.allergies).map((a, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#D5A18E]/15 border border-[#D5A18E]/50">
                <div className="text-xs font-bold text-[#9B4832]">⚠️ {a}</div>
                <p className="text-[11px] text-[#737B74] mt-1">
                  {isAr
                    ? 'يُمنع صرف أو إعطاء أي دواء ينتمي لنفس العائلة الكيميائية.'
                    : 'Contraindicated: Strictly avoid medication or related chemical compounds.'}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Current Medications */}
        {activeTab === 'currentMeds' && (
          <div className="space-y-3">
            {activeMeds.map((med) => (
              <div key={med.id} className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-2">
                <div className="flex items-center gap-3">
                  <img src={med.packageImage} alt={med.brandName} className="w-12 h-12 rounded-2xl object-cover border" />
                  <div>
                    <h5 className="text-sm font-bold text-[#454D46]">{isAr ? med.brandNameAr : med.brandName} ({med.strength})</h5>
                    <p className="text-xs text-[#52766B]">{isAr ? med.activeIngredientAr : med.activeIngredient}</p>
                  </div>
                </div>
                <div className="text-xs text-[#454D46] bg-[#F7F5EF] p-2.5 rounded-xl">
                  <strong>{isAr ? 'الجرعة:' : 'Dosage:'}</strong> {isAr ? med.prescribedDosageAr : med.prescribedDosage}
                </div>
                <div className="text-[11px] text-[#737B74]">
                  {isAr ? 'التعليمات:' : 'Instructions:'} {isAr ? med.instructionsAr : med.instructions}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Medication History (Completed / Discontinued) */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'الأدوية السابقة والمتوقفة' : 'Past & Discontinued Treatments'}
            </h4>
            {[...completedMeds, ...discontinuedMeds].map((m) => (
              <div key={m.id} className="bg-white rounded-3xl p-4 border border-[#E8E3D8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#454D46]">{isAr ? m.brandNameAr : m.brandName}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'completed' ? 'bg-[#E8E3D8] text-[#454D46]' : 'bg-[#D5A18E]/30 text-[#9B4832]'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-[#737B74]">{m.instructions}</p>
                <div className="text-[11px] text-[#737B74] font-mono">
                  {isAr ? 'الفترة:' : 'Duration:'} {m.startDate} ~ {m.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Treatment Timeline */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-4">
            <h4 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'السجل الطبي ومراجعات الطبيب' : 'Clinical Visit & Lab Timeline'}
            </h4>
            <div className="space-y-3">
              {medicalRecords.map((rec) => (
                <div key={rec.id} className="border-l-2 border-[#52766B] pl-3 py-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#454D46]">
                      {isAr ? rec.titleAr : rec.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#737B74]">{rec.date}</span>
                  </div>
                  <div className="text-[11px] text-[#52766B] font-medium">
                    👨‍⚕️ {rec.doctor} • {rec.facility}
                  </div>
                  <p className="text-xs text-[#737B74] leading-relaxed">
                    {isAr ? rec.notesAr : rec.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export / Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{isAr ? 'تصدير الملف الطبي كتقرير PDF للطبيب' : 'Export Medical Summary for Physician (PDF)'}</span>
        </button>
      </div>

      {/* Share / Export Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 border border-[#E8E3D8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#454D46] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#52766B]" />
                <span>{isAr ? 'مشاركة الملف الطبي الموثق' : 'Share Patient Medical Summary'}</span>
              </h3>
              <button onClick={() => setShowShareModal(false)} className="text-[#737B74] p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#737B74] leading-relaxed">
              {isAr
                ? `سيتم إنشاء تقرير طبي رسمي يشمل قائمة الأدوية النشطة، الحساسيات الدوائية، وسجل الالتزام للمريض ${activePatient.nameAr} لمشاركته مع العيادة أو الصيدلي.`
                : `Generate a verified clinical summary covering active medications, drug allergies, and adherence metrics for ${activePatient.name}.`}
            </p>

            <div className="bg-[#F7F5EF] p-3 rounded-2xl border border-[#E8E3D8] text-xs space-y-1">
              <div className="flex justify-between text-[#454D46]">
                <span>{isAr ? 'المريض' : 'Patient'}:</span>
                <span className="font-bold">{activePatient.name}</span>
              </div>
              <div className="flex justify-between text-[#454D46]">
                <span>{isAr ? 'الأدوية النشطة' : 'Active Drugs'}:</span>
                <span className="font-bold">{activeMeds.length}</span>
              </div>
              <div className="flex justify-between text-[#454D46]">
                <span>{isAr ? 'الجهة الطبية' : 'Hospital'}:</span>
                <span className="font-bold">{activePatient.hospital}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleShare}
                className="flex-1 py-3 px-3 rounded-2xl bg-[#52766B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                {shareSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{isAr ? 'تم التحميل والمشاركة!' : 'Generated & Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'تحميل التقرير الطبي' : 'Download Summary PDF'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <CaregiverBottomNav />
    </div>
  );
};
