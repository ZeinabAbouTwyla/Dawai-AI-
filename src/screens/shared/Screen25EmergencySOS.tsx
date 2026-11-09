import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  AlertTriangle,
  Phone,
  ShieldAlert,
  CheckCircle2,
  X,
  PhoneCall,
  Clock,
  Heart,
} from 'lucide-react';

export const Screen25EmergencySOS: React.FC = () => {
  const { activePatient, triggerEmergencySOS, language } = useApp();
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const isAr = language === 'ar';

  const handlePressSOS = () => {
    // 3-second safeguard countdown
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setSosActivated(true);
          triggerEmergencySOS(activePatient.id);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Emergency SOS"
        titleAr="نداء الطوارئ السريع"
        subtitle={isAr ? `المريض: ${activePatient.nameAr}` : `Patient: ${activePatient.name}`}
        showBack
        showSOS={false}
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-5 flex flex-col items-center justify-between text-center">
        {/* Urgent Header */}
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#9B4832] bg-[#D5A18E]/25 px-3 py-1 rounded-full border border-[#D5A18E]/50">
            {isAr ? 'حالات الطوارئ العائلية' : 'Family Urgent Alert'}
          </span>
          <h2 className="text-2xl font-extrabold text-[#454D46] mt-2">
            {isAr ? 'هل تحتاج إلى مساعدة عاجلة؟' : 'Need Immediate Assistance?'}
          </h2>
          <p className="text-xs text-[#737B74] mt-1 max-w-xs mx-auto">
            {isAr
              ? 'بالضغط على الزر أدناه سيتم إرسال إشعار فوري لمقدم الرعاية مع جهات الاتصال المسجلة.'
              : 'Pressing SOS immediately alerts your family caregiver and displays emergency dispatch hotlines.'}
          </p>
        </div>

        {/* Big Central SOS Button */}
        <div className="py-4 flex flex-col items-center">
          {countdown !== null ? (
            <div className="relative">
              <button
                onClick={handleCancelCountdown}
                className="w-48 h-48 rounded-full bg-[#D5A18E] text-white flex flex-col items-center justify-center shadow-2xl animate-pulse"
              >
                <span className="text-5xl font-black">{countdown}</span>
                <span className="text-xs font-bold mt-1 uppercase">
                  {isAr ? 'انقر للإلغاء' : 'Tap to Cancel'}
                </span>
              </button>
            </div>
          ) : sosActivated ? (
            <div className="w-48 h-48 rounded-full bg-[#52766B] text-white flex flex-col items-center justify-center p-4 shadow-2xl animate-in zoom-in-95">
              <CheckCircle2 className="w-16 h-16 text-white mb-2" />
              <span className="text-sm font-extrabold">
                {isAr ? 'تم إرسال النداء!' : 'Alert Activated!'}
              </span>
              <span className="text-[11px] text-[#E8E3D8] mt-0.5">
                {isAr ? 'تم إشعار العائلة بنجاح' : 'Caregiver alerted'}
              </span>
            </div>
          ) : (
            <button
              onClick={handlePressSOS}
              className="w-48 h-48 rounded-full bg-[#D5A18E] hover:bg-[#c48d79] text-white flex flex-col items-center justify-center shadow-2xl border-8 border-white/60 active:scale-95 transition-all group"
            >
              <AlertTriangle className="w-16 h-16 text-white mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black tracking-wider">SOS</span>
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest mt-1">
                {isAr ? 'اضغط للمساعدة' : 'Press for Help'}
              </span>
            </button>
          )}

          {sosActivated && (
            <button
              onClick={() => setSosActivated(false)}
              className="mt-4 text-xs font-bold text-[#737B74] hover:text-[#454D46] underline"
            >
              {isAr ? 'إعادة تعيين الحالة' : 'Reset SOS Status'}
            </button>
          )}
        </div>

        {/* Emergency Contacts Cards */}
        <div className="w-full space-y-2.5 text-left">
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider text-center">
            {isAr ? 'جهات الاتصال السريعة' : 'Direct Emergency Contacts'}
          </h3>

          {/* Family Caregiver */}
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#52766B]/15 text-[#52766B] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-[#52766B]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#454D46]">
                  {activePatient.emergencyContact.name} ({activePatient.emergencyContact.relation})
                </div>
                <div className="text-[11px] text-[#737B74]">
                  {activePatient.emergencyContact.phone}
                </div>
              </div>
            </div>

            <a
              href={`tel:${activePatient.emergencyContact.phone}`}
              className="px-3.5 py-2 bg-[#52766B] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isAr ? 'اتصال' : 'Call'}</span>
            </a>
          </div>

          {/* National Ambulance */}
          <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D5A18E]/25 text-[#9B4832] flex items-center justify-center font-bold">
                🚑
              </div>
              <div>
                <div className="text-xs font-bold text-[#454D46]">
                  {isAr ? 'الإسعاف الوطني (الهلال الأحمر)' : 'Emergency Medical Ambulance'}
                </div>
                <div className="text-[11px] text-[#737B74]">
                  {isAr ? 'رقم الطوارئ الموحد: 997' : 'Dispatch: 997 / 911'}
                </div>
              </div>
            </div>

            <a
              href="tel:997"
              className="px-3.5 py-2 bg-[#D5A18E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isAr ? 'طوارئ' : 'Call 997'}</span>
            </a>
          </div>
        </div>

        {/* Regulatory Healthcare Disclaimer (MANDATORY) */}
        <div className="bg-[#E8E3D8]/50 border border-[#E8E3D8] rounded-2xl p-3 text-[11px] text-[#737B74] leading-relaxed">
          <p>
            {isAr
              ? 'تنويه أمان هام: هذا التطبيق لا يُعتبر خدمة طوارئ طبية مستقلة أو بديلاً عن خطوط الإسعاف الوطنية الرسمية. في الحالات الحرجة المهددة للحياة اتصل فوراً بالإسعاف (997).'
              : 'Safety Notice: DOAWY AI does not operate a professional medical dispatch service. In life-threatening emergencies, dial national emergency ambulance dispatch (997/911) immediately.'}
          </p>
        </div>
      </div>
    </div>
  );
};
