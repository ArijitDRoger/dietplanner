// src/components/DietPlan.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import { auth } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function DietPlan() {
  const [goal, setGoal] = useState("");
  const [preference, setPreference] = useState("");
  const [plan, setPlan] = useState(null);

  const generatePlan = (e) => {
    e.preventDefault();

    if (!goal || !preference) {
      alert("Please select both goal and meal preference.");
      return;
    }

    const mealType =
      preference === "veg" ? "🥦 Vegetarian" : "🍗 Non-Vegetarian";
    let meals;
    toast.success("🍱 Diet plan generated!");
    if (goal === "muscle") {
      meals =
        preference === "veg"
          ? [
              "Oats + milk + banana",
              "Paneer sandwich",
              "Dal + rice + curd",
              "Protein shake",
              "Tofu stir fry",
            ]
          : [
              "Boiled eggs + oats",
              "Chicken sandwich",
              "Chicken + rice + salad",
              "Greek yogurt + nuts",
              "Grilled fish",
            ];
    } else {
      meals =
        preference === "veg"
          ? [
              "Green smoothie",
              "Fruit bowl",
              "Dal + sabzi + roti",
              "Sprouts salad",
              "Vegetable soup",
            ]
          : [
              "Boiled eggs",
              "Tuna salad",
              "Grilled chicken + vegetables",
              "Greek yogurt",
              "Boiled eggs + soup",
            ];
    }
    const saveDietPlan = async (planData) => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { dietPlan: planData }, { merge: true });
    };

    const result = {
      user: auth.currentUser?.displayName || "User",
      goal,
      preference,
      mealType,
      meals,
    };

    setPlan(result);
  };

  const downloadPDF = () => {
    if (!plan) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Personalized Diet Plan", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${plan.user}`, 20, 30);
    doc.text(`Goal: ${plan.goal}`, 20, 40);
    doc.text(`Meal Preference: ${plan.mealType}`, 20, 50);
    doc.text("Meal Suggestions:", 20, 60);
    plan.meals.forEach((meal, i) => {
      doc.text(`• ${meal}`, 25, 70 + i * 10);
    });
    doc.save("diet_plan.pdf");
    toast.success("🍱 Diet plan downloaded!");
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">🧠 Create Your Diet Plan</h4>

      <form onSubmit={generatePlan}>
        <div className="mb-3">
          <label className="form-label">Select Your Goal</label>
          <select
            className="form-select"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">-- Choose Goal --</option>
            <option value="muscle">💪 Muscle Gain</option>
            <option value="fatloss">🔥 Fat Loss</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Meal Preference</label>
          <select
            className="form-select"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="">-- Choose Preference --</option>
            <option value="veg">🌱 Vegetarian</option>
            <option value="non-veg">🍗 Non-Vegetarian</option>
          </select>
        </div>

        <button className="btn btn-success" type="submit">
          Generate Plan
        </button>
      </form>

      {plan && (
        <div className="mt-4">
          <h5>Hello {plan.user}, here’s your diet plan:</h5>
          <p>
            <strong>Goal:</strong>{" "}
            {plan.goal === "muscle" ? "Muscle Gain" : "Fat Loss"}
          </p>
          <p>
            <strong>Preference:</strong> {plan.mealType}
          </p>
          <ul>
            {plan.meals.map((meal, idx) => (
              <li key={idx}>{meal}</li>
            ))}
          </ul>
          <button
            className="btn btn-outline-primary mt-2"
            onClick={downloadPDF}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
