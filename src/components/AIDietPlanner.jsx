import React, { useState } from "react";
import { auth } from "../services/firebase";
import openai from "../utils/openai";
import { toast } from "react-toastify";

export default function AIDietRecommender() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = async () => {
    if (!goal) {
      toast.warning("Please select a goal first!");
      return;
    }

    setLoading(true);
    setGeneratedPlan(null);

    setTimeout(() => {
      const mockPlans = {
        "Lose Fat": {
          Breakfast: "Oatmeal with berries and green tea",
          Lunch: "Grilled chicken salad with olive oil dressing",
          Dinner: "Baked salmon with steamed broccoli",
          Snacks: "Carrot sticks with hummus",
        },
        "Gain Muscle": {
          Breakfast: "Scrambled eggs, toast, and a banana",
          Lunch: "Chicken breast with rice and veggies",
          Dinner: "Beef stir-fry with quinoa",
          Snacks: "Protein shake and almonds",
        },
        "Maintain Health": {
          Breakfast: "Greek yogurt with granola and honey",
          Lunch: "Turkey sandwich with whole grain bread",
          Dinner: "Grilled tofu with mixed vegetables",
          Snacks: "Fruit salad",
        },
      };

      setGeneratedPlan(mockPlans[goal]);
      toast.success("AI Diet Plan generated!");
      setLoading(false);
    }, 1000); // 1s delay to simulate "thinking"
  };

  return (
    <div className="card p-4 shadow-sm ai-themed-bg">
      <h4>🤖 AI Diet Recommender</h4>
      <p>Select your goal and let AI generate a plan tailored for you!</p>

      <select
        className="form-select my-2"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option value="">Choose a goal...</option>
        <option value="Lose Fat">Lose Fat</option>
        <option value="Gain Muscle">Gain Muscle</option>
        <option value="Maintain Health">Maintain Health</option>
      </select>

      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {generatedPlan && (
        <div className="mt-4">
          <h5>🍽 Your AI Diet Plan</h5>
          <ul className="list-group">
            {Object.entries(generatedPlan).map(([meal, item]) => (
              <li key={meal} className="list-group-item">
                <strong>{meal}:</strong> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
