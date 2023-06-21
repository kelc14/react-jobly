import React from "react";
import { Route } from "react-router-dom";

//components
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AnonRoutes = () => {
  return (
    <>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/signup">
        <SignUpForm />
      </Route>
    </>
  );
};

export default AnonRoutes;
