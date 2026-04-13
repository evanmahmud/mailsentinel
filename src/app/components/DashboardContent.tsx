'use client';

import { useEffect, useState } from 'react';

/* ═══════════ ANIMATED COUNTER HOOK ═══════════ */

function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);
  return count;
}

/* ═══════════ MOCK DATA ═══════════ */

const threatEmails = [
  { id: 1, from: 'security@bankofamerica.com.phish.net', subject: 'Urgent: Verify Your Account Immediately', level: 'critical', category: 'Phishing', time: '2m ago' },
  { id: 2, from: 'ceo@company-exec.io', subject: 'Wire Transfer Needed — Confidential', level: 'critical', category: 'BEC', time: '8m ago' },
  { id: 3, from: 'noreply@amazon.com', subject: 'Your order #302-4851930 has shipped', level: 'safe', category: 'Legitimate', time: '12m ago' },
  { id: 4, from: 'support@microsoft-verify.net', subject: 'Password Reset Confirmation Required', level: 'critical', category: 'Credential Theft', time: '18m ago' },
  { id: 5, from: 'newsletter@techcrunch.com', subject: 'TechCrunch Daily: AI Revolution in Security', level: 'safe', category: 'Newsletter', time: '25m ago' },
  { id: 6, from: 'invoice@supplier-pay.com', subject: 'Invoice #INV-2024-0893 — Payment Overdue', level: 'medium', category: 'Spam', time: '34m ago' },
  { id: 7, from: 'hr@company-update.biz', subject: 'Your Benefits Package Has Changed', level: 'high', category: 'Social Engineering', time: '41m ago' },
  { id: 8, from: 'admin@internal.corp', subject: 'System Maintenance: Scheduled Downtime', level: 'safe', category: 'Internal', time: '52m ago' },
];

const chartData = [
  { label: 'Phishing', value: 38, color: '#ff716c' },
  { label: 'BEC', value: 22, color: '#ff67ad' },
  { label: 'Malware', value: 15, color: '#a855f7' },
  { label: 'Spam', value: 18, color: '#ffb148' },
  { label: 'Other', value: 7, color: '#757388' },
];

const activities = [
  { id: 1, type: 'critical', message: '<strong>Phishing attempt blocked</strong> from security@bankofamerica.com.phish.net — quarantined automatically', time: '2 minutes ago' },
  { id: 2, type: 'critical', message: '<strong>BEC attack detected</strong> — impersonation of CEO targeting finance team', time: '8 minutes ago' },
  { id: 3, type: 'success', message: '<strong>Batch scan completed</strong> — 156 emails processed, 3 threats identified', time: '15 minutes ago' },
  { id: 4, type: 'warning', message: '<strong>Suspicious attachment</strong> in email from invoice@supplier-pay.com flagged for review', time: '34 minutes ago' },
  { id: 5, type: 'info', message: '<strong>AI model updated</strong> — Gemini threat detection patterns refreshed', time: '1 hour ago' },
  { id: 6, type: 'success', message: '<strong>Weekly report generated</strong> — 97.3% safe delivery rate achieved', time: '2 hours ago' },
];

/* ═══════════ DONUT CHART ═══════════ */

function DonutChart() {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="chart-container">
      <svg width="170" height="170" viewBox="0 0 170 170" style={{ transform: 'rotate(-90deg)' }}>
        {chartData.map((seg, i) => {
          const segLen = (seg.value / 100) * circumference;
          const offset = -(cumulative / 100) * circumference;
          cumulative += seg.value;
          return (
            <circle
              key={i}
              r={radius}
              cx="85"
              cy="85"
              fill="none"
              stroke={seg.color}
              strokeWidth="22"
              strokeDasharray={`${segLen} ${circumference - segLen}`}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          );
        })}
        <circle r="50" cx="85" cy="85" fill="var(--surface-container-lowest)" />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--on-surface)' }}>342</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Threats</span>
      </div>
    </div>
  );
}

/* ═══════════ COMPONENT ═══════════ */

export default function DashboardContent() {
  const scanned = useCounter(12847);
  const threats = useCounter(342);
  const safe = useCounter(12505);
  const scanTime = useCounter(800);

  return (
    <div className="dashboard-content stagger">
      {/* Title Row */}
      <div className="dashboard-title-row">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-title-sub">Real-time email security monitoring powered by Gemini AI</p>
        </div>
        <div className="live-badge">
          <span className="live-badge-dot" />
          Live Monitoring
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="glass-card stat-item stat-scanned animate-float-in">
          <div className="stat-header">
            <div className="stat-icon icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
            </div>
            <div className="stat-trend trend-up">↑ 12%</div>
          </div>
          <div className="stat-value">{scanned.toLocaleString()}</div>
          <div className="stat-label">Emails Scanned</div>
        </div>

        <div className="glass-card stat-item stat-threats animate-float-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-header">
            <div className="stat-icon icon-pink">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>
            </div>
            <div className="stat-trend trend-up">↑ 5%</div>
          </div>
          <div className="stat-value">{threats.toLocaleString()}</div>
          <div className="stat-label">Threats Blocked</div>
        </div>

        <div className="glass-card stat-item stat-safe animate-float-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-header">
            <div className="stat-icon icon-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div className="stat-trend trend-up">97.3%</div>
          </div>
          <div className="stat-value">{safe.toLocaleString()}</div>
          <div className="stat-label">Safe Deliveries</div>
        </div>

        <div className="glass-card stat-item stat-speed animate-float-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-header">
            <div className="stat-icon icon-amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div className="stat-trend trend-down">↓ 15%</div>
          </div>
          <div className="stat-value">{(scanTime / 1000).toFixed(1)}s</div>
          <div className="stat-label">Avg Scan Time</div>
        </div>
      </div>

      {/* Two-column */}
      <div className="dashboard-grid-2">
        {/* Threat List */}
        <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.15s' }}>
          <div className="section-header">
            <div>
              <div className="section-title">Recent Threats</div>
              <div className="section-subtitle">Latest analyzed emails</div>
            </div>
            <button className="btn-ghost">View All →</button>
          </div>
          <div>
            {threatEmails.map((email) => (
              <div key={email.id} className="threat-row">
                <div className={`threat-indicator ${email.level}`} />
                <div className="threat-info">
                  <div className="threat-subject">{email.subject}</div>
                  <div className="threat-from">{email.from}</div>
                </div>
                <div className="threat-meta">
                  <span className="threat-category">{email.category}</span>
                  <span className="threat-time">{email.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Stack */}
        <div className="dashboard-stack">
          {/* Chart */}
          <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.25s', position: 'relative' }}>
            <div className="section-header">
              <div>
                <div className="section-title">Threat Distribution</div>
                <div className="section-subtitle">By category</div>
              </div>
            </div>
            <DonutChart />
            <div className="chart-legend" style={{ marginTop: 16 }}>
              {chartData.map((d, i) => (
                <div key={i} className="legend-item">
                  <div className="legend-dot" style={{ background: d.color }} />
                  <span className="legend-label">{d.label}</span>
                  <span className="legend-value">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Panel */}
          <div className="glass-card-static ai-panel animate-float-in" style={{ animationDelay: '0.35s' }}>
            <div className="section-header" style={{ marginBottom: 12 }}>
              <div className="section-title">AI Scan Engine</div>
            </div>
            <div className="ai-status-row">
              <div className="ai-pulse" />
              <span className="ai-status-text">Active & Scanning</span>
              <span className="ai-model-tag">Gemini 2.5</span>
            </div>
            <div className="ai-stats-grid">
              <div className="ai-stat">
                <div className="ai-stat-value">156</div>
                <div className="ai-stat-label">Queue</div>
              </div>
              <div className="ai-stat">
                <div className="ai-stat-value">99.2%</div>
                <div className="ai-stat-label">Accuracy</div>
              </div>
              <div className="ai-stat">
                <div className="ai-stat-value">24/7</div>
                <div className="ai-stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.4s' }}>
        <div className="section-header">
          <div>
            <div className="section-title">Activity Feed</div>
            <div className="section-subtitle">Recent security events</div>
          </div>
          <button className="btn-ghost">All Events →</button>
        </div>
        <div className="activity-list">
          {activities.map((a) => (
            <div key={a.id} className="activity-item">
              <div className={`activity-dot dot-${a.type}`} />
              <div className="activity-content">
                <div className="activity-message" dangerouslySetInnerHTML={{ __html: a.message }} />
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
