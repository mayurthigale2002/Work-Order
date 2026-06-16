import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/work-orders/proposals/${id}`,
      );
      setProposal(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this proposal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/work-orders/proposals/${id}`,
      );

      alert("Proposal Deleted Successfully");

      // redirect after delete
      navigate("/view-proposals");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✏️ EDIT
  const handleEdit = () => {
    navigate(`/proposal/edit/${id}`);
  };

  if (!proposal) return <h4 className="m-4">Loading...</h4>;



  const handleApprove = async () => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/work-orders/proposals/approve/${id}`
    );

    console.log(res.data);

    alert("Proposal Approved Successfully");

   navigate(`/create-bill/${id}`);

  } catch (err) {
    console.log("FULL ERROR:", err.response?.data || err.message);
    alert("Approval failed");
  }
};

  return (
    <div className="container mt-4">
      <h3>📄 Proposal Details</h3>

      <div className="card p-3 mt-3">
        <p>
          <b>ID:</b> {proposal.id}
        </p>
        <p>
          <b>Work Order:</b> {proposal.work_order_number}
        </p>
        <p>
          <b>Proposal No:</b> {proposal.proposal_no}
        </p>
        <p>
          <b>Amount:</b> {proposal.proposal_amount}
        </p>
        <p>
          <b>Description:</b> {proposal.proposal_description}
        </p>
        <p>
          <b>Created By:</b> {proposal.created_by}
        </p>
        <p>
          <b>Status:</b> {proposal.status}
        </p>
        <p>
          <b>Created At:</b> {proposal.created_at}
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-3">
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>

          <button className="btn btn-success ms-2" onClick={handleApprove}>
            Approve Proposal
          </button>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/proposals")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
