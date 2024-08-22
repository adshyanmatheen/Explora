import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Trash2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UserInformationOverview = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("User is not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteAccount = async () => {
    try {
      await user.delete();
      console.log("Account deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <br />
      <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        Profile
      </h1>
      <h2 className="pb-10 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
        Your Personal Details In A Single Location
      </h2>
      <div className=" flex flex-col items-center justify-center py-2">
        <div className="flex flex-col items-center justify-center">
          <div>
            <button
              onClick={deleteAccount}
              className="flex items-center rounded-full bg-red-500 p-3 px-5 font-primary font-semibold text-white hover:bg-red-400 mobile:px-4 mobile:py-2 mobile:text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base lg:px-5 lg:py-3 lg:text-base xl:px-5 xl:py-3 xl:text-base dark:bg-red-400 dark:text-white dark:hover:bg-red-300"
            >
              <Trash2 className="mr-2 h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
              <span>Delete Account</span>
            </button>
          </div>
          <div className="py-5">
            <button
              onClick={logout}
              className="flex items-center rounded-full bg-black p-3 px-5 font-primary font-semibold text-white hover:bg-getstarted-dark mobile:px-9 mobile:py-2 mobile:text-xs sm:px-9 sm:py-2 sm:text-sm md:px-8 md:py-3 md:text-base lg:px-12 lg:py-3 lg:text-base xl:px-12 xl:py-3 xl:text-base dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
            >
              <LogOut className="mr-2 h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-8">
          <p className="mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base dark:text-white">
            If You Do Not Remember Your Password,
            <Link
              to="/forgotpassword"
              className="text-blue-500 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-100"
            >
              {" "}
              Edit Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInformationOverview;
