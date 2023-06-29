import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import JoblyApi from "../api/api";

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
// works now

it("logs a user in", async () => {
  const loginUser = jest.fn();
  render(
    <MemoryRouter>
      <LoginForm loginUser={loginUser} />
    </MemoryRouter>
  );

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const loginBtn = screen.getByText("Log in");

  // wrap in act when changing state
  act(() => {
    userEvent.type(usernameInput, "testuser");
    userEvent.type(passwordInput, "password");
  });

  // Mock the userSignup function
  const userLoginMock = jest.fn().mockResolvedValue("mockToken");
  jest.spyOn(JoblyApi, "userLogin").mockImplementation(userLoginMock);

  act(() => userEvent.click(loginBtn));

  // username and token (any string) returned
  await waitFor(() => {
    expect(loginUser).toHaveBeenCalledWith("testuser", "mockToken");
  });
});
