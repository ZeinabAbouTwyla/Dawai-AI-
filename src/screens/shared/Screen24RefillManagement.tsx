import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Package,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  Info,
  RotateCw,
} from 'lucide-react';

export const Screen24RefillManagement: React.FC = () => {
  const {
    patientMedications,
    activePatient,
    requestRefill,
    toggleRenewable,
    language,
    role,
  } = useApp();

  const [refillLoading, setRefillLoading] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'renewable' | 'onetime'>('all');
  const isAr = language === 'ar';

  const activeMeds = patientMedications.filter((m) => {
    if (m.status !== 'active') return false;
    if (filterType === 'renewable') return m.isRenewable === true;
    if (filterType === 'onetime') return m.isRenewable === false;
    return true;
  });

  const handleOrderRefill = (medId: string) => {
    setRefillLoading(medId);
    setTimeout(() => {
      requestRefill(medId);
      setRefillLoading(null);
    }, 1000);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Refill Management"
        titleAr="إدارة مخزون وإعادة صرف الأدوية"
        subtitle={isAr ? `للمريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex bg-[#E8E3D8]/50 p-1 rounded-2xl border border-[#E8E3D8] text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all ${
              filterType === 'all'
                ? 'bg-white text-[#52766B] shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            {isAr ? 'جميع الأدوية' : 'All Meds'}
          </button>
          <button
            onClick={() => setFilterType('renewable')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 ${
              filterType === 'renewable'
                ? 'bg-white text-[#52766B] shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>{isAr ? 'أدوية متجددة' : 'Renewable'}</span>
          </button>
          <button
            onClick={() => setFilterType('onetime')}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all ${
              filterType === 'onetime'
                ? 'bg-white text-[#52766B] shadow-xs'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            {isAr ? 'غير متجددة' : 'One-time'}
          </button>
        </div>

        {/* Notice Card: Estimated Stock */}
        <div className="bg-[#E8E3D8]/50 border border-[#E8E3D8] rounded-3xl p-3.5 flex items-start gap-2.5 text-xs text-[#454D46]">
          <Info className="w-4 h-4 text-[#52766B] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {isAr
              ? 'الأدوية المتجددة تتيح لك إعادة الطلب التلقائي واستلام تنبيهات استباقية قبل نفاد العبوة.'
              : 'Renewable medicines enable automatic refills and proactive alerts before package depletion.'}
          </p>
        </div>

        {/* Medications Stock List */}
        <div className="space-y-3">
          {activeMeds.map((med) => {
            const percentLeft = Math.round((med.remainingQuantity / med.totalQuantity) * 100);
            const isLow = med.isLowStock || percentLeft <= 25;
            const daysLeft = Math.round(med.remainingQuantity / 2); // approximate 2 pills/day

            return (
              <div
                key={med.id}
                className={`bg-white rounded-3xl p-4 border transition-all shadow-soft space-y-3 ${
                  isLow ? 'border-[#D5A18E] ring-2 ring-[#D5A18E]/20' : 'border-[#E8E3D8]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={med.packageImage}
                    alt={med.brandName}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#E8E3D8] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#454D46] truncate">
                        {isAr ? med.brandNameAr : med.brandName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLow
                            ? 'bg-[#D5A18E]/30 text-[#9B4832]'
                            : 'bg-[#B7C6B0]/30 text-[#52766B]'
                        }`}
                      >
                        {isLow ? (isAr ? 'مخزون منخفض' : 'Low Stock') : (isAr ? 'متوفر' : 'Adequate')}
                      </span>
                    </div>

                    <div className="text-xs text-[#52766B] font-medium mt-0.5">
                      {med.strength} • {isAr ? med.activeIngredientAr : med.activeIngredient}
                    </div>

                    <div className="text-[11px] text-[#737B74] mt-1">
                      {isAr ? 'الموعد المتوقع لإعادة الصرف:' : 'Expected Refill Date:'}{' '}
                      <span className="font-bold text-[#454D46]">{med.refillDate}</span>
                    </div>

                    {/* Renewable Badge & Toggle */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E8E3D8]/50">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        med.isRenewable
                          ? 'bg-[#52766B]/15 text-[#52766B]'
                          : 'bg-[#E8E3D8] text-[#737B74]'
                      }`}>
                        <RotateCw className="w-2.5 h-2.5" />
                        <span>{med.isRenewable ? (isAr ? 'دواء متجدد (يُطلب عند النفاد)' : 'Renewable') : (isAr ? 'كورس محدد (غير متجدد)' : 'One-time')}</span>
                      </span>

                      <button
                        onClick={() => toggleRenewable(med.id, !med.isRenewable)}
                        className="text-[10px] text-[#52766B] font-bold hover:underline"
                      >
                        {med.isRenewable ? (isAr ? 'إلغاء التجديد' : 'Make one-time') : (isAr ? 'تفعيل كمتجدد' : 'Make renewable')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stock Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#737B74]">
                      {isAr ? 'الكمية التقديرية المتبقية:' : 'Estimated Remaining:'}
                    </span>
                    <span className="font-mono font-bold text-[#454D46]">
                      {med.remainingQuantity} / {med.totalQuantity} {isAr ? med.unitAr : med.unit} (~{daysLeft} {isAr ? 'أيام' : 'days'})
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#E8E3D8] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLow ? 'bg-[#D5A18E]' : 'bg-[#52766B]'
                      }`}
                      style={{ width: `${percentLeft}%` }}
                    />
                  </div>
                </div>

                {/* Action button: 1-click refill order */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-[#737B74]">
                    {isLow
                      ? isAr
                        ? '⚠️ تنبيه استباقي قبل النفاد بيومين'
                        : '⚠️ 2-day low-stock proactive reminder'
                      : isAr
                      ? 'مخزون آمن حالياً'
                      : 'Stock is currently sufficient'}
                  </span>

                  <button
                    onClick={() => handleOrderRefill(med.id)}
                    disabled={refillLoading === med.id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors ${
                      isLow
                        ? 'bg-[#52766B] hover:bg-[#3F5C53] text-white'
                        : 'bg-[#F7F5EF] hover:bg-[#E8E3D8] text-[#454D46] border border-[#E8E3D8]'
                    }`}
                  >
                    {refillLoading === med.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}
                    <span>{isAr ? 'طلب إعادة صرف' : 'Request Refill'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
