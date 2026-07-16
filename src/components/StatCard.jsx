export default function StatCard({ label, value, sublabel, accent, icon: Icon, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        <div className="stat-card__icon" style={{ background: `${accent}1F`, color: accent }}>
          <Icon size={15} />
        </div>
      </div>
      <div className="stat-card__value">{value}</div>
      {sublabel && (
        <div className="stat-card__sublabel">
          {trend !== undefined && (
            <span className={`stat-card__trend ${trend >= 0 ? "is-up" : "is-down"}`}>
              {trend >= 0 ? "+" : ""}
              {trend}%
            </span>
          )}
          {sublabel}
        </div>
      )}
    </div>
  );
}
