import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="card shadow p-4">

        <h3 className="mb-3">👤 User Dashboard</h3>

        <div className="row">

          <div className="col-md-6">
            <div className="mb-2">
              <strong>Name:</strong> {user.name}
            </div>

            <div className="mb-2">
              <strong>Email:</strong> {user.email}
            </div>

            <div className="mb-2">
              <strong>User ID:</strong> {user.id}
            </div>
          </div>

          <div className="col-md-6 text-end">

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>Create Work Order</h5>
            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate("/create")}
            >
              Go
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>View Work Orders</h5>
            <button
              className="btn btn-success mt-2"
              onClick={() => navigate("/work-orders")}
            >
              Go
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>Profile</h5>
            <button className="btn btn-info mt-2">
              View
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default UserDashboard;