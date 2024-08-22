// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ExploraProfileButton from "../ExploraProfileButton/ExploraProfileButton";

const NavigationLinksButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`fixed right-6 top-6 z-50 rounded-full p-4 ${isOpen ? "bg-white text-black" : "bg-white text-black"} dark:bg-black dark:text-white`}
        onClick={toggleMenu}
        aria-label="navigation"
      >
        {isOpen ? (
          <X className="mobile:h-6 mobile:w-6 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7" />
        ) : (
          <Menu className="mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7" />
        )}
      </button>
      <div
        className={`duration-400 fixed right-0 top-0 h-full w-full bg-white transition-transform ease-in-out dark:bg-black ${isOpen ? "translate-x-0 transform" : "translate-x-full transform"} md:w-2/6`}
      >
        <h1 className="fixed left-6 top-10 font-primary text-xl font-bold uppercase text-black dark:text-white">
          Explora
        </h1>
        <div className="flex h-screen flex-col items-center justify-center">
          <Link to="/home">
            <h2 className="pb-6 font-primary text-3xl font-bold uppercase tracking-wide text-black hover:text-gray-700 lg:text-2xl xl:text-3xl dark:text-white dark:hover:text-gray-100">
              Home
            </h2>
          </Link>
          <Link to="/trip">
            <h2 className="pb-6 font-primary text-3xl font-bold uppercase tracking-wide text-black hover:text-gray-700 lg:text-2xl xl:text-3xl dark:text-white dark:hover:text-gray-100">
              Trips
            </h2>
          </Link>
          <Link to="/createnewjournal">
          <h2 className="pb-6 font-primary text-3xl font-bold uppercase tracking-wide text-black hover:text-gray-700 lg:text-2xl xl:text-3xl dark:text-white dark:hover:text-gray-100">
            Journal
          </h2>
          </Link>
          <Link to="/checklist">
            <h2 className="pb-6 font-primary text-3xl font-bold uppercase tracking-wide text-black hover:text-gray-700 lg:text-2xl xl:text-3xl dark:text-white dark:hover:text-gray-100">
              Checklist
            </h2>
          </Link>
          <Link to="/expenses">
            <h2 className="pb-6 font-primary text-3xl font-bold uppercase tracking-wide text-black hover:text-gray-700 lg:text-2xl xl:text-3xl dark:text-white dark:hover:text-gray-100">
              Expenses
            </h2>
          </Link>
        </div>
        <ExploraProfileButton />
      </div>
    </>
  );
};

export default NavigationLinksButton;
