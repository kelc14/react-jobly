import React, { useContext, useEffect, useState } from "react";
import "./Job.css";
import UserContext from "../hooks/UserContext";
import JoblyApi from "../api/api";
import useErrors from "../hooks/useErrors";

/** Job component
 *
 * displays individual job information
 * - title, salary, equity and company
 * - displays APPLY button which applies to a job for the user
 *            => adds to list of jobs
 *
 *
 */

const Job = ({ jobData, companiesData, addNewJob }) => {
  const [company, setCompany] = useState({});
  const user = useContext(UserContext);
  const { title, salary, equity, company_handle, id } = jobData;

  const [err, documentErrors, showError] = useErrors();

  useEffect(() => {
    // it is an array if it comes from Jobs, if it comes from companyDetails then it is not an array, just an object - also need to find company_handle if it comes from Jobs
    if (Array.isArray(companiesData)) {
      let companyData = companiesData.find(
        (comp) => comp.handle === company_handle
      );
      setCompany({ ...companyData });
    } else {
      setCompany(companiesData);
    }
  }, [companiesData, company_handle]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.applyForJob(user.username, id);
      addNewJob(id);
    } catch (e) {
      documentErrors(e);
    }
  };

  const toggleApply = () => {
    if (!user.jobs.includes(id)) {
      return (
        <form onSubmit={handleApply}>
          <button className="Job-apply-btn">APPLY NOW</button>
        </form>
      );
    } else {
      return (
        <button className="Job-apply-btn-success">
          {" "}
          <span>&#10003;</span>
          Applied!
        </button>
      );
    }
  };

  return (
    <div className="Job-container">
      <p className="Job-title"> {title} </p>
      <p className="Job-company"> {company.name} </p>
      <p className="Job-about"> Salary: {salary} </p>
      <p className="Job-about"> Equity: {equity} </p>

      {toggleApply()}

      {err && showError()}
    </div>
  );
};

export default Job;
