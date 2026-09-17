import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppNavbar } from './components/layout/AppNavbar';
import { AppSidebar } from './components/layout/AppSidebar';
import { MarketingPage } from './components/marketing/MarketingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { BotListView } from './components/bots/BotListView';
import { BotDetailView } from './components/bots/BotDetailView';
import { BotWizardView } from './components/bots/BotWizardView';
import { BrokerManagementView } from './components/brokers/BrokerManagementView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { ReferralView } from './components/referral/ReferralView';
import { WalletView } from './components/wallet/WalletView';
import { SettingsView } from './components/settings/SettingsView';
import { SupportView } from './components/support/SupportView';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import {
  LayoutDashboard,
  Bot,
  PlusCircle,
  BarChart3,
  Network,
  Trophy,
  Share2,
  Wallet,
  Settings,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, isAuthenticated, toasts, removeToast } = useApp();

  // If user is on marketing or not logged in and wants to see marketing
  const isMarketingMode = !isAuthenticated && currentView === 'marketing';

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <AppNavbar />

      {/* Main Content Area */}
      {isMarketingMode ? (
        <main className="flex-1">
          <MarketingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Left Desktop Sidebar */}
          <div className="hidden md:block">
            <AppSidebar />
          </div>

          {/* Main App Cockpit View with Error Boundary */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
            <ErrorBoundary fallbackTitle="Application View Workspace">
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'bots' && <BotListView />}
              {currentView === 'bot-detail' && <BotDetailView />}
              {currentView === 'wizard' && <BotWizardView />}
              {currentView === 'brokers' && <BrokerManagementView />}
              {currentView === 'analytics' && <AnalyticsView />}
              {currentView === 'leaderboard' && <LeaderboardView />}
              {currentView === 'referral' && <ReferralView />}
              {currentView === 'wallet' && <WalletView />}
              {currentView === 'settings' && <SettingsView />}
              {currentView === 'support' && <SupportView />}
              {currentView === 'marketing' && <MarketingPage />}
            </ErrorBoundary>
          </main>
        </div>
      )}

      {/* Mobile Bottom Quick Navigation (Only when logged in) */}
      {isAuthenticated && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1420]/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around py-2 px-1">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 rounded-lg transition ${
              currentView === 'dashboard' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Cockpit</span>
          </button>

          <button
            onClick={() => setCurrentView('bots')}
            className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 rounded-lg transition ${
              currentView === 'bots' || currentView === 'bot-detail' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Bots</span>
          </button>

          <button
            onClick={() => setCurrentView('wizard')}
            className="flex flex-col items-center gap-0.5 text-[10px] p-1.5 rounded-lg text-amber-400 font-bold"
          >
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center -mt-3 shadow-lg shadow-amber-500/30">
              <PlusCircle className="w-4 h-4" />
            </div>
            <span>New</span>
          </button>

          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 rounded-lg transition ${
              currentView === 'leaderboard' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Rank</span>
          </button>

          <button
            onClick={() => setCurrentView('brokers')}
            className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 rounded-lg transition ${
              currentView === 'brokers' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Brokers</span>
          </button>
        </nav>
      )}

      {/* Global Modals & Notifications */}
      <AuthModal />
      <OnboardingModal />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
