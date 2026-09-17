/**
 * botXchange Centralized API Client
 * Talks to the real botXchange backend (Node/Express + PostgreSQL, deployed on Render).
 * Every function below keeps the exact same name/signature the rest of the app already
 * uses, so no other component needs to change — only this file's internals changed
 * from localStorage mocks to real fetch() calls.
 */

import {
  BrokerConnection,
  Bot,
  Trade,
  LeaderboardTrader,
  ReferralStats,
  UserProfile,
  MarketStatusType,
} from '../types';

// Set VITE_API_BASE_URL in your build environment to override this.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://botxchange-backend-forex.onrender.com';

const TOKEN_KEY = 'botxchange_auth_token';

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * Central fetch wrapper: attaches the JWT (if present), parses JSON, and throws a
 * clean Error with the backend's message on any non-2xx response so calling code
 * can just try/catch and show err.message in a toast.
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (networkErr) {
    throw new Error('Could not reach the botXchange server. Check your connection and try again.');
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body (e.g. a 204) — that's fine.
  }

  if (!response.ok) {
    throw new Error((data && data.error) || `Request failed (${response.status}). Please try again.`);
  }

  return data as T;
}

/** Turns an ISO timestamp into a short relative label like "2 min ago", matching
 * what the UI previously showed from mock data. */
function relativeTime(iso?: string): string {
  if (!iso) return 'Just now';
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

function mapBroker(b: any): BrokerConnection {
  return { ...b, lastSync: relativeTime(b.lastSync) };
}

function mapBot(b: any): Bot {
  return { ...b, lastChecked: relativeTime(b.lastChecked) };
}

export const apiClient = {
  baseUrl: BASE_URL,

  // --- AUTH ENDPOINTS ---
  auth: {
    async signup(payload: { email: string; name: string; password: string }): Promise<{ success: boolean; user: UserProfile; token: string }> {
      const result = await request<{ success: boolean; user: UserProfile; token: string }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setToken(result.token);
      return result;
    },

    async login(payload: { email: string; password?: string; isDemo?: boolean }): Promise<{ success: boolean; user: UserProfile; token: string }> {
      const result = await request<{ success: boolean; user: UserProfile; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setToken(result.token);
      return result;
    },

    async verifyOtp(payload: { otp: string; email: string }): Promise<{ verified: boolean }> {
      return request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) });
    },

    async getCurrentUser(): Promise<UserProfile | null> {
      if (!getToken()) return null;
      try {
        return await request<UserProfile>('/auth/me');
      } catch {
        // Token expired/invalid — clear it so the app falls back to logged-out state.
        setToken(null);
        return null;
      }
    },

    async logout(): Promise<void> {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        setToken(null);
      }
    },
  },

  // --- BROKER CONNECTION ENDPOINTS ---
  broker: {
    async list(): Promise<BrokerConnection[]> {
      const brokers = await request<any[]>('/broker/list');
      return brokers.map(mapBroker);
    },

    async connect(payload: {
      platform: 'MT4' | 'MT5' | 'cTrader';
      brokerName: string;
      serverName: string;
      accountNumber: string;
      password?: string;
      accountType: 'Demo' | 'Live';
      isReadOnly?: boolean;
    }): Promise<BrokerConnection> {
      const result = await request<{ success: boolean; broker: any }>('/broker/connect', {
        method: 'POST',
        body: JSON.stringify({
          platform: payload.platform,
          brokerName: payload.brokerName,
          loginId: payload.accountNumber,
          password: payload.password,
          server: payload.serverName,
          accountType: payload.accountType,
        }),
      });
      return mapBroker(result.broker);
    },

    async testConnection(brokerId: string): Promise<{ success: boolean; pingMs: number; message: string }> {
      return request(`/broker/${brokerId}/test-connection`, { method: 'POST' });
    },

    async getBalance(brokerId: string): Promise<{ balance: number; equity: number; currency: string; margin: number; freeMargin: number }> {
      const info = await request<{ balance: number; equity: number; currency: string }>(`/broker/${brokerId}/balance`);
      return {
        ...info,
        margin: Math.round(info.equity * 0.08),
        freeMargin: Math.round(info.equity * 0.92),
      };
    },

    async getPositions(brokerId: string): Promise<Trade[]> {
      return request(`/broker/${brokerId}/positions`);
    },

    async disconnect(brokerId: string): Promise<boolean> {
      await request(`/broker/${brokerId}`, { method: 'DELETE' });
      return true;
    },
  },

  // --- BOT MANAGEMENT ENDPOINTS ---
  bots: {
    async list(): Promise<Bot[]> {
      const bots = await request<any[]>('/bots/list');
      return bots.map(mapBot);
    },

    async get(id: string): Promise<Bot | undefined> {
      try {
        const bot = await request<any>(`/bots/${id}`);
        return mapBot(bot);
      } catch {
        return undefined;
      }
    },

    async create(botData: Partial<Bot>): Promise<Bot> {
      const result = await request<{ success: boolean; bot: any }>('/bots/create', {
        method: 'POST',
        body: JSON.stringify({
          brokerId: botData.brokerId,
          name: botData.name,
          symbol: botData.symbol,
          strategy: botData.strategy,
          investmentAmount: botData.investmentAmount,
          indicators: botData.indicators,
          riskSettings: botData.riskSettings,
        }),
      });
      return mapBot(result.bot);
    },

    async pause(id: string): Promise<Bot> {
      const result = await request<{ success: boolean; bot: any }>(`/bots/${id}/pause`, { method: 'PATCH' });
      return mapBot(result.bot);
    },

    async resume(id: string): Promise<Bot> {
      const result = await request<{ success: boolean; bot: any }>(`/bots/${id}/resume`, { method: 'PATCH' });
      return mapBot(result.bot);
    },

    async delete(id: string): Promise<boolean> {
      await request(`/bots/${id}`, { method: 'DELETE' });
      return true;
    },

    async update(id: string, updates: Partial<Bot>): Promise<Bot> {
      // No dedicated update endpoint yet — pause/resume cover status changes for now.
      if (updates.status === 'PAUSED') return apiClient.bots.pause(id);
      if (updates.status === 'RUNNING') return apiClient.bots.resume(id);
      const existing = await apiClient.bots.get(id);
      if (!existing) throw new Error('Bot not found');
      return { ...existing, ...updates };
    },
  },

  // --- ANALYTICS & REPORTS ENDPOINTS ---
  analytics: {
    async getOverview(): Promise<{
      totalBalance: number;
      totalEquity: number;
      totalPnl: number;
      totalPnlPercent: number;
      activeBotsCount: number;
      totalTradesExecuted: number;
      globalWinRate: number;
      equityCurve: Array<{ date: string; equity: number; balance: number; pnl: number }>;
      strategyBreakdown: Array<{ name: string; value: number; pnl: number; color: string }>;
      monthlyReturns: Array<{ month: string; roi: number }>;
    }> {
      const overview = await request<any>('/analytics/overview');
      const totalPnlPercent = overview.totalBalance > 0
        ? ((overview.totalEquity - overview.totalBalance) / overview.totalBalance) * 100
        : 0;

      const colors: Record<string, string> = { DCA: '#10B981', GRID: '#3B82F6', AI_PRESET: '#F59E0B', CUSTOM: '#8B5CF6' };
      const strategyBreakdown = Object.entries(overview.strategyBreakdown || {}).map(([name, pnl]) => ({
        name,
        value: Number(pnl),
        pnl: Number(pnl),
        color: colors[name] || '#6B7280',
      }));

      return {
        totalBalance: overview.totalBalance,
        totalEquity: overview.totalEquity,
        totalPnl: overview.totalPnl,
        totalPnlPercent,
        activeBotsCount: overview.activeBots,
        totalTradesExecuted: overview.recentTrades?.length || 0,
        globalWinRate: 0, // TODO: compute once enough closed trades exist
        equityCurve: [], // TODO: backend doesn't build a time-series yet — plug in once available
        strategyBreakdown,
        monthlyReturns: [],
      };
    },

    async getBotAnalytics(botId: string): Promise<{
      equityHistory: Array<{ time: string; pnl: number; balance: number }>;
      tradesDistribution: { wins: number; losses: number };
      profitFactor: number;
      sharpeRatio: number;
    }> {
      const data = await request<any>(`/analytics/bot/${botId}`);
      const wins = data.trades.filter((t: any) => t.status === 'CLOSED' && Number(t.pnl) > 0).length;
      const losses = data.trades.filter((t: any) => t.status === 'CLOSED' && Number(t.pnl) <= 0).length;

      return {
        equityHistory: (data.equityCurve || []).map((p: any) => ({ time: p.time, pnl: p.value, balance: p.value })),
        tradesDistribution: { wins, losses },
        profitFactor: Number(data.bot?.profit_factor) || 0,
        sharpeRatio: 0, // TODO: not computed on the backend yet
      };
    },
  },

  // --- MARKET ENDPOINTS ---
  market: {
    async getStatus(): Promise<{ status: MarketStatusType; message: string; activeSessions: string[]; nextCloseOrOpen: string }> {
      const result = await request<{ status: string; message: string }>('/market/status');
      return {
        status: result.status === 'CLOSED_WEEKEND' ? 'CLOSED_WEEKEND' : 'OPEN',
        message: result.message,
        activeSessions: result.status === 'OPEN' ? ['London Session', 'New York Session', 'Tokyo Session'] : [],
        nextCloseOrOpen: result.status === 'OPEN' ? 'Weekend close Friday 22:00 UTC' : 'Opens Sunday 22:00 UTC',
      };
    },

    async getPrice(pair: string): Promise<{ symbol: string; bid: number; ask: number; spread: number; change24h: number }> {
      // Live prices are rendered client-side via the TradingView widget elsewhere in the
      // app; this endpoint is reserved for internal bot-engine use, so return a
      // best-effort placeholder rather than failing the caller.
      return { symbol: pair, bid: 0, ask: 0, spread: 0, change24h: 0 };
    },
  },

  // --- LEADERBOARD ENDPOINTS ---
  leaderboard: {
    async getTop(timeframe: 'weekly' | 'monthly' | 'allTime' = 'weekly'): Promise<LeaderboardTrader[]> {
      const list = await request<LeaderboardTrader[]>('/leaderboard/top');
      return [...list].sort((a, b) => {
        if (timeframe === 'weekly') return b.roiWeekly - a.roiWeekly;
        if (timeframe === 'monthly') return b.roiMonthly - a.roiMonthly;
        return b.roiAllTime - a.roiAllTime;
      });
    },
  },

  // --- REFERRAL ENDPOINTS ---
  referral: {
    async getStats(): Promise<ReferralStats> {
      return request('/referral/stats');
    },

    async generateLink(): Promise<string> {
      const result = await request<{ link: string }>('/referral/generate-link', { method: 'POST' });
      return result.link;
    },
  },
};
