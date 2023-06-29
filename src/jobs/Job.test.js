import UserContext from "../hooks/UserContext";
import { render } from "@testing-library/react";
import Job from "./Job";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

let providerProps;
let job;
let company;
beforeEach(() => {
  providerProps = {
    username: "testingUser",
    firstName: "testFirst",
    lastName: "testLast",
    email: "email@email.com",
    isAdmin: false,
    jobs: [null],
  };
  job = {
    id: 1,
    title: "Test job",
    salary: 110000,
    equity: "0",
    company_handle: "test-company",
  };
  company = {
    name: "Test Company",
    company_handle: "test-company",
  };
});

/**
 * SMOKE TEST
 */
test("Job renders without crashing", () => {
  customRender(<Job jobData={job} companiesData={company} />, {
    providerProps,
  });
});

/**
 * SNAPSHOT TEST
 */
test("Job matches snapshot", () => {
  const { asFragment } = customRender(
    <Job jobData={job} companiesData={company} />,
    {
      providerProps,
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
