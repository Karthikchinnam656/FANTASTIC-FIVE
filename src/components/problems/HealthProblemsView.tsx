'use client';

import React, { useState, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import { HealthProblem, SeverityLevel, ProblemStatus, FrequencyType } from '@/types/health';
import { BODY_REGIONS } from '@/components/bodymap/InteractiveBodyMap';
import {
  Plus,
  AlertCircle,
  Activity,
  Calendar,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  FileText,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Clock,
  Send
} from 'lucide-react';

export const HealthProblemsView: React.FC = () => {
  const {
    healthProblems,
    addHealthProblem,
    updateHealthProblem,
    deleteHealthProblem,
    medicalReports,
    prefillProblemArea,
    setPrefillProblemArea
  } = useHealth();

  const [showAddModal, setShowAddModal] = useState<boolean>(!!prefillProblemArea);
  const [editingProblem, setEditingProblem] = useState<HealthProblem | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'improving' | 'resolved'>('all');
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(healthProblems[0]?.id || null);

  // Form State
  const [formName, setFormName] = useState(prefillProblemArea?.initialSymptom || '');
  const [formCategory, setFormCategory] = useState('Neurological / General');
  const [formBodyPart, setFormBodyPart] = useState(
    prefillProblemArea ? (BODY_REGIONS[prefillProblemArea.regionId]?.name || 'Head & Neck') : 'Head & Neck'
  );
  const [formSymptoms, setFormSymptoms] = useState<string>(prefillProblemArea?.initialSymptom ? prefillProblemArea.initialSymptom : '');
  const [formSeverity, setFormSeverity] = useState<number>(5);
  const [formStartingDate, setFormStartingDate] = useState('2026-10-14');

  useEffect(() => {
    setFormStartingDate(new Date().toISOString().split('T')[0]);
  }, []);
  const [formFrequency, setFormFrequency] = useState<FrequencyType>('occasional');
  const [formDescription, setFormDescription] = useState('');
  const [formExistingDiagnosis, setFormExistingDiagnosis] = useState('');
  const [formCurrentMedication, setFormCurrentMedication] = useState('');
  const [formStatus, setFormStatus] = useState<ProblemStatus>('active');
  const [formNotes, setFormNotes] = useState('');
  const [formPhotoPreview, setFormPhotoPreview] = useState<string | undefined>(undefined);

  // Daily log input state for expanded problem
  const [dailyLogSeverity, setDailyLogSeverity] = useState<number>(5);
  const [dailyLogNote, setDailyLogNote] = useState<string>('');

  const handleOpenAdd = () => {
    setEditingProblem(null);
    setFormName(prefillProblemArea?.initialSymptom || '');
    setFormCategory('General');
    setFormBodyPart(prefillProblemArea ? (BODY_REGIONS[prefillProblemArea.regionId]?.name || 'Head & Neck') : 'Head & Neck');
    setFormSymptoms('');
    setFormSeverity(5);
    setFormStartingDate(new Date().toISOString().split('T')[0]);
    setFormFrequency('occasional');
    setFormDescription('');
    setFormExistingDiagnosis('');
    setFormCurrentMedication('');
    setFormStatus('active');
    setFormNotes('');
    setFormPhotoPreview(undefined);
    setShowAddModal(true);
  };

  const handleOpenEdit = (problem: HealthProblem) => {
    setEditingProblem(problem);
    setFormName(problem.name);
    setFormCategory(problem.category);
    setFormBodyPart(problem.affectedBodyPart);
    setFormSymptoms(problem.symptoms.join(', '));
    setFormSeverity(problem.severity);
    setFormStartingDate(problem.startingDate);
    setFormFrequency(problem.frequency);
    setFormDescription(problem.description);
    setFormExistingDiagnosis(problem.existingDiagnosis || '');
    setFormCurrentMedication(problem.currentMedication || '');
    setFormStatus(problem.status);
    setFormNotes(problem.notes || '');
    setFormPhotoPreview(problem.photoUrl);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const symptomList = formSymptoms.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProblem) {
      updateHealthProblem(editingProblem.id, {
        name: formName,
        category: formCategory,
        affectedBodyPart: formBodyPart,
        symptoms: symptomList,
        severity: formSeverity,
        startingDate: formStartingDate,
        frequency: formFrequency,
        description: formDescription,
        existingDiagnosis: formExistingDiagnosis,
        currentMedication: formCurrentMedication,
        status: formStatus,
        notes: formNotes,
        photoUrl: formPhotoPreview
      });
    } else {
      const created = addHealthProblem({
        name: formName,
        category: formCategory,
        affectedBodyPart: formBodyPart,
        symptoms: symptomList,
        severity: formSeverity,
        startingDate: formStartingDate,
        frequency: formFrequency,
        description: formDescription,
        existingDiagnosis: formExistingDiagnosis,
        currentMedication: formCurrentMedication,
        status: formStatus,
        notes: formNotes,
        photoUrl: formPhotoPreview
      });
      setExpandedProblemId(created.id);
    }

    setShowAddModal(false);
    setPrefillProblemArea(null);
  };

  const handleAddDailyLog = (problemId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const problem = healthProblems.find(p => p.id === problemId);
    if (!problem) return;

    const existingLogs = problem.dailyLogs || [];
    const newLog = {
      date: today,
      severity: dailyLogSeverity,
      note: dailyLogNote.trim() || `Daily check-in severity: ${dailyLogSeverity}/10`
    };

    updateHealthProblem(problemId, {
      severity: dailyLogSeverity,
      dailyLogs: [newLog, ...existingLogs.filter(l => l.date !== today)]
    });

    setDailyLogNote('');
  };

  const filteredProblems = healthProblems.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-teal-600" />
            <span>My Health Concerns & Symptom Tracking</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Log physical symptoms, track daily progress, and receive AI self-care guidance and doctor preparation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
            {(['all', 'active', 'improving', 'resolved'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Health Problem</span>
          </button>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => {
            const isExpanded = expandedProblemId === problem.id;

            return (
              <div
                key={problem.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
              >
                {/* Header summary row */}
                <div
                  onClick={() => setExpandedProblemId(isExpanded ? null : problem.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        problem.severity > 6
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          : problem.severity > 3
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                          : 'bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400'
                      }`}
                    >
                      <Activity className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {problem.name}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {problem.affectedBodyPart}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            problem.status === 'active'
                              ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                              : problem.status === 'improving'
                              ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-900'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {problem.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {problem.description || 'No detailed description provided.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Severity {problem.severity}/10
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Since {problem.startingDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(problem);
                        }}
                        className="p-2 text-slate-400 hover:text-teal-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit Concern"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this health concern?')) {
                            deleteHealthProblem(problem.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete Concern"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="p-1.5 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-6">
                    {/* Key Attributes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Category</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{problem.category}</p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Frequency</span>
                        <p className="text-xs font-bold capitalize text-slate-800 dark:text-slate-200 mt-0.5">{problem.frequency}</p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Doctor Diagnosis</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{problem.existingDiagnosis || 'None confirmed'}</p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Current Treatment</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{problem.currentMedication || 'None logged'}</p>
                      </div>
                    </div>

                    {/* Symptoms Tags */}
                    {problem.symptoms.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                          Specific Symptoms Logged:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {problem.symptoms.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-slate-700 rounded-xl font-medium"
                            >
                              • {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Clinical Guidance Section */}
                    {problem.aiGuidance && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Safe Self-Care */}
                        <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 border border-teal-100 dark:border-slate-700 space-y-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            <h4 className="text-xs font-bold text-teal-900 dark:text-teal-300">
                              Safe Evidence-Informed Self-Care
                            </h4>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                            {problem.aiGuidance.selfCare.map((sc, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-500 font-bold">•</span>
                                <span>{sc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Red Flags / Warning Signs */}
                        <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300">
                              Emergency Signs to Watch
                            </h4>
                          </div>
                          <ul className="space-y-1.5 text-xs text-rose-700 dark:text-rose-300">
                            {problem.aiGuidance.warningSigns.map((ws, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="font-bold">•</span>
                                <span>{ws}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Questions for Doctor */}
                        <div className="bg-sky-50/60 dark:bg-sky-950/30 rounded-2xl p-4 border border-sky-200/60 dark:border-sky-900/40 space-y-2">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-sky-600" />
                            <h4 className="text-xs font-bold text-sky-900 dark:text-sky-300">
                              Questions for Your Doctor
                            </h4>
                          </div>
                          <ul className="space-y-1.5 text-xs text-sky-800 dark:text-sky-300">
                            {problem.aiGuidance.questionsForDoctor.map((qd, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="font-bold">•</span>
                                <span>"{qd}"</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Daily Severity Progress Log */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-teal-600" />
                          <span>Daily Symptom Progress & Check-in</span>
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {problem.dailyLogs?.length || 0} recorded logs
                        </span>
                      </div>

                      {/* Add today check-in bar */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-xs text-slate-600 dark:text-slate-300 shrink-0 font-medium">
                            Today's Severity ({dailyLogSeverity}/10):
                          </span>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={dailyLogSeverity}
                            onChange={(e) => setDailyLogSeverity(Number(e.target.value))}
                            className="w-24 accent-teal-600"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Note on changes or triggers today..."
                          value={dailyLogNote}
                          onChange={(e) => setDailyLogNote(e.target.value)}
                          className="flex-1 w-full bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs focus:ring-1 focus:ring-teal-500"
                        />

                        <button
                          onClick={() => handleAddDailyLog(problem.id)}
                          className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
                        >
                          Save Today's Log
                        </button>
                      </div>

                      {/* Timeline list of past logs */}
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                        {problem.dailyLogs?.map((log, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 dark:bg-slate-700/30 text-xs">
                            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{log.date}</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium flex-1 px-3 truncate">{log.note}</span>
                            <span className="font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md text-[11px]">
                              {log.severity}/10
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No health concerns found in this filter
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Click the button above to log a new problem or select an area on the Interactive Body Map.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Health Problem Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProblem ? 'Edit Health Concern' : 'Register New Health Problem'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Problem Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Problem Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Throbbing Migraine, Knee Joint Pain"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Neurological / ENT">Neurological / ENT</option>
                    <option value="Cardiopulmonary">Cardiopulmonary / Chest</option>
                    <option value="Gastrointestinal">Gastrointestinal / Digestive</option>
                    <option value="Musculoskeletal">Musculoskeletal / Orthopedic</option>
                    <option value="Dermatology">Dermatology / Skin</option>
                    <option value="General">General / Systemic</option>
                  </select>
                </div>
              </div>

              {/* Body Part & Starting Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Affected Body Region
                  </label>
                  <select
                    value={formBodyPart}
                    onChange={(e) => setFormBodyPart(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    {Object.values(BODY_REGIONS).map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    value={formStartingDate}
                    onChange={(e) => setFormStartingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Severity Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Severity Scale (1 to 10)
                  </label>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    {formSeverity} / 10 ({formSeverity > 6 ? 'Severe' : formSeverity > 3 ? 'Moderate' : 'Mild'})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formSeverity}
                  onChange={(e) => setFormSeverity(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              {/* Symptoms tags input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Symptoms (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. throbbing pain, dizziness, nausea"
                  value={formSymptoms}
                  onChange={(e) => setFormSymptoms(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Frequency & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Frequency
                  </label>
                  <select
                    value={formFrequency}
                    onChange={(e) => setFormFrequency(e.target.value as FrequencyType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="occasional">Occasional</option>
                    <option value="daily">Daily</option>
                    <option value="continuous">Continuous / Constant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Current Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ProblemStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="improving">Improving</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Description & Context
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe when symptoms worsen or feel better, food triggers, posture, etc."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Existing Diagnosis & Current Medication */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Existing Doctor Diagnosis (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Migraine, Cervical Spondylosis"
                    value={formExistingDiagnosis}
                    onChange={(e) => setFormExistingDiagnosis(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Current Medication / Relief Taken
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acetaminophen, Ice Pack"
                    value={formCurrentMedication}
                    onChange={(e) => setFormCurrentMedication(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {editingProblem ? 'Save Changes' : 'Register & Generate AI Guidance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
