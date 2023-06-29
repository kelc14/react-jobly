import React, { useState, useEffect } from "react";
import "./CompanyDetails.css";
import { useParams, Link } from "react-router-dom";
import useErrors from "../hooks/useErrors";

import JoblyApi from "../api/api";
import Job from "../jobs/Job";

/** Company details page:
 *
 * displays information about the company - name, description - and list of all jobs (Job components)
 */

const CompanyDetails = ({ addNewJob }) => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);

  const [err, documentErrors, showError] = useErrors();

  useEffect(() => {
    const getCompanyByHandle = async () => {
      try {
        let res = await JoblyApi.getCompany(handle);
        setCompany(() => res);
        setJobs(() => res.jobs);
      } catch (e) {
        documentErrors(e);
      }
    };
    getCompanyByHandle();
  }, [handle]);

  return (
    <div className="CompanyDetails-container">
      <p className="CompanyDetails-company"> {company.name} </p>
      <p className="CompanyDetails-about">{company.description} </p>
      {jobs.length === 0 ? (
        <div className="CompanyDetails-error-container">
          <p className="CompanyDetails-error">
            Sorry, no jobs to display. Check back later.
          </p>
          {err && showError()}

          <Link to="/companies">View All Companies</Link>
        </div>
      ) : (
        jobs.map((job) => (
          <Job
            jobData={job}
            companiesData={company}
            addNewJob={addNewJob}
            key={job.id}
          />
        ))
      )}
    </div>
  );
};

export default CompanyDetails;
