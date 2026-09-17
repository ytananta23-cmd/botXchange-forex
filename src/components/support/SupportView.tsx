import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Server,
  Zap,
  Shield,
  LifeBuoy,
  Clock,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupportView: React.FC = () => {
  const { addToast } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketCategory, setTicketCategory] = useState('Broker Connection');
  const [ticketPriority, setTicketPriority] = useState('Normal');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      q: 'How does botXchange connect to my MetaTrader or cTrader broker?',
      a: 'botXchange connects through low-latency FIX API bridges and official broker terminal sockets hosted in Equinix LD4 (London) and NY4 (New York) data centers. We never hold your capital; orders are executed directly on your broker account with average round-trip latency under 18ms.',
    },
    {
      q: 'Can I use an Investor (read-only) password?',
      a: 'Yes! If you want to analyze past bot signals or test our risk and analytics dashboard without placing live trades, you can connect your broker using your read-only Investor Password. To allow bots to automatically place and manage orders, your trader master password is required.',
    },
    {
      q: 'What happens if a bot encounters unexpected high market volatility or slippage?',
      a: 'All bots feature hardcoded, multi-layered risk defenses: hard stop-loss caps, trailing stops, and a portfolio-level maximum drawdown halt (e.g. 5% max equity loss). In addition, our neural news-filter algorithm automatically pauses trade entries 15 minutes before and after high-impact NFP, CPI, and central bank rate decisions.',
    },
    {
      q: 'Are there any hidden broker commission markups?',
      a: 'None whatsoever. You trade directly on your broker’s raw institutional spreads and commission tiers (such as IC Markets Raw Spread or Pepperstone Razor). botXchange charges zero markup on spreads.',
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketMessage('');
      addToast({
        title: 'Priority Support Ticket Dispatched',
        message: 'Ticket #BX-9042 received. An algorithmic engineer will respond within 15 minutes.',
        type: 'success',
      });
    }, 800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Support Center &amp; System Health
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            24/5 dedicated institutional engineer dispatch and infrastructure telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-400 font-bold">
            All Cloud Nodes 100% Operational
          </span>
        </div>
      </div>

      {/* System Status Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">MetaTrader 4/5 Bridges</div>
              <div className="text-[10px] text-slate-400">Equinix LD4 Datacenter</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            18ms Latency
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">cTrader Open API FIX</div>
              <div className="text-[10px] text-slate-400">Direct Spotware Gateway</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            12ms Latency
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1420] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LifeBuoy className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">Live Support Queue</div>
              <div className="text-[10px] text-slate-400">Avg Response Time: 3m</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
            ONLINE
          </span>
        </div>
      </div>

      {/* FAQ & Support Ticket Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQ Accordion */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0e1420] border border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-xs text-white hover:text-amber-400 transition cursor-pointer"
                >
                  <span>{f.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/30">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Ticket Form */}
        <form
          onSubmit={handleTicketSubmit}
          className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">Open Priority Ticket</h3>
          </div>
          <p className="text-xs text-slate-400">
            Submit a direct query to our algorithmic engineering and server bridge support team.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="Broker Connection">Broker Handshake / Bridge</option>
                <option value="Bot Strategy">Bot Strategy &amp; Parameters</option>
                <option value="TradingView">TradingView Charts &amp; Feeds</option>
                <option value="Billing & Payouts">Billing &amp; Payouts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency</label>
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="Normal">Normal (Standard Query)</option>
                <option value="High">High (Active Bot Issue)</option>
                <option value="Critical">Critical (VPS Outage)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details</label>
            <textarea
              rows={4}
              placeholder="Describe what you observed, ticket IDs, or specific broker server..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Dispatching to Engineer Queue...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
