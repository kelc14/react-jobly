import React, { useState } from "react";
import "./SignUpForm.css";
import JoblyApi from "../api/api";
import useErrors from "../hooks/useErrors";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ loginUser }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();

  const [err, documentErrors, showFormError] = useErrors();

  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let token = await JoblyApi.userSignup(formData);
      loginUser(formData.username, token);
      navigate("/");
    } catch (err) {
      documentErrors(err);
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

  /** Render:
   *
   */
  return (
    <div className="SignUpForm">
      <h2 className="SignUpForm-heading">Sign Up For Jobly Account</h2>
      <form className="SignUpForm-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="SignUpForm-label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="SignUpForm-input"
          autoComplete="username"
        />

        <label htmlFor="password" className="SignUpForm-label">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="SignUpForm-input"
          autoComplete="new-password"
        />

        <label htmlFor="firstName" className="SignUpForm-label">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          className="SignUpForm-input"
        />
        <label htmlFor="lastName" className="SignUpForm-label">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          className="SignUpForm-input"
        />
        <label htmlFor="email" className="SignUpForm-label">
          Email Address:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="SignUpForm-input"
        />
        {err && showFormError()}

        <button className="SignUpForm-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
