import React, { useState, useContext } from "react";
import UserContext from "../hooks/UserContext";
import "./Profile.css";
import JoblyApi from "../api/api";
import useAlerts from "../hooks/useAlerts";
import useErrors from "../hooks/useErrors";

/** ProfileForm component
 *
 * Updates user profile:
 * - first name
 * - last name
 * - email
 *
 *    => updates State [user] in app
 */

const ProfileForm = ({ updateUser }) => {
  const user = useContext(UserContext);
  let { username, firstName, lastName, email } = user;

  const INITIAL_STATE = { username, firstName, lastName, email };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const [alert, setAlert, showAlerts] = useAlerts();
  const [err, documentErrors, showFormError] = useErrors();

  /** Send {firstName, lastName, password, email}
   * to API to patch user data
   *    & clear form. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    delete formData.username;
    try {
      let res = await JoblyApi.updateUserDetails(formData, username);
      updateUser(res.user);
      setAlert([
        {
          message: "You successfully updated your profile.",
          type: "success",
        },
      ]);
    } catch (err) {
      documentErrors(err);
    }
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
      {alert.length > 0 && showAlerts()}
      <form className="ProfileForm-form" onSubmit={handleSubmit}>
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
          disabled
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
        {err && showFormError()}

        <button className="ProfileForm-button">Update</button>
      </form>
    </div>
  );
};

export default ProfileForm;
