import { useCallback, useMemo, useState } from "react";
import { generateBins } from "../utils/mockData";
import { statusForFill } from "../utils/constants";

/**
 * Centralizes bin state, filtering, and derived statistics.
 * Keeping this in one hook means every page that needs bin data
 * (Overview, Bin Monitoring, Analytics, Alerts) shares a single
 * source of truth instead of re-fetching or duplicating filter logic.
 */
export function useBins() {
  const [bins, setBins] = useState(() => generateBins());
  const [areaFilter, setAreaFilter] = useState("All areas");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [search, setSearch] = useState("");

  const filteredBins = useMemo(() => {
    return bins.filter((b) => {
      if (areaFilter !== "All areas" && b.location !== areaFilter) return false;
      if (statusFilter !== "All statuses" && b.status !== statusFilter) return false;
      if (
        search &&
        !b.id.toLowerCase().includes(search.toLowerCase()) &&
        !b.location.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [bins, areaFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const total = bins.length;
    const overflow = bins.filter((b) => b.status === "overflow").length;
    const medium = bins.filter((b) => b.status === "medium").length;
    const empty = bins.filter((b) => b.status === "empty").length;
    const avgFill = total === 0 ? 0 : Math.round(bins.reduce((s, b) => s + b.fillLevel, 0) / total);
    return { total, overflow, medium, empty, avgFill };
  }, [bins]);

  /** Simulates live sensor drift — a small percentage of bins change fill level each tick. */
  const simulateTick = useCallback(() => {
    setBins((prev) =>
      prev.map((b) => {
        if (Math.random() > 0.85) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = Math.max(0, Math.min(100, b.fillLevel + delta * Math.floor(Math.random() * 6)));
          return { ...b, fillLevel: next, status: statusForFill(next), lastUpdated: "Just now" };
        }
        return b;
      })
    );
  }, []);

  return {
    bins,
    filteredBins,
    stats,
    areaFilter,
    setAreaFilter,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    simulateTick,
  };
}
