import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import JoblyApi from "./api/api";
import UserTokenContext from "./hooks/UserTokenContext";
import UserContext from "./hooks/UserContext";

//components
import NavBar from "./nav/NavBar";
import RoutesComp from "./nav/RoutesComp";

import "./App.css";

/** App Component:
 *
 *    State:
 *      - userToken : JWT token returned from API
 *      - user : user object returned from API
 *      * * both passed to all children through useContext * *
 *
 *    Renders:
 *    - NavBar
 *    - RoutesComp   (houses routes)
 */

function App() {
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState();

  // check to see if a token is stored in local storage, if so, gather user details based on username and add to state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    JoblyApi.token = storedToken;
    if (storedToken) {
      const { username } = jwt_decode(storedToken);
      const getUserInfo = async () => {
        let userData = await JoblyApi.getUserDetails(username);
        setUser(userData);
      };
      getUserInfo(username);
      setUserToken(storedToken);
    }
  }, [userToken]);

  // login user after log in or sign up form completed successfully
  const loginUser = async (username, token) => {
    setUserToken(token);
    JoblyApi.token = token;
    let userData = await JoblyApi.getUserDetails(username);
    setUser(userData);
    localStorage.setItem("token", token);
  };

  // update user after profile form submit
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  // log out user after log out button clicked, clear local storage
  const logoutUser = () => {
    setUserToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <div className="App">
      <UserTokenContext.Provider value={userToken}>
        <UserContext.Provider value={user}>
          <NavBar loginUser={loginUser} logoutUser={logoutUser} />
          <RoutesComp loginUser={loginUser} updateUser={updateUser} />
        </UserContext.Provider>
      </UserTokenContext.Provider>
    </div>
  );
}

export default App;
