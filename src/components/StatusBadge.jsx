import { STATUS } from "../utils/constants";

export default function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
      <span className="status-badge__dot" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}
