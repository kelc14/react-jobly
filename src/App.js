import React, { useState, useEffect } from "react";
import "./App.css";
import LoggedInContext from "./hooks/LoggedInContext";
import UsernameContext from "./hooks/UsernameContext";

//components
import NavBar from "./nav/NavBar";
import RoutesComp from "./nav/RoutesComp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [username, setUsername] = useState();

  // console.log("the user is logged in:", isLoggedIn);
  // console.log("the username is", username);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  const loginUser = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    // localStorage.setItem("username", username);
    // console.log(`${username} is logged in`);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.clear();
  };

  return (
    <div className="App">
      <LoggedInContext.Provider value={isLoggedIn}>
        <UsernameContext.Provider value={username}>
          <NavBar loginUser={loginUser} logoutUser={logoutUser} />
          <RoutesComp loginUser={loginUser} />
        </UsernameContext.Provider>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
