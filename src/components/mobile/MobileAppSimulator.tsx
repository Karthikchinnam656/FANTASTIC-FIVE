'use client';

import React, { useState, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  Smartphone,
  Shield,
  Camera,
  Bell,
  Wifi,
  WifiOff,
  Battery,
  Flame,
  Heart,
  Droplets,
  Moon,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Scan,
  RefreshCw,
  Plus,
  Send,
  Mic,
  Pill,
  Activity,
  FileText,
  User,
  ShieldAlert,
  HelpCircle,
  X
} from 'lucide-react';
import { DoctorAvatar } from '@/components/illustrations/MedicalIllustrations';

export const MobileAppSimulator: React.FC = () => {
  const {
    userProfile,
    healthProblems,
    medicalReports,
    medications,
    journalEntries,
    addMedicalReport,
    logMedicationDose,
    sendChatMessage,
    chatMessages
  } = useHealth();

  // Simulator controls state
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');
  const [mobileTab, setMobileTab] = useState<'home' | 'body' | 'chat' | 'reports' | 'sos'>('home');
  const [isLocked, setIsLocked] = useState(false);
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [activeBanner, setActiveBanner] = useState<{ title: string; body: string; type: string } | null>(null);
  const [healthKitSynced, setHealthKitSynced] = useState(true);
  const [chatInput, setChatInput] = useState('');

  // Mobile selected body region
  const [selectedMobileRegion, setSelectedMobileRegion] = useState('chest');

  const [today, setToday] = useState('2026-10-14');
  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);
  const latestJournal = journalEntries[0] || {
    hydrationGlasses: 6,
    sleepHours: 7.4,
    steps: 6420,
    systolicBP: 119,
    diastolicBP: 77
  };

  const triggerPushNotification = (type: 'pill' | 'doctor' | 'water') => {
    let notif = {
      title: 'CareVista Health Alert',
      body: 'Time for your wellness check-in',
      type: 'general'
    };

    if (type === 'pill') {
      notif = {
        title: '⏰ Medication Reminder: Atorvastatin (10mg)',
        body: 'Scheduled for bedtime with water. Tap to mark taken.',
        type: 'pill'
      };
    } else if (type === 'doctor') {
      notif = {
        title: '📅 Appointment Reminder: Dr. Vance',
        body: 'Upcoming consultation in 5 days. Prepare questions checklist.',
        type: 'doctor'
      };
    } else if (type === 'water') {
      notif = {
        title: '💧 Hydration Check: Glass 7 of 8',
        body: 'Keep up your daily target of 2.0 Liters.',
        type: 'water'
      };
    }

    setActiveBanner(notif);
    setTimeout(() => setActiveBanner(null), 5000);
  };

  const handleBiometricAuth = () => {
    setIsScanningBiometric(true);
    setTimeout(() => {
      setIsScanningBiometric(false);
      setIsLocked(false);
    }, 1200);
  };

  const handleCaptureCameraReport = () => {
    const newReport = {
      id: `rep-mob-${Date.now()}`,
      reportName: 'Mobile Camera Scan - Lipid & Metabolic Panel',
      reportType: 'Lipid Panel' as const,
      testDate: today,
      uploadDate: today,
      hospital: 'City Medical Diagnostic Scan',
      doctorName: 'Dr. Evelyn Vance, MD',
      isVerified: true,
      attachmentName: 'Camera_Capture_Page1.jpg',
      attachmentSize: '1.8 MB',
      userNotes: 'Captured via CareVista mobile camera scanner with auto-edge detection.',
      aiSummary: 'Extracted directly from mobile camera document scan. Fasting glucose and cholesterol levels captured successfully.',
      measurements: [
        {
          id: `m-mob-1`,
          parameter: 'Total Cholesterol',
          resultValue: 215,
          unit: 'mg/dL',
          referenceRange: '< 200',
          resultFlag: 'above' as const,
          explanation: 'Borderline elevated circulating cholesterol.'
        },
        {
          id: `m-mob-2`,
          parameter: 'Fasting Blood Glucose',
          resultValue: 91,
          unit: 'mg/dL',
          referenceRange: '70 - 99',
          resultFlag: 'normal' as const,
          explanation: 'Optimal glycemic control.'
        }
      ]
    };

    addMedicalReport(newReport);
    setIsCameraScannerOpen(false);
    triggerPushNotification('pill');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header and Simulator Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-teal-500 to-emerald-500 text-white rounded-xl shadow-xs">
              <Smartphone className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              CareVista Mobile App — Interactive Device Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test the production-ready iOS & Android mobile experience, including camera report OCR, biometric lock, push notifications, and offline SQLite synchronization.
          </p>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setDeviceType('ios')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                deviceType === 'ios'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              iPhone 16 Pro (iOS)
            </button>
            <button
              onClick={() => setDeviceType('android')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                deviceType === 'android'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Pixel 9 Pro (Android)
            </button>
          </div>

          {/* Biometric Lock Toggle */}
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isLocked
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            <span>{isLocked ? 'App Locked' : 'Simulate Lock'}</span>
          </button>

          {/* Offline Sync Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isOffline
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? 'Offline Mode (Local DB)' : 'Cloud Synced'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Mobile Testing Control Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Simulate Mobile Native Actions</span>
            </h3>

            {/* Push notification triggers */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Trigger Native Push Notifications:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => triggerPushNotification('pill')}
                  className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 text-center transition-all cursor-pointer"
                >
                  💊 Pill Alarm
                </button>
                <button
                  onClick={() => triggerPushNotification('doctor')}
                  className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200/60 text-center transition-all cursor-pointer"
                >
                  📅 Doctor Visit
                </button>
                <button
                  onClick={() => triggerPushNotification('water')}
                  className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 text-xs font-semibold border border-sky-200/60 text-center transition-all cursor-pointer"
                >
                  💧 Hydration
                </button>
              </div>
            </div>

            {/* Apple Health / Health Connect Integration */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-500" />
                  {deviceType === 'ios' ? 'Apple HealthKit' : 'Android Health Connect'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                  Connected
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Synchronizing background pedometer steps ({latestJournal.steps} steps), resting heart rate (70 bpm), and sleep analysis from device sensors.
              </p>
              <button
                onClick={() => {
                  setHealthKitSynced(true);
                  triggerPushNotification('water');
                }}
                className="w-full py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-600 hover:border-teal-500 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
                <span>Sync Native Sensor Metrics</span>
              </button>
            </div>

            {/* Camera Report OCR Scanner Trigger */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/60 border border-teal-200/60 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-600" />
                <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  Camera-Based Medical Document Scanner
                </h4>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Uses the mobile device camera with real-time perspective correction and on-device OCR extraction.
              </p>
              <button
                onClick={() => setIsCameraScannerOpen(true)}
                className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Scan className="w-4 h-4" />
                <span>Launch Camera Scanner</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Phone Simulator Viewport */}
        <div className="lg:col-span-7 flex justify-center py-2">
          <div
            className={`relative w-[375px] h-[780px] bg-slate-900 rounded-[52px] p-3 shadow-2xl border-[6px] transition-all select-none ${
              deviceType === 'ios'
                ? 'border-slate-800 ring-2 ring-slate-700'
                : 'border-zinc-800 ring-2 ring-zinc-700'
            }`}
          >
            {/* Phone Screen Container */}
            <div className="relative w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[42px] overflow-hidden flex flex-col font-sans text-slate-900 dark:text-slate-100">
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pt-3 text-[11px] font-bold text-slate-800 dark:text-slate-200">
                <span>9:41</span>
                {deviceType === 'ios' ? (
                  /* Dynamic Island Pill */
                  <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[9px] text-white font-medium">CareVista</span>
                  </div>
                ) : (
                  /* Android Camera Punch Hole */
                  <div className="w-3.5 h-3.5 bg-black rounded-full" />
                )}
                <div className="flex items-center gap-1.5 text-xs">
                  {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-500" /> : <Wifi className="w-3.5 h-3.5" />}
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Push Notification Banner Overlay */}
              {activeBanner && (
                <div className="absolute top-12 left-3 right-3 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 flex items-start gap-2.5 animate-fadeIn">
                  <div className="p-1.5 bg-teal-500 text-white rounded-xl shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {activeBanner.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {activeBanner.body}
                    </p>
                  </div>
                  <button onClick={() => setActiveBanner(null)} className="text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Biometric Lock Screen Overlay */}
              {isLocked ? (
                <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                    <Shield className="w-8 h-8 animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">CareVista Biometric Lock</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {deviceType === 'ios' ? 'Face ID Required' : 'Fingerprint Sensor Authentication'}
                    </p>
                  </div>

                  <button
                    onClick={handleBiometricAuth}
                    disabled={isScanningBiometric}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl text-xs font-bold shadow-lg cursor-pointer"
                  >
                    {isScanningBiometric ? 'Verifying Biometrics...' : 'Authenticate & Unlock'}
                  </button>
                </div>
              ) : null}

              {/* Camera Scanner Viewfinder Modal */}
              {isCameraScannerOpen ? (
                <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between pt-8 px-2">
                    <span className="text-xs font-bold tracking-wide">DOCUMENT SCANNER</span>
                    <button onClick={() => setIsCameraScannerOpen(false)} className="text-white">
                      ✕
                    </button>
                  </div>

                  {/* Viewfinder Target Frame */}
                  <div className="relative flex-1 mx-2 my-6 border-2 border-teal-400/80 rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-slate-900/60">
                    <div className="absolute inset-0 border border-teal-500/40 border-dashed m-3 rounded-xl" />
                    <Scan className="w-12 h-12 text-teal-400 animate-pulse" />
                    <span className="text-[11px] font-semibold text-teal-200 mt-3 px-3 py-1 bg-black/60 rounded-full">
                      Align Medical Report within Frame
                    </span>
                  </div>

                  {/* Shutter Button */}
                  <div className="flex items-center justify-around pb-6">
                    <button
                      onClick={handleCaptureCameraReport}
                      className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-teal-500 cursor-pointer shadow-lg active:scale-95 transition-transform"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Screen Body Content */}
              <div className="flex-1 overflow-y-auto pt-14 pb-20 px-4 space-y-4">
                {/* Mobile Screen 1: Home Dashboard */}
                {mobileTab === 'home' && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Header bar inside app */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <DoctorAvatar className="w-9 h-9" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">CareVista Mobile</p>
                          <h4 className="text-sm font-extrabold">{userProfile.fullName}</h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                        {userProfile.bloodGroup} Blood
                      </span>
                    </div>

                    {/* Vitals Quick Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</span>
                        <p className="text-base font-black text-rose-500 mt-0.5">
                          {latestJournal.systolicBP}/{latestJournal.diastolicBP}
                        </p>
                        <span className="text-[9px] text-slate-400">Optimal (mmHg)</span>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Steps</span>
                        <p className="text-base font-black text-teal-500 mt-0.5">
                          {latestJournal.steps.toLocaleString()}
                        </p>
                        <span className="text-[9px] text-slate-400">HealthKit Synced</span>
                      </div>
                    </div>

                    {/* Active Concerns Card */}
                    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Active Health Concern
                        </span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                          {healthProblems[0]?.severity}/10
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {healthProblems[0]?.name}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {healthProblems[0]?.aiGuidance?.selfCare[0]}
                      </p>
                    </div>

                    {/* Today's Medication Reminder Pill */}
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800/80 p-3.5 rounded-2xl border border-blue-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Medication</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Atorvastatin 10mg</p>
                        <span className="text-[10px] text-slate-400">Bedtime dose</span>
                      </div>
                      <button
                        onClick={() => logMedicationDose('med-01', 'bedtime', 'taken')}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Take ✓
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Screen 2: Interactive Body Region */}
                {mobileTab === 'body' && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Mobile Anatomical Tap Selector
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['head', 'chest', 'abdomen', 'back', 'arms', 'legs'].map((b) => (
                        <button
                          key={b}
                          onClick={() => setSelectedMobileRegion(b)}
                          className={`p-3 rounded-2xl text-left border capitalize font-bold text-xs transition-all ${
                            selectedMobileRegion === b
                              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {b} Region
                        </button>
                      ))}
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold text-teal-600 uppercase">Triage Check:</span>
                      <p className="text-xs font-bold capitalize">{selectedMobileRegion} Region Selected</p>
                      <p className="text-[11px] text-slate-500">
                        Check for localized inflammation, radiating soreness, or acute discomfort.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Screen 3: AI Chat Copilot */}
                {mobileTab === 'chat' && (
                  <div className="space-y-3 animate-fadeIn flex flex-col h-[520px]">
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                      {chatMessages.slice(-4).map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-teal-600 text-white ml-auto max-w-[85%]'
                              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 max-w-[85%]'
                          }`}
                        >
                          {msg.text.slice(0, 160)}...
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <input
                        type="text"
                        placeholder="Ask AI Copilot..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 text-xs bg-transparent border-0 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (chatInput.trim()) {
                            sendChatMessage(chatInput);
                            setChatInput('');
                          }
                        }}
                        className="p-1.5 bg-teal-600 text-white rounded-xl"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Screen 4: Medical Reports & Scanner */}
                {mobileTab === 'reports' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold">Medical Documents</h4>
                      <button
                        onClick={() => setIsCameraScannerOpen(true)}
                        className="px-2.5 py-1 bg-teal-600 text-white rounded-xl text-[11px] font-bold flex items-center gap-1"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Scan</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {medicalReports.map((rep) => (
                        <div
                          key={rep.id}
                          className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate max-w-[180px]">{rep.reportName}</span>
                            <span className="text-[10px] text-teal-600 font-semibold">{rep.testDate}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">{rep.hospital}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Screen 5: SOS Medical Pass */}
                {mobileTab === 'sos' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="bg-rose-50 dark:bg-rose-950/60 p-4 rounded-3xl border border-rose-300 dark:border-rose-900 space-y-2 text-center">
                      <ShieldAlert className="w-10 h-10 text-rose-600 mx-auto" />
                      <h3 className="text-sm font-black text-rose-900 dark:text-rose-100">
                        EMERGENCY MEDICAL PASS
                      </h3>
                      <p className="text-xs font-black text-rose-600">
                        BLOOD GROUP: {userProfile.bloodGroup}
                      </p>
                      <div className="text-[11px] text-rose-800 dark:text-rose-300 space-y-0.5 text-left pt-2 border-t border-rose-200">
                        <p><strong>Name:</strong> {userProfile.fullName}</p>
                        <p><strong>Allergies:</strong> {userProfile.allergies.join(', ')}</p>
                        <p><strong>Contact:</strong> {userProfile.emergencyContact.name} ({userProfile.emergencyContact.phone})</p>
                      </div>

                      <a
                        href={`tel:${userProfile.emergencyContact.phone}`}
                        className="block w-full py-2 bg-rose-600 text-white rounded-xl text-xs font-bold mt-2"
                      >
                        Call Emergency Contact
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Native Bottom Navigation Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 py-2.5 px-4 flex items-center justify-around text-[10px] font-bold">
                <button
                  onClick={() => setMobileTab('home')}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${mobileTab === 'home' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => setMobileTab('body')}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${mobileTab === 'body' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`}
                >
                  <User className="w-4 h-4" />
                  <span>Body</span>
                </button>

                <button
                  onClick={() => setMobileTab('chat')}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${mobileTab === 'chat' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Copilot</span>
                </button>

                <button
                  onClick={() => setMobileTab('reports')}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${mobileTab === 'reports' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </button>

                <button
                  onClick={() => setMobileTab('sos')}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${mobileTab === 'sos' ? 'text-rose-600' : 'text-slate-400'}`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>SOS</span>
                </button>
              </div>

              {/* iOS Home Bar Indicator */}
              {deviceType === 'ios' && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
