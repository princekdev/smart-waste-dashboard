import { createContext, useContext, useState } from "react";
import { storage } from "../services/storage";

const ThemeContext = createContext(null);

export const THEME_TOKENS = {
  dark: {
    "--bg": "#11171C",
    "--surface": "#1A2228",
    "--surface-elevated": "#212B32",
    "--surface-hover": "#212B32",
    "--border": "rgba(255,255,255,0.08)",
    "--text-primary": "#ECF1F0",
    "--text-secondary": "#9BA8AC",
    "--text-tertiary": "#6C7A7E",
    "--chart-grid": "rgba(255,255,255,0.06)",
    "--vessel-track": "rgba(255,255,255,0.14)",
  },
  light: {
    "--bg": "#F4F1EA",
    "--surface": "#FFFFFF",
    "--surface-elevated": "#FFFFFF",
    "--surface-hover": "#F1EEE6",
    "--border": "rgba(20,20,18,0.1)",
    "--text-primary": "#1A2228",
    "--text-secondary": "#5B6063",
    "--text-tertiary": "#8B8F8C",
    "--chart-grid": "rgba(20,20,18,0.06)",
    "--vessel-track": "rgba(20,20,18,0.12)",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storage.get("theme", "dark"));

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    storage.set("theme", next);
    setTheme(next);
  };

  const vars = {
    ...THEME_TOKENS[theme],
    "--font-display": "'Space Grotesk', 'Inter', system-ui, sans-serif",
    "--font-body": "'Inter', system-ui, sans-serif",
    "--font-mono": "'JetBrains Mono', monospace",
    colorScheme: theme,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={vars}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
