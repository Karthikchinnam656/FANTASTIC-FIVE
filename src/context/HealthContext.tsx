'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  HealthProblem,
  MedicalReport,
  Medication,
  Appointment,
  DailyJournalEntry,
  WellnessGoal,
  ChatMessage,
  Language,
  DoseStatus
} from '@/types/health';
import {
  INITIAL_USER_PROFILE,
  INITIAL_HEALTH_PROBLEMS,
  INITIAL_MEDICAL_REPORTS,
  INITIAL_MEDICATIONS,
  INITIAL_APPOINTMENTS,
  INITIAL_DAILY_JOURNAL,
  INITIAL_WELLNESS_GOALS,
  RAJESH_SHARMA_PROFILE,
  RAJESH_APOLLO_REPORT,
  RAJESH_MEDICATIONS,
  RAJESH_DOCTOR_APPOINTMENT
} from '@/data/initialData';
import { CareVistaAIEngine } from '@/lib/aiEngine';

export type NavSection =
  | 'landing'
  | 'dashboard'
  | 'ai-assistant'
  | 'problems'
  | 'symptom-checker'
  | 'body-map'
  | 'reports'
  | 'report-analyzer'
  | 'medications'
  | 'history'
  | 'analytics'
  | 'journal'
  | 'appointments'
  | 'wellness'
  | 'education'
  | 'emergency'
  | 'profile'
  | 'mobile-app'
  | 'mobile-architecture'
  | 'visual-atlas'
  | 'ambulance'
  | 'specialties'
  | 'insurance';

interface HealthContextType {
  activeSection: NavSection;
  setActiveSection: (sec: NavSection) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  healthProblems: HealthProblem[];
  addHealthProblem: (problem: Partial<HealthProblem>) => HealthProblem;
  updateHealthProblem: (id: string, updates: Partial<HealthProblem>) => void;
  deleteHealthProblem: (id: string) => void;
  medicalReports: MedicalReport[];
  addMedicalReport: (report: MedicalReport) => void;
  updateMedicalReport: (id: string, updates: Partial<MedicalReport>) => void;
  deleteMedicalReport: (id: string) => void;
  activeReportForAnalyzer: MedicalReport | null;
  setActiveReportForAnalyzer: (report: MedicalReport | null) => void;
  medications: Medication[];
  addMedication: (med: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  logMedicationDose: (medId: string, timeSlot: 'morning' | 'afternoon' | 'evening' | 'bedtime', status: DoseStatus) => void;
  appointments: Appointment[];
  addAppointment: (apt: Partial<Appointment>) => void;
  toggleAppointmentQuestion: (aptId: string, qId: string) => void;
  deleteAppointment: (id: string) => void;
  journalEntries: DailyJournalEntry[];
  addJournalEntry: (entry: Partial<DailyJournalEntry>) => void;
  wellnessGoals: WellnessGoal[];
  updateWellnessGoal: (id: string, currentValue: number) => void;
  chatMessages: ChatMessage[];
  isChatTyping: boolean;
  sendChatMessage: (text: string, attachedReport?: MedicalReport) => Promise<void>;
  clearChat: () => void;
  prefillProblemArea: { regionId: string; initialSymptom?: string } | null;
  setPrefillProblemArea: (prefill: { regionId: string; initialSymptom?: string } | null) => void;
  resetToDemoData: () => void;
  exportDataAsJSON: () => void;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  loadRajeshDemoProfile: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('en');
  
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [healthProblems, setHealthProblems] = useState<HealthProblem[]>(INITIAL_HEALTH_PROBLEMS);
  const [medicalReports, setMedicalReports] = useState<MedicalReport[]>(INITIAL_MEDICAL_REPORTS);
  const [activeReportForAnalyzer, setActiveReportForAnalyzer] = useState<MedicalReport | null>(INITIAL_MEDICAL_REPORTS[0]);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [journalEntries, setJournalEntries] = useState<DailyJournalEntry[]>(INITIAL_DAILY_JOURNAL);
  const [wellnessGoals, setWellnessGoals] = useState<WellnessGoal[]>(INITIAL_WELLNESS_GOALS);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: `Hello ${INITIAL_USER_PROFILE.fullName}! I am **CareVista AI**, your personal health copilot. I am ready to review your active health concerns, summarize your lab tests, or assist with daily symptom tracking. How can I help you today?`,
      timestamp: '09:00 AM',
      language: 'en',
      suggestedFollowUps: [
        'Review my latest blood test report',
        'What self-care works for my tension headache?',
        'Show my medication schedule for today',
        'Help me prepare questions for Dr. Vance'
      ]
    }
  ]);
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);
  const [prefillProblemArea, setPrefillProblemArea] = useState<{ regionId: string; initialSymptom?: string } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Load persisted state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedDark = localStorage.getItem('carevista_dark');
      if (savedDark !== null) {
        const isDark = savedDark === 'true';
        setDarkMode(isDark);
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }

      const savedLang = localStorage.getItem('carevista_lang') as Language;
      if (savedLang) setLanguageState(savedLang);

      const savedProfile = localStorage.getItem('carevista_profile');
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));

      const savedProblems = localStorage.getItem('carevista_problems');
      if (savedProblems) setHealthProblems(JSON.parse(savedProblems));

      const savedReports = localStorage.getItem('carevista_reports');
      if (savedReports) setMedicalReports(JSON.parse(savedReports));

      const savedMeds = localStorage.getItem('carevista_meds');
      if (savedMeds) setMedications(JSON.parse(savedMeds));

      const savedApts = localStorage.getItem('carevista_apts');
      if (savedApts) setAppointments(JSON.parse(savedApts));

      const savedJournal = localStorage.getItem('carevista_journal');
      if (savedJournal) setJournalEntries(JSON.parse(savedJournal));

      const savedGoals = localStorage.getItem('carevista_goals');
      if (savedGoals) setWellnessGoals(JSON.parse(savedGoals));
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
  }, []);

  // Sync dark mode class
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('carevista_dark', String(next));
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('carevista_lang', lang);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('carevista_profile', JSON.stringify(next));
      return next;
    });
  };

  const addHealthProblem = (problemData: Partial<HealthProblem>): HealthProblem => {
    const guid = CareVistaAIEngine.generateProblemGuidance(
      problemData.name || 'General Health Concern',
      problemData.affectedBodyPart || 'General',
      problemData.severity || 5,
      problemData.symptoms || []
    );

    const newProblem: HealthProblem = {
      id: `prb-${Date.now()}`,
      name: problemData.name || 'Untitled Problem',
      category: problemData.category || 'General',
      affectedBodyPart: problemData.affectedBodyPart || 'Head & Neck',
      symptoms: problemData.symptoms || [],
      severity: problemData.severity || 5,
      severityLabel: (problemData.severity || 5) > 6 ? 'severe' : (problemData.severity || 5) > 3 ? 'moderate' : 'mild',
      startingDate: problemData.startingDate || new Date().toISOString().split('T')[0],
      frequency: problemData.frequency || 'occasional',
      description: problemData.description || '',
      photoUrl: problemData.photoUrl,
      existingDiagnosis: problemData.existingDiagnosis,
      currentMedication: problemData.currentMedication,
      relatedReportIds: problemData.relatedReportIds || [],
      status: problemData.status || 'active',
      notes: problemData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dailyLogs: [
        {
          date: new Date().toISOString().split('T')[0],
          severity: problemData.severity || 5,
          note: 'Initial health problem logged.'
        }
      ],
      aiGuidance: guid
    };

    setHealthProblems(prev => {
      const next = [newProblem, ...prev];
      localStorage.setItem('carevista_problems', JSON.stringify(next));
      return next;
    });

    return newProblem;
  };

  const updateHealthProblem = (id: string, updates: Partial<HealthProblem>) => {
    setHealthProblems(prev => {
      const next = prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
          if (updates.severity) {
            updated.severityLabel = updates.severity > 6 ? 'severe' : updates.severity > 3 ? 'moderate' : 'mild';
          }
          return updated;
        }
        return p;
      });
      localStorage.setItem('carevista_problems', JSON.stringify(next));
      return next;
    });
  };

  const deleteHealthProblem = (id: string) => {
    setHealthProblems(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('carevista_problems', JSON.stringify(next));
      return next;
    });
  };

  const addMedicalReport = (report: MedicalReport) => {
    setMedicalReports(prev => {
      const next = [report, ...prev];
      localStorage.setItem('carevista_reports', JSON.stringify(next));
      return next;
    });
    setActiveReportForAnalyzer(report);
  };

  const updateMedicalReport = (id: string, updates: Partial<MedicalReport>) => {
    setMedicalReports(prev => {
      const next = prev.map(r => r.id === id ? { ...r, ...updates } : r);
      localStorage.setItem('carevista_reports', JSON.stringify(next));
      return next;
    });
  };

  const deleteMedicalReport = (id: string) => {
    setMedicalReports(prev => {
      const next = prev.filter(r => r.id !== id);
      localStorage.setItem('carevista_reports', JSON.stringify(next));
      return next;
    });
    if (activeReportForAnalyzer?.id === id) {
      setActiveReportForAnalyzer(medicalReports.find(r => r.id !== id) || null);
    }
  };

  const addMedication = (med: Partial<Medication>) => {
    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: med.name || 'Medication',
      dosage: med.dosage || '1 dose',
      instructions: med.instructions || 'Take as instructed',
      frequency: med.frequency || 'Daily',
      timing: med.timing || ['morning'],
      startDate: med.startDate || new Date().toISOString().split('T')[0],
      active: true,
      prescribedBy: med.prescribedBy,
      condition: med.condition,
      logs: []
    };

    setMedications(prev => {
      const next = [newMed, ...prev];
      localStorage.setItem('carevista_meds', JSON.stringify(next));
      return next;
    });
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => {
      const next = prev.filter(m => m.id !== id);
      localStorage.setItem('carevista_meds', JSON.stringify(next));
      return next;
    });
  };

  const logMedicationDose = (
    medId: string,
    timeSlot: 'morning' | 'afternoon' | 'evening' | 'bedtime',
    status: DoseStatus
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newLog = {
      date: today,
      timeSlot,
      status,
      timestamp: new Date().toISOString()
    };

    setMedications(prev => {
      const next = prev.map(m => {
        if (m.id === medId) {
          const filteredLogs = m.logs.filter(l => !(l.date === today && l.timeSlot === timeSlot));
          return { ...m, logs: [newLog, ...filteredLogs] };
        }
        return m;
      });
      localStorage.setItem('carevista_meds', JSON.stringify(next));
      return next;
    });
  };

  const addAppointment = (apt: Partial<Appointment>) => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: apt.doctorName || 'Dr. Specialist',
      specialist: apt.specialist || 'General Medicine',
      clinic: apt.clinic || 'Health Clinic',
      locationType: apt.locationType || 'in-person',
      date: apt.date || new Date().toISOString().split('T')[0],
      time: apt.time || '10:00 AM',
      purpose: apt.purpose || 'Follow-up consultation',
      status: 'upcoming',
      questionsChecklist: apt.questionsChecklist || [
        { id: 'q-1', text: 'Discuss current symptom trends', answered: false }
      ],
      visitNotes: apt.visitNotes,
      doctorInstructions: apt.doctorInstructions
    };

    setAppointments(prev => {
      const next = [newApt, ...prev];
      localStorage.setItem('carevista_apts', JSON.stringify(next));
      return next;
    });
  };

  const toggleAppointmentQuestion = (aptId: string, qId: string) => {
    setAppointments(prev => {
      const next = prev.map(apt => {
        if (apt.id === aptId) {
          const updatedChecklist = apt.questionsChecklist.map(q =>
            q.id === qId ? { ...q, answered: !q.answered } : q
          );
          return { ...apt, questionsChecklist: updatedChecklist };
        }
        return apt;
      });
      localStorage.setItem('carevista_apts', JSON.stringify(next));
      return next;
    });
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => {
      const next = prev.filter(a => a.id !== id);
      localStorage.setItem('carevista_apts', JSON.stringify(next));
      return next;
    });
  };

  const addJournalEntry = (entry: Partial<DailyJournalEntry>) => {
    const today = entry.date || new Date().toISOString().split('T')[0];
    const newEntry: DailyJournalEntry = {
      id: `jrn-${Date.now()}`,
      date: today,
      hydrationGlasses: entry.hydrationGlasses ?? 6,
      sleepHours: entry.sleepHours ?? 7.5,
      sleepQuality: entry.sleepQuality ?? 'good',
      steps: entry.steps ?? 6000,
      mood: entry.mood ?? 'good',
      systolicBP: entry.systolicBP,
      diastolicBP: entry.diastolicBP,
      bloodGlucose: entry.bloodGlucose,
      heartRate: entry.heartRate,
      weightKg: entry.weightKg,
      nutritionSummary: entry.nutritionSummary,
      symptomsNotes: entry.symptomsNotes,
      symptomSeverity: entry.symptomSeverity
    };

    setJournalEntries(prev => {
      const filtered = prev.filter(j => j.date !== today);
      const next = [newEntry, ...filtered];
      localStorage.setItem('carevista_journal', JSON.stringify(next));
      return next;
    });
  };

  const updateWellnessGoal = (id: string, currentValue: number) => {
    setWellnessGoals(prev => {
      const next = prev.map(g => {
        if (g.id === id) {
          const completed = currentValue >= g.targetValue;
          return { ...g, currentValue, completed };
        }
        return g;
      });
      localStorage.setItem('carevista_goals', JSON.stringify(next));
      return next;
    });
  };

  const sendChatMessage = async (text: string, attachedReport?: MedicalReport) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      attachments: attachedReport ? [{ name: attachedReport.reportName, type: attachedReport.reportType }] : undefined
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatTyping(true);

    try {
      const reply = await CareVistaAIEngine.generateAssistantResponse(
        text,
        {
          user: userProfile,
          problems: healthProblems,
          reports: medicalReports,
          medications,
          language
        },
        attachedReport
      );

      setChatMessages(prev => [...prev, reply]);
    } catch (e) {
      console.error('Chat AI engine error', e);
    } finally {
      setIsChatTyping(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const resetToDemoData = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setHealthProblems(INITIAL_HEALTH_PROBLEMS);
    setMedicalReports(INITIAL_MEDICAL_REPORTS);
    setActiveReportForAnalyzer(INITIAL_MEDICAL_REPORTS[0]);
    setMedications(INITIAL_MEDICATIONS);
    setAppointments(INITIAL_APPOINTMENTS);
    setJournalEntries(INITIAL_DAILY_JOURNAL);
    setWellnessGoals(INITIAL_WELLNESS_GOALS);
    setLanguage('en');

    localStorage.removeItem('carevista_profile');
    localStorage.removeItem('carevista_problems');
    localStorage.removeItem('carevista_reports');
    localStorage.removeItem('carevista_meds');
    localStorage.removeItem('carevista_apts');
    localStorage.removeItem('carevista_journal');
    localStorage.removeItem('carevista_goals');
    localStorage.removeItem('carevista_lang');
  };

  const exportDataAsJSON = () => {
    const exportBundle = {
      app: 'CareVista AI Personal Health Copilot',
      version: '1.0.0',
      exportTimestamp: new Date().toISOString(),
      userProfile,
      healthProblems,
      medicalReports,
      medications,
      appointments,
      journalEntries,
      wellnessGoals
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CareVista_Health_Record_${userProfile.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const loadRajeshDemoProfile = () => {
    setUserProfile(RAJESH_SHARMA_PROFILE);
    setMedicalReports(prev => {
      const exists = prev.some(r => r.id === RAJESH_APOLLO_REPORT.id);
      return exists ? prev : [RAJESH_APOLLO_REPORT, ...prev];
    });
    setActiveReportForAnalyzer(RAJESH_APOLLO_REPORT);
    setMedications(prev => {
      const existingIds = new Set(prev.map(m => m.id));
      const newMeds = RAJESH_MEDICATIONS.filter(m => !existingIds.has(m.id));
      return [...newMeds, ...prev];
    });
    setAppointments(prev => {
      const exists = prev.some(a => a.id === RAJESH_DOCTOR_APPOINTMENT.id);
      return exists ? prev : [RAJESH_DOCTOR_APPOINTMENT, ...prev];
    });
    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-rajesh-${Date.now()}`,
        sender: 'assistant',
        text: `నమస్కారం Rajesh Sharma garu! Welcome to **MediMind AI / CareVista AI**. Your Apollo Metabolic Panel has been synced with an active Fasting Glucose outlier (145 mg/dL). I have prepared your clinical consultation brief for Dr. Ananya Reddy. How can I assist you today?`,
        timestamp: '10:00 AM',
        language: 'te',
        suggestedFollowUps: [
          'Explain Fasting Glucose 145 mg/dL outlier',
          'Review Dr. Ananya Reddy consultation brief',
          'Check Metformin 500mg and Atorvastatin schedule',
          'Telugu voice summary of Apollo lab panel'
        ]
      }
    ]);
    setActiveSection('dashboard');
  };

  return (
    <HealthContext.Provider
      value={{
        activeSection,
        setActiveSection,
        darkMode,
        toggleDarkMode,
        language,
        setLanguage,
        userProfile,
        updateUserProfile,
        healthProblems,
        addHealthProblem,
        updateHealthProblem,
        deleteHealthProblem,
        medicalReports,
        addMedicalReport,
        updateMedicalReport,
        deleteMedicalReport,
        activeReportForAnalyzer,
        setActiveReportForAnalyzer,
        medications,
        addMedication,
        deleteMedication,
        logMedicationDose,
        appointments,
        addAppointment,
        toggleAppointmentQuestion,
        deleteAppointment,
        journalEntries,
        addJournalEntry,
        wellnessGoals,
        updateWellnessGoal,
        chatMessages,
        isChatTyping,
        sendChatMessage,
        clearChat,
        prefillProblemArea,
        setPrefillProblemArea,
        resetToDemoData,
        exportDataAsJSON,
        isSpeaking,
        speakText,
        stopSpeaking,
        loadRajeshDemoProfile
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
