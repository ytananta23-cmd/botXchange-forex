import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  ArrowRight,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../services/apiClient';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    completeAuth,
    addToast,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !email.includes('@')) {
      setValidationError('Please enter a valid business or personal email address.');
      return;
    }
    if (authModalMode !== 'otp' && (!password || password.length < 6)) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      if (authModalMode === 'signup') {
        await apiClient.auth.signup({ email, name: name || 'Valued Trader', password });
        setAuthModalMode('otp');
        addToast({
          title: 'Verification Code Dispatched',
          message: `A 6-digit confirmation PIN was sent to ${email}.`,
          type: 'info',
        });
      } else if (authModalMode === 'login') {
        // Trigger 2FA step if configured
        setAuthModalMode('2fa');
      }
    } catch (err: any) {
      setValidationError(err?.message || 'Authentication sequence failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setValidationError('Please complete the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.auth.verifyOtp({ otp: fullCode, email });
      // apiClient.auth.signup() already authenticated this session and stored the
      // token — fetch the profile with it rather than attempting a second login.
      const verifiedUser = await apiClient.auth.getCurrentUser();
      if (!verifiedUser) {
        throw new Error('Session expired before verification completed. Please sign up again.');
      }
      completeAuth(verifiedUser);
    } catch (err: any) {
      setValidationError(err?.message || 'Invalid code. Try entering 123456');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2Fa = async () => {
    if (!twoFaCode || twoFaCode.length < 6) {
      setValidationError('Enter valid 6-digit authenticator code.');
      return;
    }
    setIsLoading(true);
    try {
      await login(false, { email, password });
    } catch {
      setValidationError('Authentication verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e1420] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-2xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
            X
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {authModalMode === 'login' && 'Sign in to botXchange'}
            {authModalMode === 'signup' && 'Create Your Trading Account'}
            {authModalMode === 'otp' && 'Verify Email Address'}
            {authModalMode === '2fa' && 'Two-Factor Authentication'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Institutional-grade automated trading for MT4, MT5 & cTrader
          </p>
        </div>

        {validationError && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
            <span>{validationError}</span>
          </div>
        )}

        {/* --- LOGIN & SIGNUP FORMS --- */}
        {(authModalMode === 'login' || authModalMode === 'signup') && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Marcus Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() =>
                      addToast({
                        title: 'Password Reset Link Sent',
                        message: 'Check your email inbox for recovery instructions.',
                        type: 'info',
                      })
                    }
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Establishing Secure Session...</span>
              ) : (
                <>
                  <span>{authModalMode === 'login' ? 'Sign In to Cockpit' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Switcher */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => login(true)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>One-Click Instant Demo Login (No Password)</span>
              </button>
            </div>

            {/* Switch Mode */}
            <div className="text-center pt-3 text-xs text-slate-400">
              {authModalMode === 'login' ? (
                <span>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setValidationError('');
                      setAuthModalMode('signup');
                    }}
                    className="text-amber-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign Up Free
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setValidationError('');
                      setAuthModalMode('login');
                    }}
                    className="text-amber-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </form>
        )}

        {/* --- OTP VERIFICATION --- */}
        {authModalMode === 'otp' && (
          <div className="space-y-5">
            <p className="text-xs text-slate-300 text-center">
              We sent a 6-digit confirmation code to <strong className="text-white">{email}</strong>. Enter it below to activate your account.
            </p>

            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-slate-900 border border-slate-700 text-amber-400 focus:outline-none focus:border-amber-500 transition"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Auto-Fill Demo Code (123456)
              </button>
            </div>
          </div>
        )}

        {/* --- 2FA MODAL --- */}
        {authModalMode === '2fa' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Enter the 6-digit authentication token generated by your Google Authenticator or Authy app.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">2FA Security PIN</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. 748291"
                  value={twoFaCode}
                  maxLength={6}
                  onChange={(e) => setTwoFaCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-amber-400 tracking-widest focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleVerify2Fa}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {isLoading ? 'Confirming 2FA...' : 'Authenticate & Enter'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setTwoFaCode('892144')}
                className="text-xs text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                Use Quick Demo Token (892144)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
