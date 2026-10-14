'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import { DoctorAvatar } from '@/components/illustrations/MedicalIllustrations';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Paperclip,
  Trash2,
  Sparkles,
  AlertTriangle,
  FileText,
  HelpCircle,
  Stethoscope,
  Globe,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { SAFETY_DISCLAIMERS } from '@/lib/aiEngine';
import { MedicalReport } from '@/types/health';

export const AIChatAssistant: React.FC = () => {
  const {
    chatMessages,
    isChatTyping,
    sendChatMessage,
    clearChat,
    language,
    setLanguage,
    medicalReports,
    speakText,
    isSpeaking,
    stopSpeaking
  } = useHealth();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedReportAttachment, setSelectedReportAttachment] = useState<MedicalReport | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isChatTyping]);

  // Voice speech-to-text recognition
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    // Check for webkitSpeechRecognition or SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSend = () => {
    if (!inputPrompt.trim() && !selectedReportAttachment) return;
    const textToSend = inputPrompt.trim() || (selectedReportAttachment ? `Please analyze and explain my attached report: ${selectedReportAttachment.reportName}` : '');
    sendChatMessage(textToSend, selectedReportAttachment || undefined);
    setInputPrompt('');
    setSelectedReportAttachment(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-fadeIn">
      {/* Header Bar */}
      <div className="p-4 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <DoctorAvatar className="w-10 h-10" />
            <span className="w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full absolute -bottom-0.5 -right-0.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                CareVista AI Health Copilot
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-full">
                Context-Aware
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Personalized health guidance in English, Telugu (తెలుగు), & Hindi (हिंदी)
            </p>
          </div>
        </div>

        {/* Top Controls: Language Switcher, Clear Chat */}
        <div className="flex items-center gap-2">
          {/* Language selector toggle */}
          <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'te'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              हिंदी
            </button>
          </div>

          <button
            onClick={clearChat}
            className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Ribbon */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/50 dark:border-amber-900/40 px-4 py-2 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{SAFETY_DISCLAIMERS[language]}</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {!isUser && (
                <div className="shrink-0 mt-1">
                  <DoctorAvatar className="w-8 h-8" />
                </div>
              )}

              <div className="space-y-2 max-w-[85%] sm:max-w-[78%]">
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-tr-xs shadow-sm'
                      : msg.warningFlag
                      ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-tl-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/60 rounded-tl-xs'
                  }`}
                >
                  {/* Attachment tag if present */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-2.5 p-2 rounded-xl bg-white/20 dark:bg-slate-900/50 flex items-center gap-2 text-xs font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Attached: {msg.attachments[0].name}</span>
                    </div>
                  )}

                  {/* Render content with formatted markdown paragraphs */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {/* Footer info: Timestamp and Voice readout button for Assistant */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>

                {/* Suggested Follow-up Questions chips */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedFollowUps.map((su, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendChatMessage(su)}
                        className="text-[11px] px-3 py-1 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-slate-700 rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-teal-500" />
                        <span>{su}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator Skeleton */}
        {isChatTyping && (
          <div className="flex gap-3 max-w-xl">
            <DoctorAvatar className="w-8 h-8 shrink-0 mt-1" />
            <div className="p-4 rounded-3xl rounded-tl-xs bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                CareVista AI analyzing medical context...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer Tray */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
        {/* Selected Attached Report Preview */}
        {selectedReportAttachment && (
          <div className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800 text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" />
              <div>
                <span className="font-bold text-teal-900 dark:text-teal-200">
                  {selectedReportAttachment.reportName}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 ml-2">
                  ({selectedReportAttachment.reportType})
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedReportAttachment(null)}
              className="text-xs text-slate-400 hover:text-rose-500"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200/80 dark:border-slate-700 focus-within:ring-2 focus-within:ring-teal-500 transition-all">
          {/* Attach Report Button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Attach Medical Report to Conversation"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {showAttachmentMenu && (
              <div className="absolute bottom-12 left-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 z-50">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
                  Attach Medical Report
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {medicalReports.map((rep) => (
                    <button
                      key={rep.id}
                      onClick={() => {
                        setSelectedReportAttachment(rep);
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full text-left p-2 rounded-xl text-xs hover:bg-teal-50 dark:hover:bg-slate-700 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {rep.reportName}
                      </span>
                      <span className="text-[10px] text-teal-600 shrink-0 ml-1">
                        {rep.testDate}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Voice Input Button */}
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Speak into microphone'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Prompt Textarea */}
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'te'
                ? 'మీ ఆరోగ్య సమస్య లేదా ప్రశ్నను టైప్ చేయండి...'
                : language === 'hi'
                ? 'अपनी स्वास्थ्य समस्या या प्रश्न यहाँ लिखें...'
                : 'Ask CareVista AI about symptoms, lab results, medications, or doctor prep...'
            }
            rows={1}
            className="flex-1 bg-transparent border-0 focus:outline-none text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none py-1.5 max-h-28"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputPrompt.trim() && !selectedReportAttachment}
            className="p-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
