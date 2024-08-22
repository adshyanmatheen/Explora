import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("RegistrationForm", () => {
  it("handles successful registration", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        email: "testing@explora.com",
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegistrationForm />
      </Router>,
    );

    fireEvent.change(getByPlaceholderText("Enter Your Name"), {
      target: { value: "Matilda" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Email Address"), {
      target: { value: "testing@explora.com" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Password"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("Sign Up"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "testing@explora.com",
        "password",
      );
    });
  });
});
