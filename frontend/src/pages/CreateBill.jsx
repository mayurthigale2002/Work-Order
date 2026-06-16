import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateBill() {
  const { id } = useParams(); // proposal id
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    bill_no: "",
    bill_amount: "",
    bill_date: "",
    bill_type: "",
    gst_amount: "",
    net_amount: "",
    bill_description: "",
    remarks: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value
    };

    // ✅ Auto calculate net amount
    if (name === "bill_amount" || name === "gst_amount") {
      const bill = parseFloat(
        name === "bill_amount" ? value : form.bill_amount || 0
      );

      const gst = parseFloat(
        name === "gst_amount" ? value : form.gst_amount || 0
      );

      updatedForm.net_amount = bill + gst;
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bill_no || !form.bill_amount) {
      alert("Bill Number and Amount are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/work-orders/create-bill",
        {
          proposal_id: id,
          ...form,
          created_by: user?.name || "Unknown User"
        }
      );

      if (res.status === 201) {
        alert("Bill Created Successfully");
        navigate("/bills");
      }

    } catch (err) {
      console.log("BILL ERROR:", err.response?.data || err);
      alert("Error creating bill");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🧾 Create Bill</h3>

      <form onSubmit={handleSubmit} className="card p-3 shadow">

        <input
          name="bill_no"
          className="form-control mb-2"
          placeholder="Bill Number"
          value={form.bill_no}
          onChange={handleChange}
          required
        />

        <input
          name="bill_amount"
          className="form-control mb-2"
          placeholder="Bill Amount"
          type="number"
          value={form.bill_amount}
          onChange={handleChange}
          required
        />

        <input
          name="gst_amount"
          className="form-control mb-2"
          placeholder="GST Amount"
          type="number"
          value={form.gst_amount}
          onChange={handleChange}
        />

        <input
          name="net_amount"
          className="form-control mb-2"
          placeholder="Net Amount"
          type="number"
          value={form.net_amount}
          readOnly
        />

        <input
          name="bill_date"
          type="date"
          className="form-control mb-2"
          value={form.bill_date}
          onChange={handleChange}
        />

        <input
          name="bill_type"
          className="form-control mb-2"
          placeholder="Bill Type (Final / Advance / Partial)"
          value={form.bill_type}
          onChange={handleChange}
        />

        <textarea
          name="bill_description"
          className="form-control mb-2"
          placeholder="Description"
          value={form.bill_description}
          onChange={handleChange}
        />

        <textarea
          name="remarks"
          className="form-control mb-2"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">
          Create Bill
        </button>

      </form>
    </div>
  );
}

export default CreateBill;