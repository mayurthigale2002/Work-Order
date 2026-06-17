
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function CreateBill() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [proposal, setProposal] = useState(null);

//   const [form, setForm] = useState({
//     bill_no: "",
//     bill_amount: "",
//     bill_date: "",
//     bill_type: "",
//     gst_amount: "",
//     net_amount: "",
//     bill_description: "",
//     remarks: "",
//     bill_to: ""
//   });

//   useEffect(() => {
//     fetchProposal();
//   }, []);

//   const fetchProposal = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/work-orders/proposals/${id}`
//       );

//       const proposalData = res.data;

//       setProposal(proposalData);

//       setForm((prev) => ({
//         ...prev,
//         bill_amount: proposalData.proposal_amount || "",
//         bill_description: proposalData.proposal_description || "",
//         net_amount: Number(proposalData.proposal_amount || 0)
//       }));
//     } catch (err) {
//       console.log("Proposal Fetch Error:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let updatedForm = {
//       ...form,
//       [name]: value
//     };

//     if (name === "bill_amount" || name === "gst_amount") {
//       const bill = parseFloat(
//         name === "bill_amount" ? value : form.bill_amount || 0
//       );

//       const gst = parseFloat(
//         name === "gst_amount" ? value : form.gst_amount || 0
//       );

//       updatedForm.net_amount = bill + gst;
//     }

//     setForm(updatedForm);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.bill_no || !form.bill_amount) {
//       alert("Bill Number and Amount are required");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/work-orders/create-bill",
//         {
//           proposal_id: id,
//           ...form,
//           created_by: user?.name || "Unknown User"
//         }
//       );

//       if (res.status === 201) {
//         alert("Bill Created Successfully");
//         navigate("/bills");
//       }
//     } catch (err) {
//       console.log("BILL ERROR:", err.response?.data || err);
//       alert("Error creating bill");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>🧾 Create Bill For</h3>

//       {/* Proposal Details */}
//       {proposal && (
//         <table className="table table-striped table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>Proposal No</th>
//               <th>Bill To</th>
//               <th>Work Order</th>
//               <th>Amount</th>
//               <th>Description</th>
//               <th>Status</th>
//               <th>Proposal Created By</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{proposal?.proposal_no}</td>
//               <td>{form.bill_to || "-"}</td>
//               <td>{proposal?.work_order_number}</td>
//               <td>₹{proposal?.proposal_amount}</td>
//               <td>{proposal?.proposal_description}</td>
//               <td>{proposal?.status}</td>
//               <td>{proposal?.created_by}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       <form onSubmit={handleSubmit} className="card p-3 shadow">

//         <input
//           type="text"
//           className="form-control mb-2"
//           value={user?.name || ""}
//           readOnly
//         />


//         <input
//           name="bill_no"
//           className="form-control mb-2"
//           placeholder="Bill Number"
//           value={form.bill_no}
//           onChange={handleChange}
//           required
//         />


//         <input
//           name="bill_to"
//           className="form-control mb-2"
//           placeholder="Bill To (Customer/User Name)"
//           value={form.bill_to}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="bill_amount"
//           className="form-control mb-2"
//           placeholder="Bill Amount"
//           type="number"
//           value={form.bill_amount}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="gst_amount"
//           className="form-control mb-2"
//           placeholder="GST Amount"
//           type="number"
//           value={form.gst_amount}
//           onChange={handleChange}
//         />

//         <input
//           name="net_amount"
//           className="form-control mb-2"
//           placeholder="Net Amount"
//           type="number"
//           value={form.net_amount}
//           readOnly
//         />

//         <input
//           name="bill_date"
//           type="date"
//           className="form-control mb-2"
//           value={form.bill_date}
//           onChange={handleChange}
//         />

//         <select
//           name="bill_type"
//           className="form-control mb-2"
//           value={form.bill_type}
//           onChange={handleChange}
//         >
//           <option value="">Select Bill Type</option>
//           <option value="Final">Final</option>
//           <option value="Advance">Advance</option>
//           <option value="Partial">Partial</option>
//         </select>

//         <textarea
//           name="bill_description"
//           className="form-control mb-2"
//           placeholder="Bill Description"
//           value={form.bill_description}
//           onChange={handleChange}
//         />

//         <textarea
//           name="remarks"
//           className="form-control mb-2"
//           placeholder="Remarks"
//           value={form.remarks}
//           onChange={handleChange}
//         />

//         <button type="submit" className="btn btn-success w-100">
//           Create Bill
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateBill;





import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBill() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [workOrders, setWorkOrders] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [selectedWorkOrderData, setSelectedWorkOrderData] = useState(null);

  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");

  const [form, setForm] = useState({
    bill_no: "",
    bill_amount: "",
    bill_date: "",
    bill_type: "",
    gst_amount: "",
    net_amount: "",
    bill_description: "",
    remarks: "",
    bill_to: ""
  });

  useEffect(() => {
    fetchWorkOrders();
  }, []);

const fetchWorkOrders = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/work-orders?user_email=${user?.email}`
    );

    const data = res.data;
    setWorkOrders(data.data || []);
  } catch (err) {
    console.log(err);
    setWorkOrders([]);
  }
};

  const handleWorkOrderChange = async (e) => {
  const workOrderId = e.target.value;

  setSelectedWorkOrder(workOrderId);
  setProposals([]);
  setSelectedWorkOrderData(null);

  if (!workOrderId) return;

  try {
    const res = await axios.get(
      `http://localhost:5000/api/work-orders/${workOrderId}`
    );

    setSelectedWorkOrderData(res.data);
  } catch (err) {
    console.log(err);
    setSelectedWorkOrderData(null);
  }

  try {
    const res = await axios.get(
      `http://localhost:5000/api/work-orders/${workOrderId}/proposals`
    );

    const data = res.data;
    setProposals(Array.isArray(data) ? data : data?.data || []);
  } catch (err) {
    console.log(err);
    setProposals([]);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...form, [name]: value };

    if (name === "bill_amount" || name === "gst_amount") {
      const bill = parseFloat(
        name === "bill_amount" ? value : form.bill_amount || 0
      );

      const gst = parseFloat(
        name === "gst_amount" ? value : form.gst_amount || 0
      );

      updated.net_amount = bill + gst;
    }

    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bill_no || !form.bill_amount) {
      alert("Bill Number and Amount required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/work-orders/create-bill",
        {
          work_order_id: selectedWorkOrder,
          ...form,
          created_by: user?.name || "Unknown User"
        }
      );

      if (res.status === 201) {
        alert("Bill Created Successfully");
        navigate(`/bill/${res.data.billId}`);
      }
    } catch (err) {
      console.log(err);
      alert("Error creating bill");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🧾 Create Bill</h3>

      {/* Created By */}
      <div className="mb-2 p-2 bg-light border">
        Created By: <b>{user?.name}</b>
      </div>

      <select
        className="form-control mb-2"
        value={selectedWorkOrder}
        onChange={handleWorkOrderChange}
      >
        <option value="">Select Work Order</option>
        {workOrders.map((wo) => (
          <option key={wo.id} value={wo.id}>
            {wo.work_order_number}
          </option>
        ))}
      </select>

      {/* WORK ORDER DETAILS PREVIEW */}
{selectedWorkOrderData && (
  <div className="card p-3 mb-3 bg-light">
    <p><b>Work Order No:</b> {selectedWorkOrderData.work_order_number}</p>
    <p><b>Work Name:</b> {selectedWorkOrderData.work_name}</p>
    <p><b>Vendor:</b> {selectedWorkOrderData.vendor_name}</p>
    <p><b>Total Amount:</b> {selectedWorkOrderData.total_agreement_amount}</p>
    <p><b>Status:</b> {selectedWorkOrderData.status}</p>
  </div>
)}


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
          name="bill_to"
          className="form-control mb-2"
          placeholder="Bill To (Customer Name)"
          value={form.bill_to}
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

        <select
          name="bill_type"
          className="form-control mb-2"
          value={form.bill_type}
          onChange={handleChange}
        >
          <option value="">Select Bill Type</option>
          <option value="Final">Final</option>
          <option value="Advance">Advance</option>
          <option value="Partial">Partial</option>
        </select>

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