'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useHealth } from '@/context/HealthContext';
import {
  Image as ImageIcon,
  Heart,
  Activity,
  Brain,
  Droplets,
  Pill,
  Sparkles,
  Camera,
  Eye,
  Info,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  Layers,
  ChevronRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface AnatomicalHotspot {
  id: string;
  name: string;
  coords: { x: number; y: number }; // percentages
  description: string;
  clinicalSignificance: string;
  relatedTests: string[];
}

export const VisualHealthAtlas: React.FC = () => {
  const { journalEntries, medications, logMedicationDose, setActiveSection } = useHealth();

  const [activeTab, setActiveTab] = useState<'atlas' | 'symptoms' | 'pillbox' | 'photos' | 'hydration'>('atlas');
  const [selectedAtlasOrgan, setSelectedAtlasOrgan] = useState<'cardio' | 'brain'>('cardio');
  const [activeHotspot, setActiveHotspot] = useState<AnatomicalHotspot | null>(null);

  // Blister pack capsule states
  const [poppedCapsules, setPoppedCapsules] = useState<number[]>([1, 2, 4]);

  // Symptom photos state
  const [symptomPhotos, setSymptomPhotos] = useState<{ id: string; title: string; date: string; category: string; url: string; notes: string }[]>([
    {
      id: 'p-1',
      title: 'Ergonomic Neck & Shoulder Tension',
      date: '2026-10-09',
      category: 'Cervical Spine',
      url: '/images/anatomy_brain.jpg',
      notes: 'Trapezius muscle tightness noted following 6-hour screen session.'
    },
    {
      id: 'p-2',
      title: 'Peak Flow & Inhaler Spirometry Check',
      date: '2026-10-11',
      category: 'Respiratory',
      url: '/images/anatomy_heart_lungs.jpg',
      notes: 'Post-cardio wheezing evaluated; responded well to Albuterol.'
    }
  ]);

  const latestJournal = journalEntries[0] || {
    hydrationGlasses: 6,
    sleepHours: 7.4
  };

  // Hotspots for Heart & Lungs
  const cardioHotspots: AnatomicalHotspot[] = [
    {
      id: 'aorta',
      name: 'Ascending Aorta & Arch',
      coords: { x: 54, y: 35 },
      description: 'The primary systemic artery distributing oxygenated blood from the left ventricle to the entire body.',
      clinicalSignificance: 'Subject to vascular strain in systemic hypertension. Evaluated for atherosclerotic plaque and aneurysms.',
      relatedTests: ['Echocardiogram', 'Lipid Panel', 'CT Angiography', 'Blood Pressure Monitoring']
    },
    {
      id: 'ventricle',
      name: 'Left Ventricle Myocardium',
      coords: { x: 60, y: 62 },
      description: 'The thickest cardiac chamber responsible for generating high-pressure arterial ejection.',
      clinicalSignificance: 'Ejection fraction (>55% normal) reflects pumping contractility. High BP causes ventricular hypertrophy.',
      relatedTests: ['ECG (Electrocardiogram)', 'Cardiac Stress Test', 'Echocardiogram']
    },
    {
      id: 'bronchi',
      name: 'Bronchial Tree & Bronchioles',
      coords: { x: 26, y: 44 },
      description: 'Branching airway conduction passages lined with smooth muscle and ciliated epithelium.',
      clinicalSignificance: 'Site of bronchoconstriction in asthma and bronchitis. Reversible airway reactivity responds to beta-2 agonists.',
      relatedTests: ['Spirometry (FEV1/FVC)', 'Peak Flow Monitoring', 'Chest X-Ray']
    },
    {
      id: 'pulmonary-artery',
      name: 'Pulmonary Artery',
      coords: { x: 57, y: 41 },
      description: 'Carries deoxygenated blood from the right ventricle into the alveolar capillary beds.',
      clinicalSignificance: 'Critical for gas exchange. Evaluated for pulmonary hypertension and embolism.',
      relatedTests: ['D-Dimer', 'Chest CT Angiography', 'Echocardiogram']
    }
  ];

  // Hotspots for Brain
  const brainHotspots: AnatomicalHotspot[] = [
    {
      id: 'frontal',
      name: 'Frontal Lobe & Executive Center',
      coords: { x: 22, y: 34 },
      description: 'Governs decision-making, emotional regulation, motor planning, and expressive speech (Broca area).',
      clinicalSignificance: 'Impacted by prolonged mental fatigue, sleep deprivation, and stress.',
      relatedTests: ['Neuropsychological Assessment', 'MRI Brain', 'Sleep EEG']
    },
    {
      id: 'temporal',
      name: 'Temporal Lobe & Memory Encoding',
      coords: { x: 44, y: 64 },
      description: 'Houses the hippocampus and auditory cortex; central to auditory processing and memory.',
      clinicalSignificance: 'Vulnerable to vascular insufficiency, migraine auras, and temporal arteritis.',
      relatedTests: ['EEG', 'Cognitive Screening', 'Brain MRI']
    },
    {
      id: 'synapse',
      name: 'Cerebral Cortex Synaptic Networks',
      coords: { x: 50, y: 38 },
      description: 'Densely interconnected neural synapses communicating via neurotransmitters (serotonin, dopamine, GABA).',
      clinicalSignificance: 'Maintains circadian homeostasis, mood stabilization, and cognitive resilience.',
      relatedTests: ['Polysomnography', 'Neurological Evaluation']
    },
    {
      id: 'cerebellum',
      name: 'Cerebellum & Coordination',
      coords: { x: 74, y: 74 },
      description: 'Coordinates fine motor balance, postural equilibrium, and vestibulo-ocular reflexes.',
      clinicalSignificance: 'Evaluated in symptoms of dizziness, vertigo, unsteadiness, or tension headache.',
      relatedTests: ['Romberg Balance Test', 'Cranial Nerve Exam', 'Brainstem MRI']
    }
  ];

  const currentHotspots = selectedAtlasOrgan === 'cardio' ? cardioHotspots : brainHotspots;

  // Visual symptom category tiles
  const visualCategories = [
    {
      id: 'head',
      title: 'Neurological & Headaches',
      icon: '🧠',
      region: 'Head & Neck',
      symptoms: 'Migraine, tension ache, vertigo, sinus pain',
      severity: 'Moderate',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-200 dark:border-purple-900',
      textColor: 'text-purple-700 dark:text-purple-300'
    },
    {
      id: 'chest',
      title: 'Cardiopulmonary & Chest',
      icon: '🫀',
      region: 'Chest & Heart',
      symptoms: 'Tightness, palpitations, exertion fatigue',
      severity: 'Attention',
      color: 'from-rose-500/20 to-red-500/10 border-rose-200 dark:border-rose-900',
      textColor: 'text-rose-700 dark:text-rose-300'
    },
    {
      id: 'lungs',
      title: 'Respiratory & Breathing',
      icon: '🫁',
      region: 'Lungs & Airways',
      symptoms: 'Wheezing, dry cough, cold air trigger',
      severity: 'Mild',
      color: 'from-teal-500/20 to-cyan-500/10 border-teal-200 dark:border-teal-900',
      textColor: 'text-teal-700 dark:text-teal-300'
    },
    {
      id: 'digestive',
      title: 'Digestive & Gastric',
      icon: '🫄',
      region: 'Abdomen & GI',
      symptoms: 'Acid reflux, cramping, post-meal burn',
      severity: 'Mild',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-200 dark:border-amber-900',
      textColor: 'text-amber-700 dark:text-amber-300'
    },
    {
      id: 'joints',
      title: 'Musculoskeletal & Spine',
      icon: '🦴',
      region: 'Spine & Joints',
      symptoms: 'Lumbar ache, shoulder strain, stiffness',
      severity: 'Low',
      color: 'from-blue-500/20 to-sky-500/10 border-blue-200 dark:border-blue-900',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    {
      id: 'skin',
      title: 'Dermatology & Skin',
      icon: '🧴',
      region: 'Cutaneous Layer',
      symptoms: 'Dryness, contact irritation, hives',
      severity: 'Low',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-200 dark:border-emerald-900',
      textColor: 'text-emerald-700 dark:text-emerald-300'
    }
  ];

  const handlePopCapsule = (id: number) => {
    if (poppedCapsules.includes(id)) {
      setPoppedCapsules(poppedCapsules.filter(c => c !== id));
    } else {
      setPoppedCapsules([...poppedCapsules, id]);
      logMedicationDose('med-01', 'bedtime', 'taken');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-teal-600" />
            <span>Picture-Oriented Health Atlas & Visual Diagnostics Center</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual medical diagrams with interactive clinical labels, 3D anatomical models, photo documentation, and pictorial pillbox.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('atlas')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'atlas' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs' : 'text-slate-500'
            }`}
          >
            🔬 3D Anatomy Atlas
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'symptoms' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs' : 'text-slate-500'
            }`}
          >
            🖼️ Symptom Tiles
          </button>
          <button
            onClick={() => setActiveTab('pillbox')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'pillbox' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs' : 'text-slate-500'
            }`}
          >
            💊 Visual Pillbox
          </button>
          <button
            onClick={() => setActiveTab('hydration')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'hydration' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs' : 'text-slate-500'
            }`}
          >
            💧 Water Level
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'photos' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs' : 'text-slate-500'
            }`}
          >
            📸 Photo Log
          </button>
        </div>
      </div>

      {/* TAB 1: 3D ANATOMY ATLAS WITH INTERACTIVE HOTSPOTS */}
      {activeTab === 'atlas' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Organ Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedAtlasOrgan('cardio');
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedAtlasOrgan === 'cardio'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Cardiopulmonary (Heart & Lungs)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAtlasOrgan('brain');
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedAtlasOrgan === 'brain'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Neurological (Brain & Synapses)</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Click glowing markers to view clinical pathology details
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Viewport with Hotspots */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col items-center">
              <div className="relative w-full max-w-[520px] aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 shadow-md">
                <Image
                  src={
                    selectedAtlasOrgan === 'cardio'
                      ? '/images/anatomy_heart_lungs.jpg'
                      : '/images/anatomy_brain.jpg'
                  }
                  alt="3D Anatomical Atlas Model"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Hotspot Markers Overlay */}
                {currentHotspots.map((spot) => {
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all z-10 ${
                        isActive ? 'scale-125' : 'hover:scale-110'
                      }`}
                    >
                      <span className="relative flex h-6 w-6">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            isActive ? 'bg-teal-400' : 'bg-emerald-400'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-6 w-6 border-2 border-white items-center justify-center text-[10px] font-bold text-white shadow-lg ${
                            isActive ? 'bg-teal-600' : 'bg-emerald-600'
                          }`}
                        >
                          +
                        </span>
                      </span>

                      {/* Tooltip on hover */}
                      <span className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                        {spot.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-center">
                <p className="text-[11px] text-slate-400">
                  CareVista High-Fidelity 3D Anatomical Atlas • Isolated Clinical Specimen
                </p>
              </div>
            </div>

            {/* Hotspot Clinical Dissection Drawer */}
            <div className="lg:col-span-5 space-y-4">
              {activeHotspot ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-teal-200 dark:border-teal-900 shadow-md space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        Anatomical Structure
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {activeHotspot.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Physiological Function:
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {activeHotspot.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                      Clinical Pathology & Risk Correlation:
                    </span>
                    <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900">
                      {activeHotspot.clinicalSignificance}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Diagnostic Screenings:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeHotspot.relatedTests.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-bold rounded-lg border border-teal-200/60 dark:border-teal-900"
                        >
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-teal-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Select any hotspot on the diagram
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Click any glowing green marker on the 3D anatomical illustration to explore detailed medical explanations and relevant lab tests.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PICTURE-BASED SYMPTOM TILES */}
      {activeTab === 'symptoms' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visualCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveSection('symptom-checker')}
                className={`bg-gradient-to-br ${cat.color} bg-white dark:bg-slate-900 rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4 group`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-xs group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border ${cat.textColor}`}>
                    {cat.region}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {cat.symptoms}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Severity: <strong>{cat.severity}</strong>
                  </span>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                    Check Symptoms <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL PILLBOX & BLISTER PACK */}
      {activeTab === 'pillbox' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-500" />
                  <span>Visual Daily Blister Pack Dosing Simulator</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click a capsule bubble to "pop" it from the blister foil pack and mark it as taken.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {poppedCapsules.length} / 8 Capsules Taken Today
                </span>
              </div>
            </div>

            {/* 3D-Styled Metallic Blister Pack */}
            <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-3xl border-4 border-slate-300 dark:border-slate-700 shadow-xl space-y-6">
              <div className="flex justify-between items-center text-xs font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 px-2">
                <span>MORNING REGIMEN (AM)</span>
                <span>BEDTIME REGIMEN (PM)</span>
              </div>

              {/* Blister Capsules Grid */}
              <div className="grid grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((capId) => {
                  const isPopped = poppedCapsules.includes(capId);

                  return (
                    <button
                      key={capId}
                      onClick={() => handlePopCapsule(capId)}
                      className={`relative aspect-[3/4] rounded-2xl flex flex-col items-center justify-center p-3 border-2 transition-all cursor-pointer select-none group ${
                        isPopped
                          ? 'bg-slate-300/40 dark:bg-slate-900/60 border-dashed border-slate-400 dark:border-slate-700 shadow-inner'
                          : 'bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-white/80 dark:border-slate-600 shadow-md hover:scale-105 active:scale-95'
                      }`}
                      title={isPopped ? 'Capsule already taken' : 'Click to pop capsule'}
                    >
                      {isPopped ? (
                        <div className="text-center space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                          <span className="text-[10px] font-bold text-slate-400">Taken</span>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <div className="w-6 h-10 rounded-full bg-gradient-to-b from-teal-400 to-blue-500 shadow-sm mx-auto flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 block">
                            {capId <= 4 ? 'Omega-3' : 'Atorvastatin'}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-center pt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Tip: Popping capsules updates your medication adherence records automatically.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VISUAL HYDRATION BOTTLE */}
      {activeTab === 'hydration' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 max-w-xl mx-auto text-center">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Droplets className="w-4 h-4" />
                Pictorial Hydration Level
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {latestJournal.hydrationGlasses * 250} mL of 2,000 mL Consumed
              </h3>
            </div>

            {/* Illustrated Water Bottle */}
            <div className="relative w-36 h-72 mx-auto border-4 border-sky-400/80 rounded-b-3xl rounded-t-xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 shadow-lg p-1">
              {/* Bottle Cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-sky-500 rounded-t-md" />

              {/* Water Volume Fill Animation */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-500 via-teal-400 to-sky-300 transition-all duration-700 ease-out"
                style={{ height: `${Math.min(100, (latestJournal.hydrationGlasses / 8) * 100)}%` }}
              >
                {/* Surface ripple */}
                <div className="w-full h-2 bg-white/40 animate-pulse" />
              </div>

              {/* Volume Markers */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 px-2 pointer-events-none text-[9px] font-bold text-slate-500 dark:text-slate-400">
                <span className="text-right">2,000 mL —</span>
                <span className="text-right">1,500 mL —</span>
                <span className="text-right">1,000 mL —</span>
                <span className="text-right">500 mL —</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {latestJournal.hydrationGlasses >= 8
                ? 'Outstanding! Daily hydration target of 8 glasses reached. 🎉'
                : `You are ${8 - latestJournal.hydrationGlasses} glasses away from your optimal 2-liter target today.`}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: SYMPTOM PHOTOGRAPH GALLERY */}
      {activeTab === 'photos' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Medical Safety Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 p-4 rounded-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Clinical Documentation Notice:</strong> Patient symptom photographs are preserved securely for personal documentation and clinical review during your doctor visits. In compliance with safety standards, CareVista AI does not provide definitive medical diagnoses of skin conditions, lesions, or rashes from photographic images.
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {symptomPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-[10px] font-bold">
                    {photo.category} • {photo.date}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {photo.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
