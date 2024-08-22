import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("LoginForm", () => {
  it("renders the form and allows user to submit", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <LoginForm />
      </Router>,
    );

    const emailInput = getByPlaceholderText("Enter Your Email Address");
    fireEvent.change(emailInput, { target: { value: "testing@explora.com" } });

    const passwordInput = getByPlaceholderText("Enter Your Password");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = getByText("Sign In");
    fireEvent.click(submitButton);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "testing@explora.com",
      "password",
    );
  });

  it("displays an error message if the login fails", async () => {
    signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject(new Error("Login failed")),
    );

    const { getByPlaceholderText, getByText, findByText } = render(
      <Router>
        <LoginForm />
      </Router>,
    );

    const emailInput = getByPlaceholderText("Enter Your Email Address");
    fireEvent.change(emailInput, { target: { value: "testing@explora.com" } });

    const passwordInput = getByPlaceholderText("Enter Your Password");
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    const submitButton = getByText("Sign In");
    fireEvent.click(submitButton);
  });
});
