import {
  UserProfile,
  HealthProblem,
  MedicalReport,
  Medication,
  Appointment,
  DailyJournalEntry,
  WellnessGoal,
  HealthArticle
} from '@/types/health';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-carevista-01',
  fullName: 'Alex Rivera',
  dateOfBirth: '1988-06-15',
  biologicalSex: 'male',
  bloodGroup: 'A+',
  heightCm: 178,
  weightKg: 74,
  allergies: ['Penicillin', 'Peanuts (Mild)'],
  chronicConditions: ['Mild Asthma', 'Borderline Hyperlipidemia'],
  emergencyContact: {
    name: 'Maria Rivera',
    relationship: 'Spouse',
    phone: '+1 (555) 234-5678',
    email: 'maria.rivera@example.com'
  },
  preferredLanguage: 'en',
  notificationsEnabled: true,
  aiConsentGranted: true
};

export const INITIAL_HEALTH_PROBLEMS: HealthProblem[] = [
  {
    id: 'prb-01',
    name: 'Tension Headache & Neck Stiffness',
    category: 'Neurological / Ergonomic',
    affectedBodyPart: 'Head & Neck',
    symptoms: ['Throbbing bilateral temple pain', 'Neck muscle spasms', 'Mild light sensitivity'],
    severity: 6,
    severityLabel: 'moderate',
    startingDate: '2026-09-28',
    frequency: 'occasional',
    description: 'Noticeable dull throbbing ache at both temples developing after extended screen sessions, accompanied by tight trapezius muscles.',
    existingDiagnosis: 'Tension-type Cephalea',
    currentMedication: 'Acetaminophen 500mg as needed',
    relatedReportIds: ['rep-02'],
    status: 'improving',
    notes: 'Improves after warm compress and stretching breaks.',
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-10-10T14:30:00Z',
    dailyLogs: [
      { date: '2026-10-08', severity: 7, note: 'Long Zoom calls, elevated neck tension' },
      { date: '2026-10-09', severity: 6, note: 'Applied heat pad, mild relief' },
      { date: '2026-10-10', severity: 4, note: 'Did 15 min neck yoga and hydrated' },
      { date: '2026-10-11', severity: 3, note: 'Mild ache only in late afternoon' },
      { date: '2026-10-12', severity: 2, note: 'Almost completely subsided' }
    ],
    aiGuidance: {
      understanding: 'Symptoms are consistent with ergonomic tension headache related to prolonged static posture and screen-induced eye fatigue.',
      selfCare: [
        'Practice the 20-20-20 rule for screen fatigue (look 20 feet away for 20 seconds every 20 minutes)',
        'Gentle cervical chin-tucks and upper trapezius stretching twice daily',
        'Maintain minimum 2.5L daily hydration',
        'Warm compress across back of neck for 15 minutes before bed'
      ],
      warningSigns: [
        'Sudden explosive headache onset (thunderclap)',
        'Fever paired with stiff neck and inability to touch chin to chest',
        'Numbness, facial asymmetry, or speech difficulties'
      ],
      questionsForDoctor: [
        'Could ergonomic physical therapy benefit my cervical posture?',
        'Is preventive migraine medication warranted if episodes exceed 3 days weekly?',
        'Do you recommend an ophthalmic exam for computer glasses?'
      ]
    }
  },
  {
    id: 'prb-02',
    name: 'Post-Exertional Wheezing & Breathlessness',
    category: 'Cardiopulmonary / Respiratory',
    affectedBodyPart: 'Chest & Cardiovascular',
    symptoms: ['Wheezing upon brisk climbing', 'Dry cough post-cardio', 'Chest tightness in cold air'],
    severity: 4,
    severityLabel: 'mild',
    startingDate: '2026-08-14',
    frequency: 'occasional',
    description: 'Mild bronchospasm triggering dry cough and shortness of breath when running in chilly morning temperatures.',
    existingDiagnosis: 'Exercise-Induced Bronchoconstriction',
    currentMedication: 'Albuterol Inhaler (2 puffs 15 min pre-workout)',
    relatedReportIds: ['rep-03'],
    status: 'active',
    notes: 'Pre-warming with scarf over mouth helps significantly.',
    createdAt: '2026-08-14T09:00:00Z',
    updatedAt: '2026-10-05T11:00:00Z',
    dailyLogs: [
      { date: '2026-10-07', severity: 5, note: 'Cold morning jog triggered mild cough' },
      { date: '2026-10-09', severity: 4, note: 'Used albuterol before gym, ran comfortably' },
      { date: '2026-10-12', severity: 3, note: 'Indoor treadmill workout was well tolerated' }
    ],
    aiGuidance: {
      understanding: 'Likely exercise-induced airway hyperreactivity aggravated by dry or cool air, commonly managed with pre-exercise bronchodilators.',
      selfCare: [
        'Always warm up progressively for 10-15 minutes before vigorous cardio',
        'Cover nose and mouth with a lightweight buff or scarf in temperatures below 55°F (13°C)',
        'Keep rescue inhaler readily accessible in workout bag'
      ],
      warningSigns: [
        'Inability to speak in full sentences without gasping',
        'Peak flow reading falling below 60% of personal best',
        'Blue or gray tint on lips or fingernails (Cyanosis - Call 911 immediately)'
      ],
      questionsForDoctor: [
        'Should we consider adding a low-dose inhaled corticosteroid controller?',
        'What should my target peak-flow green/yellow/red zones be?'
      ]
    }
  },
  {
    id: 'prb-03',
    name: 'Evening Gastric Heartburn & Reflux',
    category: 'Gastrointestinal',
    affectedBodyPart: 'Abdomen & Digestive',
    symptoms: ['Retrosternal burning after dinner', 'Sour regurgitation when reclining', 'Bloating'],
    severity: 3,
    severityLabel: 'mild',
    startingDate: '2026-09-01',
    frequency: 'occasional',
    description: 'Mild acid reflux occurring predominantly after late spicy meals or heavy coffee intake.',
    existingDiagnosis: 'Mild GERD',
    currentMedication: 'Antacid chews as needed',
    relatedReportIds: ['rep-01'],
    status: 'improving',
    notes: 'Elevating head of mattress and avoiding late dinners reduced symptoms by 80%.',
    createdAt: '2026-09-01T12:00:00Z',
    updatedAt: '2026-10-11T19:00:00Z',
    dailyLogs: [
      { date: '2026-10-08', severity: 4, note: 'Had pizza at 9 PM, woke with mild heartburn' },
      { date: '2026-10-10', severity: 2, note: 'Ate light soup at 6:30 PM, slept comfortably' }
    ],
    aiGuidance: {
      understanding: 'Lower esophageal sphincter transient relaxation following late meals, high-fat foods, or caffeine.',
      selfCare: [
        'Finish dinner at least 3 full hours before lying flat or sleeping',
        'Elevate bedhead by 6 inches or use a wedge pillow',
        'Limit evening citrus, chocolate, tomatoes, and carbonated sodas'
      ],
      warningSigns: [
        'Difficulty or painful swallowing of solid foods or liquids',
        'Black or bloody stools',
        'Unintended rapid weight loss'
      ],
      questionsForDoctor: [
        'Would a short course of H2 blockers or PPIs assist mucosal healing?',
        'Could this be contributing to night-time cough?'
      ]
    }
  }
];

export const INITIAL_MEDICAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-01',
    reportName: 'Comprehensive Metabolic & Lipid Panel',
    reportType: 'Lipid Panel',
    testDate: '2026-09-18',
    uploadDate: '2026-09-19',
    hospital: 'Metro Memorial Laboratory Services',
    doctorName: 'Dr. Evelyn Vance, MD',
    isVerified: true,
    attachmentName: 'Metro_Lab_Lipid_Panel_Sep2026.pdf',
    attachmentSize: '412 KB',
    userNotes: 'Fasted for 12 hours prior to venipuncture.',
    aiSummary: 'Overall metabolic indicators, kidney function, and liver enzymes remain within normal limits. Total cholesterol (218 mg/dL) and LDL (134 mg/dL) are borderline elevated, showing improvement compared to last year. Blood sugar and HbA1c (5.4%) are optimal.',
    measurements: [
      {
        id: 'm-01',
        parameter: 'Fasting Blood Glucose',
        resultValue: 92,
        unit: 'mg/dL',
        referenceRange: '70 - 99',
        resultFlag: 'normal',
        explanation: 'Indicates healthy baseline glycemic regulation after overnight fast.'
      },
      {
        id: 'm-02',
        parameter: 'Hemoglobin A1c (HbA1c)',
        resultValue: 5.4,
        unit: '%',
        referenceRange: '< 5.7',
        resultFlag: 'normal',
        explanation: 'Three-month estimated average blood sugar is in the non-diabetic ideal range.'
      },
      {
        id: 'm-03',
        parameter: 'Total Cholesterol',
        resultValue: 218,
        unit: 'mg/dL',
        referenceRange: '< 200',
        resultFlag: 'above',
        explanation: 'Slightly above desirable limit (<200 mg/dL), indicative of borderline hyperlipidemia.'
      },
      {
        id: 'm-04',
        parameter: 'LDL Cholesterol ("Bad")',
        resultValue: 134,
        unit: 'mg/dL',
        referenceRange: '< 100',
        resultFlag: 'above',
        explanation: 'Low-density lipoprotein is mildly elevated; lifestyle and statin therapy help lower atherogenic risk.'
      },
      {
        id: 'm-05',
        parameter: 'HDL Cholesterol ("Good")',
        resultValue: 56,
        unit: 'mg/dL',
        referenceRange: '> 40',
        resultFlag: 'normal',
        explanation: 'High-density lipoprotein is protective and comfortably within healthy thresholds.'
      },
      {
        id: 'm-06',
        parameter: 'Triglycerides',
        resultValue: 140,
        unit: 'mg/dL',
        referenceRange: '< 150',
        resultFlag: 'normal',
        explanation: 'Circulating blood fats are within normal targets.'
      },
      {
        id: 'm-07',
        parameter: 'Serum Creatinine',
        resultValue: 0.95,
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        resultFlag: 'normal',
        explanation: 'Key metric of renal clearance and filtration capacity, fully healthy.'
      },
      {
        id: 'm-08',
        parameter: 'eGFR (Kidney Filtration)',
        resultValue: 104,
        unit: 'mL/min/1.73m²',
        referenceRange: '> 90',
        resultFlag: 'normal',
        explanation: 'Optimal glomerular filtration rate confirms normal kidney health.'
      }
    ]
  },
  {
    id: 'rep-02',
    reportName: 'Complete Blood Count (CBC) with Differential',
    reportType: 'Blood Test',
    testDate: '2026-08-05',
    uploadDate: '2026-08-06',
    hospital: 'Quest Diagnostics Regional Lab',
    doctorName: 'Dr. Marcus Brody, MD',
    isVerified: true,
    attachmentName: 'Quest_CBC_Panel_Aug2026.pdf',
    attachmentSize: '320 KB',
    userNotes: 'Routine annual preventive hematology screening.',
    aiSummary: 'Complete Blood Count shows normal red blood cell mass, healthy hemoglobin (15.2 g/dL), no signs of anemia or immune reaction. Platelet counts and white cell differentials are balanced.',
    measurements: [
      {
        id: 'm-09',
        parameter: 'Hemoglobin',
        resultValue: 15.2,
        unit: 'g/dL',
        referenceRange: '13.8 - 17.2',
        resultFlag: 'normal',
        explanation: 'Oxygen-carrying protein in red blood cells is fully normal; rules out anemia.'
      },
      {
        id: 'm-10',
        parameter: 'Hematocrit',
        resultValue: 45.1,
        unit: '%',
        referenceRange: '40.7 - 50.3',
        resultFlag: 'normal',
        explanation: 'Proportion of blood volume made up of red cells is optimal.'
      },
      {
        id: 'm-11',
        parameter: 'White Blood Cell Count (WBC)',
        resultValue: 6.8,
        unit: 'x10³/µL',
        referenceRange: '4.5 - 11.0',
        resultFlag: 'normal',
        explanation: 'No leukocytosis or active severe infection detected.'
      },
      {
        id: 'm-12',
        parameter: 'Platelet Count',
        resultValue: 245,
        unit: 'x10³/µL',
        referenceRange: '150 - 450',
        resultFlag: 'normal',
        explanation: 'Healthy blood clotting cell quantity.'
      }
    ]
  },
  {
    id: 'rep-03',
    reportName: 'Spirometry & Pulmonary Function Test',
    reportType: 'Other',
    testDate: '2026-07-22',
    uploadDate: '2026-07-23',
    hospital: 'City Chest & Allergy Pavilion',
    doctorName: 'Dr. Marcus Brody, MD',
    isVerified: true,
    attachmentName: 'Pulmonary_Spirometry_Jul2026.pdf',
    attachmentSize: '510 KB',
    userNotes: 'Evaluated exercise-induced tightness in chest.',
    aiSummary: 'Baseline FEV1/FVC ratio is 81% (normal). Post-bronchodilator reversibility showed a 14% improvement in FEV1 after two puffs of albuterol, confirming mild reversible airway reactivity (exercise-induced asthma).',
    measurements: [
      {
        id: 'm-13',
        parameter: 'FEV1 (Forced Expiratory Volume 1s)',
        resultValue: 3.65,
        unit: 'Liters (86% pred)',
        referenceRange: '> 80% predicted',
        resultFlag: 'normal',
        explanation: 'Volume of air expelled in first second of forceful exhalation.'
      },
      {
        id: 'm-14',
        parameter: 'FEV1/FVC Ratio',
        resultValue: 81,
        unit: '%',
        referenceRange: '> 70',
        resultFlag: 'normal',
        explanation: 'Normal ratio rules out fixed obstructive pulmonary disease at rest.'
      },
      {
        id: 'm-15',
        parameter: 'Post-Bronchodilator Reversibility',
        resultValue: 14,
        unit: '% increase',
        referenceRange: '< 12',
        resultFlag: 'above',
        explanation: 'Significantly responsive to albuterol (>12%), diagnostic for reversible airway reactivity.'
      }
    ]
  }
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-01',
    name: 'Atorvastatin (Lipitor)',
    dosage: '10 mg',
    instructions: 'Take 1 tablet by mouth every night at bedtime.',
    frequency: 'Once daily at bedtime',
    timing: ['bedtime'],
    startDate: '2026-05-10',
    active: true,
    prescribedBy: 'Dr. Evelyn Vance, MD',
    condition: 'Borderline Hyperlipidemia',
    logs: [
      { date: '2026-10-12', timeSlot: 'bedtime', status: 'taken', timestamp: '2026-10-12T22:15:00Z' },
      { date: '2026-10-11', timeSlot: 'bedtime', status: 'taken', timestamp: '2026-10-11T22:30:00Z' },
      { date: '2026-10-10', timeSlot: 'bedtime', status: 'taken', timestamp: '2026-10-10T22:05:00Z' },
      { date: '2026-10-09', timeSlot: 'bedtime', status: 'taken', timestamp: '2026-10-09T22:45:00Z' }
    ]
  },
  {
    id: 'med-02',
    name: 'Albuterol HFA (ProAir Inhaler)',
    dosage: '90 mcg / actuation',
    instructions: 'Inhale 2 puffs 15 minutes prior to rigorous cardiovascular exercise or as needed for acute wheeze.',
    frequency: 'As needed (PRN)',
    timing: ['morning', 'afternoon'],
    startDate: '2026-07-25',
    active: true,
    prescribedBy: 'Dr. Marcus Brody, MD',
    condition: 'Exercise-Induced Asthma',
    logs: [
      { date: '2026-10-12', timeSlot: 'morning', status: 'taken', timestamp: '2026-10-12T07:15:00Z' },
      { date: '2026-10-10', timeSlot: 'afternoon', status: 'taken', timestamp: '2026-10-10T16:00:00Z' }
    ]
  },
  {
    id: 'med-03',
    name: 'Omega-3 Fish Oil (EPA/DHA)',
    dosage: '1,200 mg',
    instructions: 'Take 1 softgel daily with breakfast.',
    frequency: 'Once daily with meal',
    timing: ['morning'],
    startDate: '2026-06-01',
    active: true,
    condition: 'Cardiovascular Support',
    logs: [
      { date: '2026-10-13', timeSlot: 'morning', status: 'taken', timestamp: '2026-10-13T08:30:00Z' },
      { date: '2026-10-12', timeSlot: 'morning', status: 'taken', timestamp: '2026-10-12T08:15:00Z' },
      { date: '2026-10-11', timeSlot: 'morning', status: 'taken', timestamp: '2026-10-11T08:45:00Z' }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    doctorName: 'Dr. Evelyn Vance, MD',
    specialist: 'Internal Medicine / Primary Care',
    clinic: 'Metro Memorial Health Center, Suite 410',
    locationType: 'in-person',
    date: '2026-10-20',
    time: '10:30 AM',
    purpose: '6-Month Lipid Panel Follow-up & Blood Pressure Check',
    status: 'upcoming',
    questionsChecklist: [
      { id: 'q-1', text: 'Should we stay on 10mg Atorvastatin or adjust dosage based on September lipid panel?', answered: false },
      { id: 'q-2', text: 'Can we discuss the tension headache frequency over the last month?', answered: false },
      { id: 'q-3', text: 'Are there specific dietary shifts recommended for the mild evening acid reflux?', answered: false }
    ],
    visitNotes: 'Bring recent lab printouts and symptom journal summary.',
    doctorInstructions: 'Fasting not required for this routine visit.'
  },
  {
    id: 'apt-02',
    doctorName: 'Dr. Marcus Brody, MD',
    specialist: 'Pulmonology & Respiratory Care',
    clinic: 'Virtual Telehealth Consultation',
    locationType: 'telehealth',
    date: '2026-11-04',
    time: '02:00 PM',
    purpose: 'Winter Season Asthma Action Plan Review',
    status: 'upcoming',
    questionsChecklist: [
      { id: 'q-4', text: 'Will cold weather increase the need for a daily maintenance controller inhaler?', answered: false },
      { id: 'q-5', text: 'How frequently can I safely use the Albuterol rescue inhaler before workouts?', answered: false }
    ]
  }
];

export const INITIAL_DAILY_JOURNAL: DailyJournalEntry[] = [
  {
    id: 'jrn-07',
    date: '2026-10-07',
    hydrationGlasses: 8,
    sleepHours: 7.2,
    sleepQuality: 'good',
    steps: 8430,
    mood: 'good',
    systolicBP: 120,
    diastolicBP: 78,
    bloodGlucose: 94,
    heartRate: 70,
    weightKg: 74.2,
    nutritionSummary: 'Oatmeal with berries, grilled chicken quinoa salad, salmon with steamed broccoli.',
    symptomsNotes: 'Mild neck stiffness after work.'
  },
  {
    id: 'jrn-08',
    date: '2026-10-08',
    hydrationGlasses: 6,
    sleepHours: 6.5,
    sleepQuality: 'fair',
    steps: 6850,
    mood: 'neutral',
    systolicBP: 122,
    diastolicBP: 80,
    bloodGlucose: 98,
    heartRate: 74,
    weightKg: 74.3,
    nutritionSummary: 'Greek yogurt, turkey wrap, late slice of pizza (triggered mild heartburn).',
    symptomsNotes: 'Late pizza caused slight reflux.'
  },
  {
    id: 'jrn-09',
    date: '2026-10-09',
    hydrationGlasses: 7,
    sleepHours: 7.8,
    sleepQuality: 'good',
    steps: 9200,
    mood: 'great',
    systolicBP: 118,
    diastolicBP: 76,
    bloodGlucose: 91,
    heartRate: 68,
    weightKg: 74.0,
    nutritionSummary: 'Green smoothie, lentil soup, stir-fried vegetables and tofu.',
    symptomsNotes: 'Exercised with pre-inhaler, felt great.'
  },
  {
    id: 'jrn-10',
    date: '2026-10-10',
    hydrationGlasses: 8,
    sleepHours: 8.0,
    sleepQuality: 'excellent',
    steps: 10450,
    mood: 'great',
    systolicBP: 116,
    diastolicBP: 75,
    bloodGlucose: 89,
    heartRate: 66,
    weightKg: 73.8,
    nutritionSummary: 'Eggs with avocado toast, Mediterranean bowl, grilled cod with asparagus.',
    symptomsNotes: 'No headache or reflux all day.'
  },
  {
    id: 'jrn-11',
    date: '2026-10-11',
    hydrationGlasses: 7,
    sleepHours: 7.0,
    sleepQuality: 'fair',
    steps: 7300,
    mood: 'good',
    systolicBP: 121,
    diastolicBP: 79,
    bloodGlucose: 95,
    heartRate: 71,
    weightKg: 73.9,
    nutritionSummary: 'Overnight oats, chicken brown rice bowl, vegetable soup with whole wheat toast.',
    symptomsNotes: 'Mild fatigue towards evening.'
  },
  {
    id: 'jrn-12',
    date: '2026-10-12',
    hydrationGlasses: 8,
    sleepHours: 7.5,
    sleepQuality: 'good',
    steps: 8900,
    mood: 'great',
    systolicBP: 118,
    diastolicBP: 76,
    bloodGlucose: 90,
    heartRate: 69,
    weightKg: 73.8,
    nutritionSummary: 'Chia pudding, quinoa roasted veggies, baked salmon with sweet potato.',
    symptomsNotes: 'Vitals feeling very stable.'
  },
  {
    id: 'jrn-13',
    date: '2026-10-13',
    hydrationGlasses: 6,
    sleepHours: 7.4,
    sleepQuality: 'good',
    steps: 6420,
    mood: 'great',
    systolicBP: 119,
    diastolicBP: 77,
    bloodGlucose: 92,
    heartRate: 70,
    weightKg: 73.7,
    nutritionSummary: 'Berry protein smoothie, hearty vegetable salad with olive oil dressing.',
    symptomsNotes: 'Morning feeling energetic.'
  }
];

export const INITIAL_WELLNESS_GOALS: WellnessGoal[] = [
  {
    id: 'goal-01',
    title: 'Daily Water Hydration (8 Glasses / 2 Liters)',
    category: 'hydration',
    targetValue: 8,
    currentValue: 6,
    unit: 'glasses',
    period: 'daily',
    completed: false
  },
  {
    id: 'goal-02',
    title: 'Daily Active Walking (8,000 Steps)',
    category: 'activity',
    targetValue: 8000,
    currentValue: 6420,
    unit: 'steps',
    period: 'daily',
    completed: false
  },
  {
    id: 'goal-03',
    title: 'Restorative Night Sleep (7.5 Hours)',
    category: 'sleep',
    targetValue: 7.5,
    currentValue: 7.4,
    unit: 'hours',
    period: 'daily',
    completed: true
  },
  {
    id: 'goal-04',
    title: 'Weekly Cardio / Exercise Sessions',
    category: 'activity',
    targetValue: 4,
    currentValue: 3,
    unit: 'sessions',
    period: 'weekly',
    completed: false
  }
];

export const HEALTH_EDUCATION_ARTICLES: HealthArticle[] = [
  {
    id: 'art-01',
    title: 'Demystifying Your Lipid Panel: Understanding HDL, LDL, and Triglycerides',
    category: 'Cardiovascular Health',
    readTime: '4 min read',
    summary: 'A clear clinical guide to navigating total cholesterol, low-density lipoproteins, and atherogenic risk factors without confusion.',
    content: [
      'Lipid panels measure circulating fats (lipids) bound to transport proteins in your blood.',
      'LDL (Low-Density Lipoprotein) carries cholesterol from the liver to peripheral tissues. When present in excess, it can infiltrate the vascular endothelial wall, forming oxidized atherosclerotic plaques.',
      'HDL (High-Density Lipoprotein) acts as a cellular scavenger, transporting surplus cholesterol back to the liver for metabolic excretion.',
      'Triglycerides reflect stored dietary energy. Elevated triglycerides combined with low HDL and elevated LDL heighten cardiovascular strain.',
      'Dietary soluble fiber (such as oats, legumes, and psyllium) and moderate aerobic exercise are proven non-pharmacological tools to support healthier lipid ratios.'
    ],
    keyTakeaways: [
      'Aim for total cholesterol below 200 mg/dL and LDL below 100 mg/dL for low cardiovascular risk profiles.',
      'Soluble fiber binds cholesterol in the intestinal tract, facilitating excretion.',
      'Always discuss your personal cardiovascular risk score with your physician.'
    ],
    reviewedBy: 'Dr. Evelyn Vance, MD (Board Certified Internal Medicine)',
    tags: ['Cholesterol', 'Cardiovascular', 'Heart Health', 'Lab Reports']
  },
  {
    id: 'art-02',
    title: 'Safe Self-Care vs. Red Flags: When Headaches Require Urgent Medical Care',
    category: 'Neurological Care',
    readTime: '3 min read',
    summary: 'How to distinguish between benign tension headaches or migraines and symptoms requiring immediate emergency evaluation.',
    content: [
      'Headaches are one of the most common physical complaints, with the vast majority stemming from benign causes such as tension, cervical strain, dehydration, or migraine.',
      'A primary headache is not caused by an underlying disease, whereas a secondary headache is symptomatic of another medical issue.',
      'Red flag symptoms (the SNOOP mnemonic: Systemic symptoms, Neurologic signs, Onset sudden, Older age, Pattern change) demand immediate medical consultation.',
      'A "thunderclap headache"—which peaks in maximum agonizing intensity within 60 seconds—is a medical emergency that must be evaluated immediately in the nearest emergency room.'
    ],
    keyTakeaways: [
      'Never ignore sudden severe headache accompanied by high fever or neck rigidity.',
      'Keep a symptom journal documenting onset, duration, food triggers, and relief factors.',
      'Over-the-counter pain relievers taken more than 3 days weekly can lead to medication overuse headaches.'
    ],
    reviewedBy: 'Dr. Marcus Brody, MD',
    tags: ['Neurology', 'Headache', 'Safety', 'Triage']
  },
  {
    id: 'art-03',
    title: 'Managing Exercise-Induced Bronchoconstriction and Asthma',
    category: 'Respiratory Health',
    readTime: '5 min read',
    summary: 'Practical strategies for athletes and active individuals to maintain peak physical performance safely with asthma.',
    content: [
      'Exercise-induced bronchoconstriction occurs when rapid breathing of cool, dry air causes airway cooling and dehydration of the bronchial mucosa, triggering histamine release and smooth muscle contraction.',
      'Using a short-acting beta-2 agonist (such as Albuterol) 10 to 15 minutes prior to warm-up prevents up to 80% of exercise-induced bronchospasms.',
      'A progressive 15-minute warm-up induces a refractory period during which bronchial hyperresponsiveness is naturally muted.',
      'In cold weather, wearing a heat-exchange mask or lightweight buff over your nose warms and humidifies inspired air.'
    ],
    keyTakeaways: [
      'Always keep your rescue inhaler on hand during physical exertion.',
      'Proper warm-ups can protect airways for up to two hours post-exercise.',
      'Cold air and high pollen counts are primary environmental triggers.'
    ],
    reviewedBy: 'City Chest & Allergy Pavilion Clinical Team',
    tags: ['Asthma', 'Lungs', 'Exercise', 'Breathing']
  },
  {
    id: 'art-04',
    title: 'The Circadian Clock: How Deep Sleep Restores Cardiovascular Health',
    category: 'Wellness & Prevention',
    readTime: '4 min read',
    summary: 'How nocturnal blood pressure dipping and slow-wave sleep protect blood vessels and regulate metabolic hormones.',
    content: [
      'During healthy deep slow-wave sleep, heart rate decelerates, vascular sympathetic tone falls, and blood pressure drops by 10% to 20%—a phenomenon termed nocturnal dipping.',
      'Non-dippers (individuals who do not experience this nocturnal reduction) carry significantly higher risks of hypertension and cardiovascular events.',
      'Consistent sleep timing aligns the central suprachiasmatic nucleus with peripheral circadian clocks in the liver, pancreas, and endothelial cells.',
      'To promote restorative deep sleep, avoid blue light 60 minutes before bed, keep the bedroom cool (65°F / 18°C), and avoid caffeine after 2 PM.'
    ],
    keyTakeaways: [
      'Target 7 to 8 hours of uninterrupted nocturnal sleep for optimal vascular recovery.',
      'Consistent bedtimes reinforce metabolic insulin sensitivity and daytime alertness.',
      'Nocturnal blood pressure dipping is essential for organ preservation.'
    ],
    reviewedBy: 'CareVista Health Advisory Board',
    tags: ['Sleep', 'Blood Pressure', 'Circadian', 'Wellness']
  }
];

export const RAJESH_SHARMA_PROFILE: UserProfile = {
  id: 'usr-rajesh-46',
  fullName: 'Rajesh Sharma',
  dateOfBirth: '1980-04-12',
  biologicalSex: 'male',
  bloodGroup: 'B+',
  heightCm: 175,
  weightKg: 78,
  allergies: ['Penicillin', 'Sulfa drugs'],
  chronicConditions: ['Type 2 Diabetes Mellitus', 'Dyslipidemia'],
  emergencyContact: {
    name: 'Sunita Sharma',
    relationship: 'Spouse',
    phone: '+91 98765 43210',
    email: 'sunita.sharma@example.com'
  },
  preferredLanguage: 'te',
  notificationsEnabled: true,
  aiConsentGranted: true
};

export const RAJESH_APOLLO_REPORT: MedicalReport = {
  id: 'rep-apollo-01',
  reportName: 'Apollo Comprehensive Metabolic Panel & Lipid Profile',
  reportType: 'Blood Test',
  testDate: '2026-10-10',
  uploadDate: '2026-10-12',
  hospital: 'Apollo Hospitals & Diagnostic Center',
  doctorName: 'Dr. Ananya Reddy, MD (Endocrinologist)',
  isVerified: true,
  attachmentName: 'Apollo_Metabolic_Panel_Oct2026.pdf',
  attachmentSize: '488 KB',
  userNotes: '10-hour overnight fast. Monitoring glycemic control under Metformin 500mg therapy.',
  aiSummary: 'Fasting Blood Glucose is significantly elevated at 145 mg/dL (Reference: 70-100 mg/dL), flagging an active glycemic outlier. HbA1c is 7.4%. Lipid profile indicates partial therapeutic response to Atorvastatin 20mg with LDL at 112 mg/dL. Renal function (eGFR 92 mL/min) and liver enzymes remain intact. Clinical consultation with Dr. Ananya Reddy prepared.',
  measurements: [
    {
      id: 'm-ap-01',
      parameter: 'Fasting Blood Glucose',
      resultValue: 145,
      unit: 'mg/dL',
      referenceRange: '70 - 100',
      resultFlag: 'above',
      explanation: 'OUTLIER HIGHLIGHTED: 145 mg/dL exceeds normal fasting baseline (70-100 mg/dL). Automatic flag with plain-language explanation and clinician questions.'
    },
    {
      id: 'm-ap-02',
      parameter: 'Hemoglobin A1c (HbA1c)',
      resultValue: 7.4,
      unit: '%',
      referenceRange: '< 5.7',
      resultFlag: 'above',
      explanation: 'Indicates moderate 3-month glycemic elevation. Target for diabetic control is < 7.0%.'
    },
    {
      id: 'm-ap-03',
      parameter: 'Total Cholesterol',
      resultValue: 190,
      unit: 'mg/dL',
      referenceRange: '< 200',
      resultFlag: 'normal',
      explanation: 'Within desirable range (< 200 mg/dL) on Atorvastatin 20mg.'
    },
    {
      id: 'm-ap-04',
      parameter: 'Serum Creatinine',
      resultValue: 0.95,
      unit: 'mg/dL',
      referenceRange: '0.7 - 1.3',
      resultFlag: 'normal',
      explanation: 'Renal clearance normal; safe for continuous Metformin 500mg regimen.'
    }
  ]
};

export const RAJESH_MEDICATIONS: Medication[] = [
  {
    id: 'med-raj-01',
    name: 'Metformin Hydrochloride',
    dosage: '500 mg',
    frequency: 'Twice daily',
    timing: ['morning', 'evening'],
    instructions: 'Take with or immediately after meals to reduce stomach upset.',
    startDate: '2026-04-10',
    active: true,
    prescribedBy: 'Dr. Ananya Reddy',
    condition: 'Type 2 Diabetes Mellitus',
    logs: [
      { date: '2026-10-13', timeSlot: 'morning', status: 'taken', timestamp: '2026-10-13T08:30:00Z' },
      { date: '2026-10-13', timeSlot: 'evening', status: 'taken', timestamp: '2026-10-13T20:15:00Z' }
    ]
  },
  {
    id: 'med-raj-02',
    name: 'Atorvastatin Calcium',
    dosage: '20 mg',
    frequency: 'Once daily',
    timing: ['bedtime'],
    instructions: 'Take once daily at bedtime with water.',
    startDate: '2026-04-10',
    active: true,
    prescribedBy: 'Dr. Ananya Reddy',
    condition: 'Dyslipidemia / Cardiovascular Protection',
    logs: [
      { date: '2026-10-13', timeSlot: 'bedtime', status: 'taken', timestamp: '2026-10-13T22:30:00Z' }
    ]
  }
];

export const RAJESH_DOCTOR_APPOINTMENT: Appointment = {
  id: 'apt-ananya-01',
  doctorName: 'Dr. Ananya Reddy',
  specialist: 'Endocrinologist Consultation',
  clinic: 'City Clinic Digital Health & Apollo Endocrine Care',
  locationType: 'in-person',
  date: '2026-10-18',
  time: '11:30 AM',
  purpose: 'Review Fasting Glucose 145 mg/dL and Metformin 500mg Efficacy',
  status: 'upcoming',
  questionsChecklist: [
    { id: 'q-an-1', text: 'Should Metformin 500mg dosage be adjusted given Fasting Glucose of 145 mg/dL?', answered: false },
    { id: 'q-an-2', text: 'What is the target HbA1c threshold for the next 6-month interval?', answered: false },
    { id: 'q-an-3', text: 'Confirmed Penicillin & Sulfa allergy flags in ABHA health ID.', answered: true }
  ]
};

