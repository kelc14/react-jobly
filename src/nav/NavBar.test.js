import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
