import UserContext from "../hooks/UserContext";
import { render, act } from "@testing-library/react";
import CompanyDetails from "./CompanyDetails";
import JoblyApi from "../api/api";
import Company from "./Company";
import { MemoryRouter } from "react-router-dom";

let testCompany = {
  company: {
    handle: "test-company",
    name: "Test Company",
    description: "This is a test company for mocking our API calls.",
    numEmployees: 1000,
    logoUrl: null,
    jobs: [
      {
        id: 66,
        title: "Test Job 1",
        salary: 100000,
        equity: 0,
        company_handle: "test-company",
      },
    ],
  },
};
/**
 * SMOKE TEST
 */
test("CompanyDetails renders without crashing", () => {
  // Mock the getCompany function
  act(() => {
    const getCompanyMock = jest.fn().mockResolvedValue(testCompany);

    jest.spyOn(JoblyApi, "getCompany").mockImplementation(getCompanyMock);
  });

  render(
    <MemoryRouter initialEntries={["/companies/test-company"]}>
      {" "}
      <CompanyDetails />
    </MemoryRouter>
  );
});

/**
 * SNAPSHOT TEST
 */
test("CompanyDetails matches snapshot", () => {
  // Mock the getCompany function
  act(() => {
    const getCompanyMock = jest.fn().mockResolvedValue(testCompany);

    jest.spyOn(JoblyApi, "getCompany").mockImplementation(getCompanyMock);
  });

  const { asFragment } = render(
    <MemoryRouter initialEntries={["/companies/test-company"]}>
      {" "}
      <CompanyDetails />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
