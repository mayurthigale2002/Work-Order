import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/create");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">

      <div className="login-card p-4 shadow-lg">

        <h2 className="text-center text-white mb-4 fw-bold">
          Welcome Back 👋
        </h2>

        <p className="text-center text-light mb-4">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button className="btn btn-glow w-100 mt-3" type="submit">
            Login
          </button>

        </form>

        <p className="text-center text-light mt-3 small">
  Don’t have an account?{" "}
  <Link to="/register" className="text-info text-decoration-none">
    Register
  </Link>
</p>

      </div>

      {/* Inline CSS */}
      <style>{`
        .login-bg {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .login-card {
          width: 380px;
          border-radius: 18px;
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .custom-input {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          border-radius: 10px;
          padding: 10px;
        }

        .custom-input::placeholder {
          color: #ddd;
        }

        .custom-input:focus {
          box-shadow: none;
          border: 1px solid #00c6ff;
          background: rgba(255,255,255,0.2);
          color: white;
        }

        .btn-glow {
          background: linear-gradient(90deg, #00c6ff, #0072ff);
          border: none;
          color: white;
          font-weight: bold;
          padding: 10px;
          border-radius: 10px;
          transition: 0.3s;
        }

        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0px 0px 15px rgba(0, 198, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

export default Login;