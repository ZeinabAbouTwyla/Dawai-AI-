import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  Language,
  ScreenId,
  Patient,
  Medication,
  DoseRecord,
  NotificationItem,
  MedicalRecord,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_MEDICATIONS,
  INITIAL_DOSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_MEDICAL_RECORDS,
} from '../data/mockData';

interface NavigationHistoryItem {
  screen: ScreenId;
  params?: any;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentScreen: ScreenId;
  screenParams?: any;
  navigateTo: (screen: ScreenId, params?: any) => void;
  goBack: () => void;
  canGoBack: boolean;
  viewMode: 'phone' | 'full';
  setViewMode: (mode: 'phone' | 'full') => void;

  // Data
  patients: Patient[];
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  activePatient: Patient;
  medications: Medication[];
  patientMedications: Medication[];
  doses: DoseRecord[];
  todayDoses: DoseRecord[];
  notifications: NotificationItem[];
  medicalRecords: MedicalRecord[];

  // Actions
  confirmDose: (doseId: string, notes?: string) => void;
  snoozeDose: (doseId: string, minutes?: number) => void;
  markDoseMissed: (doseId: string) => void;
  addMedication: (med: Omit<Medication, 'id'>) => string;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  requestRefill: (medicationId: string) => void;
  toggleRenewable: (medicationId: string, isRenewable: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerEmergencySOS: (patientId: string) => void;

  // Scanner flow state
  scannedDraft: Partial<Medication> | null;
  setScannedDraft: (draft: Partial<Medication> | null) => void;

  // Reset / Demo
  resetDemoData: () => void;

  // Translations dictionary
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('caregiver');
  const [language, setLanguageState] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('caregiver_dashboard');
  const [screenParams, setScreenParams] = useState<any>(null);
  const [navHistory, setNavHistory] = useState<NavigationHistoryItem[]>([
    { screen: 'caregiver_dashboard' },
  ]);
  const [viewMode, setViewMode] = useState<'phone' | 'full'>('phone');

  // App Data
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [activePatientId, setActivePatientId] = useState<string>('p1');
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [doses, setDoses] = useState<DoseRecord[]>(INITIAL_DOSES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [medicalRecords] = useState<MedicalRecord[]>(INITIAL_MEDICAL_RECORDS);

  // Scanner state
  const [scannedDraft, setScannedDraft] = useState<Partial<Medication> | null>(null);

  // Set RTL direction on document
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'patient') {
      navigateTo('patient_home');
    } else {
      navigateTo('caregiver_dashboard');
    }
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const navigateTo = (screen: ScreenId, params?: any) => {
    setNavHistory((prev) => [...prev, { screen, params }]);
    setCurrentScreen(screen);
    setScreenParams(params || null);
  };

  const goBack = () => {
    if (navHistory.length > 1) {
      const nextHistory = [...navHistory];
      nextHistory.pop(); // remove current
      const prev = nextHistory[nextHistory.length - 1];
      setNavHistory(nextHistory);
      setCurrentScreen(prev.screen);
      setScreenParams(prev.params || null);
    }
  };

  const canGoBack = navHistory.length > 1;

  const activePatient =
    patients.find((p) => p.id === activePatientId) || patients[0];

  const patientMedications = medications.filter(
    (m) => m.patientId === activePatientId
  );

  const todayDoses = doses.filter((d) => d.patientId === activePatientId);

  // Confirm dose action with celebratory confetti
  const confirmDose = (doseId: string, notes?: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDoses((prev) =>
      prev.map((d) => {
        if (d.id === doseId) {
          return {
            ...d,
            status: 'confirmed',
            confirmedAt: timeNow,
            notes: notes || d.notes,
          };
        }
        return d;
      })
    );

    // Decrement medication remaining quantity
    const dose = doses.find((d) => d.id === doseId);
    if (dose) {
      setMedications((prev) =>
        prev.map((m) => {
          if (m.id === dose.medicationId) {
            const newRemaining = Math.max(0, m.remainingQuantity - 1);
            return {
              ...m,
              remainingQuantity: newRemaining,
              isLowStock: newRemaining <= 8,
            };
          }
          return m;
        })
      );
    }

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#52766B', '#B7C6B0', '#D5A18E', '#E8E3D8'],
      });
    } catch {
      // safe fallback
    }

    // Add family notification if patient confirmed
    const med = medications.find((m) => m.id === dose?.medicationId);
    if (med) {
      const newNotif: NotificationItem = {
        id: 'n-' + Date.now(),
        type: 'patient_update',
        title: `Dose Confirmed: ${med.brandName}`,
        titleAr: `تم تأكيد الجرعة: ${med.brandNameAr}`,
        message: `${activePatient.name} confirmed taking ${med.strength} at ${timeNow}.`,
        messageAr: `أكّد ${activePatient.nameAr} تناول ${med.brandNameAr} (${med.strength}) في تمام ${timeNow}.`,
        timestamp: 'Just now',
        read: false,
        patientId: activePatientId,
        actionScreen: 'medication_schedule',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const snoozeDose = (doseId: string, minutes: number = 30) => {
    setDoses((prev) =>
      prev.map((d) => (d.id === doseId ? { ...d, status: 'snoozed' } : d))
    );
    // Add notification
    const dose = doses.find((d) => d.id === doseId);
    const med = medications.find((m) => m.id === dose?.medicationId);
    if (med) {
      setNotifications((prev) => [
        {
          id: 'n-' + Date.now(),
          type: 'reminder',
          title: `Reminder Snoozed (${minutes}m)`,
          titleAr: `تم تأجيل التذكير (${minutes} دقيقة)`,
          message: `${med.brandName} dose was snoozed for ${minutes} minutes.`,
          messageAr: `تم تأجيل جرعة ${med.brandNameAr} لمدة ${minutes} دقيقة.`,
          timestamp: 'Just now',
          read: false,
          patientId: activePatientId,
          actionScreen: 'medication_schedule',
        },
        ...prev,
      ]);
    }
  };

  const markDoseMissed = (doseId: string) => {
    setDoses((prev) =>
      prev.map((d) => (d.id === doseId ? { ...d, status: 'missed' } : d))
    );
    const dose = doses.find((d) => d.id === doseId);
    const med = medications.find((m) => m.id === dose?.medicationId);
    if (med) {
      setNotifications((prev) => [
        {
          id: 'n-' + Date.now(),
          type: 'missed',
          title: `Missed Dose Alert: ${med.brandName}`,
          titleAr: `تنبيه: جرعة فائتة (${med.brandNameAr})`,
          message: `${activePatient.name} has not confirmed their ${med.brandName} scheduled for ${dose?.scheduledTime}. Please follow up.`,
          messageAr: `لم يؤكد ${activePatient.nameAr} أخذ دواء ${med.brandNameAr} المجدول في ${dose?.scheduledTime}. يُرجى المتابعة.`,
          timestamp: 'Just now',
          read: false,
          patientId: activePatientId,
          actionScreen: 'medication_schedule',
          priority: 'urgent',
        },
        ...prev,
      ]);
    }
  };

  const addMedication = (medData: Omit<Medication, 'id'>): string => {
    const newId = 'med-' + Date.now();
    const newMed: Medication = {
      ...medData,
      id: newId,
    };
    setMedications((prev) => [newMed, ...prev]);

    // Automatically create today doses for the new medication if active
    if (newMed.status === 'active') {
      const times = newMed.scheduledTimes;
      const newDoses: DoseRecord[] = [];
      if (times.morning) {
        newDoses.push({
          id: `d-${newId}-morning`,
          medicationId: newId,
          patientId: newMed.patientId,
          scheduledTime: times.morning,
          scheduledPeriod: 'morning',
          status: 'pending',
        });
      }
      if (times.afternoon) {
        newDoses.push({
          id: `d-${newId}-afternoon`,
          medicationId: newId,
          patientId: newMed.patientId,
          scheduledTime: times.afternoon,
          scheduledPeriod: 'afternoon',
          status: 'pending',
        });
      }
      if (times.evening) {
        newDoses.push({
          id: `d-${newId}-evening`,
          medicationId: newId,
          patientId: newMed.patientId,
          scheduledTime: times.evening,
          scheduledPeriod: 'evening',
          status: 'pending',
        });
      }
      if (times.night) {
        newDoses.push({
          id: `d-${newId}-night`,
          medicationId: newId,
          patientId: newMed.patientId,
          scheduledTime: times.night,
          scheduledPeriod: 'night',
          status: 'pending',
        });
      }
      if (newDoses.length > 0) {
        setDoses((prev) => [...prev, ...newDoses]);
      }
    }

    // Add notification
    setNotifications((prev) => [
      {
        id: 'n-' + Date.now(),
        type: 'patient_update',
        title: `Medication Added: ${newMed.brandName}`,
        titleAr: `تمت إضافة دواء جديد: ${newMed.brandNameAr || newMed.brandName}`,
        message: `Caregiver added ${newMed.brandName} (${newMed.strength}) to schedule.`,
        messageAr: `أضاف مقدم الرعاية ${newMed.brandNameAr || newMed.brandName} إلى الجدول العلاجي.`,
        timestamp: 'Just now',
        read: false,
        patientId: newMed.patientId,
        actionScreen: 'medication_management',
      },
      ...prev,
    ]);

    return newId;
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const requestRefill = (medicationId: string) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === medicationId) {
          return {
            ...m,
            remainingQuantity: m.totalQuantity,
            isLowStock: false,
            refillStatus: 'reordered',
            lastReorderedDate: 'Today',
            refillDate: '2026-12-10',
          };
        }
        return m;
      })
    );

    const med = medications.find((m) => m.id === medicationId);
    if (med) {
      setNotifications((prev) => [
        {
          id: 'n-' + Date.now(),
          type: 'refill',
          title: `Refill Ordered: ${med.brandName}`,
          titleAr: `تم طلب إعادة الصرف: ${med.brandNameAr}`,
          message: `Refill order for ${med.brandName} (${med.totalQuantity} units) has been sent to pharmacy partner.`,
          messageAr: `تم إرسال طلب إعادة صرف ${med.brandNameAr} إلى الصيدلية المعتمدة بنجاح.`,
          timestamp: 'Just now',
          read: false,
          patientId: activePatientId,
          actionScreen: 'refill_management',
        },
        ...prev,
      ]);
    }
  };

  const toggleRenewable = (medicationId: string, isRenewable: boolean) => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id === medicationId) {
          return {
            ...m,
            isRenewable,
            autoRefill: isRenewable ? m.autoRefill ?? true : false,
          };
        }
        return m;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const triggerEmergencySOS = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId) || activePatient;
    const alert: NotificationItem = {
      id: 'sos-' + Date.now(),
      type: 'family_alert',
      title: `EMERGENCY ALERT: ${patient.name}`,
      titleAr: `نداء طوارئ عاجل: ${patient.nameAr}`,
      message: `${patient.name} pressed the Emergency SOS button. Immediate caregiver contact initiated. Contact: ${patient.emergencyContact.phone}`,
      messageAr: `قام ${patient.nameAr} بالضغط على زر الطوارئ SOS. تم تفعيل الاتصال العاجل. رقم الطوارئ: ${patient.emergencyContact.phone}`,
      timestamp: 'Active right now',
      read: false,
      patientId: patient.id,
      priority: 'urgent',
    };
    setNotifications((prev) => [alert, ...prev]);
  };

  const resetDemoData = () => {
    setPatients(INITIAL_PATIENTS);
    setMedications(INITIAL_MEDICATIONS);
    setDoses(INITIAL_DOSES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivePatientId('p1');
    navigateTo('caregiver_dashboard');
  };

  // Translation lookup helper
  const t = (key: string): string => {
    const dict: Record<string, { en: string; ar: string }> = {
      appName: { en: 'DOAWY AI', ar: 'دوائي' },
      tagline: { en: 'Your Health, Organized.', ar: 'صحتك، منظمة ومحفوظة.' },
      caregiver: { en: 'Caregiver', ar: 'مقدم الرعاية' },
      patient: { en: 'Patient', ar: 'المريض' },
      home: { en: 'Home', ar: 'الرئيسية' },
      medicines: { en: 'Medicines', ar: 'الأدوية' },
      patients: { en: 'Patients', ar: 'المرضى' },
      schedule: { en: 'Schedule', ar: 'الجدول' },
      medicalSummary: { en: 'Medical Summary', ar: 'الملف الطبي' },
      reports: { en: 'Reports', ar: 'التقارير' },
      notifications: { en: 'Notifications', ar: 'الإشعارات' },
      healthEducation: { en: 'Health Education', ar: 'التثقيف الصحي' },
      profile: { en: 'Profile', ar: 'الملف الشخصي' },
      settings: { en: 'Settings', ar: 'الإعدادات' },
      addMedication: { en: 'Add Medication', ar: 'إضافة دواء' },
      iTookMyMedicine: { en: 'I Took My Medicine', ar: 'تناولتُ دوائي الآن' },
      remindLater: { en: 'Remind Me Later', ar: 'ذكرني لاحقاً' },
      nextMedication: { en: 'Next Medication', ar: 'الجرعة القادمة' },
      sosButton: { en: 'Emergency SOS', ar: 'نداء الطوارئ SOS' },
      refillManager: { en: 'Refill Manager', ar: 'إدارة المخزون' },
    };
    if (dict[key]) {
      return language === 'ar' ? dict[key].ar : dict[key].en;
    }
    return key;
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        currentScreen,
        screenParams,
        navigateTo,
        goBack,
        canGoBack,
        viewMode,
        setViewMode,
        patients,
        activePatientId,
        setActivePatientId,
        activePatient,
        medications,
        patientMedications,
        doses,
        todayDoses,
        notifications,
        medicalRecords,
        confirmDose,
        snoozeDose,
        markDoseMissed,
        addMedication,
        updateMedication,
        requestRefill,
        toggleRenewable,
        markNotificationRead,
        markAllNotificationsRead,
        triggerEmergencySOS,
        scannedDraft,
        setScannedDraft,
        resetDemoData,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
