export const recommendAIDiet = ({ bmi, goal, preference }) => {
  // Sample AI-like rules
  if (goal === "Lose Fat") {
    return {
      Breakfast:
        preference === "Veg" ? "Oats with banana" : "Egg whites + toast",
      Lunch:
        preference === "Veg"
          ? "Grilled paneer + salad"
          : "Grilled chicken + broccoli",
      Dinner:
        preference === "Veg"
          ? "Mixed vegetable soup"
          : "Fish curry + sautéed spinach",
    };
  }

  if (goal === "Gain Muscle") {
    return {
      Breakfast:
        preference === "Veg" ? "Tofu scramble + bread" : "Omelet + oats",
      Lunch: preference === "Veg" ? "Rajma + rice" : "Chicken breast + rice",
      Dinner:
        preference === "Veg" ? "Paneer tikka + quinoa" : "Fish + vegetables",
    };
  }

  return {
    Breakfast: "Whole grain toast + fruits",
    Lunch: "Balanced plate with protein and carbs",
    Dinner: "Light dinner with fiber-rich food",
  };
};
