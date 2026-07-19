import { AREAS, statusForFill } from "./constants";

/**
 * Seeded pseudo-random generator so the dataset is stable across
 * re-renders within a session, while still looking organic.
 */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateBins(count = 48) {
  const rand = seededRandom(42);
  const bins = [];
  for (let i = 1; i <= count; i++) {
    const fill = Math.floor(rand() * 100);
    const hoursAgo = Math.floor(rand() * 36);
    bins.push({
      id: `BIN-${String(i).padStart(4, "0")}`,
      location: AREAS[Math.floor(rand() * AREAS.length)],
      fillLevel: fill,
      status: statusForFill(fill),
      lastUpdated: hoursAgo === 0 ? "Just now" : `${hoursAgo}h ago`,
      capacity: [120, 240, 360][Math.floor(rand() * 3)],
    });
  }
  return bins;
}

export function generateDailyWaste() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rand = seededRandom(7);
  return days.map((day) => ({
    day,
    collected: Math.round(820 + rand() * 420),
  }));
}

export function generateAreaDistribution(bins) {
  const map = {};
  bins.forEach((b) => {
    map[b.location] = (map[b.location] || 0) + b.fillLevel;
  });
  return Object.entries(map).map(([area, value]) => ({
    area: area.length > 12 ? area.slice(0, 11) + "…" : area,
    fullArea: area,
    waste: Math.round(value / 8),
  }));
}

export function generateReports() {
  const rand = seededRandom(99);
  const issues = [
    "Bin overflowing for 2 days",
    "Bin lid broken, smell spreading",
    "Missed collection on scheduled day",
    "Bin moved away from designated spot",
    "Stray animals scattering waste",
    "New bin requested for street corner",
    "Segregation not happening at source",
  ];
  const names = ["Ananya Sharma", "Rohan Kumar", "Priya Singh", "Vikas Yadav", "Sneha Das", "Amit Verma"];
  const statuses = ["Pending", "Pending", "Resolved", "Pending", "Resolved", "Pending"];
  return Array.from({ length: 9 }, (_, i) => ({
    id: `RPT-${String(i + 1).padStart(3, "0")}`,
    userName: names[Math.floor(rand() * names.length)],
    issue: issues[Math.floor(rand() * issues.length)],
    area: AREAS[Math.floor(rand() * AREAS.length)],
    status: statuses[Math.floor(rand() * statuses.length)],
    timestamp: `${Math.floor(rand() * 5) + 1}d ago`,
  }));
}
