'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { BODY_REGIONS } from '@/components/bodymap/InteractiveBodyMap';
import {
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Activity,
  Plus
} from 'lucide-react';
import { COMMON_SYMPTOM_DICTIONARY } from '@/lib/aiEngine';

export const SymptomCheckerView: React.FC = () => {
  const { addHealthProblem, setActiveSection } = useHealth();

  const [step, setStep] = useState<number>(1);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('Head & Neck');
  const [primarySymptom, setPrimarySymptom] = useState<string>('Headache / Temple Pressure');
  const [duration, setDuration] = useState<string>('2-3 days');
  const [severity, setSeverity] = useState<number>(5);
  const [onset, setOnset] = useState<'gradual' | 'sudden' | 'constant'>('gradual');
  const [hasRedFlags, setHasRedFlags] = useState<boolean>(false);
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationComplete, setEvaluationComplete] = useState<boolean>(false);

  const region = Object.values(BODY_REGIONS).find(r => r.name === selectedBodyPart) || BODY_REGIONS.head;

  const handleNext = () => {
    if (step === 3) {
      setIsEvaluating(true);
      setTimeout(() => {
        setIsEvaluating(false);
        setEvaluationComplete(true);
        setStep(4);
      }, 1000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      setEvaluationComplete(false);
    }
  };

  const toggleAssociated = (symptom: string) => {
    setAssociatedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  // Determine Triage Level
  const getTriageLevel = () => {
    if (hasRedFlags || severity >= 9 || (onset === 'sudden' && severity >= 8)) {
      return {
        level: 'Emergency Evaluation (Immediate ER)',
        color: 'rose',
        icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
        action: 'Seek emergency medical evaluation at your nearest ER or call 911 / 112 immediately.'
      };
    }
    if (severity >= 6 || duration === 'more than 2 weeks') {
      return {
        level: 'Urgent Care / Physician Visit (Within 24-48 Hours)',
        color: 'amber',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        action: 'Schedule an evaluation with your primary physician or urgent care center this week.'
      };
    }
    return {
      level: 'Self-Care & Observational Monitoring',
      color: 'teal',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />,
      action: 'Safe home self-care is appropriate while observing any potential changes in severity.'
    };
  };

  const triageResult = getTriageLevel();

  const handleSaveAsProblem = () => {
    addHealthProblem({
      name: primarySymptom,
      category: region.category,
      affectedBodyPart: selectedBodyPart,
      symptoms: [primarySymptom, ...associatedSymptoms],
      severity,
      startingDate: new Date().toISOString().split('T')[0],
      frequency: onset === 'constant' ? 'continuous' : 'occasional',
      description: `Symptom checker triage evaluation: Duration: ${duration}, Onset: ${onset}. Triage classification: ${triageResult.level}.`
    });
    setActiveSection('problems');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2 pb-2">
        <span className="p-3 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl inline-block shadow-xs">
          <Stethoscope className="w-8 h-8" />
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Clinical Symptom Checker & Triage
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Guided 4-step medical assessment to help you understand symptom possibilities, screen for red flags, and determine appropriate care urgency.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-md mx-auto">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s
                  ? 'bg-teal-600 text-white shadow-sm ring-4 ring-teal-100 dark:ring-teal-950'
                  : step > s
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            {s < 4 && <div className={`w-8 sm:w-12 h-1 rounded-full ${step > s ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />}
          </div>
        ))}
      </div>

      {/* Wizard Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[420px] flex flex-col justify-between">
        {/* Step 1: Body Part & Primary Symptom */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Step 1 of 4: Anatomical Region
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Where is your symptom primarily located?
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.values(BODY_REGIONS).map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    setSelectedBodyPart(reg.name);
                    setPrimarySymptom(reg.commonSymptoms[0]);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedBodyPart === reg.name
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-300'
                  }`}
                >
                  <p className="text-xs font-bold">{reg.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{reg.category}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select your primary symptom in this area:
              </label>
              <div className="flex flex-wrap gap-2">
                {region.commonSymptoms.map((symp) => (
                  <button
                    key={symp}
                    onClick={() => setPrimarySymptom(symp)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      primarySymptom === symp
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                    }`}
                  >
                    {symp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Duration, Severity & Onset */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Step 2 of 4: Timeline & Intensity
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                How long have you experienced "{primarySymptom}" and how severe is it?
              </h3>
            </div>

            {/* Severity Slider */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Current Pain / Discomfort Severity
                </span>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {severity} / 10 ({severity > 6 ? 'Severe' : severity > 3 ? 'Moderate' : 'Mild'})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Duration of symptom:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Less than 24 hours', '1-3 days', '4-7 days', 'more than 2 weeks'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                      duration === d
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Onset Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                How did it start?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'gradual', label: 'Gradual / Slowly built up' },
                  { id: 'sudden', label: 'Sudden / Sudden spike' },
                  { id: 'constant', label: 'Constant / Waxes and wanes' }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOnset(o.id as any)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                      onset === o.id
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Red Flag Screening & Associated Symptoms */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Step 3 of 4: Safety & Red Flag Screening
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Screening for Urgent Warning Signs
              </h3>
            </div>

            {/* Red Flag Checklist Box */}
            <div className="bg-rose-50/80 dark:bg-rose-950/40 p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  Do you currently have ANY of these critical warning symptoms?
                </h4>
              </div>

              <div className="space-y-2">
                {region.redFlags.map((flag, idx) => (
                  <label key={idx} className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRedFlags}
                      onChange={(e) => setHasRedFlags(e.target.checked)}
                      className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-xs text-rose-800 dark:text-rose-300 font-medium">
                      {flag}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Associated Symptoms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Any other associated symptoms present? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {['Mild nausea', 'Dizziness', 'Fatigue / Low energy', 'Chills or mild fever', 'Loss of appetite', 'Muscle stiffness'].map((symp) => {
                  const isChecked = associatedSymptoms.includes(symp);
                  return (
                    <button
                      key={symp}
                      onClick={() => toggleAssociated(symp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isChecked
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {symp}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: AI Triage Evaluation Report */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Step 4 of 4: Clinical Triage Report
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                CareVista AI Triage Synthesis for "{primarySymptom}"
              </h3>
            </div>

            {/* Triage Urgency Level Banner */}
            <div
              className={`p-5 rounded-3xl border flex items-start gap-4 ${
                triageResult.color === 'rose'
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : triageResult.color === 'amber'
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-teal-50 dark:bg-teal-950/50 border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200'
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm shrink-0">
                {triageResult.icon}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Recommended Action Level:
                </span>
                <h4 className="text-base font-extrabold">{triageResult.level}</h4>
                <p className="text-xs leading-relaxed">{triageResult.action}</p>
              </div>
            </div>

            {/* Possibilities & Self-Care Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    What This Might Indicate (Possibilities)
                  </h5>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Symptoms located in the {selectedBodyPart} with {onset} onset over {duration} at severity {severity}/10 are often related to benign tension, environmental triggers, mild strain, or post-viral fatigue.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Safe Self-Care Steps
                  </h5>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Rest and maintain regular hydration</li>
                  <li>• Apply gentle warm or cool compress depending on comfort</li>
                  <li>• Avoid bright screens or heavy physical exertion</li>
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setStep(1);
                  setEvaluationComplete(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400"
              >
                Restart Symptom Checker
              </button>

              <button
                onClick={handleSaveAsProblem}
                className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Save to My Health Concerns</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        {step < 4 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{step === 3 ? 'Generate Triage Synthesis' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
