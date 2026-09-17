import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Key,
  CreditCard,
  CheckCircle2,
  Lock,
  Smartphone,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { user, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'alerts' | 'api' | 'billing'>('profile');

  // Profile fields
  const [name, setName] = useState(user?.name || 'Alexander Sterling');
  const [email, setEmail] = useState(user?.email || 'alexander@apexquant.io');

  // Security
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);

  // Alerts
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [telegramHandle, setTelegramHandle] = useState('@alex_trader_vip');

  // API
  const [apiKey, setApiKey] = useState('bx_live_948a12bc900f8921e4a179c3');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Profile Updated',
      message: 'Account details and preference synchronization complete.',
      type: 'success',
    });
  };

  const handleGenerateApiKey = () => {
    const newKey = `bx_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    addToast({
      title: 'New API Key Generated',
      message: 'Keep this private. Full execution permissions granted.',
      type: 'warning',
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Platform Settings &amp; Security
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage identity credentials, multi-factor protection, and trade notification channels.
        </p>

        {/* Tab Strip */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
          {[
            { id: 'profile', label: 'Trader Profile', icon: User },
            { id: 'security', label: 'Security & 2FA', icon: Shield },
            { id: 'alerts', label: 'Telegram & Email Alerts', icon: Bell },
            { id: 'api', label: 'Developer API Keys', icon: Key },
            { id: 'billing', label: 'Subscription Plan', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-white">Public Profile</h3>

          <div className="flex items-center gap-4 py-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700"
            />
            <div>
              <button
                type="button"
                onClick={() =>
                  addToast({
                    title: 'Avatar Uploaded',
                    message: 'New profile photo saved.',
                    type: 'success',
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 cursor-pointer"
              >
                Change Avatar
              </button>
              <div className="text-[11px] text-slate-500 mt-1">PNG, JPG or WebP up to 4MB</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Save Profile Changes
          </button>
        </form>
      )}

      {/* Tab: Security */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Protect automated bot executions and withdrawals using Google Authenticator / Authy.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">Authenticator App PIN</div>
                <div className="text-[11px] text-slate-400">
                  {twoFaEnabled ? 'Active and protecting session' : 'Disabled (Not recommended)'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTwoFaEnabled(!twoFaEnabled);
                addToast({
                  title: !twoFaEnabled ? '2FA Activated' : '2FA Deactivated',
                  type: !twoFaEnabled ? 'success' : 'warning',
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                twoFaEnabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {twoFaEnabled ? 'Enabled' : 'Enable 2FA'}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white">Active Device Handshakes</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-center">
              <div>
                <div className="font-bold text-white">London, UK • Chrome MacOS</div>
                <div className="text-[10px] text-emerald-400">Current active cockpit session</div>
              </div>
              <span className="font-mono text-[10px] text-slate-500">IP: 185.220.101.5</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Alerts */}
      {activeTab === 'alerts' && (
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Real-Time Dispatch Notifications</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Receive instant Telegram and email pushes whenever bots open, adjust, or close positions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">Telegram Signal Bot Link</span>
                </div>
                <input
                  type="checkbox"
                  checked={telegramAlerts}
                  onChange={(e) => setTelegramAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
                />
              </div>

              {telegramAlerts && (
                <div>
                  <label className="text-[11px] text-slate-400">Connected Telegram Username</label>
                  <input
                    type="text"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 font-mono text-xs text-white mt-1"
                  />
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Daily Performance Digest</div>
                <div className="text-[11px] text-slate-400">
                  Comprehensive 00:00 UTC portfolio P&amp;L summary email
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: API */}
      {activeTab === 'api' && (
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Developer REST &amp; Webhook API</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Programmatically trigger bots, pull live tick metrics, or stream positions to TradingView alerts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs text-slate-400">Active Live API Token</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-xs text-amber-400 truncate">
                {apiKey}
              </div>
              <button
                type="button"
                onClick={handleGenerateApiKey}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Regenerate
              </button>
            </div>
            <div className="text-[10px] text-slate-500">
              Webhook Endpoint: <code className="text-slate-300">https://api.botxchange.io/v1/webhook</code>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Billing */}
      {activeTab === 'billing' && (
        <div className="p-6 rounded-2xl bg-[#0e1420] border border-slate-800 shadow-xl space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Subscription &amp; Capacity</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Current platform capacity tier and automated execution limits.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
              PRO TRADER ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-xs">Active Plan</div>
              <div className="text-lg font-black text-white mt-1">Pro Member</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">$49 / month (Billed monthly)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-xs">Bot Fleet Limit</div>
              <div className="text-lg font-black text-amber-400 mt-1">10 Concurrent Bots</div>
              <div className="text-[11px] text-slate-400 mt-0.5">3 of 10 currently running</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-xs">VPS Speed</div>
              <div className="text-lg font-black text-emerald-400 mt-1">&lt;18ms Latency</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Equinix LD4 Dedicated</div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() =>
                addToast({
                  title: 'Enterprise Upgrade Requested',
                  message: 'An institutional account executive will connect with you via Telegram.',
                  type: 'success',
                })
              }
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              Upgrade to VIP Institutional
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
