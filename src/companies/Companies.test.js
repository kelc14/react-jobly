import UserContext from "../hooks/UserContext";
import { render, act } from "@testing-library/react";
import Companies from "./Companies";
import JoblyApi from "../api/api";
import { MemoryRouter } from "react-router-dom";

let testCompanies = {
  companies: [
    {
      handle: "test-company",
      name: "Test Company",
      description: "This is a test company for mocking our API calls.",
      numEmployees: 1000,
      logoUrl: null,
    },
    {
      handle: "test-company2",
      name: "Test Company 2",
      description: "This is another test company for mocking our API calls.",
      numEmployees: 5000,
      logoUrl: null,
    },
  ],
};
/**
 * SMOKE TEST
 */
test("Companies renders without crashing", () => {
  // Mock the getAllCompanies function
  act(() => {
    const getCompaniesMock = jest.fn().mockResolvedValue(testCompanies);

    jest
      .spyOn(JoblyApi, "getAllCompanies")
      .mockImplementation(getCompaniesMock);
  });

  render(
    <MemoryRouter>
      {" "}
      <Companies />
    </MemoryRouter>
  );
});

/**
 * SNAPSHOT TEST
 */
test("Companies matches snapshot", () => {
  // Mock the getAllCompanies function
  act(() => {
    const getCompaniesMock = jest.fn().mockResolvedValue(testCompanies);

    jest
      .spyOn(JoblyApi, "getAllCompanies")
      .mockImplementation(getCompaniesMock);
  });

  const { asFragment } = render(
    <MemoryRouter>
      {" "}
      <Companies />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
