import React, { useState } from 'react';
import {
  Smartphone,
  Maximize2,
  Globe,
  UserCheck,
  Play,
  RotateCcw,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenId, UserRole } from '../../types';

export const DevSimulatorBar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    currentScreen,
    navigateTo,
    viewMode,
    setViewMode,
    resetDemoData,
    activePatient,
    setActivePatientId,
    patients,
    markDoseMissed,
    doses,
  } = useApp();

  const [showScreenPicker, setShowScreenPicker] = useState(false);
  const [showFlowPicker, setShowFlowPicker] = useState(false);

  const isAr = language === 'ar';

  const screensList: { id: ScreenId; label: string; group: string }[] = [
    // Onboarding
    { id: 'splash', label: '01. Splash Screen', group: 'Auth & Onboarding' },
    { id: 'welcome', label: '02. Welcome', group: 'Auth & Onboarding' },
    { id: 'login', label: '03. Login', group: 'Auth & Onboarding' },
    { id: 'register', label: '04. Account Registration', group: 'Auth & Onboarding' },
    { id: 'account_type', label: '05. Account Type Selection', group: 'Auth & Onboarding' },
    { id: 'patient_linking', label: '06. Patient Linking', group: 'Auth & Onboarding' },
    // Caregiver
    { id: 'caregiver_dashboard', label: '07. Caregiver Dashboard', group: 'Caregiver Experience' },
    { id: 'patients_list', label: '08. Patients List', group: 'Caregiver Experience' },
    { id: 'patient_profile', label: '09. Patient Profile', group: 'Caregiver Experience' },
    { id: 'add_medication', label: '10. Add Medication Scanner', group: 'Caregiver Experience' },
    { id: 'medicine_id_results', label: '11. Medicine ID Results', group: 'Caregiver Experience' },
    { id: 'medication_scheduling', label: '12. Medication Scheduling Form', group: 'Caregiver Experience' },
    { id: 'medication_management', label: '13. Medication Management', group: 'Caregiver Experience' },
    { id: 'medication_schedule', label: '14. Medication Schedule (Timeline)', group: 'Caregiver Experience' },
    { id: 'medical_summary', label: '15. Medical Summary & Records', group: 'Caregiver Experience' },
    { id: 'adherence_reports', label: '16. Adherence Reports & Charts', group: 'Caregiver Experience' },
    { id: 'notifications', label: '17. Notifications Center', group: 'Caregiver Experience' },
    // Patient
    { id: 'patient_home', label: '18. Patient Home Dashboard', group: 'Patient Experience' },
    { id: 'patient_schedule', label: '19. Patient Medication Schedule', group: 'Patient Experience' },
    { id: 'medication_details', label: '20. Medication Details', group: 'Patient Experience' },
    { id: 'health_education', label: '21. Health Education Hub', group: 'Patient Experience' },
    { id: 'health_education_chat', label: '22. Health Education AI Chat', group: 'Patient Experience' },
    { id: 'patient_profile_view', label: '23. Patient Profile & Caregiver', group: 'Patient Experience' },
    { id: 'patient_drug_summary', label: '27. Patient Drug Summary (ملخص أدويتي)', group: 'Patient Experience' },
    // Shared
    { id: 'refill_management', label: '24. Refill Management', group: 'Shared Features' },
    { id: 'emergency_sos', label: '25. Emergency SOS Interface', group: 'Shared Features' },
    { id: 'settings', label: '26. Settings & Security', group: 'Shared Features' },
  ];

  const handleLaunchFlow = (flowNumber: number) => {
    setShowFlowPicker(false);
    switch (flowNumber) {
      case 1:
        // Flow 1: Add Medication
        setRole('caregiver');
        navigateTo('add_medication');
        break;
      case 2:
        // Flow 2: Patient Takes Medication
        setRole('patient');
        navigateTo('patient_home');
        break;
      case 3:
        // Flow 3: Missed Dose
        // Mark pending dose as missed to trigger caregiver alert
        const pendingDose = doses.find((d) => d.status === 'pending');
        if (pendingDose) {
          markDoseMissed(pendingDose.id);
        }
        setRole('caregiver');
        navigateTo('notifications');
        break;
      case 4:
        // Flow 4: Medical Summary
        setRole('caregiver');
        navigateTo('medical_summary');
        break;
      case 5:
        // Flow 5: Health Education
        setRole('patient');
        navigateTo('health_education');
        break;
      case 6:
        // Flow 6: Refill Reminder
        setRole('caregiver');
        navigateTo('refill_management');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-[#454D46] text-[#F7F5EF] text-xs px-3 py-2 flex flex-wrap items-center justify-between gap-2 shadow-md border-b border-[#52766B]/50 select-none">
      {/* Brand & Active Persona */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#52766B] flex items-center justify-center font-bold text-white text-[11px]">
          D
        </div>
        <span className="font-semibold tracking-wide">
          DOAWY AI <span className="text-[#B7C6B0] font-normal">| دوائي</span>
        </span>
        <span className="text-[10px] bg-[#52766B]/60 text-[#E8E3D8] px-2 py-0.5 rounded-full border border-[#52766B]">
          {role === 'caregiver' ? 'Caregiver Mode' : 'Patient Mode (Accessible)'}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center flex-wrap gap-1.5">
        {/* Role Toggle */}
        <div className="flex items-center bg-[#353B36] rounded-lg p-0.5 border border-[#52766B]/40">
          <button
            onClick={() => setRole('caregiver')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
              role === 'caregiver'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#E8E3D8]/70 hover:text-white'
            }`}
          >
            Caregiver
          </button>
          <button
            onClick={() => setRole('patient')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
              role === 'patient'
                ? 'bg-[#52766B] text-white shadow-xs'
                : 'text-[#E8E3D8]/70 hover:text-white'
            }`}
          >
            Patient
          </button>
        </div>

        {/* Patient Switcher (if caregiver) */}
        {role === 'caregiver' && (
          <select
            value={activePatient.id}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="bg-[#353B36] text-[#E8E3D8] text-[11px] rounded-lg px-2 py-1 border border-[#52766B]/40 focus:outline-none"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                👤 {p.name} ({p.relation})
              </option>
            ))}
          </select>
        )}

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(isAr ? 'en' : 'ar')}
          className="flex items-center gap-1 bg-[#353B36] hover:bg-[#52766B]/40 text-[#E8E3D8] px-2 py-1 rounded-lg border border-[#52766B]/40 text-[11px] font-medium transition-colors"
          title="Toggle English / Arabic"
        >
          <Globe className="w-3.5 h-3.5 text-[#B7C6B0]" />
          <span>{isAr ? 'English (LTR)' : 'العربية (RTL)'}</span>
        </button>

        {/* Screen Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowScreenPicker(!showScreenPicker);
              setShowFlowPicker(false);
            }}
            className="flex items-center gap-1 bg-[#52766B] hover:bg-[#52766B]/90 text-white px-2.5 py-1 rounded-lg text-[11px] font-medium shadow-xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>27 Screens</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {showScreenPicker && (
            <div className="absolute top-full right-0 mt-1 w-64 max-h-96 overflow-y-auto bg-white text-[#454D46] rounded-xl shadow-2xl border border-[#E8E3D8] p-2 z-50">
              <div className="text-[10px] font-bold text-[#737B74] uppercase px-2 py-1 border-b border-[#E8E3D8] mb-1">
                Jump to Screen (01 - 27)
              </div>
              {screensList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    navigateTo(s.id);
                    setShowScreenPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    currentScreen === s.id
                      ? 'bg-[#52766B]/15 text-[#52766B] font-bold'
                      : 'hover:bg-[#F7F5EF] text-[#454D46]'
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {currentScreen === s.id && (
                    <span className="w-2 h-2 rounded-full bg-[#52766B] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guided Flows Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFlowPicker(!showFlowPicker);
              setShowScreenPicker(false);
            }}
            className="flex items-center gap-1 bg-[#D5A18E] hover:bg-[#D5A18E]/90 text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold shadow-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Interactive Flows</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {showFlowPicker && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-white text-[#454D46] rounded-xl shadow-2xl border border-[#E8E3D8] p-2 z-50">
              <div className="text-[10px] font-bold text-[#737B74] uppercase px-2 py-1 border-b border-[#E8E3D8] mb-1">
                Connected User Journeys
              </div>
              {[
                {
                  num: 1,
                  title: 'Flow 1: Add Medication',
                  desc: 'Scan box → AI Identification → Schedule → Save',
                },
                {
                  num: 2,
                  title: 'Flow 2: Patient Takes Medication',
                  desc: 'Home → "I Took My Medicine" → Confetti & Progress',
                },
                {
                  num: 3,
                  title: 'Flow 3: Missed Dose Alert',
                  desc: 'Unconfirmed dose → Caregiver notification & Call',
                },
                {
                  num: 4,
                  title: 'Flow 4: Medical Summary',
                  desc: 'Patient Profile → Clinical summary & Share PDF',
                },
                {
                  num: 5,
                  title: 'Flow 5: Health Education',
                  desc: 'Patient queries medicine → Verified advice + Sources',
                },
                {
                  num: 6,
                  title: 'Flow 6: Refill Reminder',
                  desc: 'Low stock warning → 2-day alert → 1-click refill',
                },
              ].map((f) => (
                <button
                  key={f.num}
                  onClick={() => handleLaunchFlow(f.num)}
                  className="w-full text-left p-2 rounded-lg hover:bg-[#F7F5EF] transition-colors border-b border-[#F7F5EF] last:border-none"
                >
                  <div className="font-bold text-xs text-[#52766B]">{f.title}</div>
                  <div className="text-[10px] text-[#737B74] mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <button
          onClick={() => setViewMode(viewMode === 'phone' ? 'full' : 'phone')}
          className="p-1.5 rounded-lg bg-[#353B36] hover:bg-[#52766B]/40 text-[#E8E3D8] border border-[#52766B]/40 transition-colors"
          title={viewMode === 'phone' ? 'Switch to Fullscreen' : 'Switch to Mobile Frame'}
        >
          {viewMode === 'phone' ? (
            <Maximize2 className="w-3.5 h-3.5" />
          ) : (
            <Smartphone className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Reset Demo Data */}
        <button
          onClick={resetDemoData}
          className="p-1.5 rounded-lg bg-[#353B36] hover:bg-rose-900/40 text-[#E8E3D8] border border-[#52766B]/40 transition-colors"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
