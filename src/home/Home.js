import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UsernameContext from "../hooks/UsernameContext";

const Home = () => {
  const username = useContext(UsernameContext);

  return (
    <>
      <h1 className="Home-heading">JOBLY</h1>
      <p className="Home-text">All the jobs in one, convenient place.</p>
      {username ? (
        <p className="Home-welcome">Welcome back {username}!</p>
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
