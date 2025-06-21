// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar bg-light p-3" style={{ minHeight: "50vh" }}>
      <h5>Menu</h5>
      <ul className="list-unstyled">
        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("profile")}
          >
            👤 Profile
          </button>
        </li>

        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("diet")}
          >
            🍽 Diet Plan
          </button>
        </li>
        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("food")}
          >
            🥦 Healthy Food
          </button>
        </li>
        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("bmi")}
          >
            📏 BMI Calculator
          </button>
        </li>
        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("history")}
          >
            📊 BMI History
          </button>
        </li>
        <li className="my-2">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => onSelect("ai")}
          >
            🤖 Generate AI Diet Plan
          </button>
        </li>
      </ul>
    </div>
  );
}
