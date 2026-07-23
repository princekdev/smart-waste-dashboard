import { Filter } from "lucide-react";
import { AREAS } from "../utils/constants";
import Select from "../components/Select";
import BinCard from "../components/BinCard";
import EmptyState from "../components/EmptyState";

export default function BinMonitoring({ binsHook }) {
  const { filteredBins, areaFilter, setAreaFilter, statusFilter, setStatusFilter } = binsHook;

  return (
    <div className="page-stack">
      <div className="filter-row">
        <div className="filter-row__label">
          <Filter size={13} /> Filter
        </div>
        <Select value={areaFilter} onChange={setAreaFilter} options={["All areas", ...AREAS]} />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          options={["All statuses", "empty", "medium", "overflow"]}
          labels={{ empty: "Empty", medium: "Medium", overflow: "Overflow" }}
        />
        <span className="filter-row__count">{filteredBins.length} bins shown</span>
      </div>

      {filteredBins.length === 0 ? (
        <EmptyState message="No bins match these filters." />
      ) : (
        <div className="bin-grid">
          {filteredBins.map((bin) => (
            <BinCard key={bin.id} bin={bin} />
          ))}
        </div>
      )}
    </div>
  );
}
