'use client';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (id: string) => void;
}

const navSections = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'grid', badge: 0 },
      { id: 'inbox', label: 'Inbox', icon: 'mail', badge: 24 },
      { id: 'threats', label: 'Threats', icon: 'shield-alert', badge: 7 },
      { id: 'quarantine', label: 'Quarantine', icon: 'archive', badge: 3 },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'reports', label: 'Reports', icon: 'bar-chart', badge: 0 },
      { id: 'settings', label: 'Settings', icon: 'settings', badge: 0 },
    ],
  },
];

function Icon({ name }: { name: string }) {
  const props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'grid': return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'mail': return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>;
    case 'shield-alert': return <svg {...props}><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>;
    case 'archive': return <svg {...props}><polyline points="21,8 21,21 3,21 3,8"/><rect x="1" y="3" width="22" height="5" rx="1"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    case 'bar-chart': return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
    default: return null;
  }
}

export default function Sidebar({ open, onClose, activeItem, onNavigate }: SidebarProps) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5z"/>
              <polyline points="9,12 11,14 15,10" stroke="white" strokeWidth="2.5"/>
            </svg>
          </div>
          <div>
            <div className="sidebar-title">MailSentinel</div>
            <div className="sidebar-subtitle">AI Email Security</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                >
                  <span className="nav-item-icon"><Icon name={item.icon} /></span>
                  {item.label}
                  {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">SA</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Security Admin</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
          <div className="sidebar-status" />
        </div>
      </aside>
    </>
  );
}
