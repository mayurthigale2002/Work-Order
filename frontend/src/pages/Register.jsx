import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        form
      );

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center min-vh-100">

      <div className="register-card p-4 shadow-lg">

        <h2 className="text-center text-white fw-bold mb-2">
          Create Account 
        </h2>

        <p className="text-center text-light mb-4">
          Register to get started
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              type="text"
              name="name"
              className="form-control custom-input"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

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
          <button type="submit" className="btn btn-glow w-100 mt-3">
            Register
          </button>

        </form>

        <p className="text-center text-light mt-3 small">
          Already have an account? <span className="text-info">Login</span>
        </p>

      </div>

      {/* CSS */}
      <style>{`
        .register-bg {
          background: linear-gradient(135deg, #141e30, #243b55);
        }

        .register-card {
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
          background: linear-gradient(90deg, #ff512f, #dd2476);
          border: none;
          color: white;
          font-weight: bold;
          padding: 10px;
          border-radius: 10px;
          transition: 0.3s;
        }

        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0px 0px 15px rgba(255, 81, 47, 0.6);
        }
      `}</style>

    </div>
  );
}

export default Register;