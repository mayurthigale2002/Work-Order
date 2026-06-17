
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/work-orders/proposals/${id}`
      );
      setProposal(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch proposal");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this proposal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/work-orders/proposals/${id}`
      );

      alert("Proposal deleted successfully");
      navigate("/view-proposals");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✅ APPROVE
  const handleApprove = async () => {
    const confirmApprove = window.confirm("Approve this proposal?");
    if (!confirmApprove) return;

    setActionLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/work-orders/proposals/approve/${id}`,
        { comment }
      );

      setProposal((prev) => ({
        ...prev,
        status: "approved",
      }));

      navigate(`/create-bill/${id}`);
    } catch (err) {
      console.log(err);
      alert("Approval failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ❌ REJECT
  const handleReject = async () => {
    const confirmReject = window.confirm("Reject this proposal?");
    if (!confirmReject) return;

    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    setActionLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/work-orders/proposals/reject/${id}`,
        { reason: rejectReason }
      );

      alert("Proposal rejected successfully");

      setProposal((prev) => ({
        ...prev,
        status: "rejected",
      }));
    } catch (err) {
      console.log(err);
      alert("Rejection failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <h4 className="m-4">Loading...</h4>;
  if (!proposal) return <h4 className="m-4">No Proposal Found</h4>;

  const isFinal =
    proposal.status === "approved" || proposal.status === "rejected";

  return (
    <div className="container mt-4">
      <h3>📄 Proposal Details</h3>

      <div className="card p-3 mt-3">
        <p><b>ID:</b> {proposal.id}</p>
        <p><b>Work Order:</b> {proposal.work_order_number}</p>
        <p><b>Proposal No:</b> {proposal.proposal_no}</p>
        <p><b>Amount:</b> {proposal.proposal_amount}</p>
        <p><b>Description:</b> {proposal.proposal_description}</p>
        <p><b>Created By:</b> {proposal.created_by}</p>

        {/* STATUS */}
        <p>
          <b>Status:</b>{" "}
          <span
            className={
              proposal.status === "approved"
                ? "badge bg-success"
                : proposal.status === "rejected"
                ? "badge bg-danger"
                : "badge bg-warning text-dark"
            }
          >
            {proposal.status}
          </span>
        </p>

        <p><b>Created At:</b> {proposal.created_at}</p>

        {/* APPROVAL COMMENT */}
        {!isFinal && (
          <div className="mt-3">
            <label className="form-label">
              <b>Approval Comment (optional)</b>
            </label>

            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment before approving..."
            />
          </div>
        )}

        {/* REJECT REASON */}
        {proposal.status === "pending" && (
          <div className="mt-3">
            <label className="form-label">
              <b>Rejection Reason</b>
            </label>

            <textarea
              className="form-control"
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection..."
            />
          </div>
        )}

        {/* ACTION BUTTONS */}
        {proposal.status === "pending" && (
          <div className="mt-3">
            <button
              className="btn btn-success"
              onClick={handleApprove}
              disabled={actionLoading}
            >
              👍 Approve
            </button>

            <button
              className="btn btn-danger ms-2"
              onClick={handleReject}
              disabled={actionLoading}
            >
              👎 Don’t Approve
            </button>

            <button
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/proposals")}
            >
              Back
            </button>
          </div>
        )}

        {/* DELETE (optional always visible) */}
        <div className="mt-3">
          <button
            className="btn btn-outline-danger"
            onClick={handleDelete}
            disabled={actionLoading || isFinal}
          >
            Delete Proposal
          </button>

          <button className="btn btn-success ms-2" onClick={handleApprove}>
            Approve Proposal
          </button>
        </div>

        {/* FINAL MESSAGE */}
        {isFinal && (
          <div className="alert alert-info mt-3">
            This proposal has been {proposal.status}.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProposalDetails;