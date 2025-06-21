// src/utils/healthTips.js

export const healthTips = [
  "Drink 8 glasses of water daily.",
  "Get at least 7 hours of sleep.",
  "Take a 5-minute walk every hour.",
  "Include more fiber in your diet.",
  "Avoid processed sugar.",
  "Stretch your body every morning.",
  "Eat more fruits and vegetables.",
  "Take deep breaths to reduce stress.",
  "Don’t skip breakfast.",
  "Avoid screens before bed.",
];

// (optional) Consistent tip per day per user
export const getDailyTip = (userId = "") => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const hash = [...(userId + today)].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return healthTips[hash % healthTips.length];
};
