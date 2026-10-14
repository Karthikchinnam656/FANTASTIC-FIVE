'use client';

import React, { useState } from 'react';
import { HealthProvider, useHealth, NavSection } from '@/context/HealthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

// 16 Core Section Views
import { DashboardView } from '@/components/dashboard/DashboardView';
import { AIChatAssistant } from '@/components/chat/AIChatAssistant';
import { HealthProblemsView } from '@/components/problems/HealthProblemsView';
import { SymptomCheckerView } from '@/components/symptom-checker/SymptomCheckerView';
import { InteractiveBodyMap } from '@/components/bodymap/InteractiveBodyMap';
import { MedicalReportsView } from '@/components/reports/MedicalReportsView';
import { ReportAnalyzerView } from '@/components/report-analyzer/ReportAnalyzerView';
import { MedicationsView } from '@/components/medications/MedicationsView';
import { HealthTimelineView } from '@/components/timeline/HealthTimelineView';
import { HealthAnalyticsView } from '@/components/analytics/HealthAnalyticsView';
import { DailyJournalView } from '@/components/journal/DailyJournalView';
import { AppointmentsView } from '@/components/appointments/AppointmentsView';
import { WellnessPlannerView } from '@/components/wellness/WellnessPlannerView';
import { HealthEducationView } from '@/components/education/HealthEducationView';
import { EmergencyInfoView } from '@/components/emergency/EmergencyInfoView';
import { ProfileSettingsView } from '@/components/profile/ProfileSettingsView';
import { MobileAppSimulator } from '@/components/mobile/MobileAppSimulator';
import { MobileArchitectureHub } from '@/components/mobile/MobileArchitectureHub';
import { VisualHealthAtlas } from '@/components/visual/VisualHealthAtlas';
import { MediMindLandingView } from '@/components/landing/MediMindLandingView';
import { AmbulanceServiceView } from '@/components/ambulance/AmbulanceServiceView';
import { SpecialtiesBodyCareView } from '@/components/specialties/SpecialtiesBodyCareView';
import { HealthInsuranceView } from '@/components/insurance/HealthInsuranceView';

function MainAppShell() {
  const { activeSection, setActiveSection, setPrefillProblemArea } = useHealth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If landing is active, render the full-bleed MediMind AI landing page with the 3 sections and 3 pictures
  if (activeSection === 'landing') {
    return <MediMindLandingView onEnterPlatform={() => setActiveSection('dashboard')} />;
  }

  const renderActiveView = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'ai-assistant':
        return <AIChatAssistant />;
      case 'problems':
        return <HealthProblemsView />;
      case 'symptom-checker':
        return <SymptomCheckerView />;
      case 'body-map':
        return (
          <div className="space-y-4">
            <InteractiveBodyMap
              onLogProblem={(regionId, initialSymptom) => {
                setPrefillProblemArea({ regionId, initialSymptom });
                setActiveSection('problems');
              }}
            />
          </div>
        );
      case 'reports':
        return <MedicalReportsView />;
      case 'report-analyzer':
        return <ReportAnalyzerView />;
      case 'medications':
        return <MedicationsView />;
      case 'history':
        return <HealthTimelineView />;
      case 'analytics':
        return <HealthAnalyticsView />;
      case 'journal':
        return <DailyJournalView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'wellness':
        return <WellnessPlannerView />;
      case 'education':
        return <HealthEducationView />;
      case 'emergency':
        return <EmergencyInfoView />;
      case 'profile':
        return <ProfileSettingsView />;
      case 'mobile-app':
        return <MobileAppSimulator />;
      case 'mobile-architecture':
        return <MobileArchitectureHub />;
      case 'visual-atlas':
        return <VisualHealthAtlas />;
      case 'ambulance':
        return <AmbulanceServiceView />;
      case 'specialties':
        return <SpecialtiesBodyCareView />;
      case 'insurance':
        return <HealthInsuranceView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation (All 16 Sections) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <HealthProvider>
      <MainAppShell />
    </HealthProvider>
  );
}
