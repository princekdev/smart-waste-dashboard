import { Trash2, AlertTriangle, Circle, TrendingUp, CheckCircle2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "../components/StatCard";
import FillVessel from "../components/FillVessel";
import SkeletonCard from "../components/SkeletonCard";

export default function DashboardOverview({ binsHook, dailyWaste, loading }) {
  const { stats, bins } = binsHook;
  const recentAlerts = bins.filter((b) => b.status === "overflow").slice(0, 5);

  if (loading) {
    return (
      <div className="stat-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} height={110} />
        ))}
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="stat-grid">
        <StatCard label="Total bins" value={stats.total} sublabel="across 8 zones" accent="#5EC9A8" icon={Trash2} />
        <StatCard
          label="Overflow alerts"
          value={stats.overflow}
          sublabel="need pickup now"
          accent="#E0654D"
          icon={AlertTriangle}
          trend={stats.overflow > 5 ? 12 : -4}
        />
        <StatCard label="Medium fill" value={stats.medium} sublabel="approaching threshold" accent="#E8B95B" icon={Circle} />
        <StatCard
          label="Today's collection"
          value={`${dailyWaste[dailyWaste.length - 1]?.collected ?? 0} kg`}
          sublabel="vs yesterday"
          accent="#5EC9A8"
          icon={TrendingUp}
          trend={8}
        />
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel__head">
            <h3>Waste collected, last 7 days</h3>
            <span className="panel__hint">in kilograms</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailyWaste} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12.5,
                }}
              />
              <Line type="monotone" dataKey="collected" stroke="#5EC9A8" strokeWidth={2.5} dot={{ r: 3, fill: "#5EC9A8" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel panel--flex">
          <h3>Critical bins</h3>
          {recentAlerts.length === 0 ? (
            <div className="panel__empty">
              <CheckCircle2 size={28} color="#5EC9A8" />
              <span>No overflow bins right now</span>
            </div>
          ) : (
            <div className="critical-list">
              {recentAlerts.map((bin) => (
                <div key={bin.id} className="critical-list__row">
                  <div>
                    <div className="critical-list__id">{bin.id}</div>
                    <div className="critical-list__location">{bin.location}</div>
                  </div>
                  <FillVessel level={bin.fillLevel} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
