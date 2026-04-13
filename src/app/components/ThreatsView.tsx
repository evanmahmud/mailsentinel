'use client';

import { useState } from 'react';

/* ═══════════ MOCK DATA ═══════════ */

const threats = [
  { id: 1, subject: 'Urgent: Verify Your Account Immediately', from: 'security@bankofamerica.com.phish.net', category: 'Phishing', level: 'critical', confidence: 98.7, timestamp: '2024-12-15 14:32:01', status: 'Blocked', vectors: ['Spoofed Domain', 'Urgency Tactics', 'Credential Harvesting'], description: 'Sophisticated phishing attack impersonating Bank of America. The sender domain uses a subdomain trick (bankofamerica.com.phish.net) to appear legitimate. Contains a malicious link directing to a credential harvesting page.' },
  { id: 2, subject: 'Wire Transfer Needed — Confidential', from: 'ceo@company-exec.io', category: 'BEC', level: 'critical', confidence: 96.2, timestamp: '2024-12-15 14:24:45', status: 'Blocked', vectors: ['CEO Impersonation', 'Financial Request', 'Urgency'], description: 'Business Email Compromise attempt impersonating the CEO. Requests an urgent wire transfer of $45,000 to an external vendor. Uses social pressure and confidentiality to bypass normal approval processes.' },
  { id: 3, subject: 'Password Reset Confirmation Required', from: 'support@microsoft-verify.net', category: 'Credential Theft', level: 'critical', confidence: 97.1, timestamp: '2024-12-15 14:14:22', status: 'Quarantined', vectors: ['Brand Impersonation', 'Fake Reset Flow', 'Malicious URL'], description: 'Credential theft attempt using fake Microsoft branding. The reset link leads to a convincing but fraudulent login page designed to capture Microsoft 365 credentials.' },
  { id: 4, subject: 'Your Benefits Package Has Changed', from: 'hr@company-update.biz', category: 'Social Engineering', level: 'high', confidence: 89.4, timestamp: '2024-12-15 14:01:33', status: 'Flagged', vectors: ['HR Impersonation', 'Data Harvesting'], description: 'Social engineering email pretending to be from HR department. Links to a fake benefits portal designed to collect personal and financial information from employees.' },
  { id: 5, subject: 'Invoice #INV-2024-0893 — Payment Overdue', from: 'invoice@supplier-pay.com', category: 'Spam', level: 'medium', confidence: 72.8, timestamp: '2024-12-15 13:48:15', status: 'Flagged', vectors: ['Fake Invoice', 'Payment Redirect'], description: 'Fraudulent invoice email attempting to redirect payments to an attacker-controlled account. The supplier domain does not match any known vendor in the company directory.' },
  { id: 6, subject: 'System Update Required — Click to Install', from: 'it-dept@updates-corp.com', category: 'Malware', level: 'critical', confidence: 99.1, timestamp: '2024-12-15 12:15:00', status: 'Blocked', vectors: ['Malicious Attachment', 'IT Impersonation', 'Trojan'], description: 'Malware delivery attempt disguised as an IT system update. The attached executable contains a known RAT (Remote Access Trojan) that would grant full system access to attackers.' },
  { id: 7, subject: 'Exclusive Offer — 90% Off Premium Software', from: 'deals@software-mega-sale.xyz', category: 'Spam', level: 'medium', confidence: 85.3, timestamp: '2024-12-15 11:30:44', status: 'Blocked', vectors: ['Suspicious Domain', 'Too Good To Be True'], description: 'Classic spam email promoting pirated software. Links point to malware distribution sites. Sender domain registered 2 days ago.' },
];

const levelColors: Record<string, string> = {
  critical: '#ff716c',
  high: '#ff67ad',
  medium: '#ffb148',
};

/* ═══════════ COMPONENT ═══════════ */

export default function ThreatsView() {
  const [selectedThreat, setSelectedThreat] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = threats.filter((t) => {
    if (statusFilter === 'All') return true;
    return t.status === statusFilter;
  });

  const selected = selectedThreat !== null ? threats.find(t => t.id === selectedThreat) : null;

  return (
    <div className="view-content stagger">
      <div className="view-title-row">
        <div>
          <h1 className="view-title">Threat Analysis</h1>
          <p className="view-subtitle">{threats.length} threats detected today</p>
        </div>
        <div className="filter-tabs">
          {['All', 'Blocked', 'Quarantined', 'Flagged'].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${statusFilter === tab ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="threats-layout">
        {/* Threat List */}
        <div className="glass-card-static threats-list-card">
          {filtered.map((threat) => (
            <div
              key={threat.id}
              className={`threat-detail-row ${selectedThreat === threat.id ? 'selected' : ''}`}
              onClick={() => setSelectedThreat(threat.id)}
            >
              <div className="threat-detail-indicator" style={{ background: levelColors[threat.level] || 'var(--outline)' }} />
              <div className="threat-detail-content">
                <div className="threat-detail-top">
                  <span className="threat-detail-subject">{threat.subject}</span>
                  <span className={`threat-status-badge ${threat.status.toLowerCase()}`}>{threat.status}</span>
                </div>
                <div className="threat-detail-from">{threat.from}</div>
                <div className="threat-detail-bottom">
                  <span className="threat-detail-category">{threat.category}</span>
                  <span className="threat-detail-confidence">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/></svg>
                    {threat.confidence}%
                  </span>
                  <span className="threat-detail-time">{threat.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {selected ? (
          <div className="glass-card-static threat-analysis-panel animate-float-in" key={selected.id}>
            <div className="analysis-header">
              <div className="analysis-level" style={{ color: levelColors[selected.level] }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>
                {selected.level.toUpperCase()} THREAT
              </div>
              <span className={`threat-status-badge ${selected.status.toLowerCase()}`}>{selected.status}</span>
            </div>

            <h2 className="analysis-subject">{selected.subject}</h2>
            <p className="analysis-from">{selected.from}</p>

            <div className="analysis-section">
              <h3>AI Analysis</h3>
              <p>{selected.description}</p>
            </div>

            <div className="analysis-section">
              <h3>Confidence Score</h3>
              <div className="confidence-bar-wrapper">
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${selected.confidence}%`, background: levelColors[selected.level] }} />
                </div>
                <span className="confidence-value" style={{ color: levelColors[selected.level] }}>{selected.confidence}%</span>
              </div>
            </div>

            <div className="analysis-section">
              <h3>Attack Vectors</h3>
              <div className="vector-tags">
                {selected.vectors.map((v, i) => (
                  <span key={i} className="vector-tag">{v}</span>
                ))}
              </div>
            </div>

            <div className="analysis-section">
              <h3>Detected</h3>
              <p className="analysis-timestamp">{selected.timestamp}</p>
            </div>

            <div className="analysis-actions">
              {selected.status !== 'Blocked' && <button className="btn-danger">🚫 Block Sender</button>}
              {selected.status !== 'Quarantined' && <button className="btn-secondary">📦 Quarantine</button>}
              <button className="btn-ghost">✅ Mark Safe</button>
            </div>
          </div>
        ) : (
          <div className="glass-card-static threat-analysis-panel inbox-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--outline-variant)" strokeWidth="1"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="var(--outline-variant)"/></svg>
            <p>Select a threat for detailed analysis</p>
          </div>
        )}
      </div>
    </div>
  );
}
