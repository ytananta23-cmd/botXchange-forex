import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Bot,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Clock,
  ChevronRight,
  RefreshCw,
  Trophy,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../services/apiClient';
import { TradingViewChart } from '../TradingViewChart';
import { CardSkeleton, ChartSkeleton } from '../common/SkeletonLoader';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const DashboardView: React.FC = () => {
  const {
    bots,
    selectedBroker,
    toggleBotStatus,
    navigateToBotDetail,
    setCurrentView,
    user,
    marketStatus,
    marketMessage,
  } = useApp();

  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const [overview, trades] = await Promise.all([
        apiClient.analytics.getOverview(),
        apiClient.broker.getPositions(),
      ]);
      setAnalyticsData(overview);
      setRecentTrades(trades);
    } catch (e) {
      console.error('Error fetching dashboard statistics:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const totalBalance = selectedBroker ? selectedBroker.balance : (analyticsData?.totalBalance || 48770.50);
  const totalEquity = selectedBroker ? selectedBroker.equity : (analyticsData?.totalEquity || 50406.80);
  const totalPnl = totalEquity - totalBalance;
  const totalPnlPercent = ((totalPnl) / (totalBalance || 1)) * 100;
  const activeBots = bots.filter((b) => b.status === 'RUNNING');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome & Market Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-850/80 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Trading Cockpit
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[11px]">
              PRO FEED
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Welcome, <strong className="text-slate-200">{user?.name || 'Valued Trader'}</strong>. All automated bots are synchronized with Equinix LD4 low-latency bridge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                marketStatus === 'OPEN' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-semibold text-slate-200">
              {marketStatus === 'OPEN' ? 'Market Open (London / NY)' : 'Market Closed (Weekend)'}
            </span>
          </div>

          <button
            onClick={() => setCurrentView('wizard')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deploy New Bot</span>
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <CardSkeleton count={4} className="h-28" />
        ) : (
          <>
            {/* Total Balance */}
            <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Total Account Balance</span>
                <DollarSign className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono tracking-tight">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                <span className="text-blue-400 font-semibold">{selectedBroker?.platform || 'MT5'}</span>
                <span>• Broker: #{selectedBroker?.accountNumber || '8934215'}</span>
              </div>
            </div>

            {/* Total Equity */}
            <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Net Portfolio Equity</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+${Math.abs(totalPnl).toFixed(2)} floating profit</span>
              </div>
            </div>

            {/* Active Bots */}
            <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Active Automated Bots</span>
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2">
                <span>{activeBots.length}</span>
                <span className="text-xs text-slate-400 font-normal">/ {bots.length} configured</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-2 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>24/5 Low-Latency Cloud VPS</span>
              </div>
            </div>

            {/* Global Win Rate / Total PnL */}
            <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Total Accumulated P&L</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div
                className={`text-2xl font-black font-mono tracking-tight ${
                  totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span className="text-emerald-400 font-bold font-mono">
                  +{totalPnlPercent.toFixed(2)}% ROI
                </span>
                <span>Win Rate: 80.4%</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Row: Equity Curve & TradingView Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve (Recharts) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Portfolio Equity Performance</span>
                <span className="text-xs text-emerald-400 font-mono font-semibold">+34.8% MTD</span>
              </h3>
              <p className="text-xs text-slate-400">Institutional equity drawdown and balance trajectory</p>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    timeframe === tf ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {isLoading || !analyticsData ? (
            <ChartSkeleton height="h-64" />
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.equityCurve}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#F8FAFC',
                    }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#equityGrad)"
                    name="Equity"
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#3B82F6"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#balanceGrad)"
                    name="Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Global Rank & Gamification Card */}
        <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Global Rank #142</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                Top 5%
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your bots outranked <strong>1,420 traders</strong> in the weekly automated challenge. Gain 12 more rank places to qualify for the VIP Profit Pool.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Current Tier:</span>
                <span className="font-bold text-amber-400">Diamond Master</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Weekly Net Alpha:</span>
                <span className="font-mono font-bold text-emerald-400">+28.4%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Active Copiers:</span>
                <span className="font-mono font-semibold text-white">64 Traders</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('leaderboard')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Full Leaderboard</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Official TradingView Embedded Live Price Chart Card */}
      <ErrorBoundary fallbackTitle="TradingView Chart Engine">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Live Tick Execution Chart</span>
              <span className="text-xs text-slate-400 font-normal">Official TradingView Advanced Stream</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Market Access (DMA)
            </span>
          </div>
          <TradingViewChart
            symbol="OANDA:XAUUSD"
            theme="dark"
            height={380}
            interval="15"
            showOverlay={true}
            entryPrice={2654.20}
            takeProfit={2675.00}
            stopLoss={2638.00}
            botName="Active Bridge: XAU/USD Smart Gold AI"
          />
        </div>
      </ErrorBoundary>

      {/* Active Bots Mini Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Active Trading Bots</h3>
            <p className="text-xs text-slate-400">Real-time status and live P&amp;L of your deployed automated bots</p>
          </div>
          <button
            onClick={() => setCurrentView('bots')}
            className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
          >
            Manage All Bots ({bots.length}) &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px] font-bold text-amber-400">
                    {bot.symbol}
                  </span>
                  {/* ON/OFF Switch */}
                  <button
                    onClick={() => toggleBotStatus(bot.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
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

                <div
                  onClick={() => navigateToBotDetail(bot.id)}
                  className="font-bold text-white text-sm hover:text-amber-400 cursor-pointer transition truncate"
                  title={bot.name}
                >
                  {bot.name}
                </div>

                <div className="text-[11px] text-slate-400 mt-0.5">
                  Strategy: <strong className="text-slate-300">{bot.strategy}</strong>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                  <div className="text-xs text-slate-400">Live P&amp;L</div>
                  <div
                    className={`text-base font-black font-mono ${
                      bot.totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {bot.totalPnl >= 0 ? `+$${bot.totalPnl.toFixed(2)}` : `-$${Math.abs(bot.totalPnl).toFixed(2)}`}
                    <span className="text-xs font-normal ml-1">
                      ({bot.totalPnlPercent >= 0 ? `+${bot.totalPnlPercent.toFixed(1)}%` : `${bot.totalPnlPercent.toFixed(1)}%`})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  Checked: {bot.lastChecked || 'Just now'}
                </span>
                <button
                  onClick={() => navigateToBotDetail(bot.id)}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Live Execution Feed</h3>
          <span className="text-xs text-slate-400">Institutional FIX Order Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Bot & Asset</th>
                <th className="py-3 px-4">Order Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Entry / Current</th>
                <th className="py-3 px-4 text-right">Profit / Loss</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {recentTrades.map((t) => (
                <tr key={t.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 text-slate-400 font-mono">{t.openTime}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{t.symbol}</div>
                    <div className="text-[10px] text-slate-500">{t.botName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] ${
                        t.type === 'BUY'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{t.lotSize} lots</td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {t.entryPrice} &rarr; {t.currentPrice || t.exitPrice}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-mono font-bold text-sm ${
                      t.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {t.pnl >= 0 ? `+$${t.pnl.toFixed(2)}` : `-$${Math.abs(t.pnl).toFixed(2)}`}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'OPEN'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
