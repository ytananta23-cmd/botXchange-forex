import React, { useState } from 'react';
import {
  Network,
  PlusCircle,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Server,
  Zap,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BrokerManagementView: React.FC = () => {
  const {
    brokers,
    selectedBroker,
    setSelectedBroker,
    disconnectBroker,
    setOnboardingOpen,
    addToast,
  } = useApp();

  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [disconnectConfirmId, setDisconnectConfirmId] = useState<string | null>(null);

  const handleSync = (brokerId: string) => {
    setIsSyncing(brokerId);
    setTimeout(() => {
      setIsSyncing(null);
      addToast({
        title: 'Broker Bridge Synchronized',
        message: 'Account balances, margin levels, and open tickets re-polled via FIX bridge.',
        type: 'success',
      });
    }, 900);
  };

  const handleConfirmDisconnect = (brokerId: string) => {
    disconnectBroker(brokerId);
    setDisconnectConfirmId(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Broker Bridges
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            MetaTrader 4/5 and cTrader low-latency server connections.
          </p>
        </div>

        <button
          onClick={() => setOnboardingOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Connect New Broker</span>
        </button>
      </div>

      {/* Non-Custodial Safety Callout */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Strictly Non-Custodial:</strong> botXchange never holds, pools, or touches your trading capital. All balances reside solely with your regulated broker (IC Markets, Pepperstone, OANDA, etc.). Only trade orders are routed via encrypted FIX API connections.
        </div>
      </div>

      {/* Broker List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {brokers.map((b) => {
          const isSelected = selectedBroker?.id === b.id;

          return (
            <div
              key={b.id}
              className={`p-6 rounded-2xl bg-[#0e1420] border transition shadow-xl space-y-5 ${
                isSelected ? 'border-amber-500/80 shadow-amber-500/5' : 'border-slate-800'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-amber-400 text-sm">
                    {b.platform}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <span>{b.brokerName}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                          PRIMARY
                        </span>
                      )}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      #{b.accountNumber} • {b.accountType}
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    CONNECTED
                  </span>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Balance</div>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">
                    ${b.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Equity</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    ${b.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Free Margin</div>
                  <div className="font-mono font-bold text-slate-300 text-sm mt-0.5">
                    ${(b.equity * 0.92).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Server Details */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Server Node:</span>
                  <span className="font-mono text-slate-200">{b.serverName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency to VPS:</span>
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {b.pingMs}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Access Mode:</span>
                  <span className="text-slate-200">
                    {b.isReadOnly ? 'Read-Only (Investor)' : 'Trade Execution (Full)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSync(b.id)}
                    disabled={isSyncing === b.id}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-750 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing === b.id ? 'animate-spin' : ''}`} />
                    <span>{isSyncing === b.id ? 'Syncing...' : 'Sync Now'}</span>
                  </button>

                  {!isSelected && (
                    <button
                      onClick={() => setSelectedBroker(b)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Set Primary
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDisconnectConfirmId(b.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  title="Disconnect broker bridge"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Disconnect Modal inline */}
              {disconnectConfirmId === b.id && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs space-y-2">
                  <p className="text-red-400 font-semibold">
                    Are you sure you want to disconnect {b.brokerName}? Any running bots tied to this bridge will pause.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirmDisconnect(b.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded cursor-pointer"
                    >
                      Confirm Disconnect
                    </button>
                    <button
                      onClick={() => setDisconnectConfirmId(null)}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
