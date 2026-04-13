'use client';

import { useState } from 'react';

/* ═══════════ MOCK DATA ═══════════ */

const emails = [
  { id: 1, from: 'Sarah Mitchell', email: 'sarah.mitchell@partner.org', subject: 'Q3 Partnership Review — Updated Terms', preview: 'Hi team, I\'ve attached the updated partnership terms for Q3. Please review sections 4.2 and 5.1 which have been modified based on our last call...', time: '2m ago', unread: true, starred: true, level: 'safe', avatar: 'SM' },
  { id: 2, from: 'GitHub', email: 'noreply@github.com', subject: '[mailsentinel] Pull request #47: Fix auth token refresh', preview: 'dependabot opened a pull request in evanmahmud/mailsentinel: Bump jsonwebtoken from 8.5.1 to 9.0.2. This PR addresses a critical security vulnerability...', time: '5m ago', unread: true, starred: false, level: 'safe', avatar: 'GH' },
  { id: 3, from: 'Bank of America Security', email: 'security@bankofamerica.com.phish.net', subject: '⚠️ Urgent: Verify Your Account Immediately', preview: 'Dear valued customer, we have detected unusual activity on your account. Please click the link below to verify your identity within 24 hours or your account will be suspended...', time: '8m ago', unread: true, starred: false, level: 'critical', avatar: 'BA' },
  { id: 4, from: 'Jira Notifications', email: 'jira@company.atlassian.net', subject: '[MAIL-342] Security scan optimization — moved to In Review', preview: 'Ahmed Khan moved MAIL-342 from "In Progress" to "In Review". The email scanning pipeline optimization has been completed and is ready for final review...', time: '15m ago', unread: false, starred: false, level: 'safe', avatar: 'JR' },
  { id: 5, from: 'CEO Office', email: 'ceo@company-exec.io', subject: 'Wire Transfer Needed — Confidential', preview: 'Hi, I need you to process an urgent wire transfer of $45,000 to a vendor. This is time-sensitive and needs to be done before end of day. Please don\'t discuss this with anyone...', time: '22m ago', unread: true, starred: false, level: 'critical', avatar: 'CO' },
  { id: 6, from: 'TechCrunch', email: 'newsletter@techcrunch.com', subject: 'TechCrunch Daily: AI Revolution in Cybersecurity', preview: 'Today\'s top stories: OpenAI launches new security model, Google DeepMind partners with enterprise security firms, The future of AI-powered threat detection...', time: '34m ago', unread: false, starred: true, level: 'safe', avatar: 'TC' },
  { id: 7, from: 'Microsoft Support', email: 'support@microsoft-verify.net', subject: 'Action Required: Password Reset Confirmation', preview: 'Your Microsoft account password was recently changed. If you did not make this change, click here immediately to secure your account. Your account may be compromised...', time: '41m ago', unread: true, starred: false, level: 'critical', avatar: 'MS' },
  { id: 8, from: 'HR Department', email: 'hr@company-update.biz', subject: 'Your Benefits Package Has Changed — Action Required', preview: 'Dear employee, your benefits enrollment has been updated. Please login to the HR portal using the link below to review and confirm your new benefits package...', time: '52m ago', unread: false, starred: false, level: 'high', avatar: 'HR' },
  { id: 9, from: 'Slack', email: 'notification@slack.com', subject: 'New messages in #security-alerts', preview: 'You have 5 new messages in #security-alerts. @security-team mentioned you: "Can someone check the latest scan results? We\'re seeing an unusual spike in BEC attempts..."', time: '1h ago', unread: false, starred: false, level: 'safe', avatar: 'SL' },
  { id: 10, from: 'Invoice Processing', email: 'invoice@supplier-pay.com', subject: 'Invoice #INV-2024-0893 — Payment Overdue', preview: 'This is a reminder that invoice #INV-2024-0893 for $12,450.00 is now 15 days overdue. Please process payment immediately to avoid late fees and service interruption...', time: '1h ago', unread: false, starred: false, level: 'medium', avatar: 'IP' },
];

const filterTabs = ['All', 'Unread', 'Starred', 'Threats'];

/* ═══════════ COMPONENT ═══════════ */

export default function InboxView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const filtered = emails.filter((e) => {
    if (activeFilter === 'Unread') return e.unread;
    if (activeFilter === 'Starred') return e.starred;
    if (activeFilter === 'Threats') return e.level === 'critical' || e.level === 'high';
    return true;
  });

  const selected = selectedEmail !== null ? emails.find(e => e.id === selectedEmail) : null;

  return (
    <div className="view-content stagger">
      <div className="view-title-row">
        <div>
          <h1 className="view-title">Inbox</h1>
          <p className="view-subtitle">{emails.filter(e => e.unread).length} unread messages</p>
        </div>
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
              {tab === 'Threats' && <span className="filter-tab-badge">3</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="inbox-layout">
        <div className="glass-card-static inbox-list-card">
          {filtered.map((email) => (
            <div
              key={email.id}
              className={`inbox-row ${email.unread ? 'unread' : ''} ${selectedEmail === email.id ? 'selected' : ''}`}
              onClick={() => setSelectedEmail(email.id)}
            >
              <div className={`inbox-avatar level-${email.level}`}>{email.avatar}</div>
              <div className="inbox-content">
                <div className="inbox-top-row">
                  <span className="inbox-sender">{email.from}</span>
                  <span className="inbox-time">{email.time}</span>
                </div>
                <div className="inbox-subject">{email.subject}</div>
                <div className="inbox-preview">{email.preview}</div>
              </div>
              <div className="inbox-indicators">
                {email.level === 'critical' && (
                  <span className="inbox-threat-badge critical">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
                    Threat
                  </span>
                )}
                {email.level === 'high' && (
                  <span className="inbox-threat-badge high">Suspicious</span>
                )}
                {email.starred && (
                  <svg className="inbox-star" width="14" height="14" viewBox="0 0 24 24" fill="#ffb148" stroke="#ffb148" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="glass-card-static inbox-detail-card animate-float-in" key={selected.id}>
            <div className="detail-header">
              <div className={`inbox-avatar large level-${selected.level}`}>{selected.avatar}</div>
              <div>
                <div className="detail-sender">{selected.from}</div>
                <div className="detail-email">{selected.email}</div>
              </div>
              <div className="detail-time">{selected.time}</div>
            </div>
            <div className="detail-subject">{selected.subject}</div>

            {(selected.level === 'critical' || selected.level === 'high') && (
              <div className={`detail-alert ${selected.level}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>
                <div>
                  <strong>AI Threat Analysis:</strong> This email has been flagged as a {selected.level === 'critical' ? 'high-confidence phishing attempt' : 'suspicious communication'}. 
                  {selected.level === 'critical' ? ' The sender domain is spoofed and contains social engineering tactics designed to extract sensitive information.' : ' The sender pattern matches known social engineering profiles.'}
                </div>
              </div>
            )}

            <div className="detail-body">
              <p>{selected.preview}</p>
              <p style={{ marginTop: 16, color: 'var(--on-surface-variant)' }}>
                [Full email content truncated for preview. Click &quot;View Full Email&quot; for complete message.]
              </p>
            </div>

            <div className="detail-actions">
              {(selected.level === 'critical' || selected.level === 'high') ? (
                <>
                  <button className="btn-danger">🛡️ Quarantine</button>
                  <button className="btn-secondary">🔍 Investigate</button>
                  <button className="btn-ghost">Mark Safe</button>
                </>
              ) : (
                <>
                  <button className="btn-primary">↩️ Reply</button>
                  <button className="btn-secondary">↪️ Forward</button>
                  <button className="btn-ghost">Archive</button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card-static inbox-detail-card inbox-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--outline-variant)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
            <p>Select an email to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
