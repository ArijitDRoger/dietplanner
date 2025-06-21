import BMICalculator from "./BMICalculator";
import BMIHistory from "./BMIHistory";
import HealthyFood from "./HealthyFood";
import DietPlan from "./DietPlan";
import UserProfile from "../components/UserProfile";
import AIDietPlanner from "../components/AIDietPlanner"; // create this component

export default function MainContent({ selected }) {
  return (
    <div className="main-content p-4">
      {selected === "profile" && <UserProfile />}
      {selected === "diet" && <DietPlan />}

      {selected === "food" && <HealthyFood />}
      {selected === "bmi" && <BMICalculator />}
      {selected === "history" && <BMIHistory />}
      {!selected && <h4>👋 Please select a menu from sidebar</h4>}
      {selected === "ai" && <AIDietPlanner />}
    </div>
  );
}
