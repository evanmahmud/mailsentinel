'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import InboxView from './components/InboxView';
import ThreatsView from './components/ThreatsView';
import QuarantineView from './components/QuarantineView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import './dashboard.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardContent />;
      case 'inbox': return <InboxView />;
      case 'threats': return <ThreatsView />;
      case 'quarantine': return <QuarantineView />;
      case 'reports': return <ReportsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeView}
        onNavigate={(id) => { setActiveView(id); setSidebarOpen(false); }}
      />
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          <div className="header-greeting">
            <span className="header-greeting-text">Welcome back, Admin</span>
            <span className="header-greeting-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div className="header-search">
            <svg className="header-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search emails, threats, senders..." />
          </div>

          <div className="header-actions">
            <button className="header-btn" title="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="header-btn-badge" />
            </button>
            <button className="header-btn" title="Settings" onClick={() => setActiveView('settings')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
          </div>
        </header>

        {/* View Content */}
        {renderView()}
      </div>
    </div>
  );
}
