import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  BrokerConnection,
  Bot,
  ToastMessage,
  MarketStatusType,
} from '../types';
import { apiClient } from '../services/apiClient';

export type AppView =
  | 'marketing'
  | 'dashboard'
  | 'bots'
  | 'wizard'
  | 'bot-detail'
  | 'brokers'
  | 'analytics'
  | 'leaderboard'
  | 'referral'
  | 'wallet'
  | 'settings'
  | 'support';

interface AppContextType {
  // Navigation & User
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (isDemo?: boolean, credentials?: { email: string; password: string }) => Promise<void>;
  completeAuth: (user: UserProfile) => void;
  logout: () => void;

  // Selected Bot Detail
  selectedBotId: string | null;
  navigateToBotDetail: (botId: string) => void;

  // Data collections
  brokers: BrokerConnection[];
  selectedBroker: BrokerConnection | null;
  setSelectedBroker: (b: BrokerConnection | null) => void;
  bots: Bot[];
  refreshData: () => Promise<void>;
  toggleBotStatus: (botId: string) => Promise<void>;
  deleteBot: (botId: string) => Promise<void>;
  addNewBot: (bot: Partial<Bot>) => Promise<Bot>;
  connectBroker: (brokerData: any) => Promise<BrokerConnection>;
  disconnectBroker: (brokerId: string) => Promise<void>;

  // Market
  marketStatus: MarketStatusType;
  marketMessage: string;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Modals
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'otp' | '2fa';
  setAuthModalMode: (mode: 'login' | 'signup' | 'otp' | '2fa') => void;
  isOnboardingOpen: boolean;
  setOnboardingOpen: (open: boolean) => void;

  // Theme & Language
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  language: 'en' | 'hi' | 'es' | 'ar' | 'zh';
  setLanguage: (lang: 'en' | 'hi' | 'es' | 'ar' | 'zh') => void;

  // Loading States
  isLoadingData: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('marketing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [brokers, setBrokers] = useState<BrokerConnection[]>([]);
  const [selectedBroker, setSelectedBroker] = useState<BrokerConnection | null>(null);
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const [marketStatus, setMarketStatus] = useState<MarketStatusType>('OPEN');
  const [marketMessage, setMarketMessage] = useState<string>('Forex & CFD Markets Active (24/5 Low Latency)');

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'otp' | '2fa'>('login');
  const [isOnboardingOpen, setOnboardingOpen] = useState<boolean>(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'hi' | 'es' | 'ar' | 'zh'>('en');

  // Synchronize HTML dark class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initial Load
  const loadInitialData = async () => {
    setIsLoadingData(true);
    try {
      const storedUser = await apiClient.auth.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }

      const [brkList, botList, mkt] = await Promise.all([
        apiClient.broker.list(),
        apiClient.bots.list(),
        apiClient.market.getStatus(),
      ]);

      setBrokers(brkList);
      if (brkList.length > 0) {
        setSelectedBroker(brkList[0]);
      }
      setBots(botList);
      if (botList.length > 0 && !selectedBotId) {
        setSelectedBotId(botList[0].id);
      }
      setMarketStatus(mkt.status);
      setMarketMessage(mkt.message);
    } catch (e) {
      console.error('Error loading initial botXchange data:', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (isDemo = false, credentials?: { email: string; password: string }) => {
    try {
      if (!isDemo && !credentials) {
        throw new Error('Email and password are required to log in.');
      }

      const res = await apiClient.auth.login(
        isDemo
          ? { email: 'demo.trader@botxchange.io', isDemo: true }
          : { email: credentials!.email, password: credentials!.password }
      );
      setUser(res.user);
      setAuthModalOpen(false);
      setCurrentView('dashboard');
      addToast({
        title: isDemo ? 'Demo Mode Activated' : 'Welcome back to botXchange',
        message: 'Connected to high-speed institutional order gateway.',
        type: 'success',
      });
      await loadInitialData();
    } catch (err) {
      addToast({
        title: 'Authentication Error',
        message: err instanceof Error ? err.message : 'Could not establish secure session. Please retry.',
        type: 'error',
      });
    }
  };

  // Used after a signup + OTP verification, where the user is already authenticated
  // (apiClient.auth.signup already stored the session token) — no second login call needed.
  const completeAuth = (authedUser: UserProfile) => {
    setUser(authedUser);
    setAuthModalOpen(false);
    setCurrentView('dashboard');
    addToast({
      title: 'Welcome to botXchange',
      message: 'Your account is verified and ready to trade.',
      type: 'success',
    });
    loadInitialData();
  };

  const logout = async () => {
    await apiClient.auth.logout();
    setUser(null);
    setCurrentView('marketing');
    addToast({
      title: 'Signed Out',
      message: 'You have been securely disconnected.',
      type: 'info',
    });
  };

  const navigateToBotDetail = (botId: string) => {
    setSelectedBotId(botId);
    setCurrentView('bot-detail');
  };

  const toggleBotStatus = async (botId: string) => {
    const target = bots.find((b) => b.id === botId);
    if (!target) return;

    try {
      if (target.status === 'RUNNING') {
        const updated = await apiClient.bots.pause(botId);
        setBots((prev) => prev.map((b) => (b.id === botId ? updated : b)));
        addToast({
          title: 'Bot Execution Paused',
          message: `${target.name} has safely paused active order generation.`,
          type: 'warning',
        });
      } else {
        const updated = await apiClient.bots.resume(botId);
        setBots((prev) => prev.map((b) => (b.id === botId ? updated : b)));
        addToast({
          title: 'Bot Resumed Live',
          message: `${target.name} is scanning market ticks with zero latency.`,
          type: 'success',
        });
      }
    } catch {
      addToast({
        title: 'Operation Failed',
        message: 'Could not toggle bot state. Please verify broker connection.',
        type: 'error',
      });
    }
  };

  const deleteBot = async (botId: string) => {
    try {
      await apiClient.bots.delete(botId);
      setBots((prev) => prev.filter((b) => b.id !== botId));
      if (selectedBotId === botId) {
        setSelectedBotId(bots[0]?.id || null);
      }
      addToast({
        title: 'Bot Deleted',
        message: 'Trading bot configuration archived successfully.',
        type: 'info',
      });
    } catch {
      addToast({
        title: 'Error Deleting Bot',
        type: 'error',
      });
    }
  };

  const addNewBot = async (botData: Partial<Bot>): Promise<Bot> => {
    const created = await apiClient.bots.create(botData);
    setBots((prev) => [created, ...prev]);
    setSelectedBotId(created.id);
    addToast({
      title: 'Bot Launched Successfully!',
      message: `${created.name} is now actively monitoring ${created.symbol}.`,
      type: 'success',
    });
    return created;
  };

  const connectBroker = async (brokerData: any): Promise<BrokerConnection> => {
    const newBrk = await apiClient.broker.connect(brokerData);
    setBrokers((prev) => [newBrk, ...prev]);
    setSelectedBroker(newBrk);
    addToast({
      title: 'Broker Bridge Established',
      message: `Connected ${newBrk.brokerName} (${newBrk.platform}) with ${newBrk.pingMs}ms latency.`,
      type: 'success',
    });
    return newBrk;
  };

  const disconnectBroker = async (brokerId: string): Promise<void> => {
    await apiClient.broker.disconnect(brokerId);
    setBrokers((prev) => prev.filter((b) => b.id !== brokerId));
    if (selectedBroker?.id === brokerId) {
      setSelectedBroker(brokers.find((b) => b.id !== brokerId) || null);
    }
    addToast({
      title: 'Broker Disconnected',
      message: 'Account connection was safely removed.',
      type: 'info',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        isAuthenticated: Boolean(user),
        login,
        completeAuth,
        logout,
        selectedBotId,
        navigateToBotDetail,
        brokers,
        selectedBroker,
        setSelectedBroker,
        bots,
        refreshData: loadInitialData,
        toggleBotStatus,
        deleteBot,
        addNewBot,
        connectBroker,
        disconnectBroker,
        marketStatus,
        marketMessage,
        toasts,
        addToast,
        removeToast,
        isAuthModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isOnboardingOpen,
        setOnboardingOpen,
        theme,
        setTheme,
        language,
        setLanguage,
        isLoadingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
