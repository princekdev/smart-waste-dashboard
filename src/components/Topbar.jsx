import { useState } from "react";
import { Menu, Search, Bell, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onMenuClick, pageTitle, search, setSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <button className="topbar__hamburger" onClick={onMenuClick} aria-label="Toggle menu">
        <Menu size={20} />
      </button>

      <h1 className="topbar__title">{pageTitle}</h1>

      <div className="topbar__search">
        <Search size={15} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bins, areas, IDs…"
        />
      </div>

      <div className="topbar__actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="icon-btn icon-btn--with-dot" aria-label="Notifications">
          <Bell size={16} />
          <span className="icon-btn__dot" />
        </button>

        <div className="user-menu">
          <button className="user-menu__trigger" onClick={() => setMenuOpen((o) => !o)}>
            <div className="user-menu__avatar">{user?.name?.[0] || "A"}</div>
            <span className="user-menu__name">{user?.name}</span>
            <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className="user-menu__dropdown">
              <div className="user-menu__dropdown-header">
                <div className="user-menu__dropdown-name">{user?.name}</div>
                <div className="user-menu__dropdown-role">{user?.role}</div>
              </div>
              <button
                className="user-menu__signout"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
