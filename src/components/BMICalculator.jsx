// src/components/BMICalculator.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth, db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const saveToFirestore = async (bmiValue) => {
    console.log("Saving BMI to Firestore:", { height, weight, bmiValue });

    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "bmiResults"), {
        uid: user.uid, // not userId
        height: height,
        weight: weight,
        bmi: bmiValue,
        createdAt: serverTimestamp(),
      });
      toast.success("📥 BMI saved!");
    } catch (error) {
      toast.error("❌ Failed to save. Please try again.");

      console.error("Failed to save BMI:", error);
    }
  };

  const calculateBMI = async (e) => {
    e.preventDefault();
    if (!height || !weight) {
      alert("Please enter height and weight");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
    saveToFirestore(bmiValue);

    if (bmiValue < 18.5) {
      setMessage("You are underweight. Consider a balanced calorie-rich diet.");
    } else if (bmiValue < 24.9) {
      setMessage("You have a normal weight. Great job! Maintain it.");
    } else if (bmiValue < 29.9) {
      setMessage(
        "You are overweight. Consider regular exercise and a low-fat diet."
      );
    } else {
      setMessage(
        "You are obese. It's important to consult a doctor and focus on fat loss."
      );
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">📏 BMI Calculator</h4>
      <form onSubmit={calculateBMI}>
        <div className="mb-3">
          <label className="form-label">Height (in cm)</label>
          <input
            type="number"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Weight (in kg)</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate BMI
        </button>
      </form>

      {bmi && (
        <div className="mt-4">
          <h5>
            Your BMI: <strong>{bmi}</strong>
          </h5>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
