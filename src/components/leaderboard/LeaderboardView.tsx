import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Flame,
  Users,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Copy,
  Sliders,
  X,
  Zap,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeaderboardView: React.FC = () => {
  const { user, addToast } = useApp();

  const [filterPeriod, setFilterPeriod] = useState<'WEEK' | 'MONTH' | 'ALL'>('MONTH');
  const [filterStrategy, setFilterStrategy] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOptedIn, setIsOptedIn] = useState(true);

  // Copy Bot Modal
  const [copyModalBot, setCopyModalBot] = useState<any | null>(null);
  const [copyAmount, setCopyAmount] = useState(2500);
  const [riskMultiplier, setRiskMultiplier] = useState(1.0);
  const [isSubmittingCopy, setIsSubmittingCopy] = useState(false);

  const leaderboardTraders = [
    {
      rank: 1,
      name: 'Apex Capital Quantum',
      country: '🇸🇬',
      botName: 'Titanium Gold Scalper v5',
      pair: 'XAU/USD',
      strategy: 'AI_PRESET',
      monthlyReturn: 48.6,
      winRate: 88.4,
      maxDd: 3.8,
      copiers: 3412,
      aum: '$4.2M',
    },
    {
      rank: 2,
      name: 'Zurich Algo Lab',
      country: '🇨🇭',
      botName: 'Swiss Franc Liquidity Master',
      pair: 'USD/CHF',
      strategy: 'GRID',
      monthlyReturn: 41.2,
      winRate: 84.9,
      maxDd: 4.2,
      copiers: 2180,
      aum: '$2.8M',
    },
    {
      rank: 3,
      name: 'London Flow FX',
      country: '🇬🇧',
      botName: 'Cable Dragon Volatility Pulse',
      pair: 'GBP/JPY',
      strategy: 'DCA',
      monthlyReturn: 37.8,
      winRate: 82.1,
      maxDd: 5.1,
      copiers: 1890,
      aum: '$1.9M',
    },
    {
      rank: 4,
      name: 'Tokyo Trend Matrix',
      country: '🇯🇵',
      botName: 'Nikkei Micro Rebound',
      pair: 'USD/JPY',
      strategy: 'AI_PRESET',
      monthlyReturn: 33.5,
      winRate: 79.5,
      maxDd: 4.9,
      copiers: 1420,
      aum: '$1.4M',
    },
    {
      rank: 5,
      name: 'Nordic Quant Tech',
      country: '🇸🇪',
      botName: 'Viking Alpha Arbitrage',
      pair: 'EUR/USD',
      strategy: 'GRID',
      monthlyReturn: 29.8,
      winRate: 81.2,
      maxDd: 3.4,
      copiers: 980,
      aum: '$890K',
    },
    {
      rank: 6,
      name: 'Sterling FX Labs',
      country: '🇦🇺',
      botName: 'Aussie High Roller Wave',
      pair: 'AUD/USD',
      strategy: 'CUSTOM',
      monthlyReturn: 27.2,
      winRate: 77.8,
      maxDd: 5.6,
      copiers: 840,
      aum: '$720K',
    },
  ];

  const filteredTraders = leaderboardTraders.filter((t) => {
    const matchesStrategy = filterStrategy === 'ALL' || t.strategy === filterStrategy;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.botName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.pair.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStrategy && matchesSearch;
  });

  const handleConfirmCopy = () => {
    setIsSubmittingCopy(true);
    setTimeout(() => {
      setIsSubmittingCopy(false);
      setCopyModalBot(null);
      addToast({
        title: 'Bot Copy Activated!',
        message: `Now mirroring ${copyModalBot.botName} trades with $${copyAmount.toLocaleString()} allocation at ${riskMultiplier}x risk.`,
        type: 'success',
      });
    }, 700);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Global Algorithmic Leaderboard
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
              VERIFIED BROKER TRACK RECORDS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Top performing automated algorithms across 150+ countries. 1-click mirror execution.
          </p>
        </div>

        {/* Public Opt-in Toggle */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isOptedIn}
              onChange={(e) => {
                setIsOptedIn(e.target.checked);
                addToast({
                  title: e.target.checked ? 'Public Leaderboard Enabled' : 'Private Mode Active',
                  message: e.target.checked
                    ? 'Your bots are now competing on the global rank board.'
                    : 'Your trading telemetry is now hidden from public leaderboards.',
                  type: 'info',
                });
              }}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 w-4 h-4 cursor-pointer"
            />
            <span>Rank my bots publicly</span>
          </label>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Silver #2 */}
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-700/80 shadow-xl flex flex-col justify-between order-2 md:order-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-slate-700 text-slate-200 font-black text-sm flex items-center justify-center">
                #2
              </span>
              <span className="text-xs text-slate-400">{leaderboardTraders[1].country} Zurich, CH</span>
            </div>
            <h3 className="font-bold text-white text-base truncate">
              {leaderboardTraders[1].botName}
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">{leaderboardTraders[1].name}</div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-slate-400">30D ROI</div>
                <div className="text-xl font-mono font-black text-emerald-400">
                  +{leaderboardTraders[1].monthlyReturn}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Win Rate</div>
                <div className="text-xl font-mono font-black text-white">
                  {leaderboardTraders[1].winRate}%
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCopyModalBot(leaderboardTraders[1])}
            className="w-full mt-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Mirror Algorithm</span>
          </button>
        </div>

        {/* Gold #1 Champion */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/15 via-[#0e1420] to-[#0e1420] border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10 flex flex-col justify-between order-1 md:order-2 relative overflow-hidden -translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                #1
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-[10px] flex items-center gap-1">
                <Flame className="w-3 h-3" />
                GLOBAL ALPHA CHAMPION
              </span>
            </div>
            <h3 className="font-extrabold text-white text-lg truncate">
              {leaderboardTraders[0].botName}
            </h3>
            <div className="text-xs text-amber-300 font-medium mt-0.5">
              {leaderboardTraders[0].name} ({leaderboardTraders[0].country})
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-slate-400">30D ROI</div>
                <div className="text-2xl font-mono font-black text-emerald-400">
                  +{leaderboardTraders[0].monthlyReturn}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Win Rate</div>
                <div className="text-2xl font-mono font-black text-white">
                  {leaderboardTraders[0].winRate}%
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCopyModalBot(leaderboardTraders[0])}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Mirror Champion Bot (1-Click)</span>
          </button>
        </div>

        {/* Bronze #3 */}
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-750 shadow-xl flex flex-col justify-between order-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-800/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-amber-800/80 text-amber-200 font-black text-sm flex items-center justify-center">
                #3
              </span>
              <span className="text-xs text-slate-400">{leaderboardTraders[2].country} London, UK</span>
            </div>
            <h3 className="font-bold text-white text-base truncate">
              {leaderboardTraders[2].botName}
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">{leaderboardTraders[2].name}</div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-slate-400">30D ROI</div>
                <div className="text-xl font-mono font-black text-emerald-400">
                  +{leaderboardTraders[2].monthlyReturn}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Win Rate</div>
                <div className="text-xl font-mono font-black text-white">
                  {leaderboardTraders[2].winRate}%
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCopyModalBot(leaderboardTraders[2])}
            className="w-full mt-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Mirror Algorithm</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {(['WEEK', 'MONTH', 'ALL'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterPeriod === p ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              {p === 'WEEK' ? 'This Week' : p === 'MONTH' ? 'This Month (30D)' : 'All Time'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by bot, creator, or asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Bot / Creator</th>
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4">Strategy</th>
                <th className="py-3 px-4">30D ROI</th>
                <th className="py-3 px-4">Win Rate</th>
                <th className="py-3 px-4">Max DD</th>
                <th className="py-3 px-4">Copiers</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredTraders.map((t) => (
                <tr key={t.rank} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">
                    #{t.rank}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>{t.botName}</span>
                      <span>{t.country}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t.name}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">{t.pair}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                      {t.strategy}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-sm">
                    +{t.monthlyReturn}%
                  </td>
                  <td className="py-3 px-4 font-mono text-white font-semibold">{t.winRate}%</td>
                  <td className="py-3 px-4 font-mono text-red-400">{t.maxDd}%</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{t.copiers.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setCopyModalBot(t)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold transition cursor-pointer text-xs"
                    >
                      Mirror
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Copy Bot Modal */}
      {copyModalBot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0e1420] border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-5">
            <button
              onClick={() => setCopyModalBot(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold mb-2">
                <Copy className="w-3 h-3" />
                <span>1-CLICK BOT MIRRORING</span>
              </div>
              <h3 className="text-xl font-bold text-white">Mirror {copyModalBot.botName}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Trades will be automatically duplicated to your connected MetaTrader / cTrader account in real time.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Mirror Allocation Capital</span>
                  <span className="font-mono text-amber-400 font-bold">
                    ${copyAmount.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={500}
                  value={copyAmount}
                  onChange={(e) => setCopyAmount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Lot Risk Multiplier</span>
                  <span className="font-mono text-white font-bold">{riskMultiplier}x</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={riskMultiplier}
                  onChange={(e) => setRiskMultiplier(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  1.0x copies identical proportion relative to your account equity.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Includes auto-stop loss protection: Copying automatically suspends if trader drawdown reaches 6%.
              </span>
            </div>

            <button
              onClick={handleConfirmCopy}
              disabled={isSubmittingCopy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmittingCopy ? 'Deploying Mirror Engine...' : 'Authorize Mirror Bot'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
