'use client';

import React, { useState } from 'react';
import { HEALTH_EDUCATION_ARTICLES } from '@/data/initialData';
import { HealthArticle } from '@/types/health';
import {
  GraduationCap,
  Search,
  BookOpen,
  Clock,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HealthEducationView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  const allTags = ['all', 'Cholesterol', 'Cardiovascular', 'Neurology', 'Asthma', 'Sleep', 'Triage'];

  const filteredArticles = HEALTH_EDUCATION_ARTICLES.filter(art => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'all' || art.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-600" />
            <span>Health Education & Clinical Reference Library</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Peer-reviewed, evidence-informed guides to help you understand cardiovascular health, lab tests, and safe self-care.
          </p>
        </div>
      </div>

      {/* Search & Tags Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search medical topics (e.g. cholesterol, asthma, headaches)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tag === 'all' ? 'All Topics' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                {article.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                <span className="truncate">{article.reviewedBy}</span>
              </div>

              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Full Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedArticle.title}
            </h2>

            <p className="text-xs italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              {selectedArticle.summary}
            </p>

            {/* Article Content Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Clinical Takeaways */}
            <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-2xl border border-teal-200/60 dark:border-teal-800 space-y-2">
              <span className="text-xs font-bold text-teal-900 dark:text-teal-200 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Key Clinical Takeaways:
              </span>
              <ul className="space-y-1.5 text-xs text-teal-950 dark:text-teal-300">
                {selectedArticle.keyTakeaways.map((k, i) => (
                  <li key={i}>• {k}</li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
              <span>Clinically Reviewed: {selectedArticle.reviewedBy}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
