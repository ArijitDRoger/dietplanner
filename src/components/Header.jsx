// src/components/Header.jsx
import React from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function Header({ user }) {
  const handleLogout = () => {
    signOut(auth);
    toast.success("👋 You have logged out successfully!");
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <h3 className="mb-0">🥗 Diet Planner</h3>
      <div>
        <span className="me-3">👤 {user?.displayName || user?.email}</span>
        <button onClick={handleLogout} className="btn btn-warning btn-sm">
          Logout
        </button>
      </div>
    </header>
  );
}
