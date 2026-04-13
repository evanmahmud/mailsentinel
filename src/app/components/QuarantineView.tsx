'use client';

import { useState } from 'react';

/* ═══════════ MOCK DATA ═══════════ */

const quarantinedEmails = [
  { id: 1, subject: 'Urgent: Verify Your Account Immediately', from: 'security@bankofamerica.com.phish.net', category: 'Phishing', quarantinedAt: '2024-12-15 14:32', expiresIn: '27 days', size: '24 KB', selected: false },
  { id: 2, subject: 'Wire Transfer Needed — Confidential', from: 'ceo@company-exec.io', category: 'BEC', quarantinedAt: '2024-12-15 14:25', expiresIn: '27 days', size: '18 KB', selected: false },
  { id: 3, subject: 'System Update Required — Click to Install', from: 'it-dept@updates-corp.com', category: 'Malware', quarantinedAt: '2024-12-15 12:15', expiresIn: '27 days', size: '2.4 MB', selected: false },
  { id: 4, subject: 'Exclusive Offer — 90% Off Premium Software', from: 'deals@software-mega-sale.xyz', category: 'Spam', quarantinedAt: '2024-12-14 16:44', expiresIn: '26 days', size: '56 KB', selected: false },
  { id: 5, subject: 'You won a $1000 Amazon Gift Card!', from: 'winner@prize-claim.net', category: 'Scam', quarantinedAt: '2024-12-14 09:12', expiresIn: '26 days', size: '32 KB', selected: false },
  { id: 6, subject: 'Tax Return Filing — Immediate Action Required', from: 'irs@tax-refund-process.org', category: 'Phishing', quarantinedAt: '2024-12-13 22:01', expiresIn: '25 days', size: '41 KB', selected: false },
];

const categoryColors: Record<string, string> = {
  Phishing: '#ff716c',
  BEC: '#ff67ad',
  Malware: '#a855f7',
  Spam: '#ffb148',
  Scam: '#ff67ad',
};

export default function QuarantineView() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === quarantinedEmails.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(quarantinedEmails.map(e => e.id)));
    }
  };

  return (
    <div className="view-content stagger">
      <div className="view-title-row">
        <div>
          <h1 className="view-title">Quarantine</h1>
          <p className="view-subtitle">{quarantinedEmails.length} items quarantined · Auto-delete after 30 days</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="quarantine-summary">
        <div className="glass-card q-summary-card">
          <div className="q-summary-value" style={{ color: 'var(--error)' }}>{quarantinedEmails.length}</div>
          <div className="q-summary-label">Total Quarantined</div>
        </div>
        <div className="glass-card q-summary-card">
          <div className="q-summary-value" style={{ color: 'var(--secondary)' }}>3</div>
          <div className="q-summary-label">Critical Threats</div>
        </div>
        <div className="glass-card q-summary-card">
          <div className="q-summary-value" style={{ color: 'var(--tertiary)' }}>2.5 MB</div>
          <div className="q-summary-label">Storage Used</div>
        </div>
        <div className="glass-card q-summary-card">
          <div className="q-summary-value" style={{ color: 'var(--primary)' }}>30d</div>
          <div className="q-summary-label">Retention Period</div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="quarantine-actions-bar">
        <label className="q-select-all">
          <input type="checkbox" checked={selected.size === quarantinedEmails.length && quarantinedEmails.length > 0} onChange={selectAll} />
          <span>{selected.size > 0 ? `${selected.size} selected` : 'Select all'}</span>
        </label>
        {selected.size > 0 && (
          <div className="q-bulk-actions animate-float-in">
            <button className="btn-danger">🗑️ Delete ({selected.size})</button>
            <button className="btn-secondary">✅ Release ({selected.size})</button>
            <button className="btn-ghost">📋 Report</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass-card-static quarantine-table-card">
        <table className="quarantine-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th>Subject</th>
              <th>From</th>
              <th>Category</th>
              <th>Quarantined</th>
              <th>Expires</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {quarantinedEmails.map((email) => (
              <tr
                key={email.id}
                className={selected.has(email.id) ? 'selected' : ''}
                onClick={() => toggleSelect(email.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(email.id)}
                    onChange={() => toggleSelect(email.id)}
                    className="q-checkbox"
                  />
                </td>
                <td>
                  <div className="q-subject">{email.subject}</div>
                </td>
                <td>
                  <div className="q-from">{email.from}</div>
                </td>
                <td>
                  <span className="q-category-badge" style={{ color: categoryColors[email.category], borderColor: categoryColors[email.category] + '40', background: categoryColors[email.category] + '15' }}>
                    {email.category}
                  </span>
                </td>
                <td className="q-date">{email.quarantinedAt}</td>
                <td className="q-expires">{email.expiresIn}</td>
                <td className="q-size">{email.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
