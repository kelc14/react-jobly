import React from "react";
import "./Job.css";
import { Link } from "react-router-dom";

const Job = () => {
  return (
    <div className="Job-container">
      <p className="Job-title"> Job Title Goes Here </p>
      <p className="Job-company"> Company Name Goes Here </p>
      <p className="Job-about"> Description: 1,0000000 </p>
      <p className="Job-about"> Number of Employees: 00000 </p>
      <Link to="/">APPLY NOW</Link>
    </div>
  );
};

export default Job;
