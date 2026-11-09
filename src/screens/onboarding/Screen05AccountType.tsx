import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { Shield, HeartHandshake, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types';

export const Screen05AccountType: React.FC = () => {
  const { setRole, navigateTo, language } = useApp();
  const [selectedType, setSelectedType] = useState<UserRole>('caregiver');
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const handleContinue = () => {
    setRole(selectedType);
    if (selectedType === 'caregiver') {
      navigateTo('patient_linking');
    } else {
      navigateTo('patient_home');
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Select Account Type"
        titleAr="تحديد نوع الحساب"
        showBack
        showNotifications={false}
        showSOS={false}
      />

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#454D46]">
              {isAr ? 'كيف ستستخدم دوائي؟' : 'How will you use DOAWY?'}
            </h2>
            <p className="text-sm text-[#737B74] mt-1">
              {isAr
                ? 'اختر دورك لتخصيص الواجهة المناسبة لاحتياجاتك'
                : 'Select your role to personalize the experience and features'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Caregiver Card */}
            <div
              onClick={() => setSelectedType('caregiver')}
              className={`p-5 rounded-3xl cursor-pointer transition-all border-2 relative ${
                selectedType === 'caregiver'
                  ? 'bg-white border-[#52766B] shadow-soft ring-4 ring-[#52766B]/10'
                  : 'bg-white/80 border-[#E8E3D8] hover:border-[#52766B]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    selectedType === 'caregiver'
                      ? 'bg-[#52766B] text-white'
                      : 'bg-[#B7C6B0]/30 text-[#52766B]'
                  }`}
                >
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#454D46]">
                      {isAr ? 'أنا مقدم رعاية (عائلة)' : 'I am a Caregiver'}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        selectedType === 'caregiver'
                          ? 'border-[#52766B] bg-[#52766B] text-white'
                          : 'border-[#E8E3D8] bg-white'
                      }`}
                    >
                      {selectedType === 'caregiver' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <p className="text-xs text-[#737B74] mt-1.5 leading-relaxed">
                    {isAr
                      ? 'إدارة خطط علاج الوالدين، إدخال الأدوية، مراقبة الالتزام، والاطلاع على الملفات الطبية.'
                      : 'Manage family members, scan prescriptions, configure treatment timelines, and track dose adherence.'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#52766B] font-semibold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isAr ? 'لوحة تحكم وتحليلات كاملة' : 'Full operational dashboard'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Card */}
            <div
              onClick={() => setSelectedType('patient')}
              className={`p-5 rounded-3xl cursor-pointer transition-all border-2 relative ${
                selectedType === 'patient'
                  ? 'bg-white border-[#52766B] shadow-soft ring-4 ring-[#52766B]/10'
                  : 'bg-white/80 border-[#E8E3D8] hover:border-[#52766B]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    selectedType === 'patient'
                      ? 'bg-[#52766B] text-white'
                      : 'bg-[#B7C6B0]/30 text-[#52766B]'
                  }`}
                >
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#454D46]">
                      {isAr ? 'أنا المريض' : 'I am a Patient'}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        selectedType === 'patient'
                          ? 'border-[#52766B] bg-[#52766B] text-white'
                          : 'border-[#E8E3D8] bg-white'
                      }`}
                    >
                      {selectedType === 'patient' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <p className="text-xs text-[#737B74] mt-1.5 leading-relaxed">
                    {isAr
                      ? 'واجهة ميسرة وبسيطة بخط كبير: عرض الجرعات القادمة، تأكيد تناول الدواء، وتثقيف صحي.'
                      : 'Ultra-simplified, accessible interface: upcoming dose alerts, large "I Took My Medicine" button, and friendly guidance.'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#52766B] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'خط كبير ومصمم لكبار السن' : 'Large fonts & high contrast'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-6 py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          <span>{isAr ? 'المتابعة' : 'Continue'}</span>
          <NextIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const Screen06PatientLinking: React.FC = () => {
  const { navigateTo, language, patients, setActivePatientId } = useApp();
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);
  const isAr = language === 'ar';
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const handleLinkCode = () => {
    if (inviteCode) {
      alert(isAr ? 'تم إرسال طلب الربط بنجاح إلى المريض' : 'Link invitation sent successfully!');
      navigateTo('caregiver_dashboard');
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Family Patient Linking"
        titleAr="ربط أفراد العائلة"
        showBack
        showNotifications={false}
        showSOS={false}
      />

      <div className="flex-1 p-5 overflow-y-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-[#454D46]">
            {isAr ? 'اربط حساب أحد أفراد عائلتك' : 'Connect with a family member'}
          </h2>
          <p className="text-xs text-[#737B74] mt-1">
            {isAr
              ? 'أدخل رمز دعوة المريض أو شارك رمزك لربط الحسابات بأمان'
              : 'Enter patient invitation code or invite a new loved one to manage their treatments safely.'}
          </p>
        </div>

        {/* Enter Invitation Code Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E3D8] shadow-soft">
          <label className="block text-xs font-bold text-[#454D46] mb-1.5">
            {isAr ? 'رمز دعوة المريض (Invitation Code)' : 'Enter Patient Code'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="e.g. DWY-7821"
              className="flex-1 px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-sm font-mono uppercase text-[#454D46] focus:outline-none focus:border-[#52766B]"
            />
            <button
              onClick={handleLinkCode}
              className="px-4 py-2.5 bg-[#52766B] text-white text-xs font-bold rounded-2xl hover:bg-[#3F5C53] transition-colors"
            >
              {isAr ? 'ربط' : 'Connect'}
            </button>
          </div>
          <p className="text-[11px] text-[#737B74] mt-2">
            {isAr
              ? 'تجد الرمز في شاشة الملف الشخصي للمريض'
              : 'Code is displayed on the patient’s profile screen.'}
          </p>
        </div>

        {/* Currently Connected Family Members */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
              {isAr ? 'أفراد العائلة المرتبطون حالياً' : 'Connected Family Members'}
            </h3>
            <span className="text-[11px] font-semibold text-[#52766B]">
              {patients.length} {isAr ? 'مرضى' : 'Patients'}
            </span>
          </div>

          <div className="space-y-2.5">
            {patients.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setActivePatientId(p.id);
                  navigateTo('caregiver_dashboard');
                }}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E3D8] flex items-center justify-between cursor-pointer hover:border-[#52766B]/60 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E8E3D8]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#454D46]">
                      {isAr ? p.nameAr : p.name}
                    </div>
                    <div className="text-xs text-[#737B74] flex items-center gap-1.5 mt-0.5">
                      <span>{isAr ? p.relationAr : p.relation}</span>
                      <span>•</span>
                      <span>{p.age} {isAr ? 'سنة' : 'yrs'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#B7C6B0]/30 text-[#454D46] px-2 py-0.5 rounded-full border border-[#B7C6B0]/50">
                    {isAr ? 'متصل' : 'Connected'}
                  </span>
                  <NextIcon className="w-4 h-4 text-[#737B74]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Confirmation Box */}
        <div className="bg-[#E8E3D8]/40 border border-[#E8E3D8] rounded-2xl p-3.5 text-xs text-[#454D46] leading-relaxed">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-[#52766B]">
            <Shield className="w-4 h-4 text-[#52766B]" />
            <span>{isAr ? 'خصوصية البيانات وموافقة المريض' : 'Privacy & Patient Consent'}</span>
          </div>
          <p className="text-[11px] text-[#737B74]">
            {isAr
              ? 'تتم مشاركة السجلات الدوائية وجدول الجرعات وفق معايير الخصوصية الصحية وبموافقة المريض أو الوصي القانوني.'
              : 'Medical records and schedules are shared with strict patient consent under verified family access rules.'}
          </p>
        </div>

        <button
          onClick={() => navigateTo('caregiver_dashboard')}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>{isAr ? 'الانتقال إلى لوحة التحكم' : 'Go to Caregiver Dashboard'}</span>
          <NextIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
