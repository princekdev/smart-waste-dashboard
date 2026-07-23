import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-row__label">{label}</div>
        <div className="toggle-row__description">{description}</div>
      </div>
      <button className={`toggle-switch ${checked ? "is-checked" : ""}`} onClick={onChange} aria-label={label}>
        <span className="toggle-switch__knob" />
      </button>
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div className="settings-section">
      <h3>{title}</h3>
      <div className="settings-section__body">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const toast = useToast();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="page-stack settings-page">
      <SettingsSection title="Profile">
        <div className="settings-profile">
          <div className="settings-profile__avatar">{user?.name?.[0] || "A"}</div>
          <div>
            <div className="settings-profile__name">{user?.name}</div>
            <div className="settings-profile__meta">
              {user?.email} · {user?.role}
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance">
        <ToggleRow
          label="Dark mode"
          description="Switch between light and dark interface themes"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </SettingsSection>

      <SettingsSection title="System preferences">
        <ToggleRow
          label="Live bin simulation"
          description="Continuously simulate fill-level changes across the network"
          checked={autoRefresh}
          onChange={() => setAutoRefresh((v) => !v)}
        />
        <ToggleRow
          label="Email alerts for overflow bins"
          description="Receive a notification when a bin crosses 80% fill"
          checked={emailAlerts}
          onChange={() => setEmailAlerts((v) => !v)}
        />
      </SettingsSection>

      <button className="btn btn--primary" onClick={() => toast("Preferences saved", "success")}>
        Save preferences
      </button>
    </div>
  );
}
