import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "../hooks/UserContext";

/** Homepage component
 *
 * welcomes user if logged in
 *
 * displays: log in & sign up button if not signed in
 */

const Home = () => {
  const user = useContext(UserContext);

  return (
    <>
      <h1 className="Home-heading">JOBLY</h1>
      <p className="Home-text">All the jobs in one, convenient place.</p>
      {user ? (
        <p className="Home-welcome">Welcome back {user.firstName}!</p>
      ) : (
        <>
          <Link to="/login" className="Home-btn">
            Log in
          </Link>
          <Link to="/signup" className="Home-btn">
            Sign up
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
