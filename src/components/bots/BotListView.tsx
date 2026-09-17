import React, { useState } from 'react';
import {
  Bot,
  PlusCircle,
  Play,
  Pause,
  Sliders,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../common/EmptyState';

export const BotListView: React.FC = () => {
  const {
    bots,
    toggleBotStatus,
    deleteBot,
    navigateToBotDetail,
    setCurrentView,
  } = useApp();

  const [filterStrategy, setFilterStrategy] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBots = bots.filter((b) => {
    const matchesStrategy = filterStrategy === 'ALL' || b.strategy === filterStrategy;
    const matchesQuery =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStrategy && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            My Trading Bots
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor, orchestrate, and fine-tune your deployed algorithmic fleet.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('wizard')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Deploy New Bot</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Strategy Badges */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {['ALL', 'AI_PRESET', 'GRID', 'DCA', 'CUSTOM'].map((strat) => (
            <button
              key={strat}
              onClick={() => setFilterStrategy(strat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterStrategy === strat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {strat === 'ALL' ? 'All Strategies' : strat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by bot or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Bot Cards Grid */}
      {filteredBots.length === 0 ? (
        <EmptyState
          title="No trading bots found"
          description="You don't have any bots matching this filter. Launch your first automated trading bot in minutes."
          actionText="Deploy New Bot"
          onAction={() => setCurrentView('wizard')}
          icon={Bot}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBots.map((bot) => (
            <div
              key={bot.id}
              className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 hover:border-slate-700 transition shadow-xl flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Status & Symbol */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 font-mono text-xs font-bold text-amber-400 border border-slate-800">
                    {bot.symbol}
                  </span>

                  <button
                    onClick={() => toggleBotStatus(bot.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      bot.status === 'RUNNING'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        bot.status === 'RUNNING' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                      }`}
                    />
                    <span>{bot.status === 'RUNNING' ? 'ACTIVE' : 'PAUSED'}</span>
                  </button>
                </div>

                {/* Name */}
                <h3
                  onClick={() => navigateToBotDetail(bot.id)}
                  className="text-base font-bold text-white hover:text-amber-400 cursor-pointer transition truncate"
                  title={bot.name}
                >
                  {bot.name}
                </h3>

                <div className="text-xs text-slate-400 mt-1">
                  Strategy: <strong className="text-slate-300">{bot.strategy}</strong>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
                  <div>
                    <div className="text-[11px] text-slate-400">Total Net P&amp;L</div>
                    <div
                      className={`text-lg font-black font-mono mt-0.5 ${
                        bot.totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {bot.totalPnl >= 0 ? `+$${bot.totalPnl.toFixed(2)}` : `-$${Math.abs(bot.totalPnl).toFixed(2)}`}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono font-semibold">
                      +{bot.totalPnlPercent.toFixed(1)}% ROI
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-slate-400">Win Rate</div>
                    <div className="text-lg font-black font-mono text-white mt-0.5">
                      {bot.winRate}%
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {bot.winningTrades}W / {bot.losingTrades}L
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => navigateToBotDetail(bot.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inspect &amp; Trade Logs</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleBotStatus(bot.id)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    title={bot.status === 'RUNNING' ? 'Pause' : 'Start'}
                  >
                    {bot.status === 'RUNNING' ? (
                      <Pause className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Play className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteBot(bot.id)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition cursor-pointer"
                    title="Delete Bot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
