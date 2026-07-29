import { AlertTriangle } from "lucide-react";
import FillVessel from "../components/FillVessel";
import EmptyState from "../components/EmptyState";

function AlertRow({ bin, priority }) {
  const accent = priority === "critical" ? "#E0654D" : "#E8B95B";
  return (
    <div className="alert-row" style={{ borderLeftColor: accent }}>
      <FillVessel level={bin.fillLevel} size="sm" showLabel={false} />
      <div className="alert-row__info">
        <div className="alert-row__top">
          <span className="alert-row__id">{bin.id}</span>
          <span className="alert-row__location">· {bin.location}</span>
        </div>
        <div className="alert-row__updated">Updated {bin.lastUpdated}</div>
      </div>
      <div className="alert-row__pct" style={{ color: accent }}>
        {bin.fillLevel}%
      </div>
    </div>
  );
}

export default function AlertsPage({ binsHook }) {
  const { bins } = binsHook;
  const overflowBins = bins.filter((b) => b.status === "overflow").sort((a, b) => b.fillLevel - a.fillLevel);
  const mediumBins = bins
    .filter((b) => b.status === "medium")
    .sort((a, b) => b.fillLevel - a.fillLevel)
    .slice(0, 6);

  return (
    <div className="page-stack">
      <div className="alert-banner">
        <AlertTriangle size={20} color="#E0654D" />
        <div>
          <div className="alert-banner__title">{overflowBins.length} bins require immediate pickup</div>
          <div className="alert-banner__subtitle">Sorted by fill level, highest priority first</div>
        </div>
      </div>

      <div>
        <h3 className="section-title">Overflow — critical priority</h3>
        {overflowBins.length === 0 ? (
          <EmptyState message="No critical bins. All clear across the city." />
        ) : (
          <div className="alert-list">
            {overflowBins.map((bin) => (
              <AlertRow key={bin.id} bin={bin} priority="critical" />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="section-title">Approaching threshold — watch list</h3>
        {mediumBins.length === 0 ? (
          <EmptyState message="No bins approaching threshold." />
        ) : (
          <div className="alert-list">
            {mediumBins.map((bin) => (
              <AlertRow key={bin.id} bin={bin} priority="watch" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
