
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateWorkOrder() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const selectFields = {
  status: ["Pending", "Approved", "Rejected"],
  budget_head: ["Road", "Building", "Bridge"],
  approved_year: ["2022", "2023", "2024", "2025"],
  scheme_name: [
    "PMGSY Road Scheme",
    "State Road Development",
    "Rural Infrastructure Scheme",
    "Urban Road Improvement"
  ]
};

  const [form, setForm] = useState({
    scheme_name: "",
    budget_head: "",
    approved_year: "",
    block_name: "",
    agreement_no: "",
    work_name: "",
    road_length: "",
    pan_no: "",
    package_no: "",
    vendor_name: "",
    work_order_name: "",
    work_order_number: "",
    work_order_start_date: "",
    completion_date: "",
    aa_cost: "",
    amount_put_to_tender: "",
    tendered_construction_amount: "",
    agreement_maintenance_amount: "",
    total_agreement_amount: "",
    accepted_rate: "",
    accepted_rate_percent: "",
    completion_period_months: "",
    approved_work_order_amount: "",
    paid_amount: "",
    remaining_amount: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (!form.work_order_number || !form.work_name || !form.vendor_name) {
      alert("Please fill required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("user_email", user?.email);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/work-orders/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      navigate("/work-orders");

    } catch (err) {
      console.log("ERROR:", err);
      alert("Error creating work order");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">➕ Create Work Order</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
  {Object.keys(form).map((key) => (
    <div className="col-md-6 mb-3" key={key}>
      <label className="form-label text-capitalize">
        {key.replaceAll("_", " ")}
      </label>

      {/* FILE INPUT */}
      {key === "work_order_file" ? (
        <input
          type="file"
          name={key}
          onChange={handleChange}
          className="form-control"
        />
      ) : /* SELECT INPUT */
      selectFields[key] ? (
        <select
          name={key}
          value={form[key] || ""}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select {key.replaceAll("_", " ")}</option>

          {selectFields[key].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : /* DATE INPUT */
      key.includes("date") ? (
        <input
          type="date"
          name={key}
          value={form[key] || ""}
          onChange={handleChange}
          className="form-control"
        />
      ) : /* NUMBER INPUT */
      key.includes("amount") ||
      key.includes("cost") ||
      key.includes("length") ? (
        <input
          type="number"
          name={key}
          value={form[key] || ""}
          onChange={handleChange}
          className="form-control"
        />
      ) : (
        /* DEFAULT TEXT INPUT */
        <input
          type="text"
          name={key}
          value={form[key] || ""}
          onChange={handleChange}
          className="form-control"
        />
      )}
    </div>
  ))}
</div>







            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/work-orders")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-success">
                Save Work Order
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkOrder;