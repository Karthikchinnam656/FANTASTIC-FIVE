'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { WellnessGoal } from '@/types/health';
import {
  Target,
  Plus,
  CheckCircle2,
  Sparkles,
  Droplets,
  Footprints,
  Moon,
  Activity,
  Heart,
  ArrowUpRight
} from 'lucide-react';

export const WellnessPlannerView: React.FC = () => {
  const { wellnessGoals, updateWellnessGoal } = useHealth();
  const [showAddGoal, setShowAddGoal] = useState<boolean>(false);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-600" />
            <span>Personal Wellness Planner & Goal Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build sustainable daily habits, track progress rings, and receive personalized evidence-informed wellness coaching.
          </p>
        </div>
      </div>

      {/* AI Wellness Coach Insight Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
              CareVista AI Wellness Coaching Insight
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
            Consistency is the Keystone of Cardiovascular Resilience
          </h3>

          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Your average sleep over the last week was <strong>7.4 hours</strong>, which directly correlates with stable morning blood pressure. To support your borderline lipid panel, keeping your 8,000 steps daily walking target provides continuous vascular endothelial protection.
          </p>
        </div>
      </div>

      {/* Wellness Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wellnessGoals.map((goal) => {
          const percentage = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));

          return (
            <div
              key={goal.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                    {goal.category} • {goal.period}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {goal.title}
                  </h4>
                </div>

                {/* Progress Ring / Percentage Badge */}
                <div className="text-right">
                  <span className="text-xl font-black text-teal-600 dark:text-teal-400">
                    {percentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {goal.currentValue} / {goal.targetValue} {goal.unit}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Quick Update controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {goal.completed ? 'Goal reached today! 🎉' : `${goal.targetValue - goal.currentValue} ${goal.unit} remaining`}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateWellnessGoal(goal.id, Math.max(0, goal.currentValue - 1))}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateWellnessGoal(goal.id, goal.currentValue + 1)}
                    className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-lg text-xs font-bold hover:bg-teal-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
