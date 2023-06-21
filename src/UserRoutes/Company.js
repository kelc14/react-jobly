import React from "react";
import "./Company.css";

const Company = () => {
  return (
    <div className="Company-container">
      <p className="Company-company"> Company Name Goes Here </p>
      <p className="Company-about"> Description: 1,0000000 </p>
      <p className="Company-about"> Number of Employees: 00000 </p>
      <img src={`img logo here`} alt="logo" className="Company-logo" />
    </div>
  );
};

export default Company;
