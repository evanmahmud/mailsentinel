'use client';

import { useState } from 'react';

/* ═══════════ SETTINGS DATA ═══════════ */

interface ToggleState {
  realTimeScan: boolean;
  autoQuarantine: boolean;
  linkProtection: boolean;
  attachmentScan: boolean;
  aiEnhanced: boolean;
  spamFilter: boolean;
  emailNotify: boolean;
  desktopNotify: boolean;
  weeklyReport: boolean;
  criticalAlerts: boolean;
  darkMode: boolean;
  compactView: boolean;
}

export default function SettingsView() {
  const [toggles, setToggles] = useState<ToggleState>({
    realTimeScan: true,
    autoQuarantine: true,
    linkProtection: true,
    attachmentScan: true,
    aiEnhanced: true,
    spamFilter: true,
    emailNotify: true,
    desktopNotify: false,
    weeklyReport: true,
    criticalAlerts: true,
    darkMode: true,
    compactView: false,
  });

  const [sensitivity, setSensitivity] = useState(75);

  const toggle = (key: keyof ToggleState) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="view-content stagger">
      <div className="view-title-row">
        <div>
          <h1 className="view-title">Settings</h1>
          <p className="view-subtitle">Configure your email security preferences</p>
        </div>
        <button className="btn-primary">💾 Save Changes</button>
      </div>

      <div className="settings-grid">
        {/* Scanning Configuration */}
        <div className="glass-card-static section-card settings-section animate-float-in">
          <div className="settings-section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/></svg>
            <h2>Scanning Configuration</h2>
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">Real-time Email Scanning</div>
              <div className="settings-item-desc">Automatically scan incoming emails as they arrive</div>
            </div>
            <div className={`toggle-switch ${toggles.realTimeScan ? 'active' : ''}`} onClick={() => toggle('realTimeScan')} />
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">Auto-Quarantine Threats</div>
              <div className="settings-item-desc">Automatically move detected threats to quarantine</div>
            </div>
            <div className={`toggle-switch ${toggles.autoQuarantine ? 'active' : ''}`} onClick={() => toggle('autoQuarantine')} />
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">Link Protection</div>
              <div className="settings-item-desc">Scan and sandbox all URLs in incoming emails</div>
            </div>
            <div className={`toggle-switch ${toggles.linkProtection ? 'active' : ''}`} onClick={() => toggle('linkProtection')} />
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">Attachment Scanning</div>
              <div className="settings-item-desc">Deep scan all email attachments for malware</div>
            </div>
            <div className={`toggle-switch ${toggles.attachmentScan ? 'active' : ''}`} onClick={() => toggle('attachmentScan')} />
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">AI-Enhanced Detection</div>
              <div className="settings-item-desc">Use Gemini AI for advanced threat pattern recognition</div>
            </div>
            <div className={`toggle-switch ${toggles.aiEnhanced ? 'active' : ''}`} onClick={() => toggle('aiEnhanced')} />
          </div>

          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-item-title">Spam Filtering</div>
              <div className="settings-item-desc">Filter and categorize spam emails automatically</div>
            </div>
            <div className={`toggle-switch ${toggles.spamFilter ? 'active' : ''}`} onClick={() => toggle('spamFilter')} />
          </div>
        </div>

        {/* Notifications & Preferences */}
        <div className="settings-right-col">
          <div className="glass-card-static section-card settings-section animate-float-in" style={{ animationDelay: '0.1s' }}>
            <div className="settings-section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tertiary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <h2>Notifications</h2>
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-title">Email Notifications</div>
                <div className="settings-item-desc">Receive threat alerts via email</div>
              </div>
              <div className={`toggle-switch ${toggles.emailNotify ? 'active' : ''}`} onClick={() => toggle('emailNotify')} />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-title">Desktop Notifications</div>
                <div className="settings-item-desc">Show browser push notifications</div>
              </div>
              <div className={`toggle-switch ${toggles.desktopNotify ? 'active' : ''}`} onClick={() => toggle('desktopNotify')} />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-title">Weekly Security Report</div>
                <div className="settings-item-desc">Receive a summary report every Monday</div>
              </div>
              <div className={`toggle-switch ${toggles.weeklyReport ? 'active' : ''}`} onClick={() => toggle('weeklyReport')} />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <div className="settings-item-title">Critical Alerts Only</div>
                <div className="settings-item-desc">Only notify for critical-level threats</div>
              </div>
              <div className={`toggle-switch ${toggles.criticalAlerts ? 'active' : ''}`} onClick={() => toggle('criticalAlerts')} />
            </div>
          </div>

          {/* Sensitivity Slider */}
          <div className="glass-card-static section-card settings-section animate-float-in" style={{ animationDelay: '0.2s' }}>
            <div className="settings-section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              <h2>Detection Sensitivity</h2>
            </div>

            <div className="sensitivity-control">
              <div className="sensitivity-labels">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="sensitivity-slider"
              />
              <div className="sensitivity-value">{sensitivity}%</div>
              <p className="sensitivity-desc">
                {sensitivity < 33 ? 'Low sensitivity: Only flag high-confidence threats. May miss some suspicious emails.' :
                 sensitivity < 66 ? 'Medium sensitivity: Balanced detection. Good trade-off between security and convenience.' :
                 'High sensitivity: Flag all suspicious patterns. May produce more false positives.'}
              </p>
            </div>
          </div>

          {/* AI Model */}
          <div className="glass-card-static section-card settings-section animate-float-in" style={{ animationDelay: '0.3s' }}>
            <div className="settings-section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              <h2>AI Model</h2>
            </div>
            <div className="ai-model-info">
              <div className="ai-model-card">
                <div className="ai-model-name">Gemini 2.5 Pro</div>
                <div className="ai-model-desc">Advanced threat detection with multi-modal analysis</div>
                <div className="ai-model-stats">
                  <span>Accuracy: <strong>99.2%</strong></span>
                  <span>Latency: <strong>0.8s</strong></span>
                  <span>Status: <strong style={{ color: 'var(--success)' }}>Active</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
