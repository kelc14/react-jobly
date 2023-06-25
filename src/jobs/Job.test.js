import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Job from "./Job";

/**  SMOKE TEST */
it("renders without crashing", function () {
  //   const fakeJob = {
  //     title: "Test Job 1",
  //     salary: 123456,
  //     equity: "0",
  //     company_handle: "Test Company Handle",
  //     id: 1,
  //   };
  //   jest.spyOn(global, "fetch").mockImplementation(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(fakeJob),
  //     })
  //   );
  render(
    <MemoryRouter>
      <Job />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Job />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
