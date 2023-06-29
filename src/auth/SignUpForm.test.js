import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import JoblyApi from "../api/api";

/**  SMOKE TEST */
it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

// doesn't work:

// /** SIGNUP FORM e2e */
describe("SignUpForm", () => {
  it("signs up a user and calls loginUser", async () => {
    const loginUserMock = jest.fn();
    render(
      <MemoryRouter>
        <SignUpForm loginUser={loginUserMock} />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const firstNameInput = screen.getByLabelText("First Name:");
    const lastNameInput = screen.getByLabelText("Last Name:");
    const emailAddressInput = screen.getByLabelText("Email Address:");
    const signUpBtn = screen.getByText("Sign Up");

    act(() => {
      userEvent.type(usernameInput, "testuser1234");
      userEvent.type(passwordInput, "password");
      userEvent.type(firstNameInput, "Test First");
      userEvent.type(lastNameInput, "Test Last");
      userEvent.type(emailAddressInput, "test@example.com");
    });

    // Mock the userSignup function
    const userSignupMock = jest.fn().mockResolvedValue("mockToken");
    jest.spyOn(JoblyApi, "userSignup").mockImplementation(userSignupMock);

    act(() => {
      userEvent.click(signUpBtn);
    });

    // Verify that the userSignup function was called with the expected data
    expect(userSignupMock).toHaveBeenCalledWith({
      username: "testuser1234",
      password: "password",
      firstName: "Test First",
      lastName: "Test Last",
      email: "test@example.com",
    });

    // Verify that the loginUser function was called with the correct arguments
    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledWith("testuser1234", "mockToken");
    });
  });
});
