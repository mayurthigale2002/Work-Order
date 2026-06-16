import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
      <div className="container-fluid d-flex justify-content-between">

        {/* LEFT SIDE MENU */}
        <div className="d-flex align-items-center">

          {/* TOGGLER */}
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarContent"
          >
            <ul className="navbar-nav gap-2">

              {/* WORK ORDERS */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white"
                  data-bs-toggle="dropdown"
                >
                  📋 Work Orders
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/work-orders">
                      View Work Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/create">
                      Create Work Order
                    </Link>
                  </li>
                </ul>
              </li>

              {/* PROPOSALS */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white"
                  data-bs-toggle="dropdown"
                >
                  📝 Proposals
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/proposals">
                      View Proposals
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/create-proposal">
                      Create Proposal
                    </Link>
                  </li>
                </ul>
              </li>

              {/* BILLS */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-white"
                  data-bs-toggle="dropdown"
                >
                  🧾 Bills
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/bills">
                      View Bills
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/create-bill">
                      Create Bill
                    </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>

        {/* RIGHT SIDE PROFILE */}
        <div className="d-flex align-items-center">

          {user ? (
            <>
              <span className="text-white me-3 fw-semibold">
                👤 {user.name}
              </span>

              <button
                className="btn btn-danger btn-sm px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm me-2" to="/">
                Login
              </Link>
              <Link className="btn btn-warning btn-sm" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;