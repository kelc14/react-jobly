import React from "react";
import "./Company.css";
import { Link } from "react-router-dom";

const Company = ({ data }) => {
  const { name, handle, description, numEmployees, logoUrl } = data;
  return (
    <Link to={`./${handle}`} className="Company-link">
      <div className="Company-container">
        <p className="Company-company"> {name} </p>
        <p className="Company-about"> Description: {description} </p>
        <p className="Company-about"> Number of Employees: {numEmployees} </p>
        {logoUrl ? (
          <img src={`${logoUrl}`} alt="logo" className="Company-logo" />
        ) : (
          <></>
        )}
      </div>{" "}
    </Link>
  );
};

export default Company;
