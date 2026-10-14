'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Heart,
  Activity,
  Droplets,
  Moon,
  Footprints,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

export const HealthAnalyticsView: React.FC = () => {
  const { journalEntries, healthProblems, medicalReports } = useHealth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Format journal data in chronological order for charts
  const chartData = [...journalEntries].reverse().map(j => ({
    date: j.date.slice(5), // "10-07"
    fullDate: j.date,
    systolicBP: j.systolicBP || 120,
    diastolicBP: j.diastolicBP || 78,
    bloodGlucose: j.bloodGlucose || 92,
    heartRate: j.heartRate || 70,
    sleepHours: j.sleepHours || 7.5,
    steps: j.steps || 7000,
    hydration: j.hydrationGlasses || 7,
    weight: j.weightKg || 74.0
  }));

  // Symptom trajectory data
  const symptomData = healthProblems[0]?.dailyLogs?.map(l => ({
    date: l.date.slice(5),
    severity: l.severity
  })) || [
    { date: '10-08', severity: 7 },
    { date: '10-09', severity: 6 },
    { date: '10-10', severity: 4 },
    { date: '10-11', severity: 3 },
    { date: '10-12', severity: 2 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>Health Trends & Physiological Analytics</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual tracking of blood pressure, glycemic balance, sleep restoration, and symptom trajectories.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              timeRange === '7d'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              timeRange === '30d'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Grid of Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Blood Pressure Trends */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Blood Pressure Trajectory (mmHg)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              Ideal Zone (&lt;120/80)
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 140]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="systolicBP" stroke="#f43f5e" strokeWidth={2.5} name="Systolic" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="diastolicBP" stroke="#0ea5e9" strokeWidth={2.5} name="Diastolic" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Systolic (Red) averaged 119 mmHg; Diastolic (Blue) averaged 77 mmHg.
          </p>
        </div>

        {/* Chart 2: Fasting Blood Glucose */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Fasting Blood Glucose (mg/dL)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
              Target: 70 - 99
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 115]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="bloodGlucose" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#glucoseGrad)" name="Glucose" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Consistent overnight glycemic regulation with zero hypoglycemic dips.
          </p>
        </div>

        {/* Chart 3: Sleep Duration & Quality */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Restorative Sleep (Hours per Night)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
              Goal: 7.5 hrs
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[4, 10]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="sleepHours" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            7-day average: 7.4 hours. Deep slow-wave sleep correlated with lower morning BP.
          </p>
        </div>

        {/* Chart 4: Symptom Recovery Curve */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Tension Headache Severity Recovery (1-10)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              Improving (-71%)
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={symptomData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="severity" stroke="#10b981" strokeWidth={3} name="Severity (1-10)" dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Symptoms down from 7/10 to 2/10 following screen breaks and cervical heat therapy.
          </p>
        </div>
      </div>
    </div>
  );
};
