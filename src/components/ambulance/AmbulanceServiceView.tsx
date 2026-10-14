'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useHealth } from '@/context/HealthContext';
import {
  ShieldAlert,
  PhoneCall,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Heart,
  Activity,
  User,
  Radio,
  Volume2,
  VolumeX,
  ArrowRight,
  Crosshair,
  Navigation,
  FileText,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export const AmbulanceServiceView: React.FC = () => {
  const { setActiveSection } = useHealth();

  // Booking & Dispatch state
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState<'icu' | 'bls' | 'cardiac' | 'trauma'>('icu');
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'searching' | 'dispatched' | 'arrived'>('idle');
  const [etaSeconds, setEtaSeconds] = useState(245); // ~4 mins
  const [mediaMode, setMediaMode] = useState<'video' | 'photo'>('video');
  const [patientCondition, setPatientCondition] = useState<'conscious' | 'unconscious' | 'bleeding' | 'cardiac'>('cardiac');
  const [oxygenRequired, setOxygenRequired] = useState(true);
  const [ventilatorRequired, setVentilatorRequired] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cprMetronomeActive, setCprMetronomeActive] = useState(false);

  // Audio Context Ref for Siren & Metronome beeps
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const playSirenBeep = (freq = 880) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  // Timer simulation when dispatched
  useEffect(() => {
    let interval: any = null;
    if (dispatchStatus === 'dispatched' && etaSeconds > 0) {
      interval = setInterval(() => {
        setEtaSeconds(prev => {
          if (prev <= 1) {
            setDispatchStatus('arrived');
            return 0;
          }
          if (prev % 3 === 0 && soundEnabled) {
            playSirenBeep(prev % 6 === 0 ? 960 : 720);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatchStatus, etaSeconds, soundEnabled]);

  // Handle Book Ambulance
  const handleDispatchAmbulance = () => {
    setDispatchStatus('searching');
    setTimeout(() => {
      setDispatchStatus('dispatched');
      setEtaSeconds(210); // 3m 30s
    }, 1200);
  };

  const ambulanceTypes = [
    {
      id: 'icu',
      title: 'Mobile ICU / Advanced Life Support (ALS)',
      tag: 'Most Recommended for Critical Emergencies',
      eta: '3 - 5 Mins',
      price: 'Free with Health ID • Zero Surge',
      features: ['In-transit Invasive Ventilator', '12-Lead Defibrillator & Monitor', 'Critical Care Paramedic on board', 'Emergency Intubation Kit'],
      badgeColor: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
    },
    {
      id: 'cardiac',
      title: 'Cardiac & Neurological Emergency Unit',
      tag: 'For Heart Attack & Stroke Symptoms',
      eta: '4 - 6 Mins',
      price: 'Priority Insurance Covered',
      features: ['Continuous ECG Telemetry to ER', 'Thrombolysis Ready Equipment', 'Stroke Protocol Rapid Routing', 'Direct ER Bed Pre-allocation'],
      badgeColor: 'border-red-500/50 bg-red-950/40 text-red-300'
    },
    {
      id: 'trauma',
      title: 'Trauma & Injured Persons Response',
      tag: 'For Accidents, Wounds & Fractures',
      eta: '4 - 7 Mins',
      price: 'Direct Hospital Evacuation',
      features: ['Orthopedic Spine Boards & Splints', 'Sterile Trauma Dressing Unit', 'Pressure Hemorrhage Control', 'Direct Triage Link to 1800 990 880'],
      badgeColor: 'border-amber-500/50 bg-amber-950/40 text-amber-300'
    },
    {
      id: 'bls',
      title: 'Basic Life Support (BLS) Ambulance',
      tag: 'For Stable Transfers & Mild Symptoms',
      eta: '3 - 5 Mins',
      price: 'Standard Dispatch',
      features: ['High Flow Oxygen Therapy', 'Hydraulic Stretcher Bed', 'Emergency First Responder Crew', 'Vital Sign Spot Monitor'],
      badgeColor: 'border-teal-500/50 bg-teal-950/40 text-teal-300'
    }
  ];

  const mins = Math.floor(etaSeconds / 60);
  const secs = etaSeconds % 60;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Quick Breadcrumb & Return Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('landing')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>← Landing Showcase</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('dashboard')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Health Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('emergency')}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Emergency SOS Card</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active In-App Ambulance Service Console</span>
        </div>
      </div>

      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0A1628] to-slate-900 border border-teal-500/30 p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>24/7 RAPID AMBULANCE SERVICE • NATIONAL DISPATCH</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Emergency Ambulance Response System
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Instant mobile intensive care dispatch with live GPS tracking, in-transit telemetry streaming, and hospital trauma center pre-alert.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:1800990880"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Call Helpline: 1800 990 880 (Toll-Free)</span>
              </a>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-white/10 border-white/20 text-slate-300 hover:text-white'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Siren Audio ON' : 'Audio Muted'}</span>
              </button>
            </div>
          </div>

          {/* Quick Status Pill */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-black/60 border border-teal-400/30 backdrop-blur-md space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-mono">NEAREST DISPATCH BAY:</span>
              <span className="text-emerald-400 font-bold">0.8 KM AWAY</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-mono">AVAILABLE UNITS:</span>
              <span className="text-teal-300 font-bold">14 Active in Zone</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-mono">AVG RESPONSE TIME:</span>
              <span className="text-rose-400 font-black">3m 45s Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Booking & Dispatch Panel, Right Live Animated Ambulance Video & Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Ambulance Fleet & 1-Click Dispatch */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dispatch Status Card (when active) */}
          {dispatchStatus !== 'idle' && (
            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-rose-500 text-white shadow-2xl space-y-4 animate-scaleUp">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/50">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-wider text-rose-400 uppercase font-bold">
                      {dispatchStatus === 'searching' && 'LOCATING NEAREST UNIT...'}
                      {dispatchStatus === 'dispatched' && 'AMBULANCE DISPATCHED • EN ROUTE'}
                      {dispatchStatus === 'arrived' && 'AMBULANCE HAS ARRIVED AT LOCATION'}
                    </div>
                    <div className="text-xl font-black text-white">
                      Mobile ICU Unit: AP 09 TR 8802
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-mono">LIVE ETA</div>
                  <div className="text-2xl font-black text-rose-400 font-mono">
                    {dispatchStatus === 'arrived' ? 'ARRIVED' : `${mins}:${secs < 10 ? '0' : ''}${secs}`}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(10, ((210 - etaSeconds) / 210) * 100)}%` }}
                />
              </div>

              {/* Driver & Paramedic telemetry */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">DRIVER:</span>
                  <strong className="text-white">Rajesh Naik</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">PARAMEDIC:</span>
                  <strong className="text-white">Dr. K. Sharma</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">SPEED:</span>
                  <strong className="text-teal-300 font-mono">82 km/h</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">HOSPITAL:</span>
                  <strong className="text-rose-300 truncate">Apollo Trauma</strong>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="tel:1800990880"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Ambulance Driver Directly</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setDispatchStatus('idle');
                    setEtaSeconds(245);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Reset Dispatch
                </button>
              </div>
            </div>
          )}

          {/* Select Ambulance Fleet Type */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Select Emergency Ambulance Category</span>
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">All units equipped with GPS telemetry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ambulanceTypes.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAmbulanceType(item.id as any)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative group ${
                    selectedAmbulanceType === item.id
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 shadow-lg shadow-teal-500/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block font-mono">ETA</span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{item.eta}</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{item.price}</span>
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold group-hover:translate-x-0.5 transition-transform">
                      {selectedAmbulanceType === item.id ? '● Selected' : 'Select Unit →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Triage Questionnaire & Confirmation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
              Pre-Dispatch Patient Condition Check
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'cardiac', label: 'Chest Pain / Heart Attack' },
                { id: 'bleeding', label: 'Accident / Severe Bleeding' },
                { id: 'unconscious', label: 'Unconscious / Fainting' },
                { id: 'conscious', label: 'Severe Illness / Fever' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPatientCondition(opt.id as any)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    patientCondition === opt.id
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={oxygenRequired}
                  onChange={e => setOxygenRequired(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Oxygen Cylinder Required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ventilatorRequired}
                  onChange={e => setVentilatorRequired(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Ventilator Support Required</span>
              </label>
            </div>

            {/* Instant Book Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDispatchAmbulance}
                disabled={dispatchStatus === 'dispatched'}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:scale-98 text-white font-black text-base shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <ShieldAlert className="w-5 h-5 animate-bounce" />
                <span>CONFIRM & DISPATCH AMBULANCE NOW (ETA: 3-5 MINS)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Animated Video / HD Photo Showcase Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-slate-950 border border-teal-500/40 shadow-2xl overflow-hidden group">
            {/* Media Box with Toggle */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
              <Image
                key={mediaMode}
                src={mediaMode === 'video' ? '/videos/ambulance_service_anim.webp' : '/images/ambulance_service_hd.jpg'}
                alt="Ambulance Service Animation Video"
                width={1376}
                height={768}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized={mediaMode === 'video'}
                priority
              />

              {/* Mode Switcher Pill */}
              <div className="absolute top-3 left-3 z-20 flex items-center bg-black/80 backdrop-blur-md p-0.5 rounded-full border border-teal-400/40 text-[10px] font-bold shadow-lg">
                <button
                  type="button"
                  onClick={() => setMediaMode('video')}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                    mediaMode === 'video' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Live Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode('photo')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    mediaMode === 'photo' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>HD Photo</span>
                </button>
              </div>

              {/* Top-Right GPS Lock Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 border border-teal-400/40 text-[10px] font-mono text-teal-300 flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>GPS RADAR: LOCKED</span>
              </div>

              {/* Bottom HUD metrics */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-[10px] font-mono">
                <span className="text-rose-400 font-bold">SPEED: 84 KM/H</span>
                <span className="text-teal-300">DEST: APOLLO TRAUMA</span>
                <span className="text-emerald-400">ETA: ~4 MINS</span>
              </div>
            </div>

            {/* Showcase Details below Video */}
            <div className="p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CareVista Mobile ICU Fleet</span>
                </div>
                <span className="text-[11px] font-bold text-teal-400">100% Certified Crew</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Our animated emergency fleet is equipped with hospital-grade ICU ventilators, cardiac defibrillators, oxygen manifolds, and satellite telemetry broadcasting patient vitals directly to the receiving trauma surgeon.
              </p>

              {/* Bystander CPR Metronome Trainer */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Emergency CPR Rhythm Guide</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCprMetronomeActive(!cprMetronomeActive)}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                  >
                    {cprMetronomeActive ? 'Stop CPR Audio' : 'Start 110 BPM Guide'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Perform chest compressions hard and fast in the center of the chest at 100-120 beats per minute while awaiting ambulance arrival.
                </p>
              </div>

              {/* Direct Helpline Contact Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-teal-400/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-teal-400 uppercase font-mono tracking-wider">
                    24/7 TOLL-FREE HELPLINE
                  </div>
                  <div className="text-xl font-black text-white">
                    1800 990 880
                  </div>
                </div>
                <a
                  href="tel:1800990880"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
