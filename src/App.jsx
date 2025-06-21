// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthCard from "./pages/AuthCard";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, []);

  if (checkingAuth) return <div>Loading...</div>;

  return (
    <>
      {/* your app layout */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <AuthCard />}
          />
          <Route path="/signup" element={<Navigate to="/" />} />{" "}
          {/* Add this */}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
