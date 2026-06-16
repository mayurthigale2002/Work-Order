import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewBills() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/work-orders/bills",
      );
      setBills(res.data.data || res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>🧾 All Bills</h3>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Proposal ID</th>
            <th>Bill No</th>
            <th>Amount</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.length > 0 ? (
            bills.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.proposal_id}</td>
                <td>{b.bill_no}</td>
                <td>₹ {b.bill_amount}</td>
                <td>{b.created_by}</td>
                <td>
                  <span className="badge bg-success">
                    {b.status === "Pending" ? "Complete" : b.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Bills Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBills;
