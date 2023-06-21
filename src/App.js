import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoggedInContext from "./hooks/LoggedInContext";

// components
import Home from "./Home";
import AnonRoutes from "./AnonRoutes/AnonRoutes";
import UserRoutes from "./UserRoutes/UserRoutes";

import LoginForm from "./AnonRoutes/LoginForm";
import SignUpForm from "./AnonRoutes/SignUpForm";
import Companies from "./UserRoutes/Companies";
import Jobs from "./UserRoutes/Jobs";
import Profile from "./UserRoutes/Profile";
import NavBar from "./NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <div className="App">
      <LoggedInContext.Provider value={isLoggedIn}>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/companies" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
