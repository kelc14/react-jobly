import React, { useEffect, useState } from "react";
import Company from "./Company";
import SearchForm from "../common/SearchForm";
import "./Companies.css";

import JoblyApi from "../api/api";

/** Companies component
 *
 * renders
 * - searchform to filter companies by name
 * - list of all companies (Company components)
 */

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      let results = await JoblyApi.getAllCompanies();
      setCompanies(() => [...results]);
    };
    getCompanies();
  }, []);

  const searchCompanies = async (data) => {
    const params = { name: data.search };
    let res = await JoblyApi.getAllCompanies(params);
    setCompanies(() => [...res]);
  };

  return (
    <div>
      <h2 className="Companies-heading">COMPANIES</h2>
      <SearchForm search={searchCompanies} />
      {companies.length === 0 ? (
        <p className="Companies-error">Sorry, no results found.</p>
      ) : (
        companies.map((company) => (
          <Company data={company} key={company.handle} />
        ))
      )}
    </div>
  );
};

export default Companies;
