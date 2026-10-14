'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Activity,
  FileText,
  Stethoscope,
  Heart,
  Eye,
  Sliders,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Grid,
  Monitor
} from 'lucide-react';

export interface VideoShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  videoSrc: string;
  posterSrc: string;
  durationSec: number;
  description: string;
  highlights: string[];
  hudTelemetry: {
    label: string;
    value: string;
    unit?: string;
    flag?: 'normal' | 'outlier' | 'sync';
  }[];
}

export const CLINICAL_VIDEOS: VideoShowcaseItem[] = [
  {
    id: 'ambulance',
    title: '24/7 Rapid Emergency Mobile ICU Ambulance Dispatch (HD)',
    subtitle: 'High-speed emergency vehicle telemetry, alternating strobe beacons & live GPS radar',
    badge: '★ 24/7 Ambulance Dispatch',
    videoSrc: '/videos/ambulance_service_anim.webp',
    posterSrc: '/images/ambulance_service_hd.jpg',
    durationSec: 12,
    description: 'High-speed Mobile ICU Ambulance rushing with alternating red and blue LED strobe beacons, live GPS radar route locked to Apollo Metropolitan Trauma Center, in-transit telemetry streaming, and direct contact line 1800 990 880.',
    highlights: [
      'Alternating red and blue emergency beacon strobe flares with dynamic road reflections',
      'Live GPS satellite radar tracker HUD with real-time ETA countdown and vehicle speed (84 km/h)',
      'Onboard Advanced Life Support (ALS) monitoring: Ventilator, Defibrillator & Direct Helpline 1800 990 880'
    ],
    hudTelemetry: [
      { label: 'UNIT DISPATCH', value: 'Mobile ICU 07', unit: 'ALS Fleet', flag: 'sync' },
      { label: 'RESPONSE SPEED', value: '84', unit: 'KM/H Active', flag: 'normal' },
      { label: 'ARRIVAL ETA', value: '3m 45s', unit: 'Guaranteed', flag: 'normal' },
      { label: 'ONBOARD ICU', value: 'Active', unit: 'Ventilator OK', flag: 'normal' },
      { label: 'GPS RADAR', value: 'Locked', unit: 'Satellite', flag: 'sync' },
      { label: 'EMERGENCY LINE', value: '1800 990 880', unit: 'Toll-Free', flag: 'outlier' }
    ]
  },
  {
    id: 'brain_body_checkup',
    title: 'Dual Cranial Brain Scan & Total Body Checkup (HD Video)',
    subtitle: 'Simultaneous 3D cerebral neural mapping, EEG waveforms & full anatomical diagnostics',
    badge: '★ Brain Scan & Body Checkup',
    videoSrc: '/videos/brain_body_checkup_anim.webp',
    posterSrc: '/images/body_brain_scan.jpg',
    durationSec: 14,
    description: 'High-definition dual-panel clinical console showcasing real-time cerebral cortex brain scan with neural synapse firing and EEG telemetry alongside a comprehensive total body anatomical checkup sweep verifying heart, lungs, vascular integrity, and vital signs.',
    highlights: [
      'Simultaneous 3D cerebral brain scan with live synaptic spark nodes and EEG frequency telemetry',
      'Full-body biometric anatomical laser sweep with organ targeting (Cranial, Cardiac, Pulmonary, Hepatic, Renal)',
      'Real-time clinical diagnostic HUD: Nominal Status 99.8%, BP 118/78, HR 74 bpm, SpO2 99%'
    ],
    hudTelemetry: [
      { label: 'CEREBRAL SCAN', value: '99.8%', unit: 'Active Synapses', flag: 'normal' },
      { label: 'BODY CHECKUP', value: '100%', unit: 'All Organs OK', flag: 'normal' },
      { label: 'HEART RATE', value: '74', unit: 'BPM Normal', flag: 'normal' },
      { label: 'BLOOD PRESSURE', value: '118/78', unit: 'mmHg Optimal', flag: 'normal' },
      { label: 'EEG RHYTHM', value: 'Gamma / Alpha', unit: 'Synchronized', flag: 'sync' },
      { label: 'DIAGNOSTIC STATUS', value: 'Nominal', unit: 'Verified', flag: 'sync' }
    ]
  },
  {
    id: 'total_body_scan',
    title: '3D Full-Body Volumetric Hologram & Organ Scanner (HD)',
    subtitle: 'Head-to-toe anatomical diagnostics with multi-organ telemetry & outlier tracking',
    badge: '★ Flagship Total Body Scan',
    videoSrc: '/videos/total_body_scan_anim.webp',
    posterSrc: '/images/total_body_scan_hd.jpg',
    durationSec: 15,
    description: 'Ultra-HD 3D holographic medical scan displaying a standing translucent human anatomy matrix. A sweeping vertical volumetric laser ring reconstructs organs in real time, detecting Cerebrum neural activity, Cardiac lead vectors, Spinal alignment, and flagging the Fasting Glucose 145 mg/dL metabolic outlier.',
    highlights: [
      'Continuous vertical laser slice sweeping from cranial vault to lower extremities',
      'Multi-organ lock-on reticles: Cerebrum (99.4%), Cardiac Vector (72 BPM), Metabolic Flag (145 mg/dL)',
      'Integrated laboratory telemetry HUD with live Lead II ECG pulse and progress counter'
    ],
    hudTelemetry: [
      { label: 'SCAN SCOPE', value: 'Total Body', unit: 'Volumetric', flag: 'sync' },
      { label: 'CEREBRUM', value: '99.4%', unit: 'Synaptic', flag: 'normal' },
      { label: 'HEART RATE', value: '72', unit: 'BPM • Lead II', flag: 'normal' },
      { label: 'METABOLIC FLAG', value: '145', unit: 'mg/dL Outlier', flag: 'outlier' },
      { label: 'SPINAL CORD', value: 'Aligned', unit: 'Vertebral', flag: 'normal' },
      { label: 'SPO2', value: '98%', unit: 'Arterial', flag: 'normal' }
    ]
  },
  {
    id: 'hologram',
    title: '3D Holographic Physiological & Biometric Telemetry (HD)',
    subtitle: 'Real-time physiological telemetry, anatomical mapping, and organ dissection',
    badge: 'Holographic Vision (HD)',
    videoSrc: '/videos/hologram_scan_anim.webp',
    posterSrc: '/images/hero_hologram_hd.png',
    durationSec: 10,
    description: 'High-definition 3D holographic rendering of Rajesh Sharma’s physiological body matrix. Features animated cyan laser scanlines, rhythmic cardiac vector pulses, and real-time biometric synchrony.',
    highlights: [
      'Sweeping 360-degree laser matrix tracking full-body vitals',
      'Continuous cardiac lead rhythm with real-time vector oscillation',
      'Targeted anatomical reticles on cervical, thoracic, and abdominal regions'
    ],
    hudTelemetry: [
      { label: 'HEART RATE', value: '72', unit: 'BPM', flag: 'normal' },
      { label: 'BLOOD GLUCOSE', value: '98', unit: 'mg/dL', flag: 'normal' },
      { label: 'BLOOD OXYGEN', value: '99%', unit: 'SpO2', flag: 'normal' },
      { label: 'AI SYNC', value: '100%', unit: 'Zero Guard', flag: 'sync' }
    ]
  },
  {
    id: 'ocr',
    title: 'Multimodal Laser OCR & Outlier Detection Engine',
    subtitle: 'Automated prescription parsing, confidence scoring, and outlier alerting',
    badge: 'Multimodal OCR',
    videoSrc: '/videos/ocr_scanner_anim.webp',
    posterSrc: '/images/ocr_scanner_hd.png',
    durationSec: 8,
    description: 'High-speed diagnostic scanner sweeping across Apollo laboratory panels and prescriptions. Locks bounding boxes in real time, flags the Fasting Glucose 145 mg/dL outlier in pulsing amber-red, and reaches 94.8% confirmed confidence.',
    highlights: [
      'Dynamic vertical laser sweep bar extracting unstructured laboratory text',
      'Real-time red alert bounding box over Fasting Blood Glucose (145 mg/dL)',
      'Instant extraction of Metformin 500mg BID and Atorvastatin 20mg QHS'
    ],
    hudTelemetry: [
      { label: 'SCAN CONFIDENCE', value: '94.8%', unit: 'Verified', flag: 'sync' },
      { label: 'OUTLIER DETECTED', value: '145', unit: 'mg/dL (Ref: 70-100)', flag: 'outlier' },
      { label: 'MEDICATIONS', value: '2', unit: 'Reconciled', flag: 'normal' },
      { label: 'DOC TYPE', value: 'Apollo Lab', unit: 'Metabolic', flag: 'sync' }
    ]
  },
  {
    id: 'doctor',
    title: 'Doctor Consultation Preparation & Trajectory Synthesis',
    subtitle: 'Automated 6-month glycemic trajectory synthesis & clinical briefing',
    badge: 'Clinical Brief',
    videoSrc: '/videos/doctor_consultation_anim.webp',
    posterSrc: '/images/doctor_consultation_hd.png',
    durationSec: 12,
    description: 'Demonstrates automated clinical brief compilation for Dr. Ananya Reddy. Synthesizes a 6-month glycemic curve showing trending from 145 down to 138 mg/dL, verifies Penicillin & Sulfa allergy flags, and pre-populates key clinical questions.',
    highlights: [
      'Dynamic glycemic trajectory line showing 145 -> 142 -> 140 -> 138 mg/dL progression',
      'Active allergy flag verification for Penicillin & Sulfa electronic EHR tags',
      'Pre-formatted one-page printable consultation brief ready for clinical review'
    ],
    hudTelemetry: [
      { label: 'GLYCEMIC TREND', value: '145 → 138', unit: 'mg/dL (6 mos)', flag: 'normal' },
      { label: 'CONSULTANT', value: 'Dr. Ananya Reddy', unit: 'Endocrine', flag: 'sync' },
      { label: 'CRITICAL ALLERGIES', value: 'Penicillin, Sulfa', unit: 'Flagged', flag: 'outlier' },
      { label: 'STATUS', value: 'Ready to Print', unit: 'Brief OK', flag: 'sync' }
    ]
  },
  {
    id: 'cardiac',
    title: 'Real-Time ICU Cardiac Telemetry & Sinus Rhythm Monitor',
    subtitle: 'Scrolling physiological waveform with multi-parameter diagnostic telemetry',
    badge: 'ICU Telemetry',
    videoSrc: '/videos/cardiac_ecg_anim.webp',
    posterSrc: '/images/cardiac_ecg_anim.webp',
    durationSec: 10,
    description: 'Standalone hospital-grade biometric ICU monitor showcasing Lead II ECG waveform generation, live sweeping cursor, real-time sinus rhythm calculations, and immediate clinical threshold notifications.',
    highlights: [
      'Continuous P-Q-R-S-T vector waveform sweeping at 25 mm/s diagnostic speed',
      'Multi-channel readouts for Heart Rate (72 bpm), SpO2 (99%), and Blood Pressure',
      'Visual alert banner highlighting active 145 mg/dL metabolic glucose outlier'
    ],
    hudTelemetry: [
      { label: 'RHYTHM', value: 'Normal Sinus', unit: 'Lead II', flag: 'normal' },
      { label: 'HEART RATE', value: '72', unit: 'BPM', flag: 'normal' },
      { label: 'BLOOD PRESSURE', value: '118/76', unit: 'mmHg', flag: 'normal' },
      { label: 'METABOLIC FLAG', value: 'FBS 145', unit: 'Alert', flag: 'outlier' }
    ]
  }
];

export const ClinicalVideoPlayer: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hudOverlay, setHudOverlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [viewMode, setViewMode] = useState<'cinema' | 'wall'>('cinema');

  const audioContextRef = useRef<AudioContext | null>(null);
  const activeVideo = CLINICAL_VIDEOS[activeVideoIndex];

  // Synthesize realistic medical monitor sound using Web Audio API
  const playTelemetryBeep = (freq = 880, duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio initialization errors
    }
  };

  // Timer simulation for playback progress with continuous auto-advance across all videos
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 100;
    const step = (100 / (activeVideo.durationSec * 10)) * playbackSpeed;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          if (soundEnabled) playTelemetryBeep(980, 0.1);
          if (autoAdvance) {
            // Automatically advance to the next video in continuous infinite loop
            setActiveVideoIndex(curr => (curr + 1) % CLINICAL_VIDEOS.length);
          }
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, activeVideo, playbackSpeed, soundEnabled, autoAdvance]);

  // Update current time seconds display
  useEffect(() => {
    const sec = Math.floor((progress / 100) * activeVideo.durationSec);
    setCurrentTimeSec(sec);

    // Subtle audio telemetry periodic beep at 25%, 50%, 75%
    if (soundEnabled && isPlaying) {
      if (Math.abs(progress - 25) < 1.5 || Math.abs(progress - 75) < 1.5) {
        playTelemetryBeep(750, 0.05);
      } else if (Math.abs(progress - 50) < 1.5) {
        playTelemetryBeep(1100, 0.08); // Outlier pulse beep
      }
    }
  }, [progress, activeVideo, soundEnabled, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && soundEnabled) playTelemetryBeep(660, 0.08);
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
    if (soundEnabled) playTelemetryBeep(880, 0.1);
  };

  const handleNextVideo = () => {
    setActiveVideoIndex(curr => (curr + 1) % CLINICAL_VIDEOS.length);
    setProgress(0);
    setIsPlaying(true);
    if (soundEnabled) playTelemetryBeep(880, 0.08);
  };

  const handlePrevVideo = () => {
    setActiveVideoIndex(curr => (curr - 1 + CLINICAL_VIDEOS.length) % CLINICAL_VIDEOS.length);
    setProgress(0);
    setIsPlaying(true);
    if (soundEnabled) playTelemetryBeep(720, 0.08);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
  };

  return (
    <div className="space-y-6">
      {/* Continuous Auto-Scroll & Multi-Channel Mode Control Header */}
      <div className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-teal-500/30 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
            <Repeat className={`w-4 h-4 ${autoAdvance && isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide uppercase text-teal-300">
                Continuous Multi-Video Feed ({activeVideoIndex + 1}/7)
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                autoAdvance ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${autoAdvance ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                <span>{autoAdvance ? 'Continuous Auto-Scroll Active' : 'Auto-Scroll Paused'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-1">
              Currently Streaming: <strong className="text-white">{activeVideo.title}</strong>
            </p>
          </div>
        </div>

        {/* Global Action Controls: Prev/Next, Auto-Scroll Toggle & View Mode */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          {/* Prev / Next buttons */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={handlePrevVideo}
              className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Previous Video Feed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <div className="h-4 w-px bg-slate-700" />
            <button
              type="button"
              onClick={handleNextVideo}
              className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Next Video Feed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto-Advance Toggle */}
          <button
            type="button"
            onClick={() => {
              setAutoAdvance(!autoAdvance);
              if (!autoAdvance && soundEnabled) playTelemetryBeep(980, 0.08);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              autoAdvance
                ? 'bg-teal-500/20 border-teal-400/50 text-teal-300 hover:bg-teal-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Continuous Infinite Video Looping"
          >
            <Repeat className="w-3 h-3" />
            <span>{autoAdvance ? 'Auto-Cycle ON' : 'Auto-Cycle OFF'}</span>
          </button>

          {/* View Mode Toggle: Cinema vs 7-Screen Wall */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('cinema')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'cinema'
                  ? 'bg-teal-500 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Cinema</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('wall')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'wall'
                  ? 'bg-teal-500 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>All 7 Live Wall</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Selector Channels (All 7 HD Clinical Videos with Live Animated Previews) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {CLINICAL_VIDEOS.map((vid, idx) => {
          const isActive = idx === activeVideoIndex;
          return (
            <button
              key={vid.id}
              type="button"
              onClick={() => {
                setActiveVideoIndex(idx);
                setProgress(0);
                setIsPlaying(true);
                if (soundEnabled) playTelemetryBeep(880, 0.08);
              }}
              className={`p-2 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden group ${
                isActive
                  ? 'bg-white dark:bg-slate-900 border-teal-500 dark:border-teal-400 shadow-lg ring-2 ring-teal-500/30'
                  : 'bg-white/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-teal-400/60 hover:shadow-md'
              }`}
            >
              {/* Animated Mini Video Screen */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image
                  src={vid.videoSrc}
                  alt={vid.title}
                  width={320}
                  height={200}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-85'
                  }`}
                  unoptimized // Continuous 60fps animated WebP playback across all 7 video cards
                />

                {/* Top status tag overlay */}
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs ${
                    isActive
                      ? 'bg-rose-600 text-white font-mono'
                      : 'bg-black/70 text-slate-300 backdrop-blur-xs font-mono'
                  }`}>
                    {isActive ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>LIVE NOW</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>FEED {idx + 1}</span>
                      </>
                    )}
                  </span>

                  <span className="text-[9px] font-mono font-bold bg-black/75 backdrop-blur-xs text-white px-1.5 py-0.5 rounded-md">
                    00:{vid.durationSec < 10 ? `0${vid.durationSec}` : vid.durationSec}
                  </span>
                </div>

                {/* Active progress bar along bottom of mini video */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 overflow-hidden">
                    <div
                      className="h-full bg-teal-400 transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Title & Badge */}
              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md inline-block truncate max-w-full ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {vid.badge}
                </span>
                <div className="font-extrabold text-[11px] text-slate-900 dark:text-white line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                  {vid.title}
                </div>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between text-[10px] font-semibold pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <span className={isActive ? 'text-teal-600 dark:text-teal-400 flex items-center gap-1 font-bold' : 'text-slate-400'}>
                  <Play className={`w-2.5 h-2.5 ${isActive ? 'fill-current' : ''}`} />
                  <span>{isActive ? 'Streaming' : 'Switch Feed'}</span>
                </span>
                <span className="text-slate-400 font-mono text-[9px]">{vid.durationSec}s</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Organ Target Jump Bar (When Full Body Scan is selected) */}
      {activeVideo.id === 'total_body_scan' && (
        <div className="p-3 rounded-2xl bg-teal-50/50 dark:bg-slate-900/70 border border-teal-200/70 dark:border-teal-900/50 flex items-center justify-between flex-wrap gap-2 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Interactive Organ Scanners:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => { setProgress(15); playTelemetryBeep(920, 0.08); }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold shrink-0 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              🧠 Cerebrum Scan (15%)
            </button>
            <button
              type="button"
              onClick={() => { setProgress(38); playTelemetryBeep(820, 0.08); }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold shrink-0 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              ❤️ Cardiopulmonary (38%)
            </button>
            <button
              type="button"
              onClick={() => { setProgress(55); playTelemetryBeep(1100, 0.1); }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold shrink-0 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              🧪 Glucose 145 Outlier (55%)
            </button>
            <button
              type="button"
              onClick={() => { setProgress(75); playTelemetryBeep(700, 0.08); }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold shrink-0 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              🦴 Spine & Skeleton (75%)
            </button>
          </div>
        </div>
      )}

      {/* Main Video Presentation Screen: Either Cinema Mode or 7-Channel Wall */}
      {viewMode === 'wall' ? (
        /* 7-Channel Multi-Screen Live Wall Mode */
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3 rounded-2xl bg-slate-900 border border-teal-500/40 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="font-extrabold uppercase tracking-wider text-teal-300">
                7-Channel Live Diagnostic Matrix Wall (Simultaneous 60fps Playback)
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
              Click any monitor to focus in Cinema Mode
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CLINICAL_VIDEOS.map((vid, idx) => {
              const isSelected = idx === activeVideoIndex;
              return (
                <div
                  key={vid.id}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`rounded-2xl overflow-hidden bg-slate-950 border transition-all cursor-pointer group hover:scale-[1.01] ${
                    isSelected
                      ? 'border-teal-400 ring-2 ring-teal-400/40 shadow-xl shadow-teal-500/20'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {/* Video Screen */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden">
                    <Image
                      src={vid.videoSrc}
                      alt={vid.title}
                      width={640}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />

                    {/* Channel overlay banner */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-mono text-white border border-white/10">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-rose-500 animate-ping' : 'bg-teal-400'}`} />
                      <span>CH 0{idx + 1}</span>
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-teal-500/90 text-white text-[9px] font-bold">
                      00:{vid.durationSec < 10 ? `0${vid.durationSec}` : vid.durationSec}
                    </div>

                    {/* HUD metrics preview */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded-lg bg-black/80 backdrop-blur-xs border border-white/10 text-[9px] font-mono text-slate-300">
                      <span className="truncate max-w-[150px] font-bold text-white">{vid.badge}</span>
                      <span className="text-teal-300">{isSelected ? 'ACTIVE FOCUS' : 'LIVE FEED'}</span>
                    </div>
                  </div>

                  {/* Channel Card Info */}
                  <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-1">
                    <div className="font-extrabold text-xs text-white line-clamp-1 group-hover:text-teal-300 transition-colors">
                      {vid.title}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {vid.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Single Cinema Screen Container */
        <div className={`relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'aspect-[16/9] max-h-[580px]'
        }`}>
          {/* Animated Video Canvas / Image */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Image
              src={activeVideo.videoSrc}
              alt={activeVideo.title}
              width={1376}
              height={768}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-85'}`}
              unoptimized // Allow raw animated WebP playback without Next.js static freezing
              priority
            />

            {/* CRT Scanline and Vignette Overlay (Toggleable) */}
            {hudOverlay && (
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]">
                {/* Animated HUD corner reticles */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-teal-400/80" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal-400/80" />
                <div className="absolute bottom-16 left-4 w-6 h-6 border-b-2 border-l-2 border-teal-400/80" />
                <div className="absolute bottom-16 right-4 w-6 h-6 border-b-2 border-r-2 border-teal-400/80" />

                {/* Sweeping radar beam indicator on upper right */}
                <div className="absolute top-4 right-16 flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-400/30 text-[10px] font-mono text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
                  <span>LIVE TELEMETRY STREAM</span>
                </div>
              </div>
            )}

            {/* Pause Watermark Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-16 h-16 rounded-full bg-teal-500/90 text-white flex items-center justify-center shadow-xl shadow-teal-500/40 hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Top In-Video Title Banner */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="truncate max-w-[280px] sm:max-w-md">{activeVideo.title}</span>
            </div>

            {/* Floating HUD Telemetry Chips across bottom */}
            <div className="absolute bottom-14 left-4 right-4 hidden sm:flex items-center gap-2 overflow-x-auto pb-1 pointer-events-none">
              {activeVideo.hudTelemetry.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-xl text-[10px] font-mono backdrop-blur-md border shadow-sm shrink-0 ${
                    item.flag === 'outlier'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                      : item.flag === 'sync'
                      ? 'bg-teal-950/80 text-teal-300 border-teal-500/40'
                      : 'bg-slate-900/80 text-slate-200 border-slate-700/60'
                  }`}
                >
                  <span className="text-slate-400 mr-1.5">{item.label}:</span>
                  <strong className="font-extrabold">{item.value}</strong>
                  {item.unit && <span className="text-slate-400 ml-1">({item.unit})</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Video Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 sm:p-3 flex flex-col gap-1.5 z-20">
            {/* Timeline Scrubber Bar */}
            <div className="flex items-center gap-2 w-full">
              <span className="text-[10px] font-mono text-teal-300 shrink-0">
                00:{currentTimeSec < 10 ? `0${currentTimeSec}` : currentTimeSec}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleScrub}
                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                00:{activeVideo.durationSec < 10 ? `0${activeVideo.durationSec}` : activeVideo.durationSec}
              </span>
            </div>

            {/* Button Controls Bar */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Prev Video Button */}
                <button
                  type="button"
                  onClick={handlePrevVideo}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Video Channel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-xl bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                </button>

                {/* Next Video Button */}
                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Video Channel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Restart */}
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  title="Restart Current Video"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Sound Telemetry Synthesizer Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    if (!soundEnabled) playTelemetryBeep(880, 0.1);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-[11px] font-semibold transition-all cursor-pointer ${
                    soundEnabled
                      ? 'bg-teal-950/80 border-teal-500 text-teal-300 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Medical Telemetry Sound Synthesizer"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-teal-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{soundEnabled ? 'Telemetry Audio ON' : 'Audio OFF'}</span>
                </button>

                {/* HUD Scanline Overlay Toggle */}
                <button
                  type="button"
                  onClick={() => setHudOverlay(!hudOverlay)}
                  className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-[11px] font-semibold transition-all cursor-pointer ${
                    hudOverlay
                      ? 'bg-slate-800 border-teal-500/50 text-teal-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle HUD Reticles and Scanlines"
                >
                  <Sliders className="w-3 h-3" />
                  <span className="hidden sm:inline">HUD Matrix</span>
                </button>
              </div>

              {/* Right Controls: Channel Indicator, Speed Selector and Fullscreen */}
              <div className="flex items-center gap-2">
                {/* Active channel indicator */}
                <span className="text-[10px] font-mono text-teal-300 hidden md:inline bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                  CH {activeVideoIndex + 1}/{CLINICAL_VIDEOS.length}
                </span>

                {/* Playback speed selector */}
                <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800 text-[10px] font-bold">
                  {[0.5, 1.0, 2.0].map(speed => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                        playbackSpeed === speed
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Fullscreen Expand */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Cinema Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Details & Clinical Findings Breakdown Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Active Video Analysis
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white pt-1">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeVideo.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full 60fps Loop Sync</span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {activeVideo.description}
        </p>

        {/* 3 Key Highlights List */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Key Animation Innovations:
          </div>
          {activeVideo.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-teal-500 font-bold">•</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
