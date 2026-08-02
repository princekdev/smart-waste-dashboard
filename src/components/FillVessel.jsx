import { useId } from "react";
import { statusForFill, STATUS } from "../utils/constants";

const SIZES = {
  sm: { w: 22, h: 32 },
  md: { w: 30, h: 44 },
  lg: { w: 40, h: 58 },
};

/**
 * Signature visual motif of the dashboard: a capsule that fills bottom-up
 * with the status color, echoing the literal subject — a bin filling
 * with waste — rather than a generic progress bar.
 */
export default function FillVessel({ level, size = "md", showLabel = true }) {
  const status = statusForFill(level);
  const color = STATUS[status].color;
  const dims = SIZES[size];
  const fillHeight = Math.max(2, (dims.h - 6) * (level / 100));
  const clipId = useId();

  return (
    <div className="fill-vessel">
      <svg width={dims.w} height={dims.h} viewBox={`0 0 ${dims.w} ${dims.h}`} aria-hidden="true">
        <rect
          x="2"
          y="2"
          width={dims.w - 4}
          height={dims.h - 4}
          rx={dims.w / 4.5}
          fill="none"
          stroke="var(--vessel-track)"
          strokeWidth="2"
        />
        <clipPath id={clipId}>
          <rect x="2" y="2" width={dims.w - 4} height={dims.h - 4} rx={dims.w / 4.5} />
        </clipPath>
        <rect
          x="3"
          y={dims.h - 3 - fillHeight}
          width={dims.w - 6}
          height={fillHeight}
          fill={color}
          rx="2"
          clipPath={`url(#${clipId})`}
        />
      </svg>
      {showLabel && <span className="fill-vessel__label">{level}%</span>}
    </div>
  );
}
