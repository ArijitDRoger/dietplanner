import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getColorByBMI = (bmi) => {
  if (bmi < 18.5) return "#00BFFF"; // Underweight - Blue
  if (bmi < 25) return "#00FF00"; // Normal - Green
  if (bmi < 30) return "#FFA500"; // Overweight - Orange
  return "#FF0000"; // Obese - Red
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const color = getColorByBMI(parseFloat(payload.bmi));
  return (
    <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={1} />
  );
};

export default function BMIHistory() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "bmiResults"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => {
        const d = doc.data();
        const bmi = parseFloat(d.bmi);
        return {
          date: d.createdAt?.toDate().toLocaleDateString() || "Unknown",
          bmi,
          categoryColor: getColor(bmi),
        };
      });
      setData(results);
    });

    return () => unsubscribe();
  }, []);

  const getColor = (bmi) => {
    if (bmi < 18.5) return "#00bcd4"; // Light Blue
    if (bmi < 25) return "#4caf50"; // Green
    if (bmi < 30) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  if (!data.length) {
    return (
      <p className="text-muted">
        Get to know your BMI using the BMI Calculator!
      </p>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📊 Your BMI History</h4>
        <div>
          <button
            className={`btn btn-sm ${
              chartType === "line" ? "btn-primary" : "btn-outline-primary"
            } me-2`}
            onClick={() => setChartType("line")}
          >
            📈 Line
          </button>
          <button
            className={`btn btn-sm ${
              chartType === "bar" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setChartType("bar")}
          >
            📊 Bar
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#8884d8"
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Bar dataKey="bmi">
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.categoryColor} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
      <div className="mt-3">
        <span style={{ color: "#00BFFF" }}>● Underweight</span>{" "}
        <span style={{ color: "#00FF00" }}>● Normal</span>{" "}
        <span style={{ color: "#FFA500" }}>● Overweight</span>{" "}
        <span style={{ color: "#FF0000" }}>● Obese</span>
      </div>
    </div>
  );
}
