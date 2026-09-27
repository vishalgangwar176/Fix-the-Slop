import React, { useState } from 'react';
import { PageTab } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Wrench, 
  Home, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  isAdmin,
  setIsAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, badge: 'Live' },
    { id: 'blog', label: 'The Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { id: 'tools', label: 'Developer Tools', icon: <Wrench className="w-4 h-4" />, badge: '7 Tools' },
  ];

  const handleTabClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--surface-border)] bg-[var(--surface)]/90 backdrop-blur-md transition-colors duration-200">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-1.5 px-4 text-center text-xs font-medium text-white flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 font-semibold bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} /> Nexora 2.0
        </span>
        <span className="hidden sm:inline">Engineered for extreme performance, clean architecture, and 100% verified operations.</span>
        <span className="sm:hidden">Enterprise Operations & Analytics Suite</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
              aria-label="Nexora Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                ✦
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[var(--text)] flex items-center gap-1.5">
                  Nexora
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Pro
                  </span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] tracking-wide hidden lg:block -mt-1">
                  Enterprise Portal & Tools
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--surface-elevated)] p-1 rounded-xl border border-[var(--surface-border)]" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Admin Role, Get Started */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Badge Switch */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              title={isAdmin ? "Logged in as Admin (click to switch to Guest view)" : "Logged in as Guest (click to switch to Admin view)"}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                isAdmin 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                  : 'bg-zinc-500/10 text-[var(--text-muted)] border-[var(--surface-border)] hover:bg-zinc-500/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin Mode' : 'Guest Mode'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-border)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Quick Action button */}
            <button
              onClick={() => handleTabClick('contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95"
            >
              <span>Get in Touch</span>
              <span className="text-white/70">→</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface)] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[var(--surface-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">Session Role:</span>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isAdmin 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-zinc-500/10 text-[var(--text-muted)] border-[var(--surface-border)]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin Mode (Active)' : 'Guest Mode (Active)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
