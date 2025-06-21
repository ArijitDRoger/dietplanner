import React, { useEffect, useState } from "react";
import { getDailyTip, healthTips } from "../utils/healthTips";

import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const DailyHealthTip = () => {
  const user = auth.currentUser;
  const defaultTip = getDailyTip(user?.uid || "");
  const [currentTip, setCurrentTip] = useState(defaultTip);

  // Prevent showing same tip again consecutively
  const handleNextTip = () => {
    let nextTip;
    do {
      const randomIndex = Math.floor(Math.random() * healthTips.length);
      nextTip = healthTips[randomIndex];
    } while (nextTip === currentTip);
    setCurrentTip(nextTip);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const tip = getDailyTip(user?.uid || "");
      setCurrentTip(tip);
    });

    return () => unsubscribe();
  }, []);
  // Reset to default tip on page load
  useEffect(() => {
    setCurrentTip(defaultTip);
  }, [defaultTip]);

  return (
    <div className="alert alert-info shadow-sm">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div className="mb-2 mb-md-0">
          📅 <strong>Tip:</strong> {currentTip}
        </div>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleNextTip}
        >
          ⏭ Next Tip
        </button>
      </div>
    </div>
  );
};

export default DailyHealthTip;
