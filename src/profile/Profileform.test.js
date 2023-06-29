import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import JoblyApi from "../api/api";
import UserContext from "../hooks/UserContext";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

let providerProps;
beforeEach(
  () =>
    (providerProps = {
      username: "testingUser",
      firstName: "testFirst",
      lastName: "testLast",
      email: "email@email.com",
      isAdmin: false,
      jobs: [null],
    })
);
/**
 * SMOKE TEST
 */
test("ProfileForm renders without crashing", () => {
  customRender(<ProfileForm />, { providerProps });
});

/**  SNAPSHOT TEST */
it("renders without crashing", function () {
  const { asFragment } = customRender(<ProfileForm />, { providerProps });

  expect(asFragment()).toMatchSnapshot();
});

/** SIGNUP FORM e2e */
// works :)

it("logs a user in", async () => {
  const updateUser = jest.fn();
  customRender(<ProfileForm updateUser={updateUser} />, { providerProps });

  const usernameInput = screen.getByLabelText("Username:");
  const firstNameInput = screen.getByLabelText("First Name:");
  const lastNameInput = screen.getByLabelText("Last Name:");
  const emailInput = screen.getByLabelText("Email:");
  const updateBtn = screen.getByText("Update");

  // wrap in act when changing state
  act(() => {
    // userEvent.type(usernameInput, "testuser");
    userEvent.type(firstNameInput, "Test First1");
    userEvent.type(lastNameInput, "Test Last1");
    userEvent.type(emailInput, "email1@email.com");
  });

  // Mock the userSignup function
  const userUpdateMock = jest.fn().mockResolvedValue({
    user: {
      username: "testingUser",
      firstName: "Test First1",
      lastName: "Test Last1",
      email: "email1@email.com",
      isAdmin: false,
    },
  });
  jest.spyOn(JoblyApi, "updateUserDetails").mockImplementation(userUpdateMock);

  act(() => userEvent.click(updateBtn));

  // username and token (any string) returned
  await waitFor(() => {
    expect(updateUser).toHaveBeenCalledWith({
      username: "testingUser",
      firstName: "Test First1",
      lastName: "Test Last1",
      email: "email1@email.com",
      isAdmin: false,
    });
  });
});
