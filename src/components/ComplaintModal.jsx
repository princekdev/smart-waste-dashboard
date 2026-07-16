import { useState } from "react";
import { X } from "lucide-react";
import { AREAS } from "../utils/constants";
import Select from "./Select";
import LabeledInput from "./LabeledInput";

export default function ComplaintModal({ onClose, onSubmit }) {
  const [userName, setUserName] = useState("");
  const [issue, setIssue] = useState("");
  const [area, setArea] = useState(AREAS[0]);

  const canSubmit = userName.trim() && issue.trim();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>Submit a complaint</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="modal__body">
          <LabeledInput label="Your name" value={userName} onChange={setUserName} placeholder="e.g. Ananya Sharma" />
          <div className="labeled-input">
            <label>Area</label>
            <Select value={area} onChange={setArea} options={AREAS} />
          </div>
          <div className="labeled-input">
            <label>Describe the issue</label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={3}
              placeholder="What went wrong?"
            />
          </div>
          <button
            className="btn btn--primary"
            disabled={!canSubmit}
            onClick={() => canSubmit && onSubmit({ userName, issue, area })}
          >
            Submit complaint
          </button>
        </div>
      </div>
    </div>
  );
}
