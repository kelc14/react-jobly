import React, { useState } from "react";
import "./Profile.css";

const ProfileForm = () => {
  const INITIAL_STATE = { username: "", password: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {firstName, lastName, password, email}
   * to API to patch user data
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
  return (
    <div className="ProfileForm">
      <h2 className="ProfileForm-heading">PROFILE</h2>
      <form className="ProfileForm-form">
        <label htmlFor="username" className="ProfileForm-label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="ProfileForm-input"
        />

        <label htmlFor="firstName" className="ProfileForm-label">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          className="ProfileForm-input"
        />
        <label htmlFor="lastName" className="ProfileForm-label">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          className="ProfileForm-input"
        />
        <label htmlFor="email" className="ProfileForm-label">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="ProfileForm-input"
        />

        <button className="ProfileForm-button">Update</button>
      </form>
    </div>
  );
};

export default ProfileForm;
