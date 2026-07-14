import { Trash2, X, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "../utils/constants";

export default function Sidebar({ active, onNavigate, collapsed, mobileOpen, setMobileOpen, alertCount }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
      <aside
        className={`sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}
      >
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark">
            <Trash2 size={18} color="#0B2E25" strokeWidth={2.2} />
          </div>
          {!collapsed && (
            <div className="sidebar__brand-text">
              <div className="sidebar__brand-name">CleanGrid</div>
              <div className="sidebar__brand-tag">Civic Ops Console</div>
            </div>
          )}
          <button
            className="sidebar__close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar__nav-item ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} strokeWidth={2} className="sidebar__nav-icon" />
                {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
                {!collapsed && item.id === "alerts" && alertCount > 0 && (
                  <span className="sidebar__nav-badge">{alertCount}</span>
                )}
                {collapsed && item.id === "alerts" && alertCount > 0 && (
                  <span className="sidebar__nav-dot" />
                )}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="sidebar__footer">
            <div className="sidebar__status-card">
              <div className="sidebar__status-title">
                <Sparkles size={13} /> System status
              </div>
              <div className="sidebar__status-text">All sensors reporting normally</div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
