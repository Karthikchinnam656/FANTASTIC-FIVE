'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { MedicalReportIllustration } from '@/components/illustrations/MedicalIllustrations';
import {
  Microscope,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileText,
  Calendar,
  Building,
  UserCheck,
  ChevronRight,
  Info
} from 'lucide-react';

export const ReportAnalyzerView: React.FC = () => {
  const { medicalReports, activeReportForAnalyzer, setActiveReportForAnalyzer, setActiveSection } = useHealth();

  const report = activeReportForAnalyzer || medicalReports[0];
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
        <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          No medical reports uploaded yet
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Upload a lab report in the Medical Reports section to view deep AI biomarker analysis.
        </p>
      </div>
    );
  }

  const normalMarkers = report.measurements.filter(m => m.resultFlag === 'normal');
  const abnormalMarkers = report.measurements.filter(m => m.resultFlag !== 'normal');

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Selector dropdown if multiple reports exist */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Medical Report Analyzer & Biomarker Interpreter
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Select Report:</label>
          <select
            value={report.id}
            onChange={(e) => {
              const found = medicalReports.find(r => r.id === e.target.value);
              if (found) setActiveReportForAnalyzer(found);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {medicalReports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.reportName} ({r.testDate})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-teal-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 rounded-3xl p-6 border border-purple-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="shrink-0 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <MedicalReportIllustration className="w-16 h-16" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                {report.reportType}
              </span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Test Date: {report.testDate}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {report.reportName}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Conducted by <strong>{report.hospital}</strong> • Ordering Physician: {report.doctorName || 'Clinical Staff'}
            </p>
          </div>
        </div>

        {/* Quick Biomarkers Count Badges */}
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-around bg-white/70 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700">
          <div className="text-center px-3">
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block">
              {normalMarkers.length}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Within Target</span>
          </div>

          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

          <div className="text-center px-3">
            <span className="text-lg font-extrabold text-rose-600 dark:text-rose-400 block">
              {abnormalMarkers.length}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Out of Range</span>
          </div>
        </div>
      </div>

      {/* AI Plain-Language Clinical Synthesis */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Plain-Language Translation & Summary
            </h4>
          </div>
          <span className="text-[10px] bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold px-2 py-0.5 rounded-full">
            Patient-Friendly Explanation
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
          {report.aiSummary}
        </p>
      </div>

      {/* Out of Range Biomarkers Attention Cards */}
      {abnormalMarkers.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Biomarkers Requiring Clinical Attention ({abnormalMarkers.length})</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {abnormalMarkers.map((marker) => (
              <div
                key={marker.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {marker.parameter}
                  </h5>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                    {marker.resultFlag} ({marker.resultValue} {marker.unit})
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Standard Target: {marker.referenceRange}</span>
                  <span className="font-semibold text-rose-600">Deviation detected</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 bg-rose-50/40 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/40">
                  {marker.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Extracted Biomarker Parameter Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-5">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-600" />
          <span>Complete Biomarker Breakdown</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase">
                <th className="py-2.5 px-3">Biomarker / Test</th>
                <th className="py-2.5 px-3">Result</th>
                <th className="py-2.5 px-3">Reference Range</th>
                <th className="py-2.5 px-3">Interpretation</th>
                <th className="py-2.5 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {report.measurements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {m.parameter}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    {m.resultValue} <span className="font-normal text-slate-500 text-[11px]">{m.unit}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {m.referenceRange}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        m.resultFlag === 'above'
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                          : m.resultFlag === 'below'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                      }`}
                    >
                      {m.resultFlag}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedTerm(selectedTerm === m.parameter ? null : m.parameter)}
                      className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1 justify-end ml-auto"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Explain</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Term Explanation Drawer */}
        {selectedTerm && (
          <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200/60 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">Clinical Explainer: {selectedTerm}</span>
              <button onClick={() => setSelectedTerm(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="leading-relaxed">
              {report.measurements.find(m => m.parameter === selectedTerm)?.explanation || 'Key clinical biomarker evaluated during metabolic screening.'}
            </p>
          </div>
        )}
      </div>

      {/* Questions for Doctor Based on Findings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Recommended Questions for Your Doctor
          </h4>
        </div>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-teal-600 font-bold shrink-0">1.</span>
            <span>"In light of my LDL cholesterol level at 134 mg/dL, should we continue my current statin dosage or incorporate additional dietary soluble fiber?"</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-teal-600 font-bold shrink-0">2.</span>
            <span>"Given that my fasting blood glucose (92 mg/dL) and HbA1c (5.4%) are optimal, when do you recommend our next routine metabolic panel?"</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
