import React from 'react';
import { ArrowLeft, ArrowRight, Bell, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileHeaderProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotifications?: boolean;
  showSOS?: boolean;
  rightAction?: React.ReactNode;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  showBack = false,
  onBack,
  showNotifications = true,
  showSOS = true,
  rightAction,
}) => {
  const { language, goBack, canGoBack, navigateTo, notifications, role } = useApp();
  const isAr = language === 'ar';
  const displayTitle = isAr && titleAr ? titleAr : title;
  const displaySubtitle = isAr && subtitleAr ? subtitleAr : subtitle;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (canGoBack) {
      goBack();
    } else {
      navigateTo(role === 'caregiver' ? 'caregiver_dashboard' : 'patient_home');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[#F7F5EF]/95 backdrop-blur-md px-4 py-3 border-b border-[#E8E3D8]/80 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-white border border-[#E8E3D8] flex items-center justify-center text-[#454D46] hover:bg-[#E8E3D8]/40 active:scale-95 transition-all shadow-xs shrink-0"
          >
            <BackIcon className="w-5 h-5" />
          </button>
        )}
        <div className="min-w-0 truncate">
          <h1 className="text-base font-bold text-[#454D46] truncate leading-tight">
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="text-xs text-[#737B74] truncate font-medium">
              {displaySubtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightAction}

        {showSOS && (
          <button
            onClick={() => navigateTo('emergency_sos')}
            title={isAr ? 'نداء الطوارئ' : 'Emergency SOS'}
            className="px-2.5 py-1 rounded-full bg-[#D5A18E]/20 text-[#9B4832] border border-[#D5A18E]/40 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#9B4832]" />
            <span>SOS</span>
          </button>
        )}

        {showNotifications && (
          <button
            onClick={() => navigateTo('notifications')}
            className="relative w-9 h-9 rounded-full bg-white border border-[#E8E3D8] flex items-center justify-center text-[#454D46] hover:bg-[#E8E3D8]/40 active:scale-95 transition-all shadow-xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#454D46]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D5A18E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F7F5EF]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
