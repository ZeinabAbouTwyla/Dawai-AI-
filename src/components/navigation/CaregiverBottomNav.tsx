import React from 'react';
import { Home, Pill, Users, FileText, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaregiverBottomNav: React.FC = () => {
  const { currentScreen, navigateTo, language } = useApp();

  const isAr = language === 'ar';

  const navItems = [
    {
      id: 'caregiver_dashboard',
      label: isAr ? 'الرئيسية' : 'Home',
      icon: Home,
      screen: 'caregiver_dashboard' as const,
    },
    {
      id: 'medication_management',
      label: isAr ? 'الأدوية' : 'Medicines',
      icon: Pill,
      screen: 'medication_management' as const,
    },
    {
      id: 'patients_list',
      label: isAr ? 'المرضى' : 'Patients',
      icon: Users,
      screen: 'patients_list' as const,
    },
    {
      id: 'medical_summary',
      label: isAr ? 'الملف الطبي' : 'Summary',
      icon: FileText,
      screen: 'medical_summary' as const,
    },
    {
      id: 'settings',
      label: isAr ? 'حسابي' : 'Profile',
      icon: User,
      screen: 'settings' as const,
    },
  ];

  return (
    <div className="bg-white border-t border-[#E8E3D8] px-3 py-2 flex items-center justify-around z-30 select-none shadow-sm">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.screen ||
          (item.id === 'medication_management' &&
            ['medication_scheduling', 'add_medication', 'medicine_id_results', 'medication_schedule'].includes(
              currentScreen
            )) ||
          (item.id === 'patients_list' && currentScreen === 'patient_profile');

        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 relative ${
              isActive
                ? 'text-[#52766B] font-semibold'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-colors ${
                isActive ? 'bg-[#52766B]/10' : ''
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.3 : 1.8} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight font-medium">
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#52766B]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
