import { LayoutDashboard, Trash2, BarChart3, AlertTriangle, ClipboardList, Settings } from "lucide-react";

export const AREAS = [
  "Rajendra Nagar",
  "Boring Road",
  "Kankarbagh",
  "Patliputra",
  "Anisabad",
  "Danapur",
  "Gola Road",
  "Bailey Road",
];

export const STATUS = {
  empty: { label: "Empty", color: "#5EC9A8", bg: "rgba(94,201,168,0.12)" },
  medium: { label: "Medium", color: "#E8B95B", bg: "rgba(232,185,91,0.12)" },
  overflow: { label: "Overflow", color: "#E0654D", bg: "rgba(224,101,77,0.12)" },
};

export function statusForFill(fill) {
  if (fill >= 80) return "overflow";
  if (fill >= 45) return "medium";
  return "empty";
}

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bins", label: "Bin monitoring", icon: Trash2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
  { id: "reports", label: "Reports", icon: ClipboardList },
  { id: "settings", label: "Settings", icon: Settings },
];

export const PAGE_TITLES = {
  overview: "Overview",
  bins: "Bin monitoring",
  analytics: "Analytics",
  alerts: "Alerts",
  reports: "Reports & complaints",
  settings: "Settings",
};

export const PIE_COLORS = { empty: "#5EC9A8", medium: "#E8B95B", overflow: "#E0654D" };
