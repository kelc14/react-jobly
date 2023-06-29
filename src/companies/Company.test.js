import { render, act } from "@testing-library/react";
import Company from "./Company";
import JoblyApi from "../api/api";
import { MemoryRouter } from "react-router-dom";

let testCompany = {
  handle: "test-company",
  name: "Test Company",
  description: "This is a test company for mocking our API calls.",
  numEmployees: 1000,
  logoUrl: null,
};
/**
 * SMOKE TEST
 */
test("Company renders without crashing", () => {
  render(
    <MemoryRouter>
      {" "}
      <Company data={testCompany} />
    </MemoryRouter>
  );
});

/**
 * SNAPSHOT TEST
 */
test("Company matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      {" "}
      <Company data={testCompany} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
