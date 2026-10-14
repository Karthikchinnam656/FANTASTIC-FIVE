'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useHealth, NavSection } from '@/context/HealthContext';
import {
  Heart,
  Sparkles,
  Shield,
  ShieldCheck,
  CheckCircle2,
  FileText,
  FileCheck,
  Download,
  ExternalLink,
  ChevronRight,
  Globe,
  Activity,
  AlertTriangle,
  Stethoscope,
  Printer,
  Smartphone,
  Layers,
  ArrowRight,
  Eye,
  Check,
  X,
  User,
  Clock,
  Pill,
  Brain,
  Calendar,
  Lock,
  ChevronDown,
  Play,
  Phone,
  PhoneCall,
  Headphones,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { ClinicalVideoPlayer } from './ClinicalVideoPlayer';
import { SpecialtiesBodyCareView } from '../specialties/SpecialtiesBodyCareView';
import { HealthInsuranceView } from '../insurance/HealthInsuranceView';

interface MediMindLandingViewProps {
  onEnterPlatform?: () => void;
}

export const MediMindLandingView: React.FC<MediMindLandingViewProps> = ({ onEnterPlatform }) => {
  const {
    language,
    setLanguage,
    setActiveSection,
    loadRajeshDemoProfile,
    setActiveReportForAnalyzer,
    userProfile
  } = useHealth();

  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState<'apollo' | 'rx' | 'discharge' | null>(null);
  const [doctorBriefModalOpen, setDoctorBriefModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
  const [spotlightVideoMode, setSpotlightVideoMode] = useState<'brain_body' | 'total_body'>('brain_body');

  // Animation Video vs Static Photo modes for each section
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'photo'>('video');
  const [ocrMediaMode, setOcrMediaMode] = useState<'video' | 'photo'>('video');
  const [docMediaMode, setDocMediaMode] = useState<'video' | 'photo'>('video');

  // Multilingual text dictionary
  const t = {
    en: {
      badgeHero: 'Next-Gen Healthcare AI • Multimodal Document Vision • FHIR R4 Ready',
      headline1: 'Understand Your Health.',
      headline2: 'Organize Your Care.',
      headline3: 'Make Informed Decisions.',
      subhead: 'MediMind AI fuses multimodal document OCR, longitudinal biometric tracking, and conservative clinical reasoning to transform scattered prescriptions and lab panels into grounded, plain-language insights.',
      launchDemo: 'Launch Demo (Rajesh Sharma, 46 Yrs)',
      createProfile: 'Create Health Profile',
      evaluatorHeader: 'Evaluator Test Suite: Download Sample Clinical Records',
      readyToUpload: 'Ready to Upload',
      apolloChip: 'Apollo Lab Panel',
      rxChip: 'Prescription PDF',
      dischargeChip: 'Discharge Card',
      inspectBtn: 'Inspect',
      syncedBadge: 'Apollo Metabolic Panel Synced',
      testPassing: '14/14 Automated Tests Passing',
      userIsolation: 'User Isolation & RLS Enforced',
      bilingual: 'Telugu & English Bilingual Intelligence',
      fhirReady: 'HL7 FHIR R4 & Mock ABHA Ready',
      ocrBadge: 'Multimodal Vision & Optical Character Recognition',
      ocrTitle: 'Instant Document Extraction with Side-by-Side Review',
      ocrDesc: 'Upload diagnostic PDFs, hospital discharge summaries, or camera snapshots. Our multimodal pipeline extracts laboratory parameters, reference intervals, and medication schedules, displaying the findings alongside the original document for human verification.',
      outlierTitle: 'Fasting Blood Glucose',
      outlierTag: 'OUTLIER HIGHLIGHTED',
      outlierExplanation: 'Automatic flag with plain-language explanation and clinician questions.',
      hitlTag: 'HUMAN-IN-THE-LOOP',
      hitlTitle: 'Interactive Review Modal',
      hitlSub: 'Edit & Confirm Before Commit',
      hitlDesc: 'Verify extracted medicines and dates before saving to your medical timeline.',
      doctorBadge: 'Doctor Visit Preparation & Brief Generator',
      doctorTitle: 'Arrive at Your Consultation Prepared & Confident',
      doctorDesc: 'Synthesize weeks of symptom notes, vital readings, active medications, and recent lab tests into an organized, one-page clinical brief. Includes customized questions tailored to your findings so you never forget what to ask.',
      doctorCardHeader: 'Dr. Ananya Reddy • Endocrinologist Consultation',
      readyToPrint: 'Ready to Print',
      archBadge: 'Complete Solution Architecture',
      archTitle: 'End-to-End Personal Healthcare Intelligence Ecosystem',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      enterPlatform: 'Enter Copilot App'
    },
    te: {
      badgeHero: 'తదుపరి తరం హెల్త్‌కేర్ AI • మల్టీమోడల్ డాక్యుమెంట్ విజన్ • FHIR R4 సిద్ధం',
      headline1: 'మీ ఆరోగ్యాన్ని అర్థం చేసుకోండి.',
      headline2: 'మీ సంరక్షణను నిర్వహించండి.',
      headline3: 'సరైన నిర్ణయాలు తీసుకోండి.',
      subhead: 'MediMind AI మల్టీమోడల్ డాక్యుమెంట్ OCR, బయోమెట్రిక్ ట్రాకింగ్ మరియు క్లినికల్ కారణాలను కలిపి మీ ప్రిస్క్రిప్షన్‌లు మరియు ల్యాబ్ రిపోర్టులను స్పష్టమైన సమాచారంగా మారుస్తుంది.',
      launchDemo: 'డెమో ప్రారంభించండి (రాజేష్ శర్మ, 46 సం)',
      createProfile: 'హెల్త్ ప్రొఫైల్ సృష్టించండి',
      evaluatorHeader: 'మూల్యాంకన టెస్ట్ సూట్: శాంపిల్ క్లినికల్ రికార్డులు డౌన్‌లోడ్ చేయండి',
      readyToUpload: 'అప్‌లోడ్‌కు సిద్ధం',
      apolloChip: 'అపోలో ల్యాబ్ ప్యానెల్',
      rxChip: 'ప్రిస్క్రిప్షన్ PDF',
      dischargeChip: 'డిశ్చార్జ్ కార్డ్',
      inspectBtn: 'తనిఖీ చేయండి (Inspect)',
      syncedBadge: 'అపోలో మెటబాలిక్ ప్యానెల్ సమకాలీకరించబడింది',
      testPassing: '14/14 ఆటోమేటెడ్ పరీక్షలు పాసయ్యాయి',
      userIsolation: 'యూజర్ ఐసోలేషన్ & RLS రక్షణ',
      bilingual: 'తెలుగు & ఇంగ్లీష్ ద్విభాషా ఇంటెలిజెన్స్',
      fhirReady: 'HL7 FHIR R4 & ABHA సిద్ధం',
      ocrBadge: 'మల్టీమోడల్ విజన్ & ఆప్టికల్ క్యారెక్టర్ రికగ్నిషన్',
      ocrTitle: 'పక్కపక్కనే సమీక్షతో తక్షణ పత్రాల విశ్లేషణ',
      ocrDesc: 'డయాగ్నస్టిక్ PDFలు, డిశ్చార్జ్ సారాంశాలు లేదా ఫోటోలను అప్‌లోడ్ చేయండి. మా పైప్‌లైన్ ల్యాబ్ పారామితులు మరియు ఔషధాల షెడ్యూల్‌ను వెలికితీసి అసలు పత్రంతో పోల్చి చూపిస్తుంది.',
      outlierTitle: 'ఫాస్టింగ్ బ్లడ్ గ్లూకోజ్ (Fasting Blood Glucose)',
      outlierTag: 'అసహజ విలువ గుర్తించబడింది',
      outlierExplanation: 'సులభమైన వివరణ మరియు వైద్యుడిని అడగాల్సిన ప్రశ్నలతో ఆటోమేటిక్ ఫ్లాగ్.',
      hitlTag: 'హ్యూమన్-ఇన్-ది-లూప్ (Human-in-the-Loop)',
      hitlTitle: 'ఇంటరాక్టివ్ రివ్యూ మోడల్',
      hitlSub: 'ఖరారు చేసే ముందు సవరించండి',
      hitlDesc: 'మీ మెడికల్ టైమ్‌లైన్‌కు సేవ్ చేయడానికి ముందు మందులు మరియు తేదీలను సరిచూసుకోండి.',
      doctorBadge: 'డాక్టర్ విజిట్ ప్రిపరేషన్ & క్లినికల్ బ్రీఫ్',
      doctorTitle: 'పూర్తి సన్నద్ధతతో డాక్టర్ సంప్రదింపుకు వెళ్లండి',
      doctorDesc: 'లక్షణాలు, ప్రాణాధార రీడింగ్‌లు, ప్రస్తుత మందులు మరియు ల్యాబ్ పరీక్షలను ఒకే పేజీ క్లినికల్ బ్రీఫ్‌గా మార్చండి.',
      doctorCardHeader: 'డా. అనన్య రెడ్డి • ఎండోక్రినాలజిస్ట్ కన్సల్టేషన్',
      readyToPrint: 'ప్రింట్‌కు సిద్ధం',
      archBadge: 'సంపూర్ణ పరిష్కార ఆర్కిటెక్చర్',
      archTitle: 'సమగ్ర వ్యక్తిగత ఆరోగ్య ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్',
      signIn: 'సైన్ ఇన్',
      getStarted: 'ప్రారంభించండి',
      enterPlatform: 'కోపైలట్ యాప్ ఓపెన్ చేయండి'
    },
    hi: {
      badgeHero: 'नेक्स्ट-जेन हेल्थकेयर AI • मल्टीमॉडल डॉक्यूमेंट विजन • FHIR R4 तैयार',
      headline1: 'अपने स्वास्थ्य को समझें।',
      headline2: 'अपनी देखभाल व्यवस्थित करें।',
      headline3: 'सटीक निर्णय लें।',
      subhead: 'MediMind AI मल्टीमॉडल OCR, बायोमेट्रिक ट्रैकिंग और क्लीनिकल रीजनिंग के संयोजन से आपके पर्चों और लैब टेस्ट को स्पष्ट भाषा में बदलता है।',
      launchDemo: 'डेमो शुरू करें (राजेश शर्मा, 46 वर्ष)',
      createProfile: 'हेल्थ प्रोफाइल बनाएं',
      evaluatorHeader: 'मूल्यांकन टेस्ट सूट: सैंपल क्लीनिकल रिकॉर्ड डाउनलोड करें',
      readyToUpload: 'अपलोड के लिए तैयार',
      apolloChip: 'अपोलो लैब पैनल',
      rxChip: 'प्रिस्क्रिप्शन PDF',
      dischargeChip: 'डिस्चार्ज कार्ड',
      inspectBtn: 'निरीक्षण करें (Inspect)',
      syncedBadge: 'अपोलो मेटाबॉलिक पैनल सिंक हुआ',
      testPassing: '14/14 ऑटोमेटेड टेस्ट पास',
      userIsolation: 'यूजर आइसोलेशन व RLS सुरक्षा',
      bilingual: 'तेलुगु व अंग्रेजी द्विभाषी क्षमता',
      fhirReady: 'HL7 FHIR R4 व ABHA तैयार',
      ocrBadge: 'मल्टीमॉडल विजन व ऑप्टिकल कैरेक्टर रिकॉग्निशन',
      ocrTitle: 'तुरंत डॉक्यूमेंट निष्कर्षण और आमने-सामने समीक्षा',
      ocrDesc: 'डायग्नोस्टिक PDF, डिस्चार्ज सारांश या फोटो अपलोड करें। हमारा सिस्टम लैब पैरामीटर और दवाओं को मूल दस्तावेज के साथ सत्यापित करता है।',
      outlierTitle: 'फास्टिंग ब्लड ग्लूकोज',
      outlierTag: 'असामान्य मान चिह्नित',
      outlierExplanation: 'सरल भाषा में व्याख्या और डॉक्टर से पूछने योग्य प्रश्नों के साथ स्वचालित अलर्ट।',
      hitlTag: 'ह्यूमन-इन-द-लूप',
      hitlTitle: 'इंटरैक्टिव समीक्षा मॉडल',
      hitlSub: 'सेव करने से पहले संपादित करें',
      hitlDesc: 'अपनी टाइमलाइन में जोड़ने से पहले दवाओं और तिथियों की पुष्टि करें।',
      doctorBadge: 'डॉक्टर विजिट तैयारी व क्लीनिकल ब्रीफ',
      doctorTitle: 'पूरी तैयारी और आत्मविश्वास के साथ परामर्श लें',
      doctorDesc: 'लक्षणों, वाइटल्स, दवाओं और हालिया लैब परीक्षणों को एक पेज के सुव्यवस्थित क्लीनिकल ब्रीफ में संश्लेषित करें।',
      doctorCardHeader: 'डॉ. अनन्या रेड्डी • एंडोक्रिनोलॉजिस्ट परामर्श',
      readyToPrint: 'प्रिंट के लिए तैयार',
      archBadge: 'संपूर्ण समाधान आर्किटेक्चर',
      archTitle: 'एकीकृत पर्सनल हेल्थकेयर इंटेलिजेंस प्लेटफॉर्म',
      signIn: 'साइन इन',
      getStarted: 'शुरू करें',
      enterPlatform: 'को-पायलट ऐप में जाएं'
    }
  };

  const curr = t[language] || t.en;

  const handleLaunchRajesh = () => {
    loadRajeshDemoProfile();
    if (onEnterPlatform) onEnterPlatform();
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white transition-colors duration-200">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('landing')}>
            <div className="w-10 h-10 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Heart className="w-5 h-5 fill-white stroke-teal-500" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                MediMind AI
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300">
                  v2.4
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase -mt-0.5">
                PERSONAL HEALTH COPILOT
              </div>
            </div>
          </div>

          {/* Quick Nav Anchor Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Features
            </a>
            <a href="#ocr-vision" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              OCR Vision
            </a>
            <button
              type="button"
              onClick={() => setActiveSection('ambulance')}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1.5 font-bold cursor-pointer text-xs sm:text-sm px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 shadow-xs hover:scale-105 active:scale-95"
              title="Open Dedicated 24/7 Ambulance Service App Page"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>Ambulance 24/7</span>
            </button>
            <a href="#clinical-videos" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping inline-block" />
              <span>Video Demos</span>
            </a>
            <a href="#body-specialties" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1 font-bold">
              <span>Specialties</span>
            </a>
            <a
              href="#health-insurance"
              className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1.5 font-bold text-xs shadow-xs hover:scale-105"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Buy Insurance</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500 text-white uppercase leading-none">New</span>
            </a>
            <a href="#emergency-care" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Injured Care & Helpline</span>
            </a>
            <a href="#architecture" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Architecture
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* 24/7 Helpline Badge Button (1800 990 880) */}
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all shadow-xs cursor-pointer group"
              title="24/7 Helpline: 1800 990 880"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">24/7 Helpline:</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-300">1800 990 880</span>
            </button>
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-400 transition-colors cursor-pointer shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{language === 'te' ? 'తెలుగు (Telugu)' : language === 'hi' ? 'हिंदी (Hindi)' : 'English'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 text-xs">
                  <button
                    type="button"
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 hover:bg-teal-50 dark:hover:bg-slate-700 flex items-center justify-between ${language === 'en' ? 'font-bold text-teal-600' : ''}`}
                  >
                    <span>English</span>
                    {language === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLanguage('te'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 hover:bg-teal-50 dark:hover:bg-slate-700 flex items-center justify-between ${language === 'te' ? 'font-bold text-teal-600' : ''}`}
                  >
                    <span>తెలుగు (Telugu)</span>
                    {language === 'te' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 hover:bg-teal-50 dark:hover:bg-slate-700 flex items-center justify-between ${language === 'hi' ? 'font-bold text-teal-600' : ''}`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {language === 'hi' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Switch to Full Copilot Workspace */}
            <button
              type="button"
              onClick={() => setActiveSection('dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
            >
              {curr.signIn}
            </button>

            <button
              type="button"
              onClick={handleLaunchRajesh}
              className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-teal-600/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{curr.getStarted}</span>
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO SECTION (Matching Screenshot 1) */}
      <section className="relative pt-10 sm:pt-14 pb-16 lg:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Subhead, CTA Buttons, Evaluator Test Suite */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{curr.badgeHero}</span>
              </div>

              {/* Huge Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {curr.headline1}<br />
                <span className="text-teal-500 dark:text-teal-400">{curr.headline2}</span><br />
                {curr.headline3}
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {curr.subhead}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleLaunchRajesh}
                  className="px-6 py-3.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-slate-900/15 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <span>{curr.launchDemo}</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('profile')}
                  className="px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  {curr.createProfile}
                </button>
              </div>

              {/* Evaluator Test Suite: Download Sample Clinical Records Container */}
              <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/60 shadow-sm space-y-3 max-w-2xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    <Download className="w-4 h-4 text-teal-600" />
                    <span>{curr.evaluatorHeader}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {curr.readyToUpload}
                  </span>
                </div>

                {/* 3 Clickable Sample Chips */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setDownloadModalOpen('apollo')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
                  >
                    <FileText className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span>{curr.apolloChip}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDownloadModalOpen('rx')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span>{curr.rxChip}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDownloadModalOpen('discharge')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
                  >
                    <Activity className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span>{curr.dischargeChip}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Card with Hologram Graphic & Rajesh Sharma Badge (Screenshot 1) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden relative group hover:shadow-teal-500/10 transition-shadow">
                {/* 3D Holographic Visual Viewport with Live Animation Video Toggle */}
                <div className="relative aspect-[16/10] bg-[#0A1628] overflow-hidden flex items-center justify-center">
                  <Image
                    src={heroMediaMode === 'video' ? '/videos/hologram_scan_anim.webp' : '/images/hero_hologram_hd.png'}
                    alt="Holographic Medical Body Scan"
                    width={885}
                    height={348}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    priority
                    unoptimized={heroMediaMode === 'video'}
                  />

                  {/* Mode Switcher Pill on Top Left */}
                  <div className="absolute top-3 left-3 z-20 flex items-center bg-black/75 backdrop-blur-md p-0.5 rounded-full border border-teal-400/30 text-[10px] font-bold shadow-md">
                    <button
                      type="button"
                      onClick={() => setHeroMediaMode('video')}
                      className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                        heroMediaMode === 'video' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Live Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroMediaMode('photo')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        heroMediaMode === 'photo' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>HD Photo</span>
                    </button>
                  </div>

                  {/* Top Right HUD Badge: AI Copilot Online */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-[#0F223A]/90 backdrop-blur-md border border-teal-400/30 text-[10px] font-bold text-teal-200 flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span>AI Copilot Online</span>
                    <span className="text-teal-400">• Zero Guard</span>
                  </div>

                  {/* Floating metric HUD badges */}
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-sm border border-teal-400/30 text-[9px] font-mono text-teal-300">
                    GLUCOSE: 98 mg/dL • HR: 72 bpm • 60fps Loop
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-sm border border-teal-400/30 text-[9px] font-mono text-teal-300">
                    Activity: 85% • 9:00 AM
                  </div>
                </div>

                {/* Bottom Patient Strip (Matching Screenshot 1 exactly) */}
                <div className="p-4 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Teal RS Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-extrabold text-sm flex items-center justify-center shrink-0">
                      RS
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        Rajesh Sharma (46 Yrs)
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                        <span>{curr.syncedBadge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inspect Button */}
                  <button
                    type="button"
                    onClick={() => setInspectModalOpen(true)}
                    className="px-4 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    {curr.inspectBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST STRIP (Matching Screenshot 2) */}
      <section className="border-y border-teal-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{curr.testPassing}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Lock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{curr.userIsolation}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Globe className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{curr.bilingual}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{curr.fhirReady}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MULTIMODAL OCR EXTRACTION (Matching Screenshot 2) */}
      <section id="ocr-vision" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Graphic: 3D Scanner Table with Confidence Badge */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-md rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative group">
                <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden">
                  <Image
                    src={ocrMediaMode === 'video' ? '/videos/ocr_scanner_anim.webp' : '/images/ocr_scanner_hd.png'}
                    alt="Optical Character Recognition Medical Scanner"
                    width={981}
                    height={591}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized={ocrMediaMode === 'video'}
                  />

                  {/* Mode Switcher Pill on Top Right */}
                  <div className="absolute top-3 right-3 z-20 flex items-center bg-black/75 backdrop-blur-md p-0.5 rounded-full border border-white/20 text-[10px] font-bold shadow-md">
                    <button
                      type="button"
                      onClick={() => setOcrMediaMode('video')}
                      className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                        ocrMediaMode === 'video' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Laser Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOcrMediaMode('photo')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        ocrMediaMode === 'photo' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>Photo</span>
                    </button>
                  </div>

                  {/* Badge overlay bottom-left */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>OCR Scan Confidence: 94.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Multimodal Vision Copy & 2 Highlight Cards */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold">
                <FileCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{curr.ocrBadge}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {curr.ocrTitle}
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {curr.ocrDesc}
              </p>

              {/* 2 Stacked Cards (Screenshot 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Card 1: Outlier Highlighted */}
                <div
                  onClick={() => {
                    loadRajeshDemoProfile();
                    setActiveSection('report-analyzer');
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-950/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-2 group"
                >
                  <div className="inline-flex text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-300 tracking-wider">
                    {curr.outlierTag}
                  </div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {curr.outlierTitle}
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white flex items-baseline gap-1.5">
                    <span>145 mg/dL</span>
                    <span className="text-xs font-bold text-rose-500">(Ref: 70-100)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    {curr.outlierExplanation}
                  </p>
                </div>

                {/* Card 2: Human In The Loop */}
                <div
                  onClick={() => {
                    loadRajeshDemoProfile();
                    setActiveSection('reports');
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-950/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-2 group"
                >
                  <div className="inline-flex text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 tracking-wider">
                    {curr.hitlTag}
                  </div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {curr.hitlTitle}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {curr.hitlSub}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    {curr.hitlDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 24/7 RAPID AMBULANCE SERVICES AVAILABLE IN OUR APP */}
      <section id="ambulance-services" className="py-16 sm:py-24 bg-white dark:bg-slate-900/60 border-y border-rose-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Ambulance Service Details & Dispatch Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>24/7 Rapid Ambulance Service • Live GPS Dispatch • 1800 990 880</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                24/7 Rapid Ambulance Services Available in Our App
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Need immediate emergency transit? CareVista AI provides rapid 1-click mobile ICU ambulance dispatch. Equipped with in-transit ventilators, cardiac telemetry defibrillators, and satellite GPS tracking broadcasting directly to trauma emergency rooms.
              </p>

              {/* Fleet Highlights Card */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-rose-100 dark:border-rose-950/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Mobile ICU Fleet: Unit 07 • ALS & BLS Units Ready</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Avg Response: 3 - 5 Mins</span>
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Mobile ICU / Advanced Life Support:</strong> Invasive ventilator, 12-lead cardiac monitor, critical care paramedic team.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Live Satellite GPS Telemetry:</strong> Vehicle speed (84 km/h), real-time route map, and live countdown timer synced to your phone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Pre-Hospital ER Alert:</strong> Patient vitals and trauma scores pre-transmitted to Apollo Trauma Center & Helpline 1800 990 880.
                    </span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection('ambulance')}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-rose-600/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Open Ambulance App Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Instant 1-Click Dispatch</span>
                  </button>

                  <a
                    href="tel:1800990880"
                    className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call 1800 990 880</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Graphic: Animated Ambulance Video / HD Photo Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-3xl overflow-hidden bg-slate-950 border border-rose-500/40 shadow-2xl relative group">
                <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
                  <Image
                    src={docMediaMode === 'video' ? '/videos/ambulance_service_anim.webp' : '/images/ambulance_service_hd.jpg'}
                    alt="Animated 24/7 Mobile ICU Ambulance Service"
                    width={1376}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized={docMediaMode === 'video'}
                    priority
                  />

                  {/* Mode Switcher Pill on Bottom Right */}
                  <div className="absolute bottom-3 right-3 z-20 flex items-center bg-black/80 backdrop-blur-md p-0.5 rounded-full border border-white/20 text-[10px] font-bold shadow-md">
                    <button
                      type="button"
                      onClick={() => setDocMediaMode('video')}
                      className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                        docMediaMode === 'video' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Live Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocMediaMode('photo')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        docMediaMode === 'photo' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>HD Photo</span>
                    </button>
                  </div>

                  {/* Badge top-left */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-rose-500/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Ambulance GPS: Active • 84 km/h</span>
                  </div>

                  {/* Badge top-right */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-rose-600/90 text-white text-[9px] font-bold">
                    MOBILE ICU
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE CLINICAL ANIMATION & VIDEO DEMO SUITE */}
      <section id="clinical-videos" className="py-16 sm:py-24 bg-gradient-to-b from-white via-teal-50/20 to-[#F4F9F9] dark:from-slate-900/40 dark:via-slate-900/60 dark:to-slate-950 border-b border-teal-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold shadow-xs">
              <Play className="w-3.5 h-3.5 fill-teal-600 text-teal-600 dark:fill-teal-400 dark:text-teal-400" />
              <span>Live Clinical Animation & Video Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Medical AI in Motion: Animated Video Demonstrations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Watch high-frame-rate animated video simulations of 3D physiological scans, laser document extraction, real-time outlier detection, and hospital ICU ECG telemetry.
            </p>
          </div>

          {/* Flagship Total Body & Brain Scanning Spotlight Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0A1628] to-slate-900 border border-teal-500/30 p-6 sm:p-8 text-white shadow-2xl space-y-6">
            {/* Top Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal-300 font-bold">
                  Clinical HD Animation Feed
                </span>
              </div>
              <div className="inline-flex rounded-full bg-black/50 p-1 border border-white/15 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSpotlightVideoMode('brain_body')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    spotlightVideoMode === 'brain_body'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Dual Brain Scan & Total Body Checkup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpotlightVideoMode('total_body')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    spotlightVideoMode === 'total_body'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>3D Full Body Volumetric MRI</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-400/40 text-teal-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>
                    {spotlightVideoMode === 'brain_body'
                      ? 'NEW • CRANIAL BRAIN SCAN & WHOLE BODY BIOMETRICS (HD)'
                      : 'FLAGSHIP • 3D TOTAL BODY VOLUMETRIC SCAN (HD)'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  {spotlightVideoMode === 'brain_body'
                    ? 'Dual 3D Cerebral Cortex Mapping & Comprehensive Total Body Diagnostics'
                    : 'Comprehensive Anatomical MRI & Holographic Biometric Matrix'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {spotlightVideoMode === 'brain_body'
                    ? 'Dual-panel medical console tracking active neural synapse connectivity and EEG frequency spectrum alongside a head-to-toe biometric laser checkup assessing vital organs and cardiovascular rhythm.'
                    : 'Real-time cranial, cardiopulmonary, metabolic, and musculoskeletal physiological reconstruction. An automated laser slice sweeps from head to toe, tracking neural connectivity, aortic blood flow, and flagging active outliers.'}
                </p>

                {spotlightVideoMode === 'brain_body' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">BRAIN SCAN:</span>
                      <strong className="text-emerald-300 font-bold">99.8% Synapses</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">BODY CHECKUP:</span>
                      <strong className="text-teal-300 font-bold">100% Verified</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">EEG SPECTRUM:</span>
                      <strong className="text-cyan-300 font-bold">Alpha / Gamma OK</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono">
                      <span className="text-emerald-300 text-[10px] block">DIAGNOSTIC:</span>
                      <strong className="text-emerald-400 font-bold">NOMINAL STATUS</strong>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">CEREBRUM:</span>
                      <strong className="text-teal-300 font-bold">99.4% Synaptic</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">CARDIAC:</span>
                      <strong className="text-teal-300 font-bold">72 BPM Lead II</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono">
                      <span className="text-rose-300 text-[10px] block">METABOLIC:</span>
                      <strong className="text-rose-400 font-bold">145 mg/dL FLAG</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-slate-400 text-[10px] block">SPINE / BONE:</span>
                      <strong className="text-teal-300 font-bold">Aligned OK</strong>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      loadRajeshDemoProfile();
                      setActiveSection('body-map');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Open Interactive Body Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      loadRajeshDemoProfile();
                      setActiveSection('visual-atlas');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span>3D Cranial & Organ Atlas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-400/30 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Consult Doctor: 1800 990 880</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Window of Video */}
              <div className="w-full lg:w-96 rounded-2xl overflow-hidden border border-teal-400/30 shadow-xl bg-black relative group shrink-0">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    key={spotlightVideoMode}
                    src={spotlightVideoMode === 'brain_body' ? '/videos/brain_body_checkup_anim.webp' : '/videos/total_body_scan_anim.webp'}
                    alt={spotlightVideoMode === 'brain_body' ? 'Cranial Brain Scan and Total Body Checkup Video' : 'Total Body Holographic Scan Video'}
                    width={1376}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                    priority
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs border border-teal-400/30 text-[9px] font-mono text-teal-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{spotlightVideoMode === 'brain_body' ? 'DUAL BRAIN & BODY LOOP' : '60FPS HD SCAN LOOP'}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-teal-500/90 text-white text-[9px] font-bold">
                    {spotlightVideoMode === 'brain_body' ? 'BRAIN MRI + CHECKUP' : 'VOLUMETRIC MRI'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cinema Video Player Suite */}
          <ClinicalVideoPlayer />
        </div>
      </section>

      {/* SECTION 5.5: DEDICATED 24/7 AMBULANCE SERVICE & MOBILE ICU DISPATCH SHOWCASE */}
      <section id="ambulance-services" className="py-16 sm:py-24 bg-gradient-to-b from-[#080D1A] via-slate-950 to-[#0A1224] text-white border-b border-rose-950/60 relative overflow-hidden">
        {/* Subtle background radar glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold shadow-lg shadow-rose-950/50">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>24/7 RAPID AMBULANCE SERVICE • NATIONAL DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Emergency Ambulance Dispatch & In-Transit Mobile ICU
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Instant emergency vehicle dispatch with live GPS satellite radar tracking, in-transit telemetry streaming to Apollo Trauma Center, and direct toll-free hotline 1800 990 880.
            </p>
          </div>

          {/* Main 2-Col Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Col (7 cols): Animated Ambulance Video Screen with Live Radar & Beacons */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-rose-500/40 shadow-2xl overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                <Image
                  src="/videos/ambulance_service_anim.webp"
                  alt="24/7 Rapid Emergency Mobile ICU Ambulance Service Dispatch"
                  width={1376}
                  height={768}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                  priority
                />

                {/* Alternating Red / Blue Strobe Alert Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-rose-500/50 text-[10px] font-mono text-rose-300 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>EMERGENCY BEACONS ACTIVE</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-teal-400/40 text-[10px] font-mono text-teal-300 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GPS RADAR: LOCKED</span>
                </div>

                {/* Bottom Live Telemetry Scrubber Bar */}
                <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-rose-400 font-bold">UNIT: Mobile ICU 07</span>
                    <span className="text-slate-400 hidden sm:inline">|</span>
                    <span className="text-teal-300 hidden sm:inline">SPEED: 84 KM/H</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">ETA:</span>
                    <strong className="text-emerald-400 font-bold">03:23 MINS</strong>
                  </div>
                </div>
              </div>

              {/* Video Footer Breakdown */}
              <div className="p-6 bg-slate-950/80 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span>Advanced Life Support (ALS) Onboard Fleet</span>
                  </div>
                  <span className="text-xs font-bold text-teal-400">Guaranteed &lt;5 Mins</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Every ambulance features an invasive mechanical ventilator, 12-lead diagnostic ECG defibrillator, medical oxygen manifold, and continuous satellite telemetry relaying vitals directly to the receiving emergency physician.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveSection('ambulance')}
                    className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Launch Full In-App Ambulance Console</span>
                  </button>

                  <a
                    href="tel:1800990880"
                    className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call 1800 990 880</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Col (5 cols): 4 Ambulance Categories & Quick Action Pill */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black tracking-wider uppercase text-rose-400">
                    Emergency Fleet Categories Available
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">14 Active Units</span>
                </div>

                {/* Fleet Card 1: Mobile ICU */}
                <div
                  onClick={() => setActiveSection('ambulance')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/40 hover:border-teal-400 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/50 text-rose-300">
                      ★ Critical ALS Fleet
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">ETA 3-5 Mins</span>
                  </div>
                  <div className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">
                    Mobile ICU / Advanced Life Support
                  </div>
                  <p className="text-xs text-slate-400">
                    Invasive ventilator, 12-lead defibrillator & critical care paramedic onboard.
                  </p>
                </div>

                {/* Fleet Card 2: Cardiac & Neuro */}
                <div
                  onClick={() => setActiveSection('ambulance')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-950/60 border border-red-500/50 text-red-300">
                      Heart Attack & Stroke
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">ETA 4-6 Mins</span>
                  </div>
                  <div className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">
                    Cardiac & Stroke Emergency Response
                  </div>
                  <p className="text-xs text-slate-400">
                    Thrombolysis ready equipment, continuous ECG link & ER bed pre-allocation.
                  </p>
                </div>

                {/* Fleet Card 3: Trauma Response */}
                <div
                  onClick={() => setActiveSection('ambulance')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-300">
                      Accidents & Bleeding
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">ETA 4-7 Mins</span>
                  </div>
                  <div className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">
                    Trauma & Injured Persons Unit
                  </div>
                  <p className="text-xs text-slate-400">
                    Spine immobilization boards, wound dressings & hemorrhage control.
                  </p>
                </div>

                {/* Fleet Card 4: Basic Life Support */}
                <div
                  onClick={() => setActiveSection('ambulance')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-950/60 border border-teal-500/50 text-teal-300">
                      Stable Transfer
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">ETA 3-5 Mins</span>
                  </div>
                  <div className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors">
                    Basic Life Support (BLS) Ambulance
                  </div>
                  <p className="text-xs text-slate-400">
                    High-flow oxygen therapy, hydraulic stretcher & first-responder paramedics.
                  </p>
                </div>
              </div>

              {/* 24/7 Helpline Banner Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border border-teal-400/40 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-teal-300 font-mono font-bold uppercase tracking-wider">
                    NATIONAL TOLL-FREE HELPLINE
                  </div>
                  <div className="text-2xl font-black text-white">
                    1800 990 880
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    Zero wait time • Direct connection
                  </div>
                </div>
                <a
                  href="tel:1800990880"
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EMERGENCY INJURED CARE, RECOVERY VITALITY & 24/7 HELPLINE (1800 990 880) */}
      <section id="emergency-care" className="py-16 sm:py-24 bg-gradient-to-b from-white via-rose-50/15 to-[#FBFDFD] dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-900 border-b border-rose-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Emergency Injured Care • Recovery Vitality • 24/7 Helpline: 1800 990 880</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              From Critical Injured Care to Radiant Health & Immediate Support
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              CareVista AI delivers end-to-end compassionate clinical support: rapid medical care for injured patients, guidance toward complete wellness and verified 100% normal vitals, backed by our 24/7 national emergency helpline.
            </p>
          </div>

          {/* 3 Showcase Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* PILLAR 1: INJURED CARE PICTURE & SHOWCASE */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-950/60 shadow-xl overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:border-rose-300 transition-all">
              <div className="space-y-4">
                {/* Photo Viewport */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <Image
                    src="/images/injured_care.jpg"
                    alt="Taking Care of Injured Persons in Clinical Emergency Setting"
                    width={1376}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Active Trauma & Injured Care</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="font-bold flex items-center gap-1 text-rose-300">
                      <span>Bedside Trauma Care & Stabilization</span>
                    </div>
                    <div className="text-[11px] text-slate-300 opacity-90">
                      Attentive wound dressing, arm splints & clinical vitals monitoring
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="inline-flex text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 tracking-wider">
                    BEDSIDE CLINICAL CARE
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Attentive Care for Injured Persons
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Compassionate emergency clinical triage for accident recovery, sports injuries, and sudden trauma. Our healthcare team applies sterile bandages, monitors blood loss markers, and initiates immediate pain-relief protocols.
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Sterile wound management & orthopedic splinting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Real-time trauma severity score & vitals tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Direct connection to 24/7 Helpline: 1800 990 880</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Request Emergency Triage & Dispatch</span>
                </button>
              </div>
            </div>

            {/* PILLAR 2: NEAT & HEALTHY PERSON PICTURE & SHOWCASE */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/60 shadow-xl overflow-hidden flex flex-col justify-between group hover:shadow-2xl hover:border-emerald-300 transition-all">
              <div className="space-y-4">
                {/* Photo Viewport */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <Image
                    src="/images/neat_healthy_person.jpg"
                    alt="Radiant Neat and Healthy Person with 100% Normal Vitals"
                    width={1376}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Vital Signs: 100% Normal</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="font-bold flex items-center gap-1 text-emerald-300">
                      <span>Full Recovery & Prevented Complications</span>
                    </div>
                    <div className="text-[11px] text-slate-300 opacity-90">
                      BP 118/78 • HR 68 bpm • SpO2 99% • Temp 36.6°C
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="inline-flex text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 tracking-wider">
                    TOTAL WELLNESS & VITALITY
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Neat, Fit & Healthy Living
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    The inspiring benchmark for post-treatment wellness and preventive care. With our personalized daily hydration goals, activity tracking, and intelligent medication adherence, patients achieve peak health and long-term vitality.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">BLOOD PRESSURE</span>
                      <strong className="text-slate-900 dark:text-white font-black text-sm">118/78 mmHg</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">HEART RATE</span>
                      <strong className="text-slate-900 dark:text-white font-black text-sm">68 bpm (Resting)</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">OXYGEN (SPO2)</span>
                      <strong className="text-slate-900 dark:text-white font-black text-sm">99% Arterial</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">OVERALL SCORE</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-black text-sm">100% Optimal</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveSection('wellness')}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Preventive Health Journey</span>
                </button>
              </div>
            </div>

            {/* PILLAR 3: 24/7 HELPLINE LOGO & CONTACT US WITH 1800 990 880 */}
            <div className="rounded-3xl bg-[#0B1524] text-white border border-teal-400/40 shadow-2xl overflow-hidden flex flex-col justify-between group hover:border-teal-400 hover:shadow-teal-500/20 transition-all relative">
              <div className="p-6 sm:p-8 space-y-6">
                {/* Glowing Emblem Header */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-teal-400/60 shadow-xl shadow-teal-500/30 shrink-0">
                    <Image
                      src="/images/contact_us_logo.jpg"
                      alt="Contact Us 1800 990 880 Logo Emblem"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-teal-400/40 pointer-events-none" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-400/30 text-teal-300 text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>24/7 TOLL-FREE HELPLINE</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                      Contact Us Any Time
                    </h3>
                    <p className="text-xs text-slate-300">
                      Zero waiting time • Immediate triage • Doctors on duty
                    </p>
                  </div>
                </div>

                {/* Big Bold Phone Number Display */}
                <div className="p-5 rounded-2xl bg-black/60 border border-teal-400/30 text-center space-y-2 relative overflow-hidden">
                  <div className="text-xs font-mono uppercase tracking-widest text-teal-400">
                    CALL TOLL-FREE DIRECT
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 tracking-wider">
                    1800 990 880
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>Average connect time: &lt; 30 seconds</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Instant Physician & Emergency Nursing Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Trilingual Assistance (English, Telugu, Hindi)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Accredited Emergency SOS & Hospital Linkage</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 space-y-3">
                <a
                  href="tel:1800990880"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Call 1800 990 880 Now</span>
                </a>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Open Contact & Emergency Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: COMPLETE SOLUTION ARCHITECTURE & 16 INTERACTIVE MODULES */}
      <section id="architecture" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{curr.archBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {curr.archTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              A unified full-stack architecture bridging multimodal document intelligence, bilingual clinical reasoning, interactive 3D anatomy, and mobile apps.
            </p>
          </div>

          {/* 16 Interactive Modules Launcher Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 'dashboard', name: 'Smart Health Dashboard', desc: 'Vitals, problems, medication reminders & appointments in one view', icon: Activity, tag: 'Core' },
              { id: 'ai-assistant', name: 'AI Voice & Chat Copilot', desc: 'Multilingual conversational medical guidance with audio speech', icon: Sparkles, tag: 'Bilingual' },
              { id: 'body-map', name: 'Interactive Body Map', desc: 'Clickable anatomical map to pinpoint pains & symptom logs', icon: Heart, tag: 'Visual' },
              { id: 'symptom-checker', name: 'Symptom Triage Checker', desc: '4-step clinical triage with red-flag emergency screening', icon: AlertTriangle, tag: 'Clinical' },
              { id: 'reports', name: 'Multimodal OCR Center', desc: 'Upload lab PDFs & discharge cards with confidence extraction', icon: FileText, tag: 'Vision' },
              { id: 'report-analyzer', name: 'Report & Biomarker Dissection', desc: 'Plain-language explanation of reference intervals & outliers', icon: Eye, tag: 'AI' },
              { id: 'medications', name: 'Medication Dosing & Adherence', desc: 'Daily pill tracker with taken/skipped logs and adherence rates', icon: Pill, tag: 'Schedule' },
              { id: 'history', name: 'Longitudinal Timeline', desc: 'Chronological timeline of all diagnoses, labs, and vitals', icon: Clock, desc2: 'FHIR R4' },
              { id: 'analytics', name: 'Biometric Analytics', desc: 'Recharts visual trends for Blood Pressure, Glucose, and Sleep', icon: Activity, tag: 'Trends' },
              { id: 'journal', name: 'Daily Hydration & Sleep Log', desc: 'Hydration glasses counter, sleep hours, mood & vitals log', icon: Calendar, tag: 'Daily' },
              { id: 'appointments', name: 'Doctor Visit & Brief Generator', desc: 'Checklist questions tailored to clinical findings', icon: Stethoscope, tag: 'Consult' },
              { id: 'wellness', name: 'Wellness & Prevention Goals', desc: 'Personalized preventive health milestones & progress rings', icon: ShieldCheck, tag: 'Goals' },
              { id: 'visual-atlas', name: 'Visual Health Atlas', desc: '3D heart/lungs, brain anatomy, and interactive hydration bottle', icon: Brain, tag: '3D Models' },
              { id: 'emergency', name: 'Emergency SOS & ABHA Card', desc: 'Critical allergies, emergency contacts & mock ABHA health ID', icon: Shield, tag: 'SOS' },
              { id: 'ambulance', name: '24/7 Rapid Ambulance Service', desc: 'Mobile ICU dispatch, live GPS radar telemetry & hospital trauma alert', icon: ShieldAlert, tag: 'Emergency' },
              { id: 'mobile-app', name: 'Mobile App Simulator', desc: 'Interactive iOS iPhone 16 Pro & Android Pixel 9 Pro simulator', icon: Smartphone, tag: 'Mobile' },
              { id: 'mobile-architecture', name: 'Flutter & React Native Hub', desc: 'Technical specifications, RLS schema & state architecture', icon: Layers, tag: 'Architecture' }
            ].map(mod => {
              const IconComp = mod.icon || Activity;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveSection(mod.id as NavSection)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {mod.tag || 'Tool'}
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {mod.name}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                      {mod.desc}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                    <span>Launch View</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: BROWSE BY SPECIALTIES & BODY HEALTH CARE (APOLLO 24/7 STYLE) */}
      <section id="body-specialties" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/50 border-b border-teal-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpecialtiesBodyCareView />
        </div>
      </section>

      {/* SECTION 9: SMART HEALTH INSURANCE PLANS & SOCIAL MEDIA KNOWLEDGE HUB */}
      <section id="health-insurance" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF9EE] dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-amber-200 dark:border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HealthInsuranceView />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                MediMind AI • CareVista AI
              </div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase">
                PERSONAL HEALTH COPILOT
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-right">
            <span>Next-Gen Healthcare AI • HL7 FHIR R4 Compliant • Zero Hallucination Guard</span>
            <div className="pt-1 text-[11px] text-slate-400">
              Designed for high-trust clinical review & patient-centered agency.
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: INSPECT RAJESH SHARMA PROFILE (Triggered by Inspect Button in Hero) */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-black text-lg flex items-center justify-center">
                  RS
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    Rajesh Sharma (46 Yrs)
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Apollo Metabolic Panel Synced • Type 2 Diabetes
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clinical Highlights Grid */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
                <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Active Glycemic Outlier
                </div>
                <div className="text-base font-black text-rose-700 dark:text-rose-300">
                  Fasting Blood Glucose: 145 mg/dL (Ref: 70-100)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Above expected fasting target. Titration brief generated for endocrinologist consultation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                  <span className="text-slate-500 block">Blood Group & Allergies:</span>
                  <strong className="text-slate-900 dark:text-white">B+ | Penicillin, Sulfa</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                  <span className="text-slate-500 block">Active Medications:</span>
                  <strong className="text-slate-900 dark:text-white">Metformin 500mg, Atorvastatin 20mg</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                  <span className="text-slate-500 block">Endocrinologist:</span>
                  <strong className="text-slate-900 dark:text-white">Dr. Ananya Reddy</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                  <span className="text-slate-500 block">Latest HbA1c:</span>
                  <strong className="text-slate-900 dark:text-white">7.4% (3-mo trend)</strong>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setInspectModalOpen(false);
                  handleLaunchRajesh();
                }}
                className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Full Dashboard as Rajesh</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setInspectModalOpen(false);
                  loadRajeshDemoProfile();
                  setActiveSection('report-analyzer');
                }}
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all cursor-pointer"
              >
                Inspect Lab Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EVALUATOR TEST SUITE PREVIEW (Apollo Lab Panel / Rx / Discharge) */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                <FileText className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {downloadModalOpen === 'apollo' && 'Apollo Lab Panel (Comprehensive Metabolic Panel)'}
                  {downloadModalOpen === 'rx' && 'Prescription PDF (Metformin & Atorvastatin)'}
                  {downloadModalOpen === 'discharge' && 'Clinical Discharge Summary Card'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-2 font-mono">
              <div className="text-slate-500">// Evaluator Test Suite Record</div>
              <div><strong>Patient:</strong> Rajesh Sharma (46 Yrs, Male, B+)</div>
              <div><strong>Facility:</strong> Apollo Diagnostics Center, Hyderabad</div>
              {downloadModalOpen === 'apollo' && (
                <>
                  <div><strong>Panel:</strong> Comprehensive Metabolic Panel (Fasting)</div>
                  <div className="text-rose-600 dark:text-rose-400 font-bold">
                    • Fasting Blood Glucose: 145 mg/dL [OUTLIER: Ref 70-100]
                  </div>
                  <div>• HbA1c: 7.4% [Ref &lt; 5.7%]</div>
                  <div>• Total Cholesterol: 190 mg/dL [Ref &lt; 200]</div>
                  <div>• Serum Creatinine: 0.95 mg/dL [Ref 0.7-1.3]</div>
                </>
              )}
              {downloadModalOpen === 'rx' && (
                <>
                  <div><strong>Prescriber:</strong> Dr. Ananya Reddy, MD (Endocrinologist)</div>
                  <div>• Metformin HCl 500mg - 1 Tab PO BID with meals</div>
                  <div>• Atorvastatin Calcium 20mg - 1 Tab PO QHS at bedtime</div>
                  <div className="text-amber-600 dark:text-amber-400 font-bold">• ALLERGY WARNING: Penicillin, Sulfa</div>
                </>
              )}
              {downloadModalOpen === 'discharge' && (
                <>
                  <div><strong>Episode:</strong> Routine Quarterly Glycemic Assessment</div>
                  <div><strong>Diagnosis:</strong> Type 2 Diabetes Mellitus, Borderline Dyslipidemia</div>
                  <div><strong>Care Plan:</strong> Titrate Metformin if FBS persists &gt; 140 mg/dL. Re-test in 90 days.</div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDownloadModalOpen(null);
                  loadRajeshDemoProfile();
                  setActiveSection('reports');
                }}
                className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Import Record into Multimodal OCR Engine</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  // Simulate file download
                  const content = JSON.stringify({
                    testType: downloadModalOpen,
                    patient: 'Rajesh Sharma',
                    age: 46,
                    flag: '145 mg/dL Glucose outlier'
                  }, null, 2);
                  const blob = new Blob([content], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${downloadModalOpen}_sample_record.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  setDownloadModalOpen(null);
                }}
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DOCTOR BRIEF PRINT PREVIEW (Dr. Ananya Reddy) */}
      {doctorBriefModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    One-Page Clinical Consultation Brief
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                    Dr. Ananya Reddy • Endocrinologist Consultation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDoctorBriefModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                <div><span className="text-slate-500 block">Patient:</span> <strong>Rajesh Sharma</strong></div>
                <div><span className="text-slate-500 block">Age / Sex:</span> <strong>46 Yrs / Male</strong></div>
                <div><span className="text-slate-500 block">Blood Group:</span> <strong>B+</strong></div>
                <div><span className="text-slate-500 block">ABHA ID:</span> <strong>91-4421-9876-01</strong></div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
                <strong className="text-rose-700 dark:text-rose-300 font-bold block">
                  Critical Allergies & Warnings:
                </strong>
                <p className="text-xs text-rose-800 dark:text-rose-200">
                  Documented severe hypersensitivity to Penicillin and Sulfa antibiotics.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  6-Month Glycemic & Lab Trajectory:
                </strong>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span>Fasting Blood Glucose (Apr 2026):</span>
                    <strong>145 mg/dL</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Fasting Blood Glucose (Jul 2026):</span>
                    <strong>141 mg/dL</strong>
                  </div>
                  <div className="flex justify-between text-teal-600 dark:text-teal-400 font-bold">
                    <span>Fasting Blood Glucose (Oct 2026):</span>
                    <strong>138 to 145 mg/dL (Fluctuating)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Current HbA1c:</span>
                    <strong>7.4%</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  Tailored Questions for Dr. Ananya Reddy:
                </strong>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <li>Should the current Metformin 500mg BID regimen be titrated given the 145 mg/dL fasting plateau?</li>
                  <li>Is bedtime administration of Atorvastatin 20mg providing sufficient lipid stabilization?</li>
                  <li>Are any renal function re-checks needed before exploring combination therapy?</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
              <button
                type="button"
                onClick={() => setDoctorBriefModalOpen(false)}
                className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING 24/7 HELPLINE WIDGET (1800 990 880) */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          type="button"
          onClick={() => setContactModalOpen(true)}
          className="flex items-center gap-3 p-2 pr-4 rounded-full bg-slate-950/90 hover:bg-black text-white border-2 border-teal-400 shadow-2xl shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title="Contact Us: 1800 990 880 (24/7 Toll-Free Helpline)"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-teal-300 shrink-0">
            <Image
              src="/images/contact_us_logo.jpg"
              alt="1800 990 880 Contact Us Emblem"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-black animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] text-teal-400 font-extrabold tracking-wider uppercase">
              24/7 HELPLINE
            </div>
            <div className="text-sm font-black text-white leading-none">
              1800 990 880
            </div>
          </div>
        </button>
      </div>

      {/* MODAL 4: 24/7 HELPLINE & EMERGENCY DESK (1800 990 880) */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-teal-500/40 text-white shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-400 shrink-0 shadow-lg shadow-teal-500/20">
                  <Image
                    src="/images/contact_us_logo.jpg"
                    alt="Contact Us 1800 990 880 Logo"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-black text-xl text-white">
                    CareVista Emergency & Helpdesk
                  </h3>
                  <p className="text-xs text-teal-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Toll-Free 24/7 National Line • Instant Connection
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setContactModalOpen(false);
                  setEmergencyAlertSent(false);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hotline Highlight Card */}
            <div className="p-5 rounded-2xl bg-black/60 border border-teal-400/40 text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                DIRECT TOLL-FREE TELEPHONE HELPLINE
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                1800 990 880
              </div>
              <p className="text-xs text-slate-300">
                Available 24 hours a day, 7 days a week for medical consultations, injured care triage, and emergency dispatch.
              </p>
            </div>

            {/* Simulated Ambulance Alert confirmation if clicked */}
            {emergencyAlertSent ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs space-y-2">
                <div className="font-extrabold text-sm flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Emergency Dispatch Priority Dispatched!</span>
                </div>
                <p>
                  Telemetry transmission locked. CareVista trauma unit alerted. An on-call emergency physician is dialing you back right now at your registered phone.
                </p>
              </div>
            ) : null}

            {/* Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:1800990880"
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1800 990 880</span>
              </a>

              <button
                type="button"
                onClick={() => setEmergencyAlertSent(true)}
                className="py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Request Ambulance</span>
              </button>
            </div>

            {/* Additional Contact Options */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">SMS / WhatsApp Help:</span>
                <strong className="text-white">+91 1800 990 880</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">On-Duty Clinicians:</span>
                <strong className="text-emerald-400">12 Doctors Active</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Languages:</span>
                <strong className="text-white">English, Telugu, Hindi</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px]">Injured Persons Care:</span>
                <strong className="text-rose-400">Trauma Unit Ready</strong>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setContactModalOpen(false);
                  setActiveSection('emergency');
                }}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Go to CareVista Emergency SOS & ABHA Health Card Module →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
