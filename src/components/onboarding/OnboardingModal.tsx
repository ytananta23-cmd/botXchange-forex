import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Server,
  KeyRound,
  Eye,
  EyeOff,
  Cpu,
  Layers,
  ChevronRight,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../services/apiClient';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setOnboardingOpen, connectBroker, addToast, setCurrentView } = useApp();

  const [step, setStep] = useState<'intro' | 'broker'>('intro');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Broker Form States
  const [platform, setPlatform] = useState<'MT4' | 'MT5' | 'cTrader'>('MT5');
  const [accountType, setAccountType] = useState<'Demo' | 'Live'>('Demo');
  const [brokerName, setBrokerName] = useState('IC Markets Global');
  const [serverName, setServerName] = useState('ICMarketsSC-Live02');
  const [accountNumber, setAccountNumber] = useState('8934215');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Testing connection states
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; pingMs?: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverSearchQuery, setServerSearchQuery] = useState('');

  if (!isOnboardingOpen) return null;

  const slides = [
    {
      icon: Cpu,
      title: 'Institutional AI Algorithmic Edge',
      desc: 'Deploy transformer models trained on multi-million order books and liquidity cluster absorption. Zero emotion, 24/5 market execution.',
      badge: 'Billion-Dollar Infrastructure',
    },
    {
      icon: Zap,
      title: 'Sub-15ms Low-Latency Cloud VPS',
      desc: 'All trading algorithms execute in financial data centers directly adjacent to Tier-1 Forex and CFD broker liquidity providers.',
      badge: 'Zero VPS Cost',
    },
    {
      icon: ShieldCheck,
      title: '100% Non-Custodial Architecture',
      desc: 'Your capital stays safely in your own regulated MetaTrader or cTrader broker account. botXchange only automates trades.',
      badge: 'Investor Protection',
    },
  ];

  const popularServers = [
    'ICMarketsSC-Live02',
    'ICMarketsSC-Demo01',
    'Pepperstone-Live01',
    'Pepperstone-Demo02',
    'OANDA-v20-Live',
    'FPMarkets-Live-EU',
    'Exness-Real20',
    'Tickmill-Live03',
  ];

  const filteredServers = popularServers.filter((s) =>
    s.toLowerCase().includes(serverSearchQuery.toLowerCase())
  );

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setTestResult(null);
    try {
      const res = await apiClient.broker.testConnection('test-bridge');
      setTestResult(res);
    } catch {
      setTestResult({
        success: false,
        message: 'Bridge handshake timed out. Verify server name and credentials.',
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleFinalConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber) {
      addToast({
        title: 'Account Number Required',
        message: 'Please provide your MetaTrader or cTrader login ID.',
        type: 'warning',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await connectBroker({
        platform,
        brokerName,
        serverName,
        accountNumber,
        accountType,
        isReadOnly,
      });
      setOnboardingOpen(false);
      setCurrentView('dashboard');
    } catch {
      addToast({
        title: 'Broker Connection Failed',
        message: 'Could not connect to broker bridge. Please retry.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0e1420] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setOnboardingOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- STEP 1: WELCOME CAROUSEL --- */}
        {step === 'intro' && (
          <div className="text-center py-4 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <span>{slides[carouselIndex].badge}</span>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-blue-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-xl">
              {React.createElement(slides[carouselIndex].icon, { className: 'w-10 h-10' })}
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {slides[carouselIndex].title}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                {slides[carouselIndex].desc}
              </p>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 pt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    carouselIndex === i ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              {carouselIndex < slides.length - 1 ? (
                <button
                  onClick={() => setCarouselIndex(carouselIndex + 1)}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition cursor-pointer"
                >
                  Next Insight &rarr;
                </button>
              ) : (
                <button
                  onClick={() => setStep('broker')}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/25 cursor-pointer flex items-center gap-2"
                >
                  <span>Connect Your Broker Bridge</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- STEP 2: BROKER CONNECT FORM --- */}
        {step === 'broker' && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Connect Broker Account
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Link your MetaTrader 4, MetaTrader 5, or cTrader account to begin automated execution.
              </p>
            </div>

            {/* Platform Selection Cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <button
                type="button"
                onClick={() => {
                  setPlatform('MT5');
                  setBrokerName('IC Markets MT5');
                  setServerName('ICMarketsSC-Live02');
                }}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  platform === 'MT5'
                    ? 'bg-emerald-500/10 border-emerald-500/60 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono font-black text-emerald-400 text-base mb-0.5">MT5</div>
                <div className="text-xs font-bold">MetaTrader 5</div>
                <div className="text-[10px] text-slate-500">Most Popular</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPlatform('MT4');
                  setBrokerName('Pepperstone MT4');
                  setServerName('Pepperstone-Live01');
                }}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  platform === 'MT4'
                    ? 'bg-blue-500/10 border-blue-500/60 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono font-black text-blue-400 text-base mb-0.5">MT4</div>
                <div className="text-xs font-bold">MetaTrader 4</div>
                <div className="text-[10px] text-slate-500">Classic Standard</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPlatform('cTrader');
                  setBrokerName('cTrader Open API');
                  setServerName('cTrader-Live-EU');
                }}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  platform === 'cTrader'
                    ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono font-black text-amber-400 text-base mb-0.5">cTrader</div>
                <div className="text-xs font-bold">Spotware API</div>
                <div className="text-[10px] text-slate-500">Direct FIX</div>
              </button>
            </div>

            {/* Account Type Toggle (Demo vs Live) */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 mb-5">
              <div>
                <div className="text-xs font-bold text-white">Account Type</div>
                <div className="text-[11px] text-slate-400">
                  {accountType === 'Demo' ? 'Simulated capital with zero financial risk' : 'Real broker balance with live execution'}
                </div>
              </div>
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAccountType('Demo')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                    accountType === 'Demo' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Demo
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('Live')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                    accountType === 'Live' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Live
                </button>
              </div>
            </div>

            {/* Warning Banner: Investor Passwords */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5 mb-5 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Investor Password Supported:</strong> You can safely connect using your broker&apos;s read-only Investor Password for non-trading portfolio analytics, or Master Password for automated bot order routing.
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFinalConnect} className="space-y-4">
              {platform === 'cTrader' ? (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">cTrader Open API OAuth2</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Seamlessly authenticate with Spotware cTrader ID without entering passwords.
                  </p>
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    Authenticate with cTrader ID
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Broker Server Name</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search server (e.g. ICMarketsSC-Live02)..."
                        value={serverName}
                        onChange={(e) => {
                          setServerName(e.target.value);
                          setServerSearchQuery(e.target.value);
                        }}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                        required
                      />
                    </div>
                    {/* Server Quick Suggestions */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filteredServers.slice(0, 4).map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setServerName(srv)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 cursor-pointer"
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {platform} Login Account ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 8934215"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-slate-300">Trader Password</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[10px] text-slate-400 hover:text-slate-200"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Read Only Toggle */}
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={isReadOnly}
                      onChange={(e) => setIsReadOnly(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span>This is a read-only Investor Password (Disable trade execution)</span>
                  </label>
                </>
              )}

              {/* Test Connection Status Banner */}
              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    testResult.success
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/40 text-red-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                  {testResult.pingMs && (
                    <span className="font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                      {testResult.pingMs}ms latency
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
                  <span>{isTestingConnection ? 'Pinging Server...' : 'Test Connection'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Establishing Bridge...</span>
                  ) : (
                    <>
                      <span>Save & Authorize Bridge</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
