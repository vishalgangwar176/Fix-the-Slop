import React, { useState, useEffect } from 'react';
import { PageTab, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { BlogPage } from './pages/BlogPage';
import { CommunityPage } from './pages/CommunityPage';
import { ToolsPage } from './pages/ToolsPage';

export default function App() {
  // Navigation State with URL Hash support
  const [activeTab, setActiveTab] = useState<PageTab>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['admin', 'blog', 'contact', 'tools'].includes(hash)) {
      return hash as PageTab;
    }
    return 'home';
  });

  // Dark / Light Mode (Defaults to dark per DESIGN.md: --bg #0b0d12)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexora_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Admin Mode
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('nexora_is_admin') === 'true';
  });

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Theme with DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('nexora_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    showToast(isDark ? 'Light Theme Activated' : 'Dark Theme Activated', 'Theme settings saved.', 'info');
  };

  // Sync Admin Role
  useEffect(() => {
    localStorage.setItem('nexora_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Sync URL hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'admin', 'blog', 'contact', 'tools'].includes(hash)) {
        setActiveTab(hash as PageTab);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      <main className="flex-1 w-full" id="main-content" tabIndex={-1}>
        {activeTab === 'home' && (
          <HomePage setActiveTab={handleTabChange} showToast={showToast} />
        )}
        {activeTab === 'admin' && (
          <DashboardPage showToast={showToast} isAdmin={isAdmin} />
        )}
        {activeTab === 'blog' && (
          <BlogPage showToast={showToast} />
        )}
        {activeTab === 'contact' && (
          <CommunityPage showToast={showToast} />
        )}
        {activeTab === 'tools' && (
          <ToolsPage showToast={showToast} />
        )}
      </main>

      <Footer setActiveTab={handleTabChange} showToast={showToast} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
