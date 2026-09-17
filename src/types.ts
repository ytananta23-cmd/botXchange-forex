export type Platform = 'MT4' | 'MT5' | 'cTrader';
export type AccountType = 'Demo' | 'Live';
export type BotStrategy = 'DCA' | 'GRID' | 'AI_PRESET' | 'CUSTOM';
export type BotStatus = 'RUNNING' | 'PAUSED' | 'STOPPED' | 'ERROR';
export type MarketStatusType = 'OPEN' | 'CLOSED_WEEKEND' | 'HOLIDAY';

export interface BrokerConnection {
  id: string;
  platform: Platform;
  accountNumber: string;
  brokerName: string;
  serverName: string;
  accountType: AccountType;
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'CONNECTING';
  balance: number;
  equity: number;
  currency: string;
  leverage: string;
  pingMs: number;
  lastSync: string;
  isReadOnly?: boolean;
}

export interface Trade {
  id: string;
  botId: string;
  botName: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice?: number;
  currentPrice?: number;
  lotSize: number;
  pnl: number;
  pnlPercent: number;
  status: 'OPEN' | 'CLOSED';
  openTime: string;
  closeTime?: string;
  takeProfit?: number;
  stopLoss?: number;
}

export interface BotIndicators {
  useRSI: boolean;
  rsiPeriod: number;
  rsiOversold: number;
  rsiOverbought: number;
  useMACD: boolean;
  macdFast: number;
  macdSlow: number;
  macdSignal: number;
  useCCI: boolean;
  cciPeriod: number;
  cciLevel: number;
}

export interface BotRiskSettings {
  stopLossPips: number;
  takeProfitPips: number;
  maxDrawdownPercent: number;
  maxOpenTrades: number;
  trailingStop: boolean;
  trailingStopPips: number;
}

export interface Bot {
  id: string;
  name: string;
  symbol: string;
  strategy: BotStrategy;
  status: BotStatus;
  brokerId: string;
  investmentAmount: number;
  currency: string;
  totalPnl: number;
  totalPnlPercent: number;
  winRate: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  maxDrawdown: number;
  avgProfit: number;
  profitFactor: number;
  createdAt: string;
  lastChecked: string;
  indicators: BotIndicators;
  riskSettings: BotRiskSettings;
  gridLevels?: number;
  dcaMultiplier?: number;
  aiPresetDescription?: string;
}

export interface LeaderboardTrader {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  countryCode: string;
  countryName: string;
  strategyType: BotStrategy;
  primaryPair: string;
  roiWeekly: number;
  roiMonthly: number;
  roiAllTime: number;
  winRate: number;
  maxDrawdown: number;
  copiersCount: number;
  verifiedBroker: string;
  badges: string[];
}

export interface ReferralStats {
  referralCode: string;
  referralLink: string;
  invitesSent: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingPayout: number;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Ambassador';
  commissionRate: number; // e.g. 20%
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  is2FAEnabled: boolean;
  country: string;
  plan: 'Free Demo' | 'Pro Trader' | 'Institutional VIP';
  createdAt: string;
  globalRank: number;
  preferredLanguage: string;
  referralCode?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
