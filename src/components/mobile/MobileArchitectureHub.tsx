'use client';

import React, { useState } from 'react';
import {
  Code,
  Layers,
  Database,
  Smartphone,
  Copy,
  CheckCircle2,
  Download,
  ShieldCheck,
  Cpu,
  FileCode,
  Zap,
  Globe
} from 'lucide-react';

export const MobileArchitectureHub: React.FC = () => {
  const [activeStack, setActiveStack] = useState<'flutter' | 'react-native' | 'supabase'>('flutter');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const flutterCode = `// lib/main.dart - CareVista AI (Flutter & Riverpod)
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(
    url: const String.fromEnvironment('SUPABASE_URL'),
    anonKey: const String.fromEnvironment('SUPABASE_ANON_KEY'),
  );
  runApp(const ProviderScope(child: CareVistaApp()));
}

// Router Configuration
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/dashboard',
    routes: [
      GoRoute(path: '/dashboard', builder: (context, state) => const DashboardScreen()),
      GoRoute(path: '/body-map', builder: (context, state) => const BodyMapScreen()),
      GoRoute(path: '/ai-copilot', builder: (context, state) => const AICopilotScreen()),
      GoRoute(path: '/reports', builder: (context, state) => const ReportsScreen()),
      GoRoute(path: '/sos', builder: (context, state) => const EmergencySOSScreen()),
    ],
  );
});

class CareVistaApp extends ConsumerWidget {
  const CareVistaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'CareVista AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0D9488),
          primary: const Color(0xFF0D9488),
        ),
        useMaterial3: true,
      ),
      routerConfig: router,
    );
  }
}
`;

  const reactNativeCode = `// app/(tabs)/_layout.tsx - CareVista AI (React Native & Expo Router)
import { Tabs } from 'expo-router';
import { Heart, Activity, Bot, FileText, ShieldAlert } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0D9488',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B',
        tabBarStyle: {
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
          height: 64,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Activity size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bodymap"
        options={{
          title: 'Body Map',
          tabBarIcon: ({ color }) => <Heart size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="copilot"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color }) => <Bot size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <FileText size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS Card',
          tabBarIcon: ({ color }) => <ShieldAlert size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
`;

  const supabaseSql = `-- Supabase PostgreSQL Schema & Row Level Security (RLS) for CareVista AI

-- 1. User Health Profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  dob DATE NOT NULL,
  biological_sex TEXT CHECK (biological_sex IN ('female', 'male', 'other')),
  blood_group TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  allergies TEXT[],
  chronic_conditions TEXT[],
  emergency_contact JSONB,
  preferred_language TEXT DEFAULT 'en',
  ai_consent_granted BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access own profile" 
ON user_profiles FOR ALL USING (auth.uid() = id);

-- 2. Medical Reports Table
CREATE TABLE medical_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  test_date DATE NOT NULL,
  hospital TEXT NOT NULL,
  doctor_name TEXT,
  measurements JSONB NOT NULL,
  ai_summary TEXT,
  attachment_storage_path TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medical_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access own reports" 
ON medical_reports FOR ALL USING (auth.uid() = user_id);

-- 3. Daily Health Journal Logs
CREATE TABLE daily_health_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL,
  hydration_glasses INT DEFAULT 0,
  sleep_hours NUMERIC,
  sleep_quality TEXT,
  steps INT DEFAULT 0,
  mood TEXT,
  systolic_bp INT,
  diastolic_bp INT,
  blood_glucose INT,
  heart_rate INT,
  symptoms_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

ALTER TABLE daily_health_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access own logs" 
ON daily_health_logs FOR ALL USING (auth.uid() = user_id);
`;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600" />
            <span>Mobile Engineering & Cloud Architecture Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Production blueprint for cross-platform Android & iOS apps with Flutter, React Native Expo, and Supabase RLS.
          </p>
        </div>

        {/* Stack switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveStack('flutter')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeStack === 'flutter'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Option A: Flutter
          </button>
          <button
            onClick={() => setActiveStack('react-native')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeStack === 'react-native'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Option B: React Native
          </button>
          <button
            onClick={() => setActiveStack('supabase')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeStack === 'supabase'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Shared Supabase RLS Schema
          </button>
        </div>
      </div>

      {/* Architecture Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
          <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 w-fit">
            <Smartphone className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Native Device Capabilities
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Direct access to Camera OCR scanning, Local Push Notifications, Biometric Authentication (Face ID / Fingerprint), and HealthKit / Health Connect sensors.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
          <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 w-fit">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Offline-First SQLite Cache
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Records remain accessible and editable offline on mobile devices via local SQLite/Isar/WatermelonDB, automatically syncing with Supabase when online.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
          <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Row Level Security (RLS)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Strict PostgreSQL database isolation guarantees no client can view or modify records belonging to other patients without authenticated authorization.
          </p>
        </div>
      </div>

      {/* Code Display Card */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              {activeStack === 'flutter'
                ? 'lib/main.dart (Flutter & Riverpod)'
                : activeStack === 'react-native'
                ? 'app/(tabs)/_layout.tsx (React Native Expo Router)'
                : 'supabase_schema.sql (PostgreSQL + RLS)'}
            </span>
          </div>

          <button
            onClick={() =>
              handleCopy(
                activeStack === 'flutter'
                  ? flutterCode
                  : activeStack === 'react-native'
                  ? reactNativeCode
                  : supabaseSql,
                activeStack
              )
            }
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedCode === activeStack ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedCode === activeStack ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Block */}
        <pre className="text-xs font-mono text-teal-300 overflow-x-auto p-3 max-h-[440px] leading-relaxed">
          {activeStack === 'flutter'
            ? flutterCode
            : activeStack === 'react-native'
            ? reactNativeCode
            : supabaseSql}
        </pre>
      </div>
    </div>
  );
};
