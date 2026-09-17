import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Search,
  Sparkles,
  Layers,
  Activity,
  Sliders,
  ShieldCheck,
  DollarSign,
  Zap,
  Info,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BotStrategy, BotIndicators, BotRiskSettings } from '../../types';
import { TradingViewChart } from '../TradingViewChart';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const BotWizardView: React.FC = () => {
  const { addNewBot, setCurrentView, brokers, selectedBroker, addToast } = useApp();

  const [step, setStep] = useState<number>(1);

  // Wizard Fields
  const [botName, setBotName] = useState('My AI Alpha Bot');
  const [selectedPair, setSelectedPair] = useState('FX:EURUSD');
  const [pairSearch, setPairSearch] = useState('');
  const [strategy, setStrategy] = useState<BotStrategy>('AI_PRESET');
  const [investmentAmount, setInvestmentAmount] = useState<number>(3000);
  const [brokerId, setBrokerId] = useState<string>(selectedBroker?.id || (brokers[0]?.id || ''));

  // Indicator Settings
  const [indicators, setIndicators] = useState<BotIndicators>({
    useRSI: true,
    rsiPeriod: 14,
    rsiOversold: 30,
    rsiOverbought: 70,
    useMACD: true,
    macdFast: 12,
    macdSlow: 26,
    macdSignal: 9,
    useCCI: false,
    cciPeriod: 20,
    cciLevel: 100,
  });

  // Risk Settings
  const [riskSettings, setRiskSettings] = useState<BotRiskSettings>({
    stopLossPips: 40,
    takeProfitPips: 65,
    maxDrawdownPercent: 6,
    maxOpenTrades: 3,
    trailingStop: true,
    trailingStopPips: 20,
  });

  // Specific Strategy Params
  const [gridLevels, setGridLevels] = useState<number>(12);
  const [dcaMultiplier, setDcaMultiplier] = useState<number>(1.3);

  const availablePairs = [
    { symbol: 'FX:EURUSD', label: 'EUR/USD', type: 'Major Forex', desc: 'Lowest spreads, highest liquidity' },
    { symbol: 'OANDA:XAUUSD', label: 'XAU/USD (Gold)', type: 'Precious Metals', desc: 'High volatility, massive profit swings' },
    { symbol: 'FX:GBPJPY', label: 'GBP/JPY', type: 'Cross Forex', desc: 'The Dragon: trending volatility specialist' },
    { symbol: 'BINANCE:BTCUSDT', label: 'BTC/USDT', type: 'Crypto 24/7', desc: 'Trades uninterrupted through weekends' },
    { symbol: 'FX:USDJPY', label: 'USD/JPY', type: 'Major Forex', desc: 'BoJ rate dynamic trends' },
    { symbol: 'FX:GBPUSD', label: 'GBP/USD', type: 'Major Forex', desc: 'London session volume driver' },
  ];

  const filteredPairs = availablePairs.filter(
    (p) =>
      p.label.toLowerCase().includes(pairSearch.toLowerCase()) ||
      p.symbol.toLowerCase().includes(pairSearch.toLowerCase())
  );

  const handleLaunch = async () => {
    try {
      await addNewBot({
        name: botName,
        symbol: selectedPair,
        strategy,
        investmentAmount,
        brokerId,
        indicators,
        riskSettings,
        gridLevels,
        dcaMultiplier,
        aiPresetDescription:
          strategy === 'AI_PRESET'
            ? 'Neural network algorithm trained on real liquidity order books.'
            : undefined,
      });
      setCurrentView('bots');
    } catch {
      addToast({
        title: 'Launch Failed',
        message: 'Could not initialize bot on broker server.',
        type: 'error',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-850 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Bot Creation Wizard
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
              STEP {step} OF 6
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure your automated institutional trading bot in 6 guided steps.
          </p>
        </div>

        {/* Progress Pill Steps */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step
                  ? 'w-7 bg-amber-400'
                  : s < step
                  ? 'w-4 bg-emerald-400'
                  : 'w-3 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: CHOOSE PAIR */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Step 1: Choose Trading Instrument</h3>
            <p className="text-xs text-slate-400">
              Select the Forex pair, commodity, or crypto market your bot will trade.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search pair or symbol (e.g. EURUSD, Gold, Bitcoin)..."
              value={pairSearch}
              onChange={(e) => setPairSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredPairs.map((p) => (
              <button
                key={p.symbol}
                type="button"
                onClick={() => setSelectedPair(p.symbol)}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  selectedPair === p.symbol
                    ? 'bg-amber-500/10 border-amber-500/80 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-base text-white">{p.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {p.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{p.desc}</div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-slate-500">{p.symbol}</div>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Strategy Selection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CHOOSE STRATEGY */}
      {step === 2 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Step 2: Choose Algorithmic Strategy</h3>
            <p className="text-xs text-slate-400">
              Select the core mathematical model governing trade execution logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Preset */}
            <div
              onClick={() => setStrategy('AI_PRESET')}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                strategy === 'AI_PRESET'
                  ? 'bg-amber-500/10 border-amber-500/80 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">AI Neural Preset</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deep machine learning transformer that dynamically detects market regime shifts, volatility squeezes, and institutional liquidity blocks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono font-semibold">
                Historical Win Rate: 82.4% • Max DD: 5.2%
              </div>
            </div>

            {/* GRID Trading */}
            <div
              onClick={() => setStrategy('GRID')}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                strategy === 'GRID'
                  ? 'bg-blue-500/10 border-blue-500/80 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">
                    RANGE MASTER
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Multi-Level Grid Trading</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Generates geometric ladder buy/sell limit orders around current price to profit off natural consolidating market oscillations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-400 font-mono font-semibold">
                High Trade Frequency • Ideal for EUR/USD
              </div>
            </div>

            {/* DCA Automation */}
            <div
              onClick={() => setStrategy('DCA')}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                strategy === 'DCA'
                  ? 'bg-emerald-500/10 border-emerald-500/80 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    ACCUMULATOR
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Smart DCA Automation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Averages entry cost on pullbacks with strict lot multiplier safety caps and trailing profit exit thresholds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono font-semibold">
                Fast Break-even Trailing • Low Drawdown
              </div>
            </div>

            {/* Custom Multi-Indicator */}
            <div
              onClick={() => setStrategy('CUSTOM')}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                strategy === 'CUSTOM'
                  ? 'bg-purple-500/10 border-purple-500/80 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-bold">
                    FULL CUSTOM
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Custom Indicator Logic</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Build manual algorithmic conditions combining RSI divergences, MACD zero-line crosses, and CCI trend filters.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-400 font-mono font-semibold">
                Discretionary Rule Automation
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Capital & Name</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INVESTMENT AMOUNT & BOT IDENTITY */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Step 3: Investment Allocation & Identity</h3>
            <p className="text-xs text-slate-400">
              Set dedicated capital limits and target broker connection for this bot.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bot Name</label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Broker Account
              </label>
              <select
                value={brokerId}
                onChange={(e) => setBrokerId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              >
                {brokers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brokerName} ({b.platform} #{b.accountNumber} - ${b.equity.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Allocated Capital Limit
                </label>
                <span className="text-base font-black font-mono text-amber-400">
                  ${investmentAmount.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={25000}
                step={500}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>$500 Min</span>
                <span>$10,000 Recommended</span>
                <span>$25,000 Max</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Technical Indicators</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TECHNICAL INDICATOR CONFIG */}
      {step === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Step 4: Indicator Triggers & Fine-Tuning</h3>
            <p className="text-xs text-slate-400">
              Configure technical analysis filters (RSI, MACD, CCI) for precision entry confirmations.
            </p>
          </div>

          <div className="space-y-6 divide-y divide-slate-800/80">
            {/* RSI */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rsi-check"
                    checked={indicators.useRSI}
                    onChange={(e) =>
                      setIndicators({ ...indicators, useRSI: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="rsi-check" className="text-sm font-bold text-white cursor-pointer">
                    Relative Strength Index (RSI)
                  </label>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  Period: {indicators.rsiPeriod} • Levels: {indicators.rsiOversold}/{indicators.rsiOverbought}
                </span>
              </div>

              {indicators.useRSI && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-6">
                  <div>
                    <label className="text-xs text-slate-400">RSI Period</label>
                    <input
                      type="number"
                      value={indicators.rsiPeriod}
                      onChange={(e) =>
                        setIndicators({ ...indicators, rsiPeriod: Number(e.target.value) })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Oversold (Buy Zone)</label>
                    <input
                      type="number"
                      value={indicators.rsiOversold}
                      onChange={(e) =>
                        setIndicators({ ...indicators, rsiOversold: Number(e.target.value) })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Overbought (Sell Zone)</label>
                    <input
                      type="number"
                      value={indicators.rsiOverbought}
                      onChange={(e) =>
                        setIndicators({ ...indicators, rsiOverbought: Number(e.target.value) })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* MACD */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="macd-check"
                    checked={indicators.useMACD}
                    onChange={(e) =>
                      setIndicators({ ...indicators, useMACD: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="macd-check" className="text-sm font-bold text-white cursor-pointer">
                    Moving Average Convergence Divergence (MACD)
                  </label>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {indicators.macdFast}/{indicators.macdSlow}/{indicators.macdSignal}
                </span>
              </div>
            </div>

            {/* CCI */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cci-check"
                    checked={indicators.useCCI}
                    onChange={(e) =>
                      setIndicators({ ...indicators, useCCI: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="cci-check" className="text-sm font-bold text-white cursor-pointer">
                    Commodity Channel Index (CCI)
                  </label>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Period: {indicators.cciPeriod} • Level: ±{indicators.cciLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Risk Management</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RISK MANAGEMENT */}
      {step === 5 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Step 5: Institutional Risk Controls</h3>
            <p className="text-xs text-slate-400">
              Hard stop protection to preserve capital and prevent catastrophic drawdown.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Stop Loss (SL)</span>
                <span className="font-mono text-red-400 font-bold">{riskSettings.stopLossPips} pips</span>
              </div>
              <input
                type="range"
                min={15}
                max={200}
                value={riskSettings.stopLossPips}
                onChange={(e) =>
                  setRiskSettings({ ...riskSettings, stopLossPips: Number(e.target.value) })
                }
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Take Profit (TP)</span>
                <span className="font-mono text-emerald-400 font-bold">{riskSettings.takeProfitPips} pips</span>
              </div>
              <input
                type="range"
                min={20}
                max={400}
                value={riskSettings.takeProfitPips}
                onChange={(e) =>
                  setRiskSettings({ ...riskSettings, takeProfitPips: Number(e.target.value) })
                }
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Hard Max Drawdown Cap</span>
                <span className="font-mono text-amber-400 font-bold">{riskSettings.maxDrawdownPercent}%</span>
              </div>
              <input
                type="range"
                min={2}
                max={20}
                value={riskSettings.maxDrawdownPercent}
                onChange={(e) =>
                  setRiskSettings({ ...riskSettings, maxDrawdownPercent: Number(e.target.value) })
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Bot instantly halts if account equity drops by this threshold.
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Max Simultaneous Trades</span>
                <span className="font-mono text-white font-bold">{riskSettings.maxOpenTrades} positions</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={riskSettings.maxOpenTrades}
                onChange={(e) =>
                  setRiskSettings({ ...riskSettings, maxOpenTrades: Number(e.target.value) })
                }
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Final Review & Live Chart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: FINAL REVIEW & LIVE CHART */}
      {step === 6 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <Check className="w-3.5 h-3.5" />
              <span>Ready for Cloud VPS Deployment</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Review & Launch Bot</h3>
            <p className="text-xs text-slate-400">
              Verify your bot parameters against the live TradingView market feed before confirming execution.
            </p>
          </div>

          {/* Live Chart Preview */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Live TradingView Stream Preview</div>
            <TradingViewChart
              symbol={selectedPair}
              theme="dark"
              height={320}
              interval="15"
              showOverlay={true}
              botName={botName}
            />
          </div>

          {/* Config Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Bot Name</div>
              <div className="font-bold text-white mt-0.5 truncate">{botName}</div>
            </div>
            <div>
              <div className="text-slate-400">Symbol</div>
              <div className="font-bold text-amber-400 font-mono mt-0.5">{selectedPair}</div>
            </div>
            <div>
              <div className="text-slate-400">Strategy</div>
              <div className="font-bold text-white mt-0.5">{strategy}</div>
            </div>
            <div>
              <div className="text-slate-400">Allocation</div>
              <div className="font-bold text-emerald-400 font-mono mt-0.5">
                ${investmentAmount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-slate-400">Stop Loss</div>
              <div className="font-mono text-red-400 font-semibold">{riskSettings.stopLossPips} pips</div>
            </div>
            <div>
              <div className="text-slate-400">Take Profit</div>
              <div className="font-mono text-emerald-400 font-semibold">
                {riskSettings.takeProfitPips} pips
              </div>
            </div>
            <div>
              <div className="text-slate-400">Max DD Cap</div>
              <div className="font-mono text-amber-400 font-semibold">
                {riskSettings.maxDrawdownPercent}%
              </div>
            </div>
            <div>
              <div className="text-slate-400">Max Open Orders</div>
              <div className="font-mono text-white font-semibold">{riskSettings.maxOpenTrades}</div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setStep(5)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleLaunch}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm transition shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Deploy Bot to Broker Bridge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
