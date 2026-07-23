import { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateAreaDistribution } from "../utils/mockData";
import { PIE_COLORS } from "../utils/constants";
import ChartCard from "../components/ChartCard";

export default function Analytics({ binsHook, dailyWaste }) {
  const { bins, stats } = binsHook;
  const areaData = useMemo(() => generateAreaDistribution(bins), [bins]);
  const pieData = useMemo(
    () => [
      { name: "Empty", value: stats.empty, key: "empty" },
      { name: "Medium", value: stats.medium, key: "medium" },
      { name: "Overflow", value: stats.overflow, key: "overflow" },
    ],
    [stats]
  );

  const tooltipStyle = {
    background: "var(--surface-elevated)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12.5,
  };

  return (
    <div className="page-stack">
      <div className="two-col two-col--analytics">
        <ChartCard title="Area-wise waste distribution" subtitle="average fill % by zone">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={areaData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis
                dataKey="area"
                stroke="var(--text-tertiary)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, n, p) => [`${v}%`, p.payload.fullArea]} />
              <Bar dataKey="waste" fill="#5EC9A8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Bin status distribution" subtitle="all monitored bins">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {pieData.map((entry) => (
                  <Cell key={entry.key} fill={PIE_COLORS[entry.key]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {pieData.map((d) => (
              <div key={d.key} className="pie-legend__item">
                <span className="pie-legend__dot" style={{ background: PIE_COLORS[d.key] }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Collection trend" subtitle="kilograms collected per day, last 7 days">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyWaste} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12.5 }} />
            <Line type="monotone" dataKey="collected" name="Collected (kg)" stroke="#5EC9A8" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
