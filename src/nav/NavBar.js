import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import UsernameContext from "../hooks/UsernameContext";

/**
 * NavBar Component ->
 *
 * if username stored (auth) - display authenticated routes:
 * -jobs, companies, profile, logout
 *
 * if anon - display anon routes
 * - log in, sign up
 *
 */

const NavBar = ({ logoutUser }) => {
  const username = useContext(UsernameContext);

  const authLinks = () => {
    return (
      <>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/ " onClick={logoutUser}>{`Logout ${username}`}</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/profile ">Profile</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/companies">Companies</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>
      </>
    );
  };

  const anonLinks = () => {
    return (
      <>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/signup ">Sign Up</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/login ">Log in</NavLink>
        </li>
      </>
    );
  };

  return (
    <ul className="NavBar">
      <li className="NavBar-li">
        <Link to="/" className="Jobly-logo-txt">
          JOBLY
        </Link>
      </li>

      {username ? authLinks() : anonLinks()}
    </ul>
  );
};

export default NavBar;
