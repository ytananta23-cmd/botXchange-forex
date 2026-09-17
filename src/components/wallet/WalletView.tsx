import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  QrCode,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WalletView: React.FC = () => {
  const { brokers, addToast } = useApp();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(250);
  const [depositMethod, setDepositMethod] = useState<'USDT' | 'CARD'>('USDT');

  const brokerTotalEquity = brokers.reduce((acc, b) => acc + b.equity, 0);

  const transactions = [
    {
      id: 'tx-101',
      date: 'Today, 14:22',
      type: 'REFERRAL_PAYOUT',
      label: 'Affiliate Commission Settlement',
      amount: '+$142.50',
      status: 'COMPLETED',
      isCredit: true,
    },
    {
      id: 'tx-102',
      date: 'Mar 12, 09:15',
      type: 'SUBSCRIPTION',
      label: 'PRO Monthly Plan Renewal',
      amount: '-$49.00',
      status: 'COMPLETED',
      isCredit: false,
    },
    {
      id: 'tx-103',
      date: 'Mar 01, 18:40',
      type: 'DEPOSIT',
      label: 'USDT TRC20 Network Deposit',
      amount: '+$500.00',
      status: 'COMPLETED',
      isCredit: true,
    },
    {
      id: 'tx-104',
      date: 'Feb 28, 11:30',
      type: 'VPS_UPGRADE',
      label: 'Dedicated Equinix LD4 Dedicated Line',
      amount: '-$25.00',
      status: 'COMPLETED',
      isCredit: false,
    },
  ];

  const handleDepositConfirm = () => {
    setIsDepositOpen(false);
    addToast({
      title: 'Deposit Inbound Handshake Initialized',
      message: `$${depositAmount.toFixed(2)} deposit credited to your platform wallet balance.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Wallet &amp; Capital Overview
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Internal subscription balance and aggregate connected broker custody.
          </p>
        </div>

        <button
          onClick={() => setIsDepositOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Add Platform Funds</span>
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Balance */}
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>botXchange Platform Wallet</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">$642.50 USD</div>
            <p className="text-xs text-slate-400 mt-1">
              Used for VPS fees, copy-trading subscriptions, and affiliate credits.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setIsDepositOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer"
            >
              Deposit Funds
            </button>
            <button
              onClick={() =>
                addToast({
                  title: 'Invoices Generated',
                  message: 'Downloading all official PDF subscription invoices.',
                  type: 'info',
                })
              }
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Invoices</span>
            </button>
          </div>
        </div>

        {/* Aggregate Broker Accounts */}
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Aggregate Broker Equity (Non-Custodial)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
              ${brokerTotalEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Protected in regulated segregated tier-1 client bank accounts across {brokers.length} broker bridges.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
              {brokers.length} Live Bridges Connected
            </span>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Platform Transaction Log</h3>
          <span className="text-xs text-slate-400">Billing &amp; Payouts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 text-slate-400 font-mono">{tx.date}</td>
                  <td className="py-3 px-4 font-bold text-white">{tx.label}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">{tx.type}</td>
                  <td
                    className={`py-3 px-4 text-right font-mono font-bold text-sm ${
                      tx.isCredit ? 'text-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    {tx.amount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0e1420] border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4">
            <h3 className="text-xl font-bold text-white">Deposit Platform Funds</h3>
            <p className="text-xs text-slate-400">
              Add balance to cover high-speed VPS hosting, copy subscription fees, or add-ons.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDepositMethod('USDT')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  depositMethod === 'USDT'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                USDT (TRC20)
              </button>
              <button
                type="button"
                onClick={() => setDepositMethod('CARD')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  depositMethod === 'CARD'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Credit Card / Apple Pay
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($USD)</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition cursor-pointer ${
                      depositAmount === amt
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {depositMethod === 'USDT' ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div className="w-28 h-28 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 break-all select-all">
                  TExQ9fUv58wB29aKZ79Lp8Q...
                </div>
                <div className="text-[10px] text-amber-400">
                  Send only TRC20 USDT. Automated confirmation in 1 block (~30s).
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-white mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleDepositConfirm}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Confirm Deposit of ${depositAmount}
              </button>
              <button
                onClick={() => setIsDepositOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
