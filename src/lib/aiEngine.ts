import {
  UserProfile,
  HealthProblem,
  MedicalReport,
  Medication,
  Language,
  ChatMessage
} from '@/types/health';

interface AIContext {
  user: UserProfile;
  problems: HealthProblem[];
  reports: MedicalReport[];
  medications: Medication[];
  language: Language;
}

// Multilingual translations for standard safety disclaimers & UI notices
export const SAFETY_DISCLAIMERS: Record<Language, string> = {
  en: 'CareVista AI is an educational health copilot and does NOT provide formal medical diagnoses or prescribe treatment. In an emergency, please call 911 / 112 or visit your nearest emergency department immediately.',
  te: 'కేర్విస్టా AI ఒక విద్యా ఆరోగ్య సహచరుడు మరియు వైద్య నిర్ధారణ లేదా చికిత్సను అందించదు. అత్యవసర పరిస్థితిలో, దయచేసి వెంటనే 112 / 108 కు కాల్ చేయండి లేదా సమీపంలోని అత్యవసర ఆసుపత్రికి వెళ్లండి.',
  hi: 'केयरविस्टा एआई एक शैक्षिक स्वास्थ्य सहायक है और कोई औपचारिक चिकित्सा निदान या उपचार प्रदान नहीं करता है। आपातकालीन स्थिति में, कृपया तुरंत 112 / 108 पर कॉल करें या नजदीकी आपातकालीन केंद्र जाएं।'
};

export const COMMON_SYMPTOM_DICTIONARY: Record<string, {
  possibilities: string;
  selfCare: string[];
  warningSigns: string[];
  doctorQuestions: string[];
}> = {
  headache: {
    possibilities: 'Headaches frequently arise from tension (muscle contraction in the scalp or neck), digital eye strain, dehydration, stress, sinus congestion, or sleep disruptions.',
    selfCare: [
      'Hydrate with 500ml of water or electrolyte balance',
      'Rest in a quiet, dimly lit room for 30 minutes',
      'Apply a cool compress across forehead or warm compress on back of neck',
      'Take regular screen breaks using the 20-20-20 rule'
    ],
    warningSigns: [
      'Sudden explosive onset ("worst headache of life" / thunderclap)',
      'Headache with high fever, neck stiffness, and light sensitivity',
      'Neurological deficits: weakness, facial droop, slurred speech, or vision blackout'
    ],
    doctorQuestions: [
      'Do my symptoms suggest tension cephalea or early migraine?',
      'Could my screen time or cervical posture be the primary trigger?',
      'Are preventive therapies or ergonomic adjustments recommended?'
    ]
  },
  chest: {
    possibilities: 'Chest discomfort can originate from muscular strain, costochondritis, esophageal acid reflux, airway spasms, anxiety, or cardiopulmonary etiology.',
    selfCare: [
      'Cease all strenuous exertion and sit in an upright, relaxed position',
      'Practice slow, diaphragmatic breathing (inhale 4 seconds, exhale 6 seconds)',
      'If diagnosed with reflux and discomfort is burning post-meal, remain upright and sip room-temperature water',
      'If you have prescribed rescue inhaler for asthma, administer as directed by your clinician'
    ],
    warningSigns: [
      'Crushing, squeezing central chest pressure radiating to left arm, neck, or jaw',
      'Severe shortness of breath accompanied by cold sweating, dizziness, or nausea',
      'Rapid, irregular pulse with feeling of impending faint'
    ],
    doctorQuestions: [
      'Is further cardiac or pulmonary screening (such as an ECG, stress test, or spirometry) advised?',
      'Could gastroesophageal reflux or musculoskeletal inflammation explain this pattern?'
    ]
  },
  stomach: {
    possibilities: 'Abdominal pain or indigestion may relate to dietary irritation, gas, gastritis, mild viral gastroenteritis, stress, or functional bowel sensitivity.',
    selfCare: [
      'Sip clear fluids (warm ginger or peppermint tea, electrolyte water)',
      'Avoid heavy, fried, acidic, spicy foods and carbonated drinks',
      'Eat small, bland meals (e.g. bananas, rice, applesauce, toast)',
      'Apply a gentle warm heating pad across lower abdomen'
    ],
    warningSigns: [
      'Severe localized right lower quadrant pain with fever (possible appendicitis)',
      'Vomiting blood or black, tarry bowel movements',
      'Inability to keep liquids down for over 24 hours leading to dehydration'
    ],
    doctorQuestions: [
      'Could specific food intolerances (lactose, gluten, FODMAPs) be causing this?',
      'Should we evaluate for H. pylori or gastric hyperacidity?'
    ]
  },
  cough: {
    possibilities: 'Coughing can be triggered by upper respiratory viral infections, post-nasal drip, environmental allergens, dry air, asthma, or acid reflux (silent GERD).',
    selfCare: [
      'Sip warm liquids such as herbal tea with a spoonful of honey (for adults)',
      'Use a cool-mist room humidifier, especially during sleep',
      'Gargle with warm salt water for throat irritation',
      'Avoid tobacco smoke, aerosol sprays, and sudden cold air transitions'
    ],
    warningSigns: [
      'Coughing up blood or rust-colored sputum',
      'Shortness of breath or audible stridor while resting',
      'Fever over 102°F (38.9°C) lasting more than 3 consecutive days'
    ],
    doctorQuestions: [
      'Is my cough productive or post-viral bronchial hyperreactivity?',
      'Do you suspect allergic post-nasal drip or asthma?'
    ]
  }
};

export class CareVistaAIEngine {
  // Main conversational response generator
  static async generateAssistantResponse(
    userPrompt: string,
    context: AIContext,
    attachedReport?: MedicalReport
  ): Promise<ChatMessage> {
    const lang = context.language;
    const lowerPrompt = userPrompt.toLowerCase();

    // Check for explicit emergencies first
    const emergencyKeywords = ['crushing chest pain', 'can\'t breathe', 'passed out', 'suicidal', 'stroke', 'slurred speech', 'choking', 'bleeding heavily'];
    const isEmergency = emergencyKeywords.some(k => lowerPrompt.includes(k));

    if (isEmergency) {
      const emergencyReply = lang === 'te'
        ? `⚠️ **అత్యవసర హెచ్చరిక!** మీ లక్షణాలు తక్షణ వైద్య సహాయం అవసరమైన పరిస్థితిని సూచించవచ్చు. దయచేసి వెంటనే 112 లేదా 108 కు కాల్ చేయండి లేదా దగ్గరలోని అత్యవసర విభాగానికి వెళ్ళండి.`
        : lang === 'hi'
        ? `⚠️ **आपातकालीन चेतावनी!** आपके लक्षण तत्काल चिकित्सा मूल्यांकन की आवश्यकता का संकेत दे सकते हैं। कृपया तुरंत 112 या 108 पर कॉल करें या निकटतम आपातकालीन अस्पताल जाएं।`
        : `⚠️ **EMERGENCY WARNING:** Your reported symptoms suggest a potentially urgent medical condition that requires immediate professional evaluation. Please call 911 / 112 or proceed to the nearest Emergency Room immediately. Do not drive yourself if dizzy or in severe distress.`;

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: emergencyReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        warningFlag: true,
        suggestedFollowUps: ['Call Emergency 911 / 112', 'View Emergency Medical Card']
      };
    }

    // Contextual summary synthesis
    const activeProblemNames = context.problems.map(p => p.name).join(', ') || 'No active health problems logged';
    const activeMedNames = context.medications.map(m => `${m.name} (${m.dosage})`).join(', ') || 'No medications recorded';
    const recentReport = attachedReport || context.reports[0];

    // Check for language specific greetings or requests
    if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('namaste') || lowerPrompt.includes('హలో')) {
      let greeting = '';
      if (lang === 'te') {
        greeting = `నమస్కారం, ${context.user.fullName}! నేను మీ **కేర్విస్టా AI హెల్త్ కోపైలట్**. మీ ఆరోగ్యం, వైద్య నివేదికలు మరియు మందుల గురించి మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను. ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది?`;
      } else if (lang === 'hi') {
        greeting = `नमस्ते, ${context.user.fullName}! मैं आपका **केयरविस्टा एआई स्वास्थ्य साथी** हूँ। मैं आपकी मेडिकल रिपोर्ट, दवाओं और स्वास्थ्य लक्षणों को समझने में आपकी सहायता कर सकता हूँ। आज आप कैसा महसूस कर रहे हैं?`;
      } else {
        greeting = `Hello, ${context.user.fullName}! I'm **CareVista AI**, your personal health copilot. I have access to your active health record (${context.problems.length} health concerns, ${context.medications.length} active medications, ${context.reports.length} verified reports). How can I assist your health journey today?`;
      }

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        suggestedFollowUps: [
          'Summarize my active health problems',
          'Explain my latest lab report',
          'Review my medication schedule for today',
          'Prepare questions for my next doctor visit'
        ]
      };
    }

    // Check for questions regarding lab reports or cholesterol
    if (lowerPrompt.includes('report') || lowerPrompt.includes('cholesterol') || lowerPrompt.includes('test') || lowerPrompt.includes('lipid') || lowerPrompt.includes('glucose')) {
      let reportContent = '';
      if (recentReport) {
        if (lang === 'te') {
          reportContent = `📊 **మీ వైద్య నివేదిక విశ్లేషణ: ${recentReport.reportName}**\n\n• **పరీక్ష తేదీ:** ${recentReport.testDate} (${recentReport.hospital})\n• **సారాంశం:** ${recentReport.aiSummary}\n\n**కీలక ఫలితాలు:**\n${recentReport.measurements.slice(0, 4).map(m => `• **${m.parameter}:** ${m.resultValue} ${m.unit} (${m.resultFlag === 'above' ? 'ఎక్కువ ⚠️' : m.resultFlag === 'below' ? 'తక్కువ ⚠️' : 'సాధారణం ✅'})`).join('\n')}\n\n💡 **వైద్యుడిని అడగాల్సిన ప్రశ్నలు:**\n• నా కొలెస్ట్రాల్ స్థాయిలకు ఆహారంలో ఎలాంటి మార్పులు చేయాలి?\n• తదుపరి పరీక్ష ఎప్పుడు చేయించుకోవాలి?`;
        } else if (lang === 'hi') {
          reportContent = `📊 **आपकी मेडिकल रिपोर्ट विश्लेषण: ${recentReport.reportName}**\n\n• **परीक्षण तिथि:** ${recentReport.testDate} (${recentReport.hospital})\n• **एआई सारांश:** ${recentReport.aiSummary}\n\n**मुख्य परिणाम:**\n${recentReport.measurements.slice(0, 4).map(m => `• **${m.parameter}:** ${m.resultValue} ${m.unit} (${m.resultFlag === 'above' ? 'सामान्य से अधिक ⚠️' : m.resultFlag === 'below' ? 'सामान्य से कम ⚠️' : 'सामान्य ✅'})`).join('\n')}\n\n💡 **डॉक्टर के लिए प्रश्न:**\n• क्या मेरी वर्तमान दवा की खुराक पर्याप्त है?\n• क्या मुझे आहार में फाइबर बढ़ाने की आवश्यकता है?`;
        } else {
          reportContent = `📊 **Medical Report Analysis: ${recentReport.reportName}**\n\n• **Date & Provider:** ${recentReport.testDate} at ${recentReport.hospital}\n• **Clinical Summary:** ${recentReport.aiSummary}\n\n**Extracted Biomarkers:**\n${recentReport.measurements.map(m => `• **${m.parameter}:** ${m.resultValue} ${m.unit} (Ref: ${m.referenceRange}) — **${m.resultFlag.toUpperCase()}** ${m.resultFlag === 'above' ? '🔺' : m.resultFlag === 'below' ? '🔻' : '✓'}`).join('\n')}\n\n💡 **Suggested Doctor Discussion Points:**\n1. "Given my LDL of 134 mg/dL, should we maintain my current Atorvastatin 10mg or make dietary adjustments?"\n2. "Are there additional markers (such as ApoB or hs-CRP) that would be helpful for cardiovascular risk assessment?"`;
        }
      } else {
        reportContent = `No recent medical reports found in your record. You can upload a PDF or image in the Medical Reports tab for instant OCR and analysis.`;
      }

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: reportContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        suggestedFollowUps: [
          'What lifestyle changes lower LDL cholesterol?',
          'What is a healthy HbA1c range?',
          'Compare my reports over time'
        ],
        doctorQuestions: [
          'Should we adjust my medication based on these lab findings?',
          'When is my next routine screening recommended?'
        ]
      };
    }

    // Check for questions regarding medications
    if (lowerPrompt.includes('medication') || lowerPrompt.includes('medicine') || lowerPrompt.includes('pill') || lowerPrompt.includes('atorvastatin') || lowerPrompt.includes('albuterol')) {
      const medSummary = context.medications.map(m => `• **${m.name}** (${m.dosage}): ${m.instructions} [Schedule: ${m.timing.join(', ')}]`).join('\n');
      const text = `💊 **Your Current Active Medications:**\n\n${medSummary}\n\n⚠️ **Important Medical Guardrail:**\nCareVista AI cannot adjust prescriptions, calculate personalized dosages, or discontinue medications. Any modifications must always be approved by your prescribing physician.`;

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        suggestedFollowUps: [
          'Log today\'s bedtime dose of Atorvastatin',
          'What are common side effects of statins?',
          'How should I use my rescue inhaler?'
        ]
      };
    }

    // Generic intelligent symptom or health question synthesis
    let detectedCategory = 'general';
    for (const key of Object.keys(COMMON_SYMPTOM_DICTIONARY)) {
      if (lowerPrompt.includes(key)) {
        detectedCategory = key;
        break;
      }
    }

    const dictData = COMMON_SYMPTOM_DICTIONARY[detectedCategory] || {
      possibilities: 'Symptoms can arise from multiple interconnected physiological factors including hydration, sleep quality, stress levels, muscular tension, or immune responses.',
      selfCare: [
        'Maintain consistent hydration (minimum 2 to 2.5 liters of water daily)',
        'Ensure 7 to 8 hours of uninterrupted rest',
        'Monitor symptom duration and intensity in your CareVista Daily Journal',
        'Avoid strenuous exertion if feeling fatigued or feverish'
      ],
      warningSigns: [
        'Severe acute pain that does not improve after rest',
        'High unexplained fever, chills, or persistent vomiting',
        'Any shortness of breath, dizziness, or confusion'
      ],
      doctorQuestions: [
        'How long have you observed this pattern in similar patients?',
        'Are there specific triggers or diagnostic tests I should prepare for?'
      ]
    };

    let synthesizedResponse = '';
    if (lang === 'te') {
      synthesizedResponse = `🏥 **ఆరోగ్య వివరణ & మార్గదర్శకత్వం:**\n\n• **అర్థం చేసుకోవడం:** ${dictData.possibilities}\n\n🌿 **సురక్షితమైన స్వీయ సంరక్షణ చర్యలు:**\n${dictData.selfCare.map(s => `• ${s}`).join('\n')}\n\n🚨 **హెచ్చరిక సంకేతాలు (వైద్యుడిని సంప్రదించండి):**\n${dictData.warningSigns.map(w => `• ${w}`).join('\n')}\n\n*గమనిక: మీ వైద్య చరిత్రలోని అంశాలు: ${activeProblemNames}. మీ మందులు: ${activeMedNames}.*`;
    } else if (lang === 'hi') {
      synthesizedResponse = `🏥 **स्वास्थ्य विश्लेषण एवं मार्गदर्शन:**\n\n• **लक्षणों की समझ:** ${dictData.possibilities}\n\n🌿 **सुरक्षित स्व-देखभाल के उपाय:**\n${dictData.selfCare.map(s => `• ${s}`).join('\n')}\n\n🚨 **चेतावनी संकेत (तुरंत डॉक्टर से मिलें):**\n${dictData.warningSigns.map(w => `• ${w}`).join('\n')}\n\n*सक्रिय स्वास्थ्य विवरण: ${activeProblemNames}. वर्तमान दवाएं: ${activeMedNames}.*`;
    } else {
      synthesizedResponse = `🏥 **Health Guidance & Clinical Context:**\n\n**A. Understanding the Issue:**\n${dictData.possibilities} Given your medical history of ${activeProblemNames}, it is prudent to track how this correlates with your routine.\n\n**B. Safe, Low-Risk Self-Care Measures:**\n${dictData.selfCare.map(s => `• ${s}`).join('\n')}\n\n**C. Warning Signs Requiring Urgent Medical Evaluation:**\n${dictData.warningSigns.map(w => `• ${w}`).join('\n')}\n\n**D. Questions Prepared for Your Next Doctor Appointment:**\n${dictData.doctorQuestions.map(q => `• "${q}"`).join('\n')}`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: synthesizedResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: lang,
      suggestedFollowUps: [
        'Log this symptom in my Health Problems',
        'What should I discuss with Dr. Vance?',
        'Add a reminder for self-care'
      ],
      doctorQuestions: dictData.doctorQuestions
    };
  }

  // Generate contextual AI guidance for a newly registered health problem
  static generateProblemGuidance(
    problemName: string,
    bodyPart: string,
    severity: number,
    symptoms: string[]
  ) {
    const key = problemName.toLowerCase().includes('head') ? 'headache'
      : problemName.toLowerCase().includes('chest') ? 'chest'
      : problemName.toLowerCase().includes('stomach') || problemName.toLowerCase().includes('reflux') ? 'stomach'
      : problemName.toLowerCase().includes('cough') || problemName.toLowerCase().includes('breath') ? 'cough'
      : 'headache';

    const base = COMMON_SYMPTOM_DICTIONARY[key];

    return {
      understanding: `Reported symptoms (${symptoms.join(', ') || problemName}) affecting the ${bodyPart} at severity ${severity}/10. ${base.possibilities}`,
      selfCare: base.selfCare,
      warningSigns: base.warningSigns,
      questionsForDoctor: base.doctorQuestions
    };
  }

  // Simulated intelligent OCR Document extraction for uploaded reports
  static parseReportFile(file: File): Promise<MedicalReport> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isBlood = file.name.toLowerCase().includes('blood') || file.name.toLowerCase().includes('cbc');
        const isLipid = file.name.toLowerCase().includes('lipid') || file.name.toLowerCase().includes('cholesterol');
        
        const reportType = isBlood ? 'Blood Test' : isLipid ? 'Lipid Panel' : 'Metabolic Panel';

        const sampleReport: MedicalReport = {
          id: `rep-${Date.now()}`,
          reportName: file.name.replace(/\.[^/.]+$/, "") || 'Laboratory Diagnostic Report',
          reportType: reportType,
          testDate: new Date().toISOString().split('T')[0],
          uploadDate: new Date().toISOString().split('T')[0],
          hospital: 'City Health Diagnostic Center & Pathology',
          doctorName: 'Dr. Evelyn Vance, MD',
          isVerified: false,
          attachmentName: file.name,
          attachmentSize: `${(file.size / 1024).toFixed(1)} KB`,
          userNotes: 'Uploaded document processed via CareVista OCR Engine. Please verify extracted values.',
          aiSummary: `Automated extraction successful. Identified ${reportType} parameters with reference ranges. Please review and confirm the extracted values below before adding them to your permanent health timeline.`,
          measurements: [
            {
              id: `m-${Date.now()}-1`,
              parameter: 'Fasting Blood Sugar',
              resultValue: 94,
              unit: 'mg/dL',
              referenceRange: '70 - 99',
              resultFlag: 'normal',
              explanation: 'Healthy overnight glycemic balance.'
            },
            {
              id: `m-${Date.now()}-2`,
              parameter: 'Serum Total Cholesterol',
              resultValue: 206,
              unit: 'mg/dL',
              referenceRange: '< 200',
              resultFlag: 'above',
              explanation: 'Borderline elevated circulating cholesterol.'
            },
            {
              id: `m-${Date.now()}-3`,
              parameter: 'Serum Creatinine',
              resultValue: 0.92,
              unit: 'mg/dL',
              referenceRange: '0.70 - 1.30',
              resultFlag: 'normal',
              explanation: 'Normal renal clearance indicator.'
            }
          ]
        };

        resolve(sampleReport);
      }, 1000);
    });
  }
}
