import { MapPin, Clock } from "lucide-react";
import FillVessel from "./FillVessel";
import StatusBadge from "./StatusBadge";

export default function BinCard({ bin }) {
  return (
    <div className="bin-card">
      <div className="bin-card__head">
        <div>
          <div className="bin-card__id">{bin.id}</div>
          <div className="bin-card__location">
            <MapPin size={11} /> {bin.location}
          </div>
        </div>
        <StatusBadge status={bin.status} />
      </div>

      <div className="bin-card__fill-row">
        <FillVessel level={bin.fillLevel} size="md" />
        <div className="bin-card__capacity">
          <div className="bin-card__capacity-label">Capacity</div>
          <div className="bin-card__capacity-value">{bin.capacity}L</div>
        </div>
      </div>

      <div className="bin-card__footer">
        <Clock size={11} /> Updated {bin.lastUpdated}
      </div>
    </div>
  );
}
