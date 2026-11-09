import React from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Plus,
  FileText,
  Calendar,
  AlertCircle,
  Package,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  Heart,
  TrendingUp,
} from 'lucide-react';

export const Screen07CaregiverDashboard: React.FC = () => {
  const {
    activePatient,
    patients,
    setActivePatientId,
    patientMedications,
    todayDoses,
    notifications,
    navigateTo,
    language,
  } = useApp();

  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  // Overview metrics
  const totalDoses = todayDoses.length;
  const confirmedDoses = todayDoses.filter((d) => d.status === 'confirmed').length;
  const missedDoses = todayDoses.filter((d) => d.status === 'missed').length;
  const pendingDoses = todayDoses.filter((d) => d.status === 'pending').length;

  const lowStockMeds = patientMedications.filter((m) => m.isLowStock && m.status === 'active');
  const unreadAlerts = notifications.filter((n) => !n.read && n.priority === 'urgent');

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      {/* Top Header */}
      <MobileHeader
        title={isAr ? `صباح الخير، طارق` : `Good Morning, Tariq`}
        titleAr={`صباح الخير، طارق`}
        subtitle={isAr ? 'لوحة تحكم رعاية العائلة' : 'Family Care Operations'}
        subtitleAr="لوحة تحكم رعاية العائلة"
        showBack={false}
        showNotifications={true}
        showSOS={true}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Connected Patients Section / Switcher */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'المرضى الخاضعون لرعايتك' : 'Cared Family Members'}
            </h2>
            <button
              onClick={() => navigateTo('patients_list')}
              className="text-xs font-semibold text-[#52766B] hover:underline flex items-center"
            >
              <span>{isAr ? 'عرض الكل' : 'View All'}</span>
              <NextChevron className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {patients.map((p) => {
              const isSelected = p.id === activePatient.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePatientId(p.id)}
                  className={`flex-shrink-0 w-64 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#52766B] shadow-soft ring-2 ring-[#52766B]/20'
                      : 'bg-white/70 border-[#E8E3D8] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E8E3D8]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#454D46] truncate">
                          {isAr ? p.nameAr : p.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#52766B]" />
                        )}
                      </div>
                      <div className="text-xs text-[#737B74]">
                        {isAr ? p.relationAr : p.relation} • {p.age} {isAr ? 'سنة' : 'yrs'}
                      </div>
                      <div className="text-[11px] text-[#52766B] font-medium truncate mt-0.5">
                        {isAr ? p.conditionsAr[0] : p.conditions[0]}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E8E3D8]/60 flex items-center justify-between text-[11px]">
                    <span className="text-[#737B74]">
                      {isAr ? 'نسبة الالتزام' : 'Adherence'}:
                    </span>
                    <span className="font-bold text-[#52766B] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {p.adherenceRate}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Overview Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-[#454D46]">
                {isAr ? 'موجز جرعات اليوم' : "Today's Medication Overview"}
              </h3>
              <p className="text-xs text-[#737B74]">
                {isAr ? activePatient.nameAr : activePatient.name}
              </p>
            </div>
            <button
              onClick={() => navigateTo('medication_schedule')}
              className="text-xs font-semibold text-[#52766B] hover:underline flex items-center"
            >
              <span>{isAr ? 'الجدول' : 'Timeline'}</span>
              <NextChevron className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#F7F5EF] p-2.5 rounded-2xl border border-[#E8E3D8]/60">
              <div className="text-xs text-[#737B74] font-medium">
                {isAr ? 'المجدول' : 'Total'}
              </div>
              <div className="text-lg font-bold text-[#454D46] mt-0.5">{totalDoses}</div>
            </div>
            <div className="bg-[#B7C6B0]/20 p-2.5 rounded-2xl border border-[#B7C6B0]/40">
              <div className="text-xs text-[#52766B] font-medium flex items-center justify-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isAr ? 'مؤكد' : 'Taken'}</span>
              </div>
              <div className="text-lg font-bold text-[#52766B] mt-0.5">{confirmedDoses}</div>
            </div>
            <div className="bg-[#E8E3D8]/40 p-2.5 rounded-2xl border border-[#E8E3D8]">
              <div className="text-xs text-[#454D46] font-medium flex items-center justify-center gap-0.5">
                <Clock className="w-3 h-3" />
                <span>{isAr ? 'قادم' : 'Pending'}</span>
              </div>
              <div className="text-lg font-bold text-[#454D46] mt-0.5">{pendingDoses}</div>
            </div>
            <div className="bg-[#D5A18E]/20 p-2.5 rounded-2xl border border-[#D5A18E]/40">
              <div className="text-xs text-[#9B4832] font-medium flex items-center justify-center gap-0.5">
                <AlertCircle className="w-3 h-3" />
                <span>{isAr ? 'فائت' : 'Missed'}</span>
              </div>
              <div className="text-lg font-bold text-[#9B4832] mt-0.5">{missedDoses}</div>
            </div>
          </div>
        </div>

        {/* Medication Alerts & Stock Reminders */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'تنبيهات وملاحظات هامة' : 'Medication Alerts'}
            </h3>
            <button
              onClick={() => navigateTo('notifications')}
              className="text-xs font-semibold text-[#52766B] hover:underline"
            >
              {isAr ? 'مركز الإشعارات' : 'View All'}
            </button>
          </div>

          {/* Missed dose alert if any */}
          {missedDoses > 0 && (
            <div
              onClick={() => navigateTo('medication_schedule')}
              className="p-3.5 rounded-2xl bg-[#D5A18E]/15 border border-[#D5A18E]/50 flex items-center justify-between cursor-pointer hover:bg-[#D5A18E]/25 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D5A18E] text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#9B4832]">
                    {isAr ? 'تنبيه: جرعة فائتة بحاجة للمتابعة' : 'Missed Dose Alert'}
                  </div>
                  <div className="text-[11px] text-[#454D46]">
                    {isAr
                      ? `لم يؤكد ${activePatient.nameAr} تناول الجرعة في موعدها`
                      : `${activePatient.name} did not confirm scheduled dose on time`}
                  </div>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-[#9B4832]" />
            </div>
          )}

          {/* Low Stock Warning */}
          {lowStockMeds.map((med) => (
            <div
              key={med.id}
              onClick={() => navigateTo('refill_management')}
              className="p-3.5 rounded-2xl bg-[#E8E3D8]/50 border border-[#E8E3D8] flex items-center justify-between cursor-pointer hover:bg-[#E8E3D8]/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#52766B]/15 text-[#52766B] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#454D46]">
                    {isAr ? `اقتراب نفاد المخزون: ${med.brandNameAr}` : `Low Stock Alert: ${med.brandName}`}
                  </div>
                  <div className="text-[11px] text-[#737B74]">
                    {isAr
                      ? `متبقي ${med.remainingQuantity} ${med.unitAr} فقط (موعد الصرف: ${med.refillDate})`
                      : `Only ${med.remainingQuantity} ${med.unit} left. Est. refill: ${med.refillDate}`}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#52766B] bg-white px-2.5 py-1 rounded-xl border border-[#E8E3D8]">
                {isAr ? 'إعادة طلب' : 'Refill'}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Operational Actions */}
        <div>
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider mb-2">
            {isAr ? 'إجراءات سريعة' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => navigateTo('add_medication')}
              className="p-3 rounded-2xl bg-[#52766B] text-white flex flex-col items-center justify-center text-center shadow-xs hover:bg-[#3F5C53] active:scale-95 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-1.5">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold leading-tight">
                {isAr ? 'إضافة دواء' : 'Add Medicine'}
              </span>
            </button>

            <button
              onClick={() => navigateTo('medication_schedule')}
              className="p-3 rounded-2xl bg-white text-[#454D46] border border-[#E8E3D8] flex flex-col items-center justify-center text-center hover:bg-[#F7F5EF] active:scale-95 transition-all shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#B7C6B0]/30 text-[#52766B] flex items-center justify-center mb-1.5">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold leading-tight">
                {isAr ? 'جدول الجرعات' : 'Med Schedule'}
              </span>
            </button>

            <button
              onClick={() => navigateTo('medical_summary')}
              className="p-3 rounded-2xl bg-white text-[#454D46] border border-[#E8E3D8] flex flex-col items-center justify-center text-center hover:bg-[#F7F5EF] active:scale-95 transition-all shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#E8E3D8] text-[#454D46] flex items-center justify-center mb-1.5">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold leading-tight">
                {isAr ? 'الملف الطبي' : 'Medical File'}
              </span>
            </button>
          </div>
        </div>

        {/* Adherence shortcut banner */}
        <div
          onClick={() => navigateTo('adherence_reports')}
          className="p-4 rounded-3xl bg-gradient-to-r from-[#52766B] to-[#3F5C53] text-white flex items-center justify-between cursor-pointer shadow-soft hover:opacity-95 transition-opacity"
        >
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#B7C6B0] font-semibold">
              {isAr ? 'تقرير الالتزام الدوائي' : 'Adherence Analytics'}
            </div>
            <div className="text-base font-bold mt-0.5">
              {isAr ? 'تقرير أسبوعي مفصل ومعدلات الانتظام' : 'Weekly adherence & trends report'}
            </div>
            <div className="text-xs text-[#E8E3D8] mt-1">
              {isAr ? 'حقق الوالد نسبة 92% هذا الشهر' : 'Ibrahim achieved 92% consistency this month'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
