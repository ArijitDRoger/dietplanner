// src/components/UserProfile.jsx
import { Card } from "react-bootstrap";

import { generateDietPlan } from "../utils/dietPlanHelper";
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  limit,
} from "firebase/firestore";

export default function UserProfile() {
  const [bmiCount, setBmiCount] = useState(0);
  const [latestBMI, setLatestBMI] = useState(null);
  const [goal, setGoal] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [dietPlan, setDietPlan] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "dietPlans", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDietPlan(docSnap.data().plan);
      }
    };

    fetchDietPlan();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const savedGoal = userData.goal || "";
        const savedPlan = userData.dietPlan || null;

        setGoal(savedGoal);
        setDietPlan(savedPlan);

        if (savedGoal && !savedPlan) {
          const newPlan = generateDietPlan(savedGoal);
          await setDoc(userRef, {
            ...userData,
            dietPlan: newPlan,
          });
          setDietPlan(newPlan);
        }
      }

      // Fetch BMI count
      const q = query(
        collection(db, "bmiResults"),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      setBmiCount(snapshot.size);

      // Fetch latest BMI
      const latestQuery = query(
        collection(db, "bmiResults"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const latestSnap = await getDocs(latestQuery);
      if (!latestSnap.empty) {
        const data = latestSnap.docs[0].data();
        setLatestBMI(data.bmi);

        const lastDate = data.createdAt?.toDate();
        if (lastDate) {
          const daysSince = Math.floor(
            (new Date() - lastDate) / (1000 * 60 * 60 * 24)
          );

          const snoozeKey = `bmi-reminder-snoozed-${user.uid}`;
          const snoozedUntil = localStorage.getItem(snoozeKey);
          const today = new Date().toDateString();

          if (daysSince >= 3 && snoozedUntil !== today) {
            toast.info(
              ({ closeToast }) => (
                <div>
                  📅 You haven't updated your BMI in a while. Stay on track!
                  <br />
                  <button
                    className="btn btn-sm btn-outline-light mt-2"
                    onClick={() => {
                      localStorage.setItem(snoozeKey, today);
                      closeToast();
                    }}
                  >
                    Remind me tomorrow
                  </button>
                </div>
              ),
              {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
              }
            );
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSaveGoal = async () => {
    const user = auth.currentUser;
    if (!user || !newGoal) return;

    // Save the goal in users collection
    await setDoc(
      doc(db, "users", user.uid),
      {
        goal: newGoal,
      },
      { merge: true }
    );
    toast.success("🎯 Goal saved!");

    // Update local state
    setGoal(newGoal);
    setNewGoal("");

    // Generate and save diet plan
    const plan = generateDietPlan(goal);
    await setDoc(
      doc(db, "users", user.uid),
      {
        goal: newGoal,
      },
      { merge: true }
    );

    // Update diet plan in UI
    setDietPlan(plan);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const user = auth.currentUser;

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">👤 Profile</h4>
      {user ? (
        <>
          <p>
            <strong>Name:</strong> {user.displayName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User Avatar"
              width="100"
              className="rounded-circle mt-2"
            />
          )}

          <hr />
          <p>
            <strong>Total BMI Entries:</strong> {bmiCount}
          </p>

          {latestBMI && (
            <p>
              <strong>Latest BMI:</strong> {latestBMI} (
              {getBMICategory(latestBMI)})
            </p>
          )}

          <hr />
          <p>
            <strong>Current Goal:</strong> {goal || "Not set"}
          </p>
          <div className="input-group my-2">
            <select
              className="form-select"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            >
              <option value="">Select a goal...</option>
              <option value="Lose Fat">Lose Fat</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Maintain Health">Maintain Health</option>
            </select>
            <button className="btn btn-primary" onClick={handleSaveGoal}>
              Save Goal
            </button>
          </div>
          <div>
            {dietPlan ? (
              <Card bg="dark" text="light" className="mt-3">
                <Card.Header className="bg-purple text-yellow">
                  Your Current Diet Plan
                </Card.Header>
                <Card.Body>
                  {Object.entries(dietPlan).map(([meal, item], idx) => (
                    <p key={idx}>
                      <strong>{meal}:</strong> {item}
                    </p>
                  ))}
                </Card.Body>
              </Card>
            ) : (
              <p>No diet plan saved. Please generate one.</p>
            )}
          </div>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}
