'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useHealth } from '@/context/HealthContext';
import {
  HeartIllustration,
  LungsIllustration,
  BrainIllustration,
  MedicalReportIllustration,
  PillsIllustration,
  DoctorAvatar,
  MoodFace
} from '@/components/illustrations/MedicalIllustrations';
import {
  Activity,
  Heart,
  Droplets,
  Moon,
  Footprints,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  FileText,
  ChevronRight,
  Pill,
  Image as ImageIcon
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    healthProblems,
    medicalReports,
    medications,
    appointments,
    journalEntries,
    wellnessGoals,
    setActiveSection,
    setActiveReportForAnalyzer,
    logMedicationDose
  } = useHealth();

  const [today, setToday] = useState('2026-10-14');
  const [formattedDate, setFormattedDate] = useState('Wednesday, Oct 14');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
    setFormattedDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
  }, []);

  const latestJournal = journalEntries[0] || {
    hydrationGlasses: 6,
    sleepHours: 7.4,
    sleepQuality: 'good',
    steps: 6420,
    mood: 'great',
    systolicBP: 119,
    diastolicBP: 77,
    bloodGlucose: 92,
    heartRate: 70
  };

  const activeProblems = healthProblems.filter(p => p.status === 'active' || p.status === 'improving');
  const recentReport = medicalReports[0];
  const upcomingAppointment = appointments.find(a => a.status === 'upcoming');

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Hero Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white p-6 sm:p-8 shadow-lg shadow-teal-700/10">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-8">
          <HeartIllustration className="w-64 h-64" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 bg-white/15 backdrop-blur-md p-2 rounded-2xl border border-white/20">
              <DoctorAvatar className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-teal-100">
                  Welcome to CareVista AI
                </span>
                <span className="text-xs text-teal-200">
                  {formattedDate}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Good day, {userProfile.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
                Your vitals and medication adherence are in good standing today. You have <strong>{activeProblems.length} active health concerns</strong> being monitored and <strong>{medications.length} active prescriptions</strong>.
              </p>
            </div>
          </div>

          {/* Quick Action Ribbon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveSection('problems')}
              className="px-4 py-2 bg-white text-teal-800 hover:bg-teal-50 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Log Problem</span>
            </button>
            <button
              onClick={() => setActiveSection('reports')}
              className="px-4 py-2 bg-teal-500/30 hover:bg-teal-500/40 text-white border border-white/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Report</span>
            </button>
            <button
              onClick={() => setActiveSection('ai-assistant')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Proactive Insight Ribbon */}
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 dark:from-slate-800/90 dark:to-slate-800/60 rounded-2xl p-4 sm:p-5 border border-teal-200/60 dark:border-slate-700 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-teal-500 text-white shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
              CareVista AI Clinical Observation
            </h4>
            <span className="text-[10px] bg-teal-200/60 dark:bg-teal-950 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded-full font-semibold">
              Today's Synthesis
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
            Your recorded blood pressure ({latestJournal.systolicBP || 119}/{latestJournal.diastolicBP || 77} mmHg) remains optimal. In your recent September Lipid Panel, LDL was borderline (134 mg/dL); continuing your nightly Atorvastatin and 30-min walking routine is positively maintaining vascular stability.
          </p>
        </div>
        <button
          onClick={() => setActiveSection('ai-assistant')}
          className="hidden sm:flex text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-900 items-center gap-1 shrink-0 self-center"
        >
          <span>Ask questions</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Daily Wellness Vitals Overview Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Daily Wellness Overview (Real User Logged Data)</span>
          </h3>
          <button
            onClick={() => setActiveSection('journal')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Log today's vitals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Blood Pressure */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Blood Pressure</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {latestJournal.systolicBP || 119}/{latestJournal.diastolicBP || 77}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">mmHg (Optimal)</span>
            </div>
          </div>

          {/* Heart Rate */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Resting Pulse</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {latestJournal.heartRate || 70}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">bpm (Healthy)</span>
            </div>
          </div>

          {/* Hydration */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Hydration</span>
              <Droplets className="w-4 h-4 text-sky-500" />
            </div>
            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {latestJournal.hydrationGlasses || 6} / 8
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">glasses (1.5L)</span>
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Sleep</span>
              <Moon className="w-4 h-4 text-purple-500" />
            </div>
            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {latestJournal.sleepHours || 7.4}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">hours (Good rest)</span>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Steps</span>
              <Footprints className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-3">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {(latestJournal.steps || 6420).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">steps taken</span>
            </div>
          </div>

          {/* Daily Mood */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Logged Mood</span>
              <MoodFace mood={latestJournal.mood || 'great'} className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <span className="text-base font-extrabold capitalize text-slate-900 dark:text-white">
                {latestJournal.mood || 'Great'}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">State of mind</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Health Concerns & Today's Meds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Health Concerns (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Active Health Concerns ({activeProblems.length})
              </h3>
            </div>
            <button
              onClick={() => setActiveSection('problems')}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeProblems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => setActiveSection('problems')}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-400 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                        {problem.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {problem.affectedBodyPart}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {problem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        problem.severity > 6
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : problem.severity > 3
                          ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                          : 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900'
                      }`}
                    >
                      Severity: {problem.severity}/10
                    </span>
                    <span className="text-xs capitalize px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
                      {problem.status}
                    </span>
                  </div>
                </div>

                {/* AI Guidance snippet */}
                {problem.aiGuidance && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">
                      <strong>AI Tip:</strong> {problem.aiGuidance.selfCare[0] || 'Safe self-care measures available'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick interactive body map trigger card */}
          <div
            onClick={() => setActiveSection('body-map')}
            className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-teal-200/50 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-600 text-white rounded-xl shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Have a new symptom or localized pain?
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Click to open the Interactive Human Body Map and pinpoint affected areas.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
              Explore Body Map <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Picture-Oriented Health Atlas Trigger Card */}
          <div
            onClick={() => setActiveSection('visual-atlas')}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-purple-200/60 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-xs border border-purple-200 dark:border-slate-600 shrink-0">
                <Image
                  src="/images/anatomy_heart_lungs.jpg"
                  alt="3D Visual Atlas Preview"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Picture-Oriented Health Atlas & 3D Models
                  </h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 uppercase">
                    Visual
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Interactive 3D anatomical organ models, pictorial symptom tiles, and visual blister pack.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1 shrink-0">
              Open Atlas <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Side: Medication Reminders & Appointments (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Medication Schedule */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Today's Medication Doses
                </h3>
              </div>
              <button
                onClick={() => setActiveSection('medications')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {medications.map((med) => {
                const todayLog = med.logs.find(l => l.date === today);
                const isTaken = todayLog?.status === 'taken';

                return (
                  <div
                    key={med.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isTaken ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'}`}>
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {med.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => logMedicationDose(med.id, med.timing[0] || 'morning', isTaken ? 'pending' : 'taken')}
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isTaken
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isTaken ? 'Taken' : 'Mark Taken'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Doctor Appointment */}
          {upcomingAppointment ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Upcoming Doctor Visit
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                  In {upcomingAppointment.date}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/50 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {upcomingAppointment.doctorName}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {upcomingAppointment.specialist} • {upcomingAppointment.clinic}
                </p>
                <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time: {upcomingAppointment.time} ({upcomingAppointment.locationType})</span>
                </div>
              </div>

              <button
                onClick={() => setActiveSection('appointments')}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Prepare Doctor Questions Checklist ({upcomingAppointment.questionsChecklist.length} points)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}

          {/* Recent Report Card */}
          {recentReport && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Latest Lab Report
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveReportForAnalyzer(recentReport);
                    setActiveSection('report-analyzer');
                  }}
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  Analyze with AI
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {recentReport.reportName}
                  </h4>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    {recentReport.testDate}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {recentReport.aiSummary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
