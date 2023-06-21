import React from "react";
import { Route } from "react-router-dom";

//components
import Companies from "./Companies";
import Jobs from "./Jobs";
import Profile from "./Profile";

const UserRoutes = () => {
  return (
    <>
      <Route exact path="/companies">
        <Companies />
      </Route>
      <Route exact path="/jobs">
        <Jobs />
      </Route>
      <Route exact path="/profile">
        {console.log("hitting this route")}
        <Profile />
      </Route>
    </>
  );
};

export default UserRoutes;
