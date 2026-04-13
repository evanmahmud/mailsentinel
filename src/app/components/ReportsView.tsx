'use client';

import { useState, useEffect } from 'react';

/* ═══════════ ANIMATED COUNTER ═══════════ */

function useCounter(target: number, duration = 1200) {
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

/* ═══════════ CHART DATA ═══════════ */

const weeklyData = [
  { day: 'Mon', scanned: 1842, threats: 45, blocked: 43 },
  { day: 'Tue', scanned: 2103, threats: 52, blocked: 51 },
  { day: 'Wed', scanned: 1956, threats: 38, blocked: 37 },
  { day: 'Thu', scanned: 2241, threats: 61, blocked: 59 },
  { day: 'Fri', scanned: 1887, threats: 48, blocked: 47 },
  { day: 'Sat', scanned: 823, threats: 22, blocked: 22 },
  { day: 'Sun', scanned: 1995, threats: 76, blocked: 73 },
];

const categoryBreakdown = [
  { name: 'Phishing', count: 156, pct: 38, color: '#ff716c' },
  { name: 'BEC', count: 89, pct: 22, color: '#ff67ad' },
  { name: 'Spam', count: 74, pct: 18, color: '#ffb148' },
  { name: 'Malware', count: 61, pct: 15, color: '#a855f7' },
  { name: 'Other', count: 29, pct: 7, color: '#757388' },
];

const topTargeted = [
  { department: 'Finance', attacks: 87, risk: 'critical' },
  { department: 'Executive', attacks: 64, risk: 'critical' },
  { department: 'HR', attacks: 45, risk: 'high' },
  { department: 'Engineering', attacks: 31, risk: 'medium' },
  { department: 'Marketing', attacks: 18, risk: 'low' },
];

/* ═══════════ BAR CHART ═══════════ */

function BarChart() {
  const maxScanned = Math.max(...weeklyData.map(d => d.scanned));
  return (
    <div className="bar-chart">
      {weeklyData.map((d, i) => (
        <div key={i} className="bar-group">
          <div className="bar-wrapper">
            <div
              className="bar bar-scanned"
              style={{ height: `${(d.scanned / maxScanned) * 100}%`, animationDelay: `${i * 0.08}s` }}
              title={`${d.scanned} scanned`}
            />
            <div
              className="bar bar-threats"
              style={{ height: `${(d.threats / maxScanned) * 100}%`, animationDelay: `${i * 0.08 + 0.05}s` }}
              title={`${d.threats} threats`}
            />
          </div>
          <span className="bar-label">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ COMPONENT ═══════════ */

export default function ReportsView() {
  const [period, setPeriod] = useState('week');
  const totalScanned = useCounter(12847);
  const totalThreats = useCounter(342);
  const blockRate = useCounter(973);
  const avgTime = useCounter(800);

  return (
    <div className="view-content stagger">
      <div className="view-title-row">
        <div>
          <h1 className="view-title">Security Reports</h1>
          <p className="view-subtitle">Analytics and insights for your email security</p>
        </div>
        <div className="filter-tabs">
          {['week', 'month', 'quarter'].map((p) => (
            <button
              key={p}
              className={`filter-tab ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="report-metrics">
        <div className="glass-card report-metric animate-float-in">
          <div className="report-metric-icon icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
          </div>
          <div className="report-metric-value">{totalScanned.toLocaleString()}</div>
          <div className="report-metric-label">Total Scanned</div>
          <div className="report-metric-trend trend-up">↑ 12% vs last week</div>
        </div>
        <div className="glass-card report-metric animate-float-in" style={{ animationDelay: '0.08s' }}>
          <div className="report-metric-icon icon-pink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
          </div>
          <div className="report-metric-value">{totalThreats}</div>
          <div className="report-metric-label">Threats Detected</div>
          <div className="report-metric-trend trend-up">↑ 5% vs last week</div>
        </div>
        <div className="glass-card report-metric animate-float-in" style={{ animationDelay: '0.16s' }}>
          <div className="report-metric-icon icon-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="report-metric-value">{(blockRate / 10).toFixed(1)}%</div>
          <div className="report-metric-label">Block Rate</div>
          <div className="report-metric-trend trend-up">↑ 0.3% vs last week</div>
        </div>
        <div className="glass-card report-metric animate-float-in" style={{ animationDelay: '0.24s' }}>
          <div className="report-metric-icon icon-amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="report-metric-value">{(avgTime / 1000).toFixed(1)}s</div>
          <div className="report-metric-label">Avg Scan Time</div>
          <div className="report-metric-trend trend-down">↓ 15% faster</div>
        </div>
      </div>

      <div className="reports-grid">
        {/* Weekly Activity Chart */}
        <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.1s' }}>
          <div className="section-header">
            <div>
              <div className="section-title">Weekly Activity</div>
              <div className="section-subtitle">Emails scanned vs threats detected</div>
            </div>
            <div className="chart-legend-inline">
              <span className="legend-inline"><span className="legend-dot-inline" style={{ background: 'var(--primary)' }} /> Scanned</span>
              <span className="legend-inline"><span className="legend-dot-inline" style={{ background: 'var(--error)' }} /> Threats</span>
            </div>
          </div>
          <BarChart />
        </div>

        {/* Category Breakdown */}
        <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <div>
              <div className="section-title">Threat Categories</div>
              <div className="section-subtitle">Breakdown by type</div>
            </div>
          </div>
          <div className="category-list">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="category-row">
                <div className="category-dot" style={{ background: cat.color }} />
                <span className="category-name">{cat.name}</span>
                <div className="category-bar-bg">
                  <div className="category-bar-fill" style={{ width: `${cat.pct}%`, background: cat.color, animationDelay: `${i * 0.1}s` }} />
                </div>
                <span className="category-count">{cat.count}</span>
                <span className="category-pct">{cat.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Targeted Departments */}
      <div className="glass-card-static section-card animate-float-in" style={{ animationDelay: '0.3s' }}>
        <div className="section-header">
          <div>
            <div className="section-title">Most Targeted Departments</div>
            <div className="section-subtitle">Attack distribution by department</div>
          </div>
        </div>
        <div className="target-department-list">
          {topTargeted.map((dept, i) => (
            <div key={i} className="target-department-row">
              <span className="target-rank">#{i + 1}</span>
              <span className="target-name">{dept.department}</span>
              <div className="target-bar-bg">
                <div className="target-bar-fill" style={{ width: `${(dept.attacks / topTargeted[0].attacks) * 100}%` }} />
              </div>
              <span className="target-attacks">{dept.attacks} attacks</span>
              <span className={`target-risk risk-${dept.risk}`}>{dept.risk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
