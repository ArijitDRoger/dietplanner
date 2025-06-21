import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthCard() {
  const [flipped, setFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      toast.success("✅ Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error("❌ Login failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      await updateProfile(userCred.user, { displayName: signupData.name });
      toast.success("🎉 Signup successful!");
      navigate("/home");
    } catch (error) {
      toast.error("❌ Signup failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0b0033" }}
    >
      <div className="flip-card-container">
        <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
          {/* FRONT - LOGIN */}
          <div className="flip-card-front p-4">
            <h3 className="text-warning mb-3">🔐 Login</h3>
            <form onSubmit={handleLogin}>
              <input
                className="form-control my-2"
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
              <input
                className="form-control my-2"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
              <button className="btn btn-warning w-100 mt-2" type="submit">
                Log In
              </button>
            </form>
            <p className="text-light mt-3 text-center">
              New here?{" "}
              <span
                className="text-info"
                style={{ cursor: "pointer" }}
                onClick={() => setFlipped(true)}
              >
                Sign up
              </span>
            </p>
          </div>

          {/* BACK - SIGNUP */}
          <div className="flip-card-back p-4">
            <h3 className="text-warning mb-3">📝 Sign Up</h3>
            <form onSubmit={handleSignup}>
              <input
                className="form-control my-2"
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                required
              />
              <input
                className="form-control my-2"
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
              <input
                className="form-control my-2"
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <button className="btn btn-warning w-100 mt-2" type="submit">
                Sign Up
              </button>
            </form>
            <p className="text-light mt-3 text-center">
              Already have an account?{" "}
              <span
                className="text-info"
                style={{ cursor: "pointer" }}
                onClick={() => setFlipped(false)}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
  .flip-card-container {
    perspective: 1000px;
    width: 100%;
    max-width: 420px;
  }

  .flip-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.8s ease-in-out;
    transform-style: preserve-3d;
  }

  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    background: linear-gradient(145deg, #400080, #0b0033);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    color: #fff;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
    top: 0;
    left: 0;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }

  input.form-control {
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 1rem;
  }

  .btn-warning {
    border-radius: 8px;
    font-weight: 600;
    background-color: #ffcc00;
    border: none;
  }

  .btn-warning:hover {
    background-color: #e6b800;
  }

  h3 {
    font-weight: 700;
    color: #ffcc00;
    text-align: center;
  }

  .text-info {
    transition: color 0.3s;
  }

  .text-info:hover {
    color: #a033ff;
  }
`}</style>
    </div>
  );
}
