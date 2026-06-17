import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateWorkOrder from "./pages/CreateWorkOrder";
import ViewWorkOrders from "./pages/ViewWorkOrders";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications"; 
import UserDashboard from "./pages/UserDashboard";
import CreateProposal from "./pages/CreateProposal";
import ViewProposals from "./pages/ViewProposals";
import ProposalDetails from "./pages/ProposalDetails";
import CreateBill from "./pages/CreateBill";
import ViewBills from "./pages/ViewBills";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateWorkOrder />} />
        <Route path="/work-orders" element={<ViewWorkOrders />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        <Route path="/create-proposal" element={<CreateProposal />} />
        <Route path="/create-proposal/:id" element={<CreateProposal />} />

        <Route path="/proposals" element={<ViewProposals />} />
        <Route path="/proposal/:id" element={<ProposalDetails />} />

        <Route path="/create-bill/:id" element={<CreateBill />} />
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/bills" element={<ViewBills />} />
        <Route path="/bill/:id" element={<ViewBills />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;