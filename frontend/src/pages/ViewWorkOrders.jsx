import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ViewWorkOrders() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const limit = 5;

  // FETCH DATA
  const fetchData = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/work-orders?page=${pageNumber}&limit=${limit}`,
      );

      setData(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/work-orders/delete/${id}`);

      fetchData(page);
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // ✏️ EDIT (simple prompt)
  const handleEdit = async (item) => {
    const newStatus = prompt("Enter new status:", item.status);
    if (!newStatus) return;

    try {
      await axios.put(
        `http://localhost:5000/api/work-orders/update/${item.id}`,
        {
          ...item,
          status: newStatus,
        },
      );

      fetchData(page);
    } catch (err) {
      console.log("Edit Error:", err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-3">📋 Work Orders Full Details</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Scheme Name</th>
              <th>Budget Head</th>
              <th>Approved Year</th>
              <th>Block Name</th>
              <th>Agreement No</th>
              <th>Work Name</th>
              <th>Road Length</th>
              <th>PAN No</th>
              <th>Package No</th>
              <th>Vendor Name</th>
              <th>Work Order Name</th>
              <th>Work Order Number</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>AA Cost</th>
              <th>Amount Put To Tender</th>
              <th>Tendered Construction Amount</th>
              <th>Agreement Maintenance Amount</th>
              <th>Total Agreement Amount</th>
              <th>Accepted Rate</th>
              <th>Accepted Rate %</th>
              <th>Completion Months</th>
              <th>Approved Work Order Amount</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.scheme_name}</td>
                <td>{item.budget_head}</td>
                <td>{item.approved_year}</td>
                <td>{item.block_name}</td>
                <td>{item.agreement_no}</td>
                <td>{item.work_name}</td>
                <td>{item.road_length}</td>
                <td>{item.pan_no}</td>
                <td>{item.package_no}</td>
                <td>{item.vendor_name}</td>
                <td>{item.work_order_name}</td>
                <td>{item.work_order_number}</td>
                <td>{item.work_order_start_date}</td>
                <td>{item.completion_date}</td>
                <td>{item.aa_cost}</td>
                <td>{item.amount_put_to_tender}</td>
                <td>{item.tendered_construction_amount}</td>
                <td>{item.agreement_maintenance_amount}</td>
                <td>{item.total_agreement_amount}</td>
                <td>{item.accepted_rate}</td>
                <td>{item.accepted_rate_percent}</td>
                <td>{item.completion_period_months}</td>
                <td>{item.approved_work_order_amount}</td>
                <td>{item.paid_amount}</td>
                <td>{item.remaining_amount}</td>
                <td>{item.work_order_file}</td>

                <td>
                  <span className="badge bg-success">{item.status}</span>
                </td>

                <td>
                  <div className="d-flex gap-2 justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/create-proposal/${item.id}`)}
                    >
                      Proposal
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="mt-2">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary ms-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewWorkOrders;
