'use client';

import React, { useState, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import { DailyJournalEntry, MoodType } from '@/types/health';
import { MoodFace } from '@/components/illustrations/MedicalIllustrations';
import {
  BookOpen,
  Droplets,
  Moon,
  Footprints,
  Heart,
  Activity,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  Utensils
} from 'lucide-react';

export const DailyJournalView: React.FC = () => {
  const { journalEntries, addJournalEntry } = useHealth();

  const [date, setDate] = useState('2026-10-14');
  const todayEntry = journalEntries.find(j => j.date === date) || journalEntries[0];

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);
  const [hydration, setHydration] = useState(todayEntry?.hydrationGlasses || 6);
  const [sleepHours, setSleepHours] = useState(todayEntry?.sleepHours || 7.5);
  const [sleepQuality, setSleepQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>(todayEntry?.sleepQuality || 'good');
  const [steps, setSteps] = useState(todayEntry?.steps || 6500);
  const [mood, setMood] = useState<MoodType>(todayEntry?.mood || 'great');
  const [systolicBP, setSystolicBP] = useState(todayEntry?.systolicBP || 119);
  const [diastolicBP, setDiastolicBP] = useState(todayEntry?.diastolicBP || 77);
  const [bloodGlucose, setBloodGlucose] = useState(todayEntry?.bloodGlucose || 92);
  const [heartRate, setHeartRate] = useState(todayEntry?.heartRate || 70);
  const [nutrition, setNutrition] = useState(todayEntry?.nutritionSummary || '');
  const [symptomsNotes, setSymptomsNotes] = useState(todayEntry?.symptomsNotes || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry({
      date,
      hydrationGlasses: hydration,
      sleepHours,
      sleepQuality,
      steps,
      mood,
      systolicBP,
      diastolicBP,
      bloodGlucose,
      heartRate,
      nutritionSummary: nutrition,
      symptomsNotes
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Daily Health Journal & Vitals Log</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Record today's hydration, sleep quality, physical activity, emotional mood, and physiological vitals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Journal entry successfully logged for {date}!</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Hydration Tracker */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                Hydration (Target: 8 Glasses)
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {hydration} / 8 ({hydration * 250} ml)
              </span>
            </div>

            {/* Interactive glasses row */}
            <div className="grid grid-cols-8 gap-1.5 py-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setHydration(g === hydration ? g - 1 : g)}
                  className={`h-12 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    g <= hydration
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                  title={`Glass ${g} (250ml)`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold mt-1">{g}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setHydration(Math.max(0, hydration - 1))}
                className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                - 1 Glass
              </button>
              <button
                type="button"
                onClick={() => setHydration(hydration + 1)}
                className="text-xs font-semibold px-3 py-1 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-lg"
              >
                + 1 Glass
              </button>
            </div>
          </div>

          {/* Card 2: Sleep Hours & Quality */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase flex items-center gap-1.5">
                <Moon className="w-4 h-4" />
                Sleep Duration & Quality
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {sleepHours} Hours
              </span>
            </div>

            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full accent-purple-600"
            />

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">
                Perceived Sleep Quality:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['poor', 'fair', 'good', 'excellent'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setSleepQuality(q)}
                    className={`py-1.5 rounded-xl text-xs capitalize font-semibold border transition-all ${
                      sleepQuality === q
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Mood Picker */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Emotional State / Mood
              </span>
              <span className="text-xs font-black capitalize text-slate-900 dark:text-white">
                {mood.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 pt-1">
              {(['great', 'good', 'neutral', 'low', 'anxious', 'in_pain'] as MoodType[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`p-2 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                    mood === m
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 shadow-xs scale-105'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                  }`}
                  title={m}
                >
                  <MoodFace mood={m} className="w-8 h-8" />
                  <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-400 mt-1 capitalize truncate w-full text-center">
                    {m === 'in_pain' ? 'Pain' : m}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card 4: Blood Pressure */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              Blood Pressure Reading (mmHg)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">SYSTOLIC (Upper)</label>
                <input
                  type="number"
                  value={systolicBP}
                  onChange={(e) => setSystolicBP(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">DIASTOLIC (Lower)</label>
                <input
                  type="number"
                  value={diastolicBP}
                  onChange={(e) => setDiastolicBP(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Blood Glucose & Heart Rate */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Glycemic & Heart Rate
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">GLUCOSE (mg/dL)</label>
                <input
                  type="number"
                  value={bloodGlucose}
                  onChange={(e) => setBloodGlucose(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">HEART RATE (bpm)</label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Card 6: Daily Steps */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              <Footprints className="w-4 h-4" />
              Active Steps (Pedometery)
            </span>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">STEPS COUNT</label>
              <input
                type="number"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Nutrition and Symptom Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-500" />
              <span>Nutrition Summary for Today</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Oatmeal with blueberries, grilled chicken quinoa salad, salmon with sweet potato..."
              value={nutrition}
              onChange={(e) => setNutrition(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Daily Physical Observations & Notes</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Neck stiffness subsided after evening stretches. Felt energetic all afternoon."
              value={symptomsNotes}
              onChange={(e) => setSymptomsNotes(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Save Journal Entry for {date}
          </button>
        </div>
      </form>
    </div>
  );
};
