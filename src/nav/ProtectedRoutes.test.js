import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <ProtectedRoutes />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ProtectedRoutes />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
