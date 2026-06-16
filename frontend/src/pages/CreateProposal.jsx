
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreateProposal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
  proposal_no: "",
  proposal_amount: "",
  proposal_description: "",
  proposal_type: "",
  proposal_date: "",
  estimated_days: "",
  remarks: ""
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  "http://localhost:5000/api/work-orders/create-proposal",
  {
    work_order_id: id,
    ...form,
    created_by: user?.name
  }
);

      if (res.status === 201) {
        alert("Proposal Saved Successfully");
        navigate("/proposals"); 
      }
    } catch (error) {
      console.log(error);
      alert("Error saving proposal");
    }
  };

  return (
    <div className="container mt-4">
      <h3>📑 Create Proposal</h3>

      <form onSubmit={handleSubmit} className="card p-3 shadow">

        <input
          name="proposal_no"
          className="form-control mb-2"
          placeholder="Proposal Number"
          onChange={handleChange}
          required
        />

        <input
          name="proposal_amount"
          className="form-control mb-2"
          placeholder="Proposal Amount"
          type="number"
          onChange={handleChange}
          required
        />

        <textarea
          name="proposal_description"
          className="form-control mb-2"
          placeholder="Description"
          onChange={handleChange}
        />

        {/* NEW FIELDS */}
        <input
          name="proposal_type"
          className="form-control mb-2"
          placeholder="Proposal Type (Material / Work / Service)"
          onChange={handleChange}
        />

        <input
          name="proposal_date"
          type="date"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="estimated_days"
          type="number"
          className="form-control mb-2"
          placeholder="Estimated Completion Days"
          onChange={handleChange}
        />

        <textarea
          name="remarks"
          className="form-control mb-2"
          placeholder="Remarks"
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success w-100">
          Save Proposal
        </button>
      </form>
    </div>
  );
}

export default CreateProposal;