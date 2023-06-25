import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Jobs from "./Jobs";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Jobs />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Jobs />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
