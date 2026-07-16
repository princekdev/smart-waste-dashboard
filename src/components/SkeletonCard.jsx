export default function SkeletonCard({ height = 100 }) {
  return (
    <div className="skeleton-card" style={{ height }}>
      <div className="skeleton-card__shimmer" />
    </div>
  );
}
