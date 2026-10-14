export type SeverityLevel = 'mild' | 'moderate' | 'severe';
export type ProblemStatus = 'active' | 'improving' | 'resolved';
export type FrequencyType = 'occasional' | 'daily' | 'continuous';
export type ResultFlag = 'normal' | 'above' | 'below' | 'critical' | 'unknown';
export type DoseStatus = 'taken' | 'skipped' | 'missed' | 'pending';
export type MoodType = 'great' | 'good' | 'neutral' | 'low' | 'anxious' | 'in_pain';
export type Language = 'en' | 'te' | 'hi';

export interface HealthProblem {
  id: string;
  name: string;
  category: string;
  affectedBodyPart: string;
  symptoms: string[];
  severity: number; // 1-10
  severityLabel: SeverityLevel;
  startingDate: string;
  frequency: FrequencyType;
  description: string;
  photoUrl?: string;
  existingDiagnosis?: string;
  currentMedication?: string;
  relatedReportIds: string[];
  status: ProblemStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  dailyLogs?: { date: string; severity: number; note: string }[];
  aiGuidance?: {
    understanding: string;
    selfCare: string[];
    warningSigns: string[];
    questionsForDoctor: string[];
  };
}

export interface ReportMeasurement {
  id: string;
  parameter: string;
  resultValue: number | string;
  unit: string;
  referenceRange: string;
  resultFlag: ResultFlag;
  explanation: string;
}

export interface MedicalReport {
  id: string;
  reportName: string;
  reportType: 'Blood Test' | 'Lipid Panel' | 'Metabolic Panel' | 'Thyroid' | 'Urine Test' | 'X-Ray' | 'MRI/CT' | 'Cardiology' | 'Other';
  testDate: string;
  uploadDate: string;
  hospital: string;
  doctorName?: string;
  measurements: ReportMeasurement[];
  relatedConditionId?: string;
  aiSummary: string;
  attachmentName: string;
  attachmentSize?: string;
  attachmentDataUrl?: string;
  userNotes?: string;
  isVerified: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  frequency: string; // e.g. "Twice daily", "Once daily in morning"
  timing: ('morning' | 'afternoon' | 'evening' | 'bedtime')[];
  startDate: string;
  endDate?: string;
  active: boolean;
  prescribedBy?: string;
  condition?: string;
  prescriptionUrl?: string;
  logs: {
    date: string;
    timeSlot: 'morning' | 'afternoon' | 'evening' | 'bedtime';
    status: DoseStatus;
    timestamp: string;
  }[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialist: string;
  clinic: string;
  locationType: 'in-person' | 'telehealth';
  date: string;
  time: string;
  purpose: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  questionsChecklist: { id: string; text: string; answered: boolean }[];
  visitNotes?: string;
  doctorInstructions?: string;
}

export interface DailyJournalEntry {
  id: string;
  date: string;
  hydrationGlasses: number; // 250ml each (target: 8)
  sleepHours: number;
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  steps: number;
  mood: MoodType;
  systolicBP?: number;
  diastolicBP?: number;
  bloodGlucose?: number; // mg/dL
  weightKg?: number;
  heartRate?: number; // bpm
  nutritionSummary?: string;
  symptomsNotes?: string;
  symptomSeverity?: number;
}

export interface WellnessGoal {
  id: string;
  title: string;
  category: 'activity' | 'hydration' | 'sleep' | 'mindfulness' | 'nutrition' | 'medication';
  targetValue: number;
  currentValue: number;
  unit: string;
  period: 'daily' | 'weekly';
  completed: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  dateOfBirth: string;
  biologicalSex: 'female' | 'male' | 'other' | 'prefer-not-to-say';
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  preferredLanguage: Language;
  notificationsEnabled: boolean;
  aiConsentGranted: boolean;
  geminiApiKey?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  attachments?: { name: string; type: string }[];
  suggestedFollowUps?: string[];
  doctorQuestions?: string[];
  warningFlag?: boolean;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  reviewedBy: string;
  tags: string[];
}
