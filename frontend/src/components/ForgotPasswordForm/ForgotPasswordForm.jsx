import React from "react";
import { useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordForm = () => {
  const auth = getAuth();

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "The email for resetting your password has been sent to your email. Please check your inbox.",
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <br />
      <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        Welcome To Explora
      </h1>
      <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
        Reset Your Explora Account's Password
      </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className="mb-8 w-full rounded-lg bg-getstarted-input px-4 py-4 leading-tight placeholder-getstarted-placeholderlight invalid:text-red-400 invalid:ring-2
          invalid:ring-red-400 mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:bg-getstarted-inputdark dark:text-getstarted-placeholderdark dark:placeholder-getstarted-placeholderdark"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter Your Email Address"
          onChange={handleInputChange}
          value={email}
        />
        <br />
        <br />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="rounded-full bg-black p-3 px-8 font-primary font-semibold uppercase tracking-wider text-white hover:bg-getstarted-dark mobile:text-sm sm:text-base md:text-xl lg:text-xl dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
