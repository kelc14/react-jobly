import React, { useEffect, useState } from "react";
import "./Jobs.css";
import Job from "./Job";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import useErrors from "../hooks/useErrors";

/** Jobs component
 *
 * renders
 * - searchform to filter jobs by title
 * - list of all jobs (Job components)
 */

const Jobs = ({ addNewJob }) => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [err, documentErrors, showError] = useErrors();

  useEffect(() => {
    // get company data:
    const getCompanies = async () => {
      try {
        let results = await JoblyApi.getAllCompanies();
        setCompanies(() => [...results]);
      } catch (e) {
        documentErrors(e);
      }
    };
    getCompanies();

    // get jobs data:
    const getJobs = async () => {
      try {
        let results = await JoblyApi.getAllJobs();
        setJobs(() => [...results]);
      } catch (e) {
        documentErrors(e);
      }
    };
    getJobs();
  }, []);

  const searchJobs = async (data) => {
    try {
      const params = { title: data.search };
      let res = await JoblyApi.getAllJobs(params);
      setJobs(() => [...res]);
    } catch (e) {
      documentErrors(e);
    }
  };

  return (
    <div>
      <h2 className="Jobs-heading">JOBS</h2>
      <SearchForm search={searchJobs} />
      {err && showError()}

      {jobs.length === 0 ? (
        <p className="Jobs-error">Sorry, no results found.</p>
      ) : (
        jobs.map((job) => (
          <Job
            jobData={job}
            companiesData={companies}
            addNewJob={addNewJob}
            key={job.id}
          />
        ))
      )}
    </div>
  );
};

export default Jobs;
