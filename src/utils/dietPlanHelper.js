// src/utils/dietPlanHelper.js

export function generateDietPlan(goal) {
  if (goal === "Gain Muscle") {
    return {
      Breakfast: "Eggs + Oats + Milk",
      Lunch: "Chicken + Rice + Vegetables",
      Snack: "Protein Shake + Banana",
      Dinner: "Fish + Sweet Potato + Salad",
    };
  } else if (goal === "Lose Fat") {
    return {
      Breakfast: "Boiled Eggs + Green Tea",
      Lunch: "Grilled Chicken + Broccoli",
      Snack: "Almonds + Apple",
      Dinner: "Soup + Salad",
    };
  } else if (goal === "Maintain Health") {
    return {
      Breakfast: "Poha + Fruit",
      Lunch: "Dal + Rice + Sabzi",
      Snack: "Nuts + Yogurt",
      Dinner: "Roti + Sabzi + Curd",
    };
  }
  return {};
}
