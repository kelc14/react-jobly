import React, { useEffect, useState } from "react";
import "./Jobs.css";
import Job from "./Job";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";

/** Jobs component
 *
 * renders
 * - searchform to filter jobs by title
 * - list of all jobs (Job components)
 */

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // get company data:
    const getCompanies = async () => {
      let results = await JoblyApi.getAllCompanies();
      setCompanies(() => [...results]);
    };
    getCompanies();

    // get jobs data:
    const getJobs = async () => {
      let results = await JoblyApi.getAllJobs();
      setJobs(() => [...results]);
    };
    getJobs();
  }, []);

  const searchJobs = async (data) => {
    const params = { title: data.search };
    let res = await JoblyApi.getAllJobs(params);
    setJobs(() => [...res]);
  };

  return (
    <div>
      <h2 className="Jobs-heading">JOBS</h2>
      <SearchForm search={searchJobs} />
      {jobs.length === 0 ? (
        <p className="Jobs-error">Sorry, no results found.</p>
      ) : (
        jobs.map((job) => (
          <Job jobData={job} companiesData={companies} key={job.id} />
        ))
      )}
    </div>
  );
};

export default Jobs;
