import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Trade } from '../types';

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'dark' | 'light';
  height?: number | string;
  interval?: string;
  showOverlay?: boolean;
  trades?: Trade[];
  entryPrice?: number;
  takeProfit?: number;
  stopLoss?: number;
  botName?: string;
}

declare global {
  interface Window {
    TradingView?: any;
  }
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = 'FX:EURUSD',
  theme = 'dark',
  height = 420,
  interval = '15',
  showOverlay = false,
  trades = [],
  entryPrice,
  takeProfit,
  stopLoss,
  botName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetContainerId = useRef(`tradingview_widget_${Math.random().toString(36).substring(2, 9)}`);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState(symbol);

  useEffect(() => {
    setCurrentSymbol(symbol);
  }, [symbol]);

  // Load official TradingView tv.js script if not present
  useEffect(() => {
    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => setLoadError(true);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', () => setIsScriptLoaded(true));
      script.addEventListener('error', () => setLoadError(true));
    }

    // Safety timeout in case of blocked network
    const timer = setTimeout(() => {
      if (!window.TradingView) {
        setLoadError(true);
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize widget
  useEffect(() => {
    if (!isScriptLoaded || !window.TradingView || !containerRef.current) return;

    try {
      const container = document.getElementById(widgetContainerId.current);
      if (container) {
        container.innerHTML = '';
      }

      new window.TradingView.widget({
        autosize: true,
        symbol: currentSymbol,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: theme === 'dark' ? 'dark' : 'light',
        style: '1', // Candlestick
        locale: 'en',
        toolbar_bg: theme === 'dark' ? '#0B0F17' : '#F1F5F9',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: widgetContainerId.current,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        withdateranges: true,
        details: false,
        hotlist: false,
        calendar: false,
      });
      setLoadError(false);
    } catch (err) {
      console.warn('TradingView initialization notice:', err);
      setLoadError(true);
    }
  }, [isScriptLoaded, currentSymbol, theme, interval]);

  const handleRetry = () => {
    setLoadError(false);
    setIsScriptLoaded(false);
    const script = document.getElementById('tradingview-widget-script');
    if (script) script.remove();
    
    const newScript = document.createElement('script');
    newScript.id = 'tradingview-widget-script';
    newScript.src = 'https://s3.tradingview.com/tv.js';
    newScript.async = true;
    newScript.onload = () => setIsScriptLoaded(true);
    newScript.onerror = () => setLoadError(true);
    document.head.appendChild(newScript);
  };

  const quickPairs = [
    { label: 'EUR/USD', sym: 'FX:EURUSD' },
    { label: 'Gold (XAU)', sym: 'OANDA:XAUUSD' },
    { label: 'GBP/JPY', sym: 'FX:GBPJPY' },
    { label: 'Bitcoin', sym: 'BINANCE:BTCUSDT' },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-[#0e1420] border border-slate-800 overflow-hidden shadow-xl flex flex-col">
      {/* Top Header / Quick switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentSymbol}</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">Official TradingView Advanced Stream</span>
        </div>

        {/* Quick Symbol Buttons */}
        <div className="flex items-center gap-1">
          {quickPairs.map((p) => (
            <button
              key={p.sym}
              onClick={() => setCurrentSymbol(p.sym)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                currentSymbol === p.sym
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div
        ref={containerRef}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="relative w-full min-h-[340px] bg-[#0B0F17]"
      >
        <div id={widgetContainerId.current} className="w-full h-full" />

        {/* Fallback Display if Script fails to load */}
        {loadError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B0F17]/95 p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">TradingView Chart Feed Standby</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Unable to reach external TradingView server CDN ({currentSymbol}). Automated trade execution on connected brokers is unaffected.
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Custom Bot Overlay: Entry / Exit / TP / SL Markers */}
        {showOverlay && (
          <div className="absolute top-4 right-4 z-20 pointer-events-none max-w-xs w-full">
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-xl p-3 shadow-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="font-semibold text-white truncate">{botName || 'Active Bot Signals'}</div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                  LIVE OVERLAY
                </span>
              </div>

              {entryPrice && (
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                    Entry Marker:
                  </span>
                  <span className="font-mono font-bold text-blue-300">{entryPrice}</span>
                </div>
              )}

              {takeProfit && (
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    Take Profit (TP):
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{takeProfit}</span>
                </div>
              )}

              {stopLoss && (
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    Stop Loss (SL):
                  </span>
                  <span className="font-mono font-bold text-red-400">{stopLoss}</span>
                </div>
              )}

              {trades && trades.length > 0 && (
                <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-800/80">
                  <div className="font-medium text-slate-300 mb-1">Recent Execution Fill:</div>
                  <div className="flex items-center justify-between font-mono">
                    <span className={trades[0].type === 'BUY' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {trades[0].type} {trades[0].lotSize} lots
                    </span>
                    <span className="text-slate-300">@ {trades[0].entryPrice}</span>
                    <span className={trades[0].pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {trades[0].pnl >= 0 ? `+$${trades[0].pnl.toFixed(2)}` : `-$${Math.abs(trades[0].pnl).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
