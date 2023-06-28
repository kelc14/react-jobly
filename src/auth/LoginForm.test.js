import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Router } from "react-router-dom";
import LoginForm from "./LoginForm";
import { createMemoryHistory } from "history";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      {" "}
      <LoginForm />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      {" "}
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

/** LOGIN FORM e2e */

it("logs a user in", function async() {
  const loginUser = jest.fn();
  render(
    <MemoryRouter>
      <LoginForm loginUser={loginUser} />
    </MemoryRouter>
  );

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const loginBtn = screen.getByText("Log in");

  userEvent.type(usernameInput, "testuser");
  userEvent.type(passwordInput, "password");
  userEvent.click(loginBtn);

  //   expect(loginUser).toHaveBeenCalledWith({
  //     username: "testuser",
  //     password: "password",
  //   });

  /// this is where I am stuck
});
