import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import JoblyApi from "./api/api";
import UserTokenContext from "./hooks/UserTokenContext";
import UserContext from "./hooks/UserContext";
import useErrors from "./hooks/useErrors";

//components
import NavBar from "./nav/NavBar";
import RoutesComp from "./nav/RoutesComp";

import "./App.css";

/** App Component:
 *
 *    State:
 *      - userToken : JWT token returned from API
 *      - user : user object returned from API
 *      - jobs: array of jobIds of applied to jobs
 *      * * both passed to all children through useContext * *
 *
 *    Renders:
 *    - NavBar
 *    - RoutesComp   (houses routes)
 */

function App() {
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState();
  const [jobs, setJobs] = useState([]);
  const [err, documentErrors, showError] = useErrors();

  // check to see if a token is stored in local storage, if so, gather user details based on username and add to state
  useEffect(() => {
    if (localStorage.hasOwnProperty("token")) {
      const storedToken = localStorage.getItem("token");
      JoblyApi.token = storedToken;
      const { username } = jwt_decode(storedToken);
      const getUserInfo = async () => {
        let userData = await JoblyApi.getUserDetails(username);
        setUser(userData);
        setJobs(userData.jobs);
      };
      getUserInfo(username);
      setUserToken(storedToken);
    }
  }, [userToken]);

  // update user if jobs changes:
  useEffect(() => {
    // check for token so that user is not set on initial load
    if (localStorage.hasOwnProperty("token")) {
      const newUser = { ...user };
      newUser.jobs = jobs;
      setUser(() => ({ ...newUser }));
    }
  }, [jobs]);

  // login user after log in or sign up form completed successfully
  const loginUser = async (username, token) => {
    setUserToken(token);
    JoblyApi.token = token;
    try {
      let userData = await JoblyApi.getUserDetails(username);
      setUser(userData);
    } catch (e) {
      documentErrors(e);
    }

    localStorage.setItem("token", token);
  };

  // update user after profile form submit
  const updateUser = (newUserData) => {
    setUser(() => ({ ...newUserData, jobs }));
  };

  //update jobs after apply
  const addNewJob = (id) => {
    setJobs(() => [...jobs, id]);
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

          {err && showError()}

          <RoutesComp
            loginUser={loginUser}
            updateUser={updateUser}
            addNewJob={addNewJob}
          />
        </UserContext.Provider>
      </UserTokenContext.Provider>
    </div>
  );
}

export default App;
