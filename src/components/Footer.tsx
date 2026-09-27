import React, { useState } from 'react';
import { PageTab } from '../types';
import { Send, CheckCircle2, Shield, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  showToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, showToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    showToast('Subscribed!', 'You will receive weekly engineering & platform updates.', 'success');
  };

  return (
    <footer className="w-full border-t border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors duration-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[var(--text)] font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                ✦
              </div>
              <span>Nexora Enterprise</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              The next-generation intelligence and operations platform. Unifying real-time analytics, order tracking, high-precision developer tools, and team discussions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All Systems Operational
              </span>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-500" /> SOC2 Type II Verified
              </span>
            </div>
          </div>

          {/* Quick Pages Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] tracking-wider uppercase mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Overview & Features
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Live Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  The Journal & Articles
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Community Discussions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Developer Toolkit (7 Tools)
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] tracking-wider uppercase mb-3">Tools Suite</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  KM ↔ Miles Converter
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  BMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Tip & Bill Splitter
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  Currency Exchange
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[var(--text)] transition-colors">
                  WCAG Contrast Checker
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] tracking-wider uppercase mb-3">Weekly Dispatch</h4>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              Curated architectural insights, performance teardowns, and release highlights.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You're on the invite list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="engineer@company.com"
                    className="w-full text-xs bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-lg px-3 py-2 pr-9 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    aria-label="Email for weekly newsletter"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {emailError && <p className="text-[11px] text-red-400">{emailError}</p>}
                <p className="text-[10px] text-[var(--text-muted)]">Zero spam. Unsubscribe with one click anytime.</p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 mt-8 border-t border-[var(--surface-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Nexora Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for high-velocity teams
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
