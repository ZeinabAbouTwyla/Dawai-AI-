import React from 'react';
import { Home, Calendar, Sparkles, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PatientBottomNav: React.FC = () => {
  const { currentScreen, navigateTo, language } = useApp();
  const isAr = language === 'ar';

  const navItems = [
    {
      id: 'patient_home',
      label: isAr ? 'الرئيسية' : 'Home',
      icon: Home,
      screen: 'patient_home' as const,
    },
    {
      id: 'patient_schedule',
      label: isAr ? 'مواعيد الأدوية' : 'Schedule',
      icon: Calendar,
      screen: 'patient_schedule' as const,
    },
    {
      id: 'health_education',
      label: isAr ? 'تثقيف صحي' : 'Education',
      icon: Sparkles,
      screen: 'health_education' as const,
    },
    {
      id: 'patient_profile_view',
      label: isAr ? 'ملفي' : 'Profile',
      icon: User,
      screen: 'patient_profile_view' as const,
    },
  ];

  return (
    <div className="bg-white border-t border-[#E8E3D8] px-4 py-2.5 flex items-center justify-around z-30 select-none shadow-sm">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.screen ||
          (item.id === 'health_education' && currentScreen === 'health_education_chat') ||
          (item.id === 'patient_schedule' && currentScreen === 'medication_details');

        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-150 relative min-w-[72px] ${
              isActive
                ? 'text-[#52766B] font-bold'
                : 'text-[#737B74] hover:text-[#454D46]'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-colors ${
                isActive ? 'bg-[#52766B]/12' : ''
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.9} />
            </div>
            <span className="text-[12px] mt-1 tracking-tight font-medium">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#52766B] mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
