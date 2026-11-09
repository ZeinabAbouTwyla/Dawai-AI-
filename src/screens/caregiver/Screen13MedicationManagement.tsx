import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Search,
  Plus,
  Pill,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  PauseCircle,
  XCircle,
  MoreVertical,
  RotateCw,
  ShoppingBag,
  RefreshCw,
} from 'lucide-react';
import { MedicationStatus } from '../../types';

export const Screen13MedicationManagement: React.FC = () => {
  const {
    patientMedications,
    activePatient,
    navigateTo,
    language,
    updateMedication,
    requestRefill,
    toggleRenewable,
  } = useApp();

  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<MedicationStatus>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const isAr = language === 'ar';

  const filteredMeds = patientMedications.filter((m) => {
    const matchesTab = m.status === activeTab;
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      m.brandName.toLowerCase().includes(term) ||
      m.brandNameAr.includes(term) ||
      m.activeIngredient.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  const counts = {
    active: patientMedications.filter((m) => m.status === 'active').length,
    completed: patientMedications.filter((m) => m.status === 'completed').length,
    discontinued: patientMedications.filter((m) => m.status === 'discontinued').length,
    paused: patientMedications.filter((m) => m.status === 'paused').length,
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Medication Management"
        titleAr="إدارة الأدوية"
        subtitle={isAr ? `للمريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
        rightAction={
          <button
            onClick={() => navigateTo('add_medication')}
            className="w-8 h-8 rounded-full bg-[#52766B] text-white flex items-center justify-center hover:bg-[#3F5C53]"
            title={isAr ? 'إضافة دواء' : 'Add Medicine'}
          >
            <Plus className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737B74]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث بالاسم التجاري أو المادة الفعالة...' : 'Search brand or active ingredient...'}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex bg-[#E8E3D8]/50 p-1 rounded-2xl border border-[#E8E3D8] text-xs">
          {(['active', 'completed', 'discontinued', 'paused'] as MedicationStatus[]).map((tab) => {
            const labels: Record<MedicationStatus, { en: string; ar: string }> = {
              active: { en: 'Active', ar: 'نشط' },
              completed: { en: 'Completed', ar: 'مكتمل' },
              discontinued: { en: 'Discontinued', ar: 'متوقف' },
              paused: { en: 'Paused', ar: 'مؤقت' },
            };
            const isCurrent = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
                  isCurrent
                    ? 'bg-white text-[#52766B] shadow-xs'
                    : 'text-[#737B74] hover:text-[#454D46]'
                }`}
              >
                <span>{isAr ? labels[tab].ar : labels[tab].en}</span>
                <span className="text-[10px] opacity-70 ml-1">({counts[tab]})</span>
              </button>
            );
          })}
        </div>

        {/* Medication Cards List */}
        <div className="space-y-3">
          {filteredMeds.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#E8E3D8]">
              <Pill className="w-10 h-10 text-[#737B74] mx-auto mb-2 opacity-50" />
              <p className="text-xs text-[#737B74] font-medium">
                {isAr ? 'لا توجد أدوية مطابقة في هذا التصنيف' : 'No medications found in this category'}
              </p>
            </div>
          ) : (
            filteredMeds.map((med) => {
              const timesList = Object.entries(med.scheduledTimes)
                .map(([slot, time]) => `${slot}: ${time}`)
                .join(', ');

              return (
                <div
                  key={med.id}
                  className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={med.packageImage}
                      alt={med.brandName}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E8E3D8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#454D46] truncate">
                          {isAr ? med.brandNameAr : med.brandName}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            med.status === 'active'
                              ? 'bg-[#B7C6B0]/30 text-[#52766B]'
                              : med.status === 'discontinued'
                              ? 'bg-[#D5A18E]/25 text-[#9B4832]'
                              : 'bg-[#E8E3D8] text-[#737B74]'
                          }`}
                        >
                          {med.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#52766B] font-medium truncate mt-0.5">
                        {isAr ? med.activeIngredientAr : med.activeIngredient}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 text-xs text-[#454D46]">
                        <span className="bg-[#F7F5EF] px-2 py-0.5 rounded-md font-bold text-[11px] border border-[#E8E3D8]">
                          {med.strength}
                        </span>
                        <span className="text-[#737B74]">
                          {isAr ? med.formAr : med.form}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dosage & Timing */}
                  <div className="bg-[#F7F5EF] p-2.5 rounded-2xl border border-[#E8E3D8]/80 text-xs space-y-1">
                    <div className="text-[#454D46] font-medium">
                      📋 {isAr ? med.prescribedDosageAr : med.prescribedDosage}
                    </div>
                    {timesList && (
                      <div className="text-[#737B74] text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#52766B]" />
                        <span>{timesList}</span>
                      </div>
                    )}
                  </div>

                  {/* Renewable Option Row & Stock */}
                  <div className="bg-white p-2 rounded-xl border border-[#E8E3D8] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        med.isRenewable
                          ? 'bg-[#52766B]/15 text-[#52766B]'
                          : 'bg-[#E8E3D8] text-[#737B74]'
                      }`}>
                        <RotateCw className="w-3 h-3" />
                        <span>{med.isRenewable ? (isAr ? 'متجدد (يطلب عند النفاد)' : 'Renewable') : (isAr ? 'كورس محدد (غير متجدد)' : 'One-time')}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRenewable(med.id, !med.isRenewable)}
                      className="text-[10px] text-[#52766B] font-bold hover:underline"
                    >
                      {med.isRenewable
                        ? (isAr ? 'تغيير إلى غير متجدد' : 'Set as One-time')
                        : (isAr ? 'تفعيل التجديد وإعادة الطلب' : 'Set as Renewable')}
                    </button>
                  </div>

                  {/* Stock and Actions */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="text-[#737B74]">
                      {isAr ? 'المخزون المتبقي:' : 'Stock:'}{' '}
                      <span className={`font-bold ${med.isLowStock ? 'text-[#9B4832]' : 'text-[#52766B]'}`}>
                        {med.remainingQuantity} / {med.totalQuantity} {isAr ? med.unitAr : med.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigateTo('medication_schedule')}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E8E3D8] text-[#454D46] text-[11px] font-bold hover:bg-[#F7F5EF]"
                      >
                        {isAr ? 'الجدول' : 'Schedule'}
                      </button>

                      {/* Re-order Button for Renewable Medicines */}
                      {med.isRenewable ? (
                        <button
                          onClick={() => {
                            setReorderingId(med.id);
                            requestRefill(med.id);
                            setTimeout(() => setReorderingId(null), 2000);
                          }}
                          disabled={reorderingId === med.id}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-xs transition-all ${
                            reorderingId === med.id
                              ? 'bg-[#B7C6B0] text-[#52766B]'
                              : med.isLowStock
                              ? 'bg-[#D5A18E] hover:bg-[#c28e7c] text-white animate-pulse'
                              : 'bg-[#52766B] hover:bg-[#3F5C53] text-white'
                          }`}
                        >
                          {reorderingId === med.id ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>{isAr ? 'تم الطلب ✓' : 'Ordered ✓'}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3" />
                              <span>{isAr ? 'إعادة طلب الدواء' : 'Re-order Refill'}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#737B74] italic px-1">
                          {isAr ? 'لا يتكرر طلبه' : 'No refill'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
