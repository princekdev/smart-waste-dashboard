import { useEffect, useMemo, useState } from "react";
import { PAGE_TITLES } from "../utils/constants";
import { generateDailyWaste } from "../utils/mockData";
import { useBins } from "../hooks/useBins";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardOverview from "../pages/DashboardOverview";
import BinMonitoring from "../pages/BinMonitoring";
import Analytics from "../pages/Analytics";
import AlertsPage from "../pages/AlertsPage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";

export default function DashboardApp() {
  const [activePage, setActivePage] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery("(max-width: 880px)");
  const binsHook = useBins();
  const dailyWaste = useMemo(() => generateDailyWaste(), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Simulates a live sensor feed: a fraction of bins drift their fill level
  // every few seconds, so the UI demonstrates real-time monitoring behavior.
  useEffect(() => {
    const interval = setInterval(() => binsHook.simulateTick(), 4000);
    return () => clearInterval(interval);
  }, [binsHook.simulateTick]);

  useEffect(() => {
    binsHook.setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const alertCount = binsHook.stats.overflow;

  return (
    <div className="app-shell">
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        alertCount={alertCount}
      />
      <div className={`app-shell__main ${collapsed ? "is-collapsed" : ""}`}>
        <Topbar
          onMenuClick={() => {
            if (isMobile) setMobileOpen((o) => !o);
            else setCollapsed((c) => !c);
          }}
          pageTitle={PAGE_TITLES[activePage]}
          search={search}
          setSearch={setSearch}
        />
        <main className="app-shell__content">
          {activePage === "overview" && (
            <DashboardOverview binsHook={binsHook} dailyWaste={dailyWaste} loading={loading} />
          )}
          {activePage === "bins" && <BinMonitoring binsHook={binsHook} />}
          {activePage === "analytics" && <Analytics binsHook={binsHook} dailyWaste={dailyWaste} />}
          {activePage === "alerts" && <AlertsPage binsHook={binsHook} />}
          {activePage === "reports" && <ReportsPage />}
          {activePage === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
