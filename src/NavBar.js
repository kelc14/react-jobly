import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <ul className="NavBar">
      <li className="NavBar-li">
        <Link to="/" className="Jobly-logo-txt">
          JOBLY
        </Link>
      </li>

      <li className="NavBar-li" style={{ float: "right" }}>
        <NavLink to="/profile ">Profile</NavLink>
      </li>
      <li className="NavBar-li" style={{ float: "right" }}>
        <NavLink to="/signup ">Sign Up</NavLink>
      </li>
      <li className="NavBar-li" style={{ float: "right" }}>
        <NavLink to="/login ">Log in</NavLink>
      </li>

      <li className="NavBar-li" style={{ float: "right" }}>
        <NavLink to="/companies">Companies</NavLink>
      </li>
      <li className="NavBar-li" style={{ float: "right" }}>
        <NavLink to="/jobs">Jobs</NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
