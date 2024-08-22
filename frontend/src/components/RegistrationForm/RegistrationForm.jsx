import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationForm = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("The user was successfully registered.");
      navigate("/home");
    } catch (error) {
      console.error(
        "There was an error in registering the user:",
        error.message,
      );
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <br />
      <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        Welcome To Explora
      </h1>
      <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
        Create Your Own Explora Account
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="mb-8 w-full rounded-lg bg-getstarted-input px-4 py-4 leading-tight placeholder-getstarted-placeholderlight invalid:text-red-400 invalid:ring-2 invalid:ring-red-400 mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:bg-getstarted-inputdark dark:text-getstarted-placeholderdark dark:placeholder-getstarted-placeholderdark"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={data.name}
        />
        <br />
        <input
          className="mb-8 w-full rounded-lg bg-getstarted-input px-4 py-4 leading-tight placeholder-getstarted-placeholderlight invalid:text-red-400 invalid:ring-2
          invalid:ring-red-400 mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:bg-getstarted-inputdark dark:text-getstarted-placeholderdark dark:placeholder-getstarted-placeholderdark"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter Your Email Address"
          onChange={handleInputChange}
          value={data.email}
        />
        <br />
        <input
          className="mb-8 w-full rounded-lg bg-getstarted-input px-4 py-4 leading-tight placeholder-getstarted-placeholderlight invalid:text-red-400 invalid:ring-2
          invalid:ring-red-400 mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:bg-getstarted-inputdark dark:text-getstarted-placeholderdark dark:placeholder-getstarted-placeholderdark"
          name="password"
          minLength={8}
          placeholder="Enter Your Password"
          onChange={handleInputChange}
          value={data.password}
        />
        <br />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="rounded-full bg-black p-3 px-8 font-primary font-semibold uppercase tracking-wider text-white hover:bg-getstarted-dark mobile:text-sm sm:text-base md:text-xl lg:text-xl dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
          >
            Sign Up
          </button>
        </div>
      </form>
      <br />
      <br />
      <div className="flex flex-col items-center justify-center">
        <p className="mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:text-white">
          If You Already Have An Explora Account,
          <Link
            to="/signin"
            className="text-blue-500 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-100"
          >
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
