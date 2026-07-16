export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="chart-card">
      <div className="chart-card__head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
