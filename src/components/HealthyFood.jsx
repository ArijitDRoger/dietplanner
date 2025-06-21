import React from "react";

const healthyFoods = [
  {
    name: "Broccoli",
    description: "Rich in vitamins, minerals, fiber, and antioxidants.",
    benefits: "Supports digestion, boosts immunity, and reduces inflammation.",
  },
  {
    name: "Avocado",
    description: "High in healthy fats, potassium, and fiber.",
    benefits:
      "Good for heart health and helps absorb nutrients from other foods.",
  },
  {
    name: "Oats",
    description: "Whole grain rich in fiber and antioxidants.",
    benefits: "Helps reduce cholesterol, improves blood sugar control.",
  },
  {
    name: "Eggs",
    description:
      "High-quality protein and nutrients like choline and vitamin B12.",
    benefits: "Good for muscle building and brain health.",
  },
  {
    name: "Salmon",
    description: "Excellent source of omega-3 fatty acids and protein.",
    benefits: "Supports heart and brain health.",
  },
  {
    name: "Spinach",
    description: "Rich in iron, folate, and vitamin K.",
    benefits: "Boosts energy, supports bone health and immunity.",
  },
  {
    name: "Almonds",
    description: "Packed with healthy fats, vitamin E, and magnesium.",
    benefits: "Great for heart, skin, and brain health.",
  },
];

export default function HealthyFood() {
  return (
    <div className="row">
      <h4 className="mb-4">🥗 Healthy Foods and Their Benefits</h4>
      {healthyFoods.map((food, index) => (
        <div className="col-md-6 col-lg-4 mb-4" key={index}>
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{food.name}</h5>
              <p className="card-text">
                <strong>Description:</strong> {food.description}
              </p>
              <p className="card-text">
                <strong>Benefits:</strong> {food.benefits}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
