import React, { useState } from "react";

import "./LoginForm.css";

const LoginForm = () => {
  const INITIAL_STATE = { username: "", password: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);
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

  /** Render:
   *
   */
  return (
    <div className="LoginForm" onSubmit={handleSubmit}>
      <h2 className="LoginForm-heading">Log In</h2>
      <form className="LoginForm-form">
        <label htmlFor="username" className="LoginForm-label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="LoginForm-input"
        />

        <label htmlFor="password" className="LoginForm-label">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="LoginForm-input"
        />

        <button className="LoginForm-button">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
