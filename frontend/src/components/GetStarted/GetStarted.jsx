import React from "react";
import { Link } from "react-router-dom";

const GetStarted = ({ to }) => {
  return (
    <Link to={to}>
      <button className="animate-button rounded-full bg-white p-2.5 px-7 font-primary font-semibold uppercase text-black hover:bg-getstarted-light sm:text-base md:text-xl lg:text-2xl dark:bg-black dark:text-white dark:hover:bg-getstarted-dark dark:hover:text-white">
        Get Started
      </button>
    </Link>
  );
};

export default GetStarted;
