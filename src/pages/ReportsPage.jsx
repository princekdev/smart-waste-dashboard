import { useState } from "react";
import { Plus } from "lucide-react";
import { generateReports } from "../utils/mockData";
import { useToast } from "../context/ToastContext";
import ComplaintModal from "../components/ComplaintModal";

export default function ReportsPage() {
  const [reports, setReports] = useState(() => generateReports());
  const [modalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  const resolveReport = (id) => {
    setReports((rs) => rs.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r)));
    toast("Report marked as resolved", "success");
  };

  const addReport = (data) => {
    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, "0")}`,
      ...data,
      status: "Pending",
      timestamp: "Just now",
    };
    setReports((rs) => [newReport, ...rs]); 
    toast("Complaint submitted successfully", "success");
    setModalOpen(false);
  };

  const pending = reports.filter((r) => r.status === "Pending").length;

  return (
    <div className="page-stack">
      <div className="reports-toolbar">
        <span className="reports-toolbar__count">
          {pending} pending · {reports.length - pending} resolved
        </span>
        <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
          <Plus size={15} /> Submit complaint
        </button>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {["ID", "Reported by", "Issue", "Area", "Status", "Time", ""].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td className="data-table__mono">{r.id}</td>
                  <td>{r.userName}</td>
                  <td className="data-table__issue">{r.issue}</td>
                  <td className="data-table__muted">{r.area}</td>
                  <td>
                    <span className={`report-status report-status--${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td className="data-table__muted">{r.timestamp}</td>
                  <td>
                    {r.status === "Pending" && (
                      <button className="btn btn--ghost-sm" onClick={() => resolveReport(r.id)}>
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <ComplaintModal onClose={() => setModalOpen(false)} onSubmit={addReport} />}
    </div>
  );
}
