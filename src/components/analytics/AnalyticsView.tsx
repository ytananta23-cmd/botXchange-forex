import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Activity,
  Award,
  Filter,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { apiClient } from '../../services/apiClient';
import { useApp } from '../../context/AppContext';
import { ChartSkeleton } from '../common/SkeletonLoader';

export const AnalyticsView: React.FC = () => {
  const { addToast } = useApp();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('3M');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const res = await apiClient.analytics.getOverview();
      setData(res);
      setIsLoading(false);
    };
    load();
  }, [timeRange]);

  const strategyData = [
    { name: 'AI Neural Preset', value: 54, color: '#F59E0B' },
    { name: 'Grid Oscillation', value: 28, color: '#3B82F6' },
    { name: 'Smart DCA', value: 18, color: '#10B981' },
  ];

  const monthlyReturns = [
    { month: 'Oct', return: 7.4 },
    { month: 'Nov', return: 9.2 },
    { month: 'Dec', return: -1.8 },
    { month: 'Jan', return: 11.5 },
    { month: 'Feb', return: 8.6 },
    { month: 'Mar', return: 14.2 },
  ];

  const pairStats = [
    { pair: 'XAU/USD (Gold)', trades: 68, winRate: 85.2, profit: '+$6,420' },
    { pair: 'EUR/USD', trades: 142, winRate: 81.0, profit: '+$4,890' },
    { pair: 'GBP/JPY', trades: 51, winRate: 76.4, profit: '+$3,110' },
    { pair: 'BTC/USDT', trades: 39, winRate: 74.3, profit: '+$2,250' },
  ];

  const handleExport = (type: 'CSV' | 'PDF') => {
    addToast({
      title: `Exporting Portfolio Ledger (${type})`,
      message: `Generated encrypted institutional ledger report for tax and auditing records.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Analytics &amp; Institutional Reports
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Deep algorithmic telemetry, Sharpe ratios, and monthly returns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-750 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Ratios Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400">Sharpe Ratio</div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">2.48</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Institutional Benchmark (&gt;2.0)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400">Profit Factor</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">2.64</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Gross Wins / Gross Losses</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400">Overall Win Rate</div>
          <div className="text-2xl font-black font-mono text-white mt-1">80.4%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Across 300 Executed Orders</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400">Max Historical Drawdown</div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">5.8%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Hard risk cap maintained</div>
        </div>
      </div>

      {/* Main Row: Equity Trajectory & Monthly Alpha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Compound Equity Trajectory</h3>
              <p className="text-xs text-slate-400">Daily balance accrual versus floating equity</p>
            </div>
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    timeRange === r ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {isLoading || !data ? (
            <ChartSkeleton height="h-64" />
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.equityCurve}>
                  <defs>
                    <linearGradient id="eqColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(v: any) => [`$${Number(v).toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#eqColor)"
                    name="Equity"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Monthly Returns Bar Chart */}
        <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Monthly ROI Distribution</h3>
            <p className="text-xs text-slate-400">Historical monthly performance yield</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(v: any) => [`${v}%`, 'Return']}
                />
                <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                  {monthlyReturns.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.return >= 0 ? '#10B981' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategy Allocation & Pair Performance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Breakdown Pie */}
        <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Strategy Capital Allocation</h3>
            <p className="text-xs text-slate-400">Distribution across trading models</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strategyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {strategyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(v: any) => [`${v}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {strategyData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-300 font-medium">{s.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pair Performance Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Instrument Performance Metrics</h3>
            <p className="text-xs text-slate-400">Profitability metrics classified per currency pair</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Executed Orders</th>
                  <th className="py-3 px-4">Win Rate</th>
                  <th className="py-3 px-4 text-right">Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {pairStats.map((p) => (
                  <tr key={p.pair} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 px-4 font-bold text-white font-mono">{p.pair}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{p.trades} orders</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{p.winRate}%</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                      {p.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
