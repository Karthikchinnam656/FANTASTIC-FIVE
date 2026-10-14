'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  History,
  AlertCircle,
  FileText,
  Calendar,
  Pill,
  BookOpen,
  Filter,
  ChevronRight,
  Sparkles,
  Activity
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'problem' | 'report' | 'appointment' | 'medication' | 'journal';
  title: string;
  category: string;
  description: string;
  badge?: string;
  meta?: string;
}

export const HealthTimelineView: React.FC = () => {
  const {
    healthProblems,
    medicalReports,
    appointments,
    medications,
    journalEntries,
    setActiveSection,
    setActiveReportForAnalyzer
  } = useHealth();

  const [filterType, setFilterType] = useState<string>('all');

  // Synthesize unified chronological events
  const events: TimelineEvent[] = [];

  // 1. Health Problems
  healthProblems.forEach(p => {
    events.push({
      id: p.id,
      date: p.startingDate,
      type: 'problem',
      title: `Logged Health Concern: ${p.name}`,
      category: p.category,
      description: p.description,
      badge: `Severity ${p.severity}/10 • ${p.status}`,
      meta: p.affectedBodyPart
    });
  });

  // 2. Medical Reports
  medicalReports.forEach(r => {
    events.push({
      id: r.id,
      date: r.testDate,
      type: 'report',
      title: `Medical Test: ${r.reportName}`,
      category: r.reportType,
      description: r.aiSummary,
      badge: `${r.measurements.length} Biomarkers Extracted`,
      meta: r.hospital
    });
  });

  // 3. Appointments
  appointments.forEach(a => {
    events.push({
      id: a.id,
      date: a.date,
      type: 'appointment',
      title: `Doctor Consultation: ${a.doctorName}`,
      category: a.specialist,
      description: `Purpose: ${a.purpose} at ${a.clinic}`,
      badge: `${a.status.toUpperCase()} (${a.time})`,
      meta: a.locationType
    });
  });

  // 4. Medications
  medications.forEach(m => {
    events.push({
      id: m.id,
      date: m.startDate,
      type: 'medication',
      title: `Prescription Started: ${m.name} (${m.dosage})`,
      category: m.condition || 'Pharmacotherapy',
      description: m.instructions,
      badge: m.frequency,
      meta: m.prescribedBy
    });
  });

  // 5. Daily Journals
  journalEntries.forEach(j => {
    events.push({
      id: j.id,
      date: j.date,
      type: 'journal',
      title: `Daily Vitals Log: ${j.date}`,
      category: 'Daily Log',
      description: `BP: ${j.systolicBP || 120}/${j.diastolicBP || 80} mmHg, Rest: ${j.sleepHours} hrs, Steps: ${j.steps}, Mood: ${j.mood}`,
      badge: `Hydration ${j.hydrationGlasses}/8`,
      meta: j.nutritionSummary
    });
  });

  // Sort descending by date
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredEvents = events.filter(e => filterType === 'all' || e.type === filterType);

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'problem':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'report':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-blue-500" />;
      case 'journal':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
    }
  };

  const getTypeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'problem': return 'border-rose-400 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300';
      case 'report': return 'border-purple-400 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300';
      case 'appointment': return 'border-amber-400 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
      case 'medication': return 'border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
      case 'journal': return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-teal-600" />
            <span>Personal Health Journey Timeline</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Chronological log unifying medical visits, lab tests, symptom shifts, prescriptions, and daily check-ins.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'problem', label: 'Concerns' },
            { id: 'report', label: 'Reports' },
            { id: 'appointment', label: 'Visits' },
            { id: 'medication', label: 'Medications' },
            { id: 'journal', label: 'Journals' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === f.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 dark:border-slate-800 space-y-8 my-6">
        {filteredEvents.map((event) => (
          <div key={`${event.type}-${event.id}`} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-sm flex items-center justify-center">
              {getTypeIcon(event.type)}
            </div>

            {/* Event Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-300 transition-all space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    {event.date}
                  </span>
                </div>

                {event.badge && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
                    {event.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {event.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.description}
              </p>

              {event.meta && (
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
                  <span>Context: {event.meta}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">{event.category}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
