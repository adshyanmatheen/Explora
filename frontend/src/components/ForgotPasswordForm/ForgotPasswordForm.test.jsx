import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getAuth } from "firebase/auth";
import ForgotPasswordForm from "./ForgotPasswordForm";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  })),
}));

describe("ForgotPasswordForm", () => {
  it("renders the form and allows user to submit", async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPasswordForm />);

    const emailInput = getByPlaceholderText("Enter Your Email Address");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = getByText("Reset Password");
    fireEvent.click(submitButton);
  });

  it("displays an error message if the email is invalid", async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPasswordForm />);

    const emailInput = getByPlaceholderText("Enter Your Email Address");
    fireEvent.change(emailInput, { target: { value: "invalid email" } });

    const submitButton = getByText("Reset Password");
    fireEvent.click(submitButton);
  });
});
