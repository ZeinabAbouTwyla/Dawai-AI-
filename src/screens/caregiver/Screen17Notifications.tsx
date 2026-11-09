import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from '../../components/common/MobileHeader';
import { CaregiverBottomNav } from '../../components/navigation/CaregiverBottomNav';
import {
  Bell,
  AlertCircle,
  Package,
  Clock,
  Heart,
  ShieldAlert,
  CheckCircle,
  CheckCheck,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const Screen17Notifications: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo,
    language,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<
    'all' | 'reminder' | 'missed' | 'refill' | 'patient_update' | 'family_alert'
  >('all');

  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  const filteredNotifs = notifications.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.type === activeCategory;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'missed':
        return <AlertCircle className="w-5 h-5 text-[#9B4832]" />;
      case 'refill':
        return <Package className="w-5 h-5 text-[#52766B]" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-[#52766B]" />;
      case 'patient_update':
        return <Heart className="w-5 h-5 text-[#52766B]" />;
      case 'family_alert':
        return <ShieldAlert className="w-5 h-5 text-[#9B4832]" />;
      default:
        return <Bell className="w-5 h-5 text-[#52766B]" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All', labelAr: 'الكل' },
    { id: 'missed', label: 'Missed Alerts', labelAr: 'تنبيهات الفائتة' },
    { id: 'refill', label: 'Refills', labelAr: 'إعادة التعبئة' },
    { id: 'reminder', label: 'Reminders', labelAr: 'التذكيرات' },
    { id: 'patient_update', label: 'Updates', labelAr: 'تحديثات المريض' },
    { id: 'family_alert', label: 'SOS & Family', labelAr: 'نداءات الطوارئ' },
  ];

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Notifications"
        titleAr="مركز التنبيهات والإشعارات"
        showBack
        showNotifications={false}
        rightAction={
          <button
            onClick={markAllNotificationsRead}
            className="text-[11px] font-bold text-[#52766B] hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'تحديد الكل كمقروء' : 'Mark all read'}</span>
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Category Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((c) => {
            const isSelected = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id as any)}
                className={`py-1.5 px-3 rounded-2xl whitespace-nowrap font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#52766B] text-white border-[#52766B] shadow-xs'
                    : 'bg-white text-[#737B74] border-[#E8E3D8] hover:bg-[#F7F5EF]'
                }`}
              >
                {isAr ? c.labelAr : c.label}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#E8E3D8]">
              <Bell className="w-10 h-10 text-[#737B74] mx-auto mb-2 opacity-40" />
              <p className="text-xs text-[#737B74] font-medium">
                {isAr ? 'لا توجد إشعارات في هذا التصنيف' : 'No notifications in this category'}
              </p>
            </div>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.actionScreen) {
                    navigateTo(n.actionScreen);
                  }
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer shadow-soft space-y-2.5 ${
                  n.read
                    ? 'bg-white/70 border-[#E8E3D8] opacity-80'
                    : n.priority === 'urgent'
                    ? 'bg-[#D5A18E]/15 border-[#D5A18E]/60 ring-2 ring-[#D5A18E]/20'
                    : 'bg-white border-[#B7C6B0] ring-2 ring-[#52766B]/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      n.type === 'missed' || n.priority === 'urgent'
                        ? 'bg-[#D5A18E]/30'
                        : 'bg-[#B7C6B0]/25'
                    }`}
                  >
                    {getIcon(n.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold truncate ${
                          n.priority === 'urgent' ? 'text-[#9B4832]' : 'text-[#454D46]'
                        }`}
                      >
                        {isAr ? n.titleAr : n.title}
                      </h4>
                      <span className="text-[10px] text-[#737B74] font-mono shrink-0 ml-1">
                        {n.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                      {isAr ? n.messageAr : n.message}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D8]/60 text-xs">
                  <span className="text-[11px] font-medium text-[#737B74]">
                    {!n.read && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#52766B] mr-1.5" />
                    )}
                    {n.read ? (isAr ? 'مقروء' : 'Read') : (isAr ? 'جديد' : 'New')}
                  </span>

                  {n.actionLabel && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(n.id);
                        if (n.actionScreen) navigateTo(n.actionScreen);
                      }}
                      className="text-xs font-bold text-[#52766B] hover:underline flex items-center gap-1"
                    >
                      <span>{isAr ? n.actionLabelAr : n.actionLabel}</span>
                      <NextChevron className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CaregiverBottomNav />
    </div>
  );
};
