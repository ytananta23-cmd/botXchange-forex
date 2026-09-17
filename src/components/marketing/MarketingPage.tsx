import React, { useState } from 'react';
import {
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  ChevronRight,
  ChevronDown,
  Check,
  Star,
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Lock,
  DollarSign,
  Activity,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TradingViewChart } from '../TradingViewChart';

export const MarketingPage: React.FC = () => {
  const { setAuthModalOpen, setAuthModalMode, login, setCurrentView } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeStrategyTab, setActiveStrategyTab] = useState<'ai' | 'grid' | 'dca'>('ai');

  const faqs = [
    {
      q: 'How does botXchange connect to my broker?',
      a: 'botXchange connects directly to MetaTrader 4 (MT4), MetaTrader 5 (MT5), or cTrader broker terminals through our high-speed FIX / bridge API. You can even use an Investor (Read-Only) password for tracking or a trade-execution enabled account. Your deposits remain 100% inside your own regulated broker at all times.',
    },
    {
      q: 'Do I need a VPS (Virtual Private Server)?',
      a: 'No! botXchange runs entirely on enterprise cloud infrastructure located in Equinix LD4 (London) and NY4 (New York) financial data centers with sub-15 millisecond execution latency. Your bots trade 24/5 even when your computer or phone is completely turned off.',
    },
    {
      q: 'Can I start with a demo account first?',
      a: 'Yes, absolutely. We strongly encourage all new traders to start on a free MetaTrader or cTrader Demo account. You can test all AI Presets, Grid bots, and custom risk parameters risk-free with virtual funds before switching to real capital.',
    },
    {
      q: 'What is the minimum deposit required?',
      a: 'botXchange does not hold your funds, so there is no platform deposit minimum. Minimum deposits depend solely on your chosen broker (many regulated brokers start at $50 - $100). Our bots support micro-lots (0.01 lot size) for precise capital preservation.',
    },
    {
      q: 'How does the AI Preset strategy work?',
      a: 'Our AI engines analyze real-time market micro-structure, multi-timeframe order flow, and volatility spikes across Forex pairs and gold (XAU/USD). The models dynamically adapt stop losses and take profits according to current market regime changes.',
    },
    {
      q: 'Can botXchange withdraw money from my broker account?',
      a: 'Never. Broker bridge protocols only grant market order execution rights. Automated platforms cannot withdraw or transfer your capital. Only you retain account withdrawal privileges with your broker.',
    },
  ];

  const testimonials = [
    {
      name: 'Marcus Sterling',
      role: 'Private Forex Fund Manager',
      location: 'London, UK',
      flag: '🇬🇧',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+142.8% ROI (6 Months)',
      comment:
        'botXchange has revolutionized how we execute our EUR/USD and Gold breakout models. Sub-20ms latency to our IC Markets MT5 account has virtually eliminated slippage.',
    },
    {
      name: 'Elena Rostova',
      role: 'Quantitative CFD Trader',
      location: 'Frankfurt, Germany',
      flag: '🇩🇪',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+94.2% ROI',
      comment:
        'The Grid Bot with automated ATR volatility bands handled the US CPI volatility with zero panic. Built-in hard equity stop protections give me complete peace of mind.',
    },
    {
      name: 'Dr. Tariq Al-Mansoor',
      role: 'High-Net-Worth Investor',
      location: 'Dubai, UAE',
      flag: '🇦🇪',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      gain: '+188.5% Annual ROI',
      comment:
        'The ability to run Institutional AI presets across multiple MT4 and cTrader accounts simultaneously from a single unified cockpit is unmatched globally.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner Credibility */}
      <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-emerald-500/10 border-b border-slate-800 text-xs py-2 px-4 text-center flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Live Network Active
        </span>
        <span className="text-slate-300">
          Over <strong>$4.8B+</strong> in automated volume executed across 150+ countries.
        </span>
        <button
          onClick={() => login(true)}
          className="underline text-amber-400 hover:text-amber-300 font-semibold cursor-pointer hidden sm:inline"
        >
          Try Instant Demo &rarr;
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Background glow meshes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-blue-500/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-lg shadow-amber-500/5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE WORLD&apos;S AUTOMATED TRADING NETWORK</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Where AI Meets the{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                Global Markets
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Connect your MT4, MT5, or cTrader broker in seconds. Deploy battle-tested AI trading bots that analyze ticks, capture edge, and execute trades 24/5 with institutional precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => login(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                Start Free Demo Account
              </button>

              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setAuthModalOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-slate-600"
              >
                <span>Connect Live Broker</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro trust cues */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Non-Custodial (Funds Stay in Your Broker)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-400" />
                No Coding Required
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-amber-400" />
                Zero Latency Cloud VPS Included
              </span>
            </div>
          </div>

          {/* Hero Live Chart & Terminal Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-2.5 sm:p-3 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-slate-400 ml-2 font-medium">
                    botXchange AI Execution Engine • Active Ticks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    CONNECTED: LD4 EQUINIX 18ms
                  </span>
                </div>
              </div>

              {/* Official TradingView Embedded Chart in Hero */}
              <div className="p-1">
                <TradingViewChart
                  symbol="OANDA:XAUUSD"
                  theme="dark"
                  height={400}
                  interval="15"
                  showOverlay={true}
                  entryPrice={2654.20}
                  takeProfit={2675.00}
                  stopLoss={2638.00}
                  botName="Gold (XAU/USD) Smart AI Matrix"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar: Broker & Platform Integrations */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-6">
            Seamlessly Integrated with Leading Institutional Broker Tech & Ecosystems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-xs">
                MT4
              </div>
              <span>MetaTrader 4</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-extrabold text-white text-xs">
                MT5
              </div>
              <span>MetaTrader 5</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-extrabold text-white text-xs">
                cT
              </div>
              <span>cTrader Open API</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>IC Markets</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Pepperstone</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>OANDA Global</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>FP Markets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Ticker */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight">
                $4.8B+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Automated Trading Volume</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                184,290+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Active Global Traders</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                150+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Countries Represented</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono tracking-tight">
                99.99%
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Execution Engine Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Effortless Automation</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            From Zero to Automated Trading in 3 Minutes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No complex coding, no software downloads. Everything runs securely through our cloud network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-6 group-hover:scale-110 transition">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Connect Your Broker</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connect your MT4, MT5, or cTrader account via secure API or investor credentials. Your funds stay with your broker.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg mb-6 group-hover:scale-110 transition">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Select or Build Strategy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Choose from ready-to-run AI Presets, Martingale-safe DCA, Grid Trading, or craft custom RSI & MACD triggers.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-6 group-hover:scale-110 transition">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Let AI Execute 24/5</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Launch with one click. botXchange scans market ticks 24 hours a day, executing trades with zero human emotion.
            </p>
          </div>
        </div>
      </section>

      {/* Strategy Showcase */}
      <section className="py-20 bg-slate-950/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Institutional Strategies</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Proven Algorithmic Models</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore strategies engineered for all market conditions: trending, ranging, and high-volatility events.
            </p>
          </div>

          {/* Strategy Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveStrategyTab('ai')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeStrategyTab === 'ai'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              AI Neural Preset
            </button>
            <button
              onClick={() => setActiveStrategyTab('grid')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeStrategyTab === 'grid'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Multi-Level Grid
            </button>
            <button
              onClick={() => setActiveStrategyTab('dca')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeStrategyTab === 'dca'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Smart DCA Accumulator
            </button>
          </div>

          {/* Strategy Content Box */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 max-w-4xl mx-auto">
            {activeStrategyTab === 'ai' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Adaptive Machine Learning
                  </div>
                  <h3 className="text-2xl font-bold text-white">AI Neural Momentum Matrix</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Continuously scans liquidity pools, bid/ask cluster imbalances, and volatility spikes. Dynamically adjusts stop loss and take profit targets based on market regime changes.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Historical Win Rate</div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">82.4%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Max Backtested DD</div>
                      <div className="text-xl font-bold text-amber-400 font-mono">5.2%</div>
                    </div>
                  </div>
                  <button
                    onClick={() => login(true)}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    Deploy AI Preset in Demo &rarr;
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-500">// AI Model Telemetry Feed</div>
                  <div className="text-emerald-400">&gt; MODEL: botXchange-Transformer-v4</div>
                  <div>&gt; ASSET: XAUUSD (Gold CFD)</div>
                  <div>&gt; SIGNAL: STRONG BUY (Confidence 89.2%)</div>
                  <div>&gt; ADAPTIVE TP: +240 pips</div>
                  <div>&gt; HARD SL: -65 pips</div>
                  <div className="text-amber-400">&gt; EXECUTION: 16ms to MT5 Server</div>
                </div>
              </div>
            )}

            {activeStrategyTab === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    Market Neutral Ranging
                  </div>
                  <h3 className="text-2xl font-bold text-white">Automated Geometric Grid</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Places laddered buy and sell limit orders above and below the current market price. Excels during consolidation phases, profiting from every natural market oscillation.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Optimal Range</div>
                      <div className="text-xl font-bold text-blue-400 font-mono">EUR/USD, AUD/NZD</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Grid Levels</div>
                      <div className="text-xl font-bold text-white font-mono">10 to 50</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
                  <div className="text-slate-500 font-mono">// Grid Ladder Visualizer</div>
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 font-mono flex justify-between">
                    <span>SELL LIMIT #3</span>
                    <span>1.0910 (+30 pips)</span>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 font-mono flex justify-between">
                    <span>SELL LIMIT #2</span>
                    <span>1.0880 (+15 pips)</span>
                  </div>
                  <div className="p-2 rounded bg-blue-500/20 text-blue-300 font-mono flex justify-between border border-blue-500/40 font-bold">
                    <span>CURRENT SPOT PRICE</span>
                    <span>1.0850 (Anchor)</span>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 font-mono flex justify-between">
                    <span>BUY LIMIT #1</span>
                    <span>1.0820 (-15 pips)</span>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 font-mono flex justify-between">
                    <span>BUY LIMIT #2</span>
                    <span>1.0790 (-30 pips)</span>
                  </div>
                </div>
              </div>
            )}

            {activeStrategyTab === 'dca' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    Capital Averaging
                  </div>
                  <h3 className="text-2xl font-bold text-white">Smart Dollar-Cost Averaging</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Safely lowers the average entry price during corrective pullbacks with dynamic lot-multiplier safety caps and trailing take-profit exits.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Safety Order Step</div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">1.2x - 1.5x</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Hard Equity Stop</div>
                      <div className="text-xl font-bold text-red-400 font-mono">Enforced</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-500">// DCA Entry Waterfall</div>
                  <div>Base Order: 0.10 lots @ 1.3000</div>
                  <div>Safety #1: 0.14 lots @ 1.2960 (Triggered)</div>
                  <div>Safety #2: 0.19 lots @ 1.2920 (Standby)</div>
                  <div className="text-emerald-400 font-bold">
                    Target Break-even + TP: 1.2985 (Reduced from 1.3030)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Public Leaderboard Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Social Proof & Transparency
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Top Performing Bots This Week
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Real verified ROI from traders around the globe running on MT4/MT5.
            </p>
          </div>
          <button
            onClick={async () => {
              await login(true);
              setCurrentView('leaderboard');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
          >
            <span>View Full Leaderboard (500+ Traders)</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Rank & Trader</th>
                <th className="py-4 px-6">Strategy</th>
                <th className="py-4 px-6">Primary Pair</th>
                <th className="py-4 px-6">Verified Broker</th>
                <th className="py-4 px-6 text-right">Weekly ROI</th>
                <th className="py-4 px-6 text-right">Win Rate</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                    1
                  </span>
                  <div className="font-semibold text-white">ApexAlphaFX</div>
                  <span title="United Kingdom">🇬🇧</span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold">
                    AI Neural
                  </span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-slate-300">XAUUSD</td>
                <td className="py-4 px-6 text-xs text-slate-400">IC Markets MT5</td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-400 text-base">
                  +34.2%
                </td>
                <td className="py-4 px-6 text-right font-mono text-slate-300">87.4%</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => login(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition cursor-pointer"
                  >
                    Copy Bot
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div className="font-semibold text-white">DubaiQuant_Zaid</div>
                  <span title="UAE">🇦🇪</span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold">
                    Grid Pro
                  </span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-slate-300">EURUSD</td>
                <td className="py-4 px-6 text-xs text-slate-400">Pepperstone MT5</td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-400 text-base">
                  +26.8%
                </td>
                <td className="py-4 px-6 text-right font-mono text-slate-300">83.9%</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => login(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition cursor-pointer"
                  >
                    Copy Bot
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <div className="font-semibold text-white">TokyoGridMaster</div>
                  <span title="Japan">🇯🇵</span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                    Smart DCA
                  </span>
                </td>
                <td className="py-4 px-6 font-mono font-bold text-slate-300">USDJPY</td>
                <td className="py-4 px-6 text-xs text-slate-400">cTrader Pro</td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-400 text-base">
                  +22.4%
                </td>
                <td className="py-4 px-6 text-right font-mono text-slate-300">79.5%</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => login(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition cursor-pointer"
                  >
                    Copy Bot
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Trader Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Trusted by 180,000+ Algorithmic Traders
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              From independent retail scalpers to institutional family offices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-2">{t.gain}</div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {t.name} <span>{t.flag}</span>
                    </div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Plans Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Trading Superpower
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            All plans include zero-latency London/NY cloud hosting and 24/5 market automation.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[10px] font-bold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Demo Plan */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold text-white mb-1">Free Demo</div>
              <p className="text-xs text-slate-400 mb-6">Test strategies risk-free on demo accounts</p>
              <div className="text-4xl font-extrabold text-white font-mono mb-6">$0</div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Unlimited Demo Accounts (MT4, MT5, cTrader)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  2 Active Demo Bots
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Standard AI Presets & Grid Bots
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Basic Analytics & Equity Curves
                </li>
              </ul>
            </div>
            <button
              onClick={() => login(true)}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
            >
              Start Free Demo
            </button>
          </div>

          {/* Pro Trader Plan (Highlighted) */}
          <div className="p-8 rounded-2xl bg-slate-900 border-2 border-amber-500/80 relative flex flex-col justify-between shadow-2xl shadow-amber-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
              Most Popular Choice
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">Pro Trader</div>
              <p className="text-xs text-slate-400 mb-6">For serious retail traders seeking edge</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-amber-400 font-mono">
                  {billingCycle === 'annual' ? '$39' : '$49'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  Connect up to 5 Live Broker Accounts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  15 Simultaneously Running Bots
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  All AI Neural Presets & Volatility Guards
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  Sub-15ms Equinix Data Center Bridge
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  Instant Telegram / Discord Alerts
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setAuthModalOpen(true);
              }}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              Start 14-Day Free Pro Trial
            </button>
          </div>

          {/* Institutional VIP Plan */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold text-white mb-1">Institutional VIP</div>
              <p className="text-xs text-slate-400 mb-6">For funds, prop desks & high-volume accounts</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  {billingCycle === 'annual' ? '$119' : '$149'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  Unlimited Live & Demo Broker Connections
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  Unlimited Active Bots
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  Custom Dedicated FIX API Gateway
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  Priority 24/7 VIP Account Director
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setAuthModalOpen(true);
              }}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
            >
              Contact VIP Institutional
            </button>
          </div>
        </div>
      </section>

      {/* Security & Non-Custodial Architecture */}
      <section className="py-16 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Non-Custodial Security</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  botXchange never holds your capital. All balances remain protected in your regulated broker account under investor compensation fund rules.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">256-Bit TLS & Investor Passwords</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect using standard MT4/MT5 Investor Passwords for read-only analytics or secure execution tokens encrypted with AES-256 standard.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Hard Risk & Drawdown Circuit Breakers</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated kill switches instantly close open positions and halt bots if account drawdown touches your predefined threshold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Got Questions?</div>
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div
              key={f.q}
              className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-amber-400 transition cursor-pointer text-sm sm:text-base"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Automate Your Forex Trading?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Join over 180,000 algorithmic traders across 150+ countries. Set up your first demo bot in under 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => login(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base transition shadow-xl shadow-amber-500/25 cursor-pointer"
            >
              Launch Instant Demo Cockpit
            </button>
            <button
              onClick={() => {
                setAuthModalMode('login');
                setAuthModalOpen(true);
              }}
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition cursor-pointer"
            >
              Member Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white mb-1">
                bot<span className="text-amber-400 font-black">X</span>change
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                The World&apos;s Automated Trading Network. AI-powered algorithms for MetaTrader 4, MetaTrader 5, and cTrader.
              </p>
            </div>

            {/* Mobile App Placeholder Buttons */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 cursor-pointer hover:border-slate-700">
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase">Download on</div>
                  <div className="text-xs font-bold text-white">Apple App Store</div>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 cursor-pointer hover:border-slate-700">
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Regulatory Risk Warning:</strong> Forex and CFD trading involves significant risk of loss and is not suitable for all investors. Algorithmic trading and historical backtesting do not guarantee future results. botXchange is a software provider and not a broker, custodian, or financial advisor. All trades are executed directly through your third-party regulated broker.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-400">
            <div>&copy; 2026 botXchange Global Technologies Ltd. All rights reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer">Risk Disclosure</span>
              <span className="hover:text-slate-300 cursor-pointer">Security Whitepaper</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
