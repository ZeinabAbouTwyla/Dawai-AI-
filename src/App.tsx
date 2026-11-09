/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DevSimulatorBar } from './components/simulator/DevSimulatorBar';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

// Screens import
import { Screen01Splash, Screen02Welcome } from './screens/onboarding/Screen01Splash';
import { Screen03Login, Screen04Register } from './screens/onboarding/Screen03Login';
import { Screen05AccountType, Screen06PatientLinking } from './screens/onboarding/Screen05AccountType';
import { Screen07CaregiverDashboard } from './screens/caregiver/Screen07CaregiverDashboard';
import { Screen08PatientsList } from './screens/caregiver/Screen08PatientsList';
import { Screen09PatientProfile } from './screens/caregiver/Screen09PatientProfile';
import { Screen10AddMedication } from './screens/caregiver/Screen10AddMedication';
import { Screen11MedicineIdResults } from './screens/caregiver/Screen11MedicineIdResults';
import { Screen12MedicationScheduling } from './screens/caregiver/Screen12MedicationScheduling';
import { Screen13MedicationManagement } from './screens/caregiver/Screen13MedicationManagement';
import { Screen14MedicationSchedule } from './screens/caregiver/Screen14MedicationSchedule';
import { Screen15MedicalSummary } from './screens/caregiver/Screen15MedicalSummary';
import { Screen16AdherenceReports } from './screens/caregiver/Screen16AdherenceReports';
import { Screen17Notifications } from './screens/caregiver/Screen17Notifications';
import { Screen18PatientHome } from './screens/patient/Screen18PatientHome';
import { Screen19PatientSchedule } from './screens/patient/Screen19PatientSchedule';
import { Screen20MedicationDetails } from './screens/patient/Screen20MedicationDetails';
import { Screen21HealthEducation } from './screens/patient/Screen21HealthEducation';
import { Screen22HealthEducationChat } from './screens/patient/Screen22HealthEducationChat';
import { Screen23PatientProfile } from './screens/patient/Screen23PatientProfile';
import { ScreenPatientDrugSummary } from './screens/patient/ScreenPatientDrugSummary';
import { Screen24RefillManagement } from './screens/shared/Screen24RefillManagement';
import { Screen25EmergencySOS } from './screens/shared/Screen25EmergencySOS';
import { Screen26Settings } from './screens/shared/Screen26Settings';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    // Onboarding
    case 'splash':
      return <Screen01Splash />;
    case 'welcome':
      return <Screen02Welcome />;
    case 'login':
      return <Screen03Login />;
    case 'register':
      return <Screen04Register />;
    case 'account_type':
      return <Screen05AccountType />;
    case 'patient_linking':
      return <Screen06PatientLinking />;

    // Caregiver Experience
    case 'caregiver_dashboard':
      return <Screen07CaregiverDashboard />;
    case 'patients_list':
      return <Screen08PatientsList />;
    case 'patient_profile':
      return <Screen09PatientProfile />;
    case 'add_medication':
      return <Screen10AddMedication />;
    case 'medicine_id_results':
      return <Screen11MedicineIdResults />;
    case 'medication_scheduling':
      return <Screen12MedicationScheduling />;
    case 'medication_management':
      return <Screen13MedicationManagement />;
    case 'medication_schedule':
      return <Screen14MedicationSchedule />;
    case 'medical_summary':
      return <Screen15MedicalSummary />;
    case 'adherence_reports':
      return <Screen16AdherenceReports />;
    case 'notifications':
      return <Screen17Notifications />;

    // Patient Experience
    case 'patient_home':
      return <Screen18PatientHome />;
    case 'patient_schedule':
      return <Screen19PatientSchedule />;
    case 'medication_details':
      return <Screen20MedicationDetails />;
    case 'health_education':
      return <Screen21HealthEducation />;
    case 'health_education_chat':
      return <Screen22HealthEducationChat />;
    case 'patient_profile_view':
      return <Screen23PatientProfile />;
    case 'patient_drug_summary':
      return <ScreenPatientDrugSummary />;

    // Shared Features
    case 'refill_management':
      return <Screen24RefillManagement />;
    case 'emergency_sos':
      return <Screen25EmergencySOS />;
    case 'settings':
      return <Screen26Settings />;

    default:
      return <Screen07CaregiverDashboard />;
  }
};

const MobileFrameContainer: React.FC = () => {
  const { viewMode, language } = useApp();
  const isAr = language === 'ar';

  if (viewMode === 'full') {
    return (
      <div className="flex-1 w-full flex flex-col bg-[#F7F5EF] max-w-2xl mx-auto shadow-xl border-x border-[#E8E3D8] min-h-[calc(100vh-45px)]">
        <ScreenRouter />
      </div>
    );
  }

  // Realistic Mobile Smartphone Frame
  return (
    <div className="flex-1 flex items-center justify-center p-3 sm:p-6 bg-[#EBE6DD] min-h-[calc(100vh-45px)] overflow-y-auto">
      <div className="relative w-full max-w-[412px] h-[844px] bg-[#F7F5EF] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(69,77,70,0.3)] border-[10px] border-[#363E38] flex flex-col overflow-hidden ring-1 ring-black/10">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#363E38] rounded-full z-40 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1F2420] ml-3" />
        </div>

        {/* Mobile Status Bar */}
        <div className="px-7 pt-3.5 pb-1 flex items-center justify-between text-[11px] font-bold text-[#454D46] z-30 select-none bg-transparent">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <ScreenRouter />
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-transparent flex items-center justify-center pointer-events-none shrink-0 z-30">
          <div className="w-32 h-1 bg-[#454D46]/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#454D46] font-['Inter']">
        {/* Top Developer & Showcase Navigator */}
        <DevSimulatorBar />

        {/* Mobile Device Frame or Fullscreen */}
        <MobileFrameContainer />
      </div>
    </AppProvider>
  );
}
