import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ type, search }) => {
  const INITIAL_STATE = { search: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (formData.search !== "") {
      search(formData);
    }
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter search term."
          name="search"
          id="search"
          onChange={handleChange}
          value={formData.password}
          className="SearchForm-input"
        />
        <button className="SearchForm-btn">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
