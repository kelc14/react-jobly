import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RoutesComp from "./RoutesComp";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <RoutesComp />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <RoutesComp />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
