import React, { useState } from 'react';
import {
  Globe2,
  Moon,
  Sun,
  Bell,
  Shield,
  Zap,
  LogOut,
  User,
  ChevronDown,
  Activity,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppNavbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    logout,
    login,
    currentView,
    setCurrentView,
    setAuthModalOpen,
    setAuthModalMode,
    setOnboardingOpen,
    marketStatus,
    theme,
    setTheme,
    language,
    setLanguage,
    brokers,
    selectedBroker,
    setSelectedBroker,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBrokerDropdownOpen, setIsBrokerDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'marketing')}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
                X
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-white leading-none">
                  bot<span className="text-amber-400">X</span>change
                </div>
                <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                  Global Trading Network
                </div>
              </div>
            </button>

            {/* Market Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  marketStatus === 'OPEN'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                }`}
              />
              <span className="font-medium text-slate-300">
                {marketStatus === 'OPEN' ? 'Market Open (London/NY)' : 'Weekend Market Standby'}
              </span>
            </div>
          </div>

          {/* Center Navigation if Logged Out */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <button
                onClick={() => setCurrentView('marketing')}
                className="hover:text-white transition cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={async () => {
                  await login(true);
                  setCurrentView('leaderboard');
                }}
                className="hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                <span>Leaderboard</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                  LIVE
                </span>
              </button>
              <button
                onClick={async () => {
                  await login(true);
                  setCurrentView('wizard');
                }}
                className="hover:text-white transition cursor-pointer"
              >
                Bot Wizard
              </button>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Active Broker Switcher (If Authenticated) */}
            {isAuthenticated && brokers.length > 0 && (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsBrokerDropdownOpen(!isBrokerDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">
                    {selectedBroker?.platform || 'MT5'}: #{selectedBroker?.accountNumber || '8934215'}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    ${selectedBroker?.equity?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '15,420.80'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isBrokerDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 divide-y divide-slate-800 text-xs">
                    <div className="px-2 py-1.5 font-semibold text-slate-400 uppercase text-[10px]">
                      Connected Broker Bridges
                    </div>
                    <div className="py-1 space-y-1">
                      {brokers.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBroker(b);
                            setIsBrokerDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition cursor-pointer ${
                            selectedBroker?.id === b.id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-bold">{b.brokerName}</div>
                            <div className="text-[11px] text-slate-400">
                              {b.platform} • #{b.accountNumber} ({b.accountType})
                            </div>
                          </div>
                          <div className="text-right font-mono text-emerald-400 font-semibold">
                            ${b.equity.toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsBrokerDropdownOpen(false);
                          setOnboardingOpen(true);
                        }}
                        className="w-full text-center py-1.5 text-amber-400 hover:text-amber-300 font-semibold text-xs transition cursor-pointer"
                      >
                        + Connect Another Broker
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1 text-xs"
                title="Change language"
              >
                <Globe2 className="w-4 h-4 text-slate-400" />
                <span className="uppercase font-semibold">{language}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 text-xs">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code as any);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer ${
                        language === l.code
                          ? 'bg-amber-500/20 text-amber-400 font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => login(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-bold text-slate-950 transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Free Demo</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60'}
                    alt={user?.name || 'User'}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 text-xs divide-y divide-slate-800">
                    <div className="px-3 py-2">
                      <div className="font-bold text-white truncate">{user?.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                      <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold text-[10px]">
                        <Sparkles className="w-3 h-3" />
                        {user?.plan}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setCurrentView('settings');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 cursor-pointer"
                      >
                        <Sliders className="w-4 h-4 text-slate-400" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setOnboardingOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-slate-400" />
                        <span>Broker Connections</span>
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
