import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on all companies
   *    * params only include name**
   */

  static async getAllCompanies(params = {}) {
    let res = await this.request("companies", params);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all jobs
   * params only include title**
   */

  static async getAllJobs(params = {}) {
    let res = await this.request("jobs", params);
    return res.jobs;
  }

  // USER ROUTES

  /** Login
   * data: { username, password}
   *  => {token}
   *      **
   */

  static async userLogin({ username, password }) {
    let res = await this.request("auth/token", { username, password }, "post");
    this.token = res.token;
    return res.token;
  }
  /** Sign up
   * data: { username, password, firstName, lastName, email}
   *  => {token}
   *      **
   */

  static async userSignup({ username, password, firstName, lastName, email }) {
    let res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );
    this.token = res.token;
    return res.token;
  }

  /** Get user
   *  { username }
   *  => {user details}
   *      **
   */

  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** PATCH user
   * data: { formData: firstName, lastName, email }
   *  => { user }
   *      **
   */

  static async updateUserDetails(data, username) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }

  /** APPLY for a JOB
   * { username, jobId}
   *  => { applied: jobId }
   *      **
   */

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }
}

export default JoblyApi;
