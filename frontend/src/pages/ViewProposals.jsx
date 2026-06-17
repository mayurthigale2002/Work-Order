import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewProposals() {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/work-orders/proposals"
      );
      setProposals(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>📄 All Proposals</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Work Order</th>
            <th>User</th>
            <th>Proposal No</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {proposals.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.work_order_number}</td>
              <td>{p.created_by}</td>
              <td>{p.proposal_no}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/proposal/${p.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProposals;