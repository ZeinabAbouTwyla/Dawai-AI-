export type UserRole = 'caregiver' | 'patient';
export type Language = 'en' | 'ar';

export type ScreenId =
  // Onboarding
  | 'splash' // 01
  | 'welcome' // 02
  | 'login' // 03
  | 'register' // 04
  | 'account_type' // 05
  | 'patient_linking' // 06
  // Caregiver
  | 'caregiver_dashboard' // 07
  | 'patients_list' // 08
  | 'patient_profile' // 09
  | 'add_medication' // 10
  | 'medicine_id_results' // 11
  | 'medication_scheduling' // 12
  | 'medication_management' // 13
  | 'medication_schedule' // 14
  | 'medical_summary' // 15
  | 'adherence_reports' // 16
  | 'notifications' // 17
  // Patient
  | 'patient_home' // 18
  | 'patient_schedule' // 19
  | 'medication_details' // 20
  | 'health_education' // 21
  | 'health_education_chat' // 22
  | 'patient_profile_view' // 23
  | 'patient_drug_summary' // 27 Patient Drug Summary
  // Shared
  | 'refill_management' // 24
  | 'emergency_sos' // 25
  | 'settings'; // 26

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type MedicationStatus = 'active' | 'completed' | 'discontinued' | 'paused';
export type DoseStatus = 'confirmed' | 'pending' | 'missed' | 'snoozed';

export interface Patient {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  gender: 'male' | 'female';
  photo: string;
  relation: string;
  relationAr: string;
  conditions: string[];
  conditionsAr: string[];
  allergies: string[];
  allergiesAr: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  connectionStatus: 'connected' | 'pending';
  inviteCode: string;
  adherenceRate: number; // percentage, e.g. 94
  bloodType?: string;
  doctorName?: string;
  hospital?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  brandName: string;
  brandNameAr: string;
  activeIngredient: string;
  activeIngredientAr: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'drops' | 'inhaler';
  formAr: string;
  packageImage: string;
  prescribedDosage: string;
  prescribedDosageAr: string;
  frequency: string;
  frequencyAr: string;
  scheduledTimes: {
    morning?: string;
    afternoon?: string;
    evening?: string;
    night?: string;
  };
  startDate: string;
  endDate: string;
  totalQuantity: number;
  remainingQuantity: number;
  unit: string;
  unitAr: string;
  instructions: string;
  instructionsAr: string;
  status: MedicationStatus;
  refillDate: string;
  isLowStock: boolean;
  isRenewable?: boolean; // هل الدواء متجدد ويعاد طلبه عند النفاد
  autoRefill?: boolean; // تفعيل إعادة الطلب التلقائي
  refillStatus?: 'normal' | 'low' | 'reorder_requested' | 'reordered';
  lastReorderedDate?: string;
  confidenceScore?: number; // for scan identification
  colorCode?: string;
}

export interface DoseRecord {
  id: string;
  medicationId: string;
  patientId: string;
  scheduledTime: string;
  scheduledPeriod: TimeOfDay;
  status: DoseStatus;
  confirmedAt?: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  type: 'reminder' | 'missed' | 'refill' | 'patient_update' | 'family_alert';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionLabelAr?: string;
  actionScreen?: ScreenId;
  patientId: string;
  priority?: 'normal' | 'high' | 'urgent';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  title: string;
  titleAr: string;
  category: 'condition' | 'lab' | 'visit' | 'procedure';
  doctor: string;
  facility: string;
  notes: string;
  notesAr: string;
}

export interface HealthChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  textAr?: string;
  timestamp: string;
  sources?: {
    name: string;
    url?: string;
    institution: string;
  }[];
  disclaimer?: string;
  relatedMedication?: string;
}
