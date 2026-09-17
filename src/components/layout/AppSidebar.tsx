import React from 'react';
import {
  LayoutDashboard,
  Bot,
  PlusCircle,
  Network,
  BarChart3,
  Trophy,
  Share2,
  Wallet,
  Settings,
  HelpCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const AppSidebar: React.FC = () => {
  const { currentView, setCurrentView, bots, user, setOnboardingOpen } = useApp();

  const activeBotsCount = bots.filter((b) => b.status === 'RUNNING').length;

  const navItems: Array<{
    id: AppView;
    label: string;
    icon: any;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'bots',
      label: 'My Trading Bots',
      icon: Bot,
      badge: activeBotsCount > 0 ? `${activeBotsCount} Live` : undefined,
      badgeColor: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      id: 'wizard',
      label: 'Create New Bot',
      icon: PlusCircle,
      badge: 'AI Guided',
      badgeColor: 'bg-amber-500/20 text-amber-400 font-bold',
    },
    { id: 'brokers', label: 'Broker Bridges', icon: Network },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    {
      id: 'leaderboard',
      label: 'Global Leaderboard',
      icon: Trophy,
      badge: 'Hot',
      badgeColor: 'bg-red-500/20 text-red-400',
    },
    { id: 'referral', label: 'Affiliate & Rewards', icon: Share2 },
    { id: 'wallet', label: 'Wallet & Balances', icon: Wallet },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
    { id: 'support', label: 'Help & Knowledge', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-[#0B0F17] border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* User Rank Card Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-850 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Global Trader Rank</span>
            <span className="font-mono font-bold text-amber-400">#{user?.globalRank || 142}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-3/4 rounded-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
            <span>Top 5% Globally</span>
            <span className="text-emerald-400 font-semibold">+18 places today</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'bots' && currentView === 'bot-detail');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cloud VPS Status Pill & Broker Onboarding Helper */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Equinix LD4 Dedicated VPS</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Automated bots are executing 24/5 with 18ms broker latency.
          </p>
        </div>

        <button
          onClick={() => setOnboardingOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Connect Broker Wizard</span>
        </button>
      </div>
    </aside>
  );
};
