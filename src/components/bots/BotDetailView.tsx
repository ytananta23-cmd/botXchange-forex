import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Trash2,
  Sliders,
  TrendingUp,
  Activity,
  ShieldCheck,
  Clock,
  CheckCircle2,
  DollarSign,
  Layers,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Bot, Trade } from '../../types';
import { TradingViewChart } from '../TradingViewChart';
import { apiClient } from '../../services/apiClient';

export const BotDetailView: React.FC = () => {
  const {
    selectedBotId,
    bots,
    toggleBotStatus,
    deleteBot,
    setCurrentView,
    addToast,
  } = useApp();

  const [bot, setBot] = useState<Bot | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    if (!selectedBotId) {
      if (bots.length > 0) setBot(bots[0]);
      return;
    }
    const found = bots.find((b) => b.id === selectedBotId);
    if (found) {
      setBot(found);
      setEditedName(found.name);
    }
  }, [selectedBotId, bots]);

  useEffect(() => {
    const loadBotTrades = async () => {
      const allTrades = await apiClient.broker.getPositions();
      if (bot) {
        setTrades(allTrades.filter((t) => t.botId === bot.id || t.symbol.includes('EUR') || t.symbol.includes('XAU')));
      } else {
        setTrades(allTrades);
      }
    };
    loadBotTrades();
  }, [bot]);

  if (!bot) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No bot selected.</p>
        <button
          onClick={() => setCurrentView('bots')}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs"
        >
          Return to My Bots
        </button>
      </div>
    );
  }

  const handleSaveEdit = async () => {
    try {
      await apiClient.bots.update(bot.id, { name: editedName });
      setBot((prev) => (prev ? { ...prev, name: editedName } : prev));
      setIsEditing(false);
      addToast({
        title: 'Bot Config Updated',
        message: 'Name and parameters saved successfully.',
        type: 'success',
      });
    } catch {
      addToast({
        title: 'Update Failed',
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('bots')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Back to bots"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-bold text-lg"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {bot.name}
                </h1>
              )}

              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
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
                <span>{bot.status}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="font-mono font-bold text-amber-400">{bot.symbol}</span>
              <span>•</span>
              <span>Strategy: <strong className="text-slate-200">{bot.strategy}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Last checked: <strong>{bot.lastChecked || '1 min ago'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Controls: Pause / Resume / Edit / Delete */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBotStatus(bot.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              bot.status === 'RUNNING'
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {bot.status === 'RUNNING' ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Bot</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Bot</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Edit bot parameters"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              deleteBot(bot.id);
              setCurrentView('bots');
            }}
            className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
            title="Archive bot"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Bot Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Total Accumulated P&L</div>
          <div
            className={`text-2xl font-black font-mono tracking-tight ${
              bot.totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {bot.totalPnl >= 0 ? `+$${bot.totalPnl.toFixed(2)}` : `-$${Math.abs(bot.totalPnl).toFixed(2)}`}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold font-mono mt-1">
            +{bot.totalPnlPercent.toFixed(2)}% ROI
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Historical Win Rate</div>
          <div className="text-2xl font-black text-white font-mono tracking-tight">
            {bot.winRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {bot.winningTrades} Wins / {bot.losingTrades} Losses
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Profit Factor</div>
          <div className="text-2xl font-black text-amber-400 font-mono tracking-tight">
            {bot.profitFactor.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Avg Trade: +${bot.avgProfit.toFixed(1)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Max Recorded Drawdown</div>
          <div className="text-2xl font-black text-red-400 font-mono tracking-tight">
            {bot.maxDrawdown}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Hard Stop at {bot.riskSettings.maxDrawdownPercent}%
          </div>
        </div>
      </div>

      {/* Embedded TradingView Chart with Custom Overlay */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Market Execution Feed & Overlay Markers</span>
            <span className="text-xs text-slate-400 font-normal">
              Official TradingView Interactive Stream
            </span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            FIX Order Fill Latency: 16ms
          </span>
        </div>

        <TradingViewChart
          symbol={bot.symbol}
          theme="dark"
          height={440}
          interval="15"
          showOverlay={true}
          trades={trades}
          entryPrice={trades[0]?.entryPrice || 1.0845}
          takeProfit={trades[0]?.takeProfit || 1.0910}
          stopLoss={trades[0]?.stopLoss || 1.0790}
          botName={bot.name}
        />
      </div>

      {/* Bot Configuration Parameters Box */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Active Mathematical Parameters</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400">Allocated Capital</div>
            <div className="font-mono font-bold text-white text-sm mt-1">
              ${bot.investmentAmount.toLocaleString()} {bot.currency}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400">Stop Loss Protection</div>
            <div className="font-mono font-bold text-red-400 text-sm mt-1">
              {bot.riskSettings.stopLossPips} pips
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400">Take Profit Target</div>
            <div className="font-mono font-bold text-emerald-400 text-sm mt-1">
              {bot.riskSettings.takeProfitPips} pips
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400">Trailing Stop Mechanism</div>
            <div className="font-mono font-bold text-amber-400 text-sm mt-1">
              {bot.riskSettings.trailingStop ? `Enabled (${bot.riskSettings.trailingStopPips} pips)` : 'Disabled'}
            </div>
          </div>
        </div>

        {bot.indicators.useRSI && (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              Active Indicators: RSI ({bot.indicators.rsiPeriod} Period, Oversold {bot.indicators.rsiOversold} / Overbought {bot.indicators.rsiOverbought})
              {bot.indicators.useMACD && ' • MACD (12/26/9)'}
              {bot.indicators.useCCI && ' • CCI (20)'}
            </span>
          </div>
        )}
      </div>

      {/* Trade History Table */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Bot Order Fill History</h3>
          <span className="text-xs text-slate-400">{trades.length} Recorded Executions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Open Time</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Lot Size</th>
                <th className="py-3 px-4">Fill Price</th>
                <th className="py-3 px-4">Exit Price</th>
                <th className="py-3 px-4 text-right">PnL ($)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {trades.map((t) => (
                <tr key={t.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 text-slate-400 font-mono">{t.openTime}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        t.type === 'BUY'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{t.lotSize}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{t.entryPrice}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {t.exitPrice || t.currentPrice || 'In Progress'}
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
