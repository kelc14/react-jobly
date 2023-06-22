import React, { useState, useEffect } from "react";
import "./CompanyDetails.css";
import { useParams, Link } from "react-router-dom";

import JoblyApi from "../api/api";
import Job from "../jobs/Job";

const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getCompanyByHandle = async () => {
      let res = await JoblyApi.getCompany(handle);
      setCompany(() => res);
      setJobs(() => res.jobs);
    };
    getCompanyByHandle();
  }, []);

  return (
    <div className="CompanyDetails-container">
      <p className="CompanyDetails-company"> {company.name} </p>
      <p className="CompanyDetails-about">{company.description} </p>
      {jobs.length === 0 ? (
        <div className="CompanyDetails-error-container">
          <p className="CompanyDetails-error">
            Sorry, no jobs to display. Check back later.
          </p>
          <Link to="/companies">View All Companies</Link>
        </div>
      ) : (
        jobs.map((job) => (
          <Job jobData={job} companiesData={company} key={job.id} />
        ))
      )}
    </div>
  );
};

export default CompanyDetails;
