import React, { useEffect, useState } from "react";
import "./Job.css";
import { Link } from "react-router-dom";

const Job = ({ jobData, companiesData }) => {
  const [company, setCompany] = useState({});
  const { title, salary, equity, company_handle } = jobData;

  useEffect(() => {
    if (typeof companiesData === "Array") {
      let companyData = companiesData.find(
        (comp) => comp.handle === company_handle
      );
      setCompany({ ...companyData });
    } else {
      setCompany(companiesData);
    }
  }, []);

  return (
    <div className="Job-container">
      <p className="Job-title"> {title} </p>
      <p className="Job-company"> {company.name} </p>
      <p className="Job-about"> Salary: {salary} </p>
      <p className="Job-about"> Equity: {equity} </p>
      <Link to="/">APPLY NOW</Link>
    </div>
  );
};

export default Job;
