import { Earth } from "lucide-react";
import { Link } from "react-router-dom";

const OpenNewTripButton = () => {
  return (
    <Link to="/createnewtrip">
      <button className="flex items-center rounded-full bg-black p-3 px-5 font-primary font-semibold text-white hover:bg-getstarted-dark mobile:px-4 mobile:py-2 mobile:text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base lg:px-5 lg:py-3 lg:text-base xl:px-5 xl:py-3 xl:text-base dark:bg-white dark:text-black dark:hover:bg-getstarted-light">
        <Earth className="mr-2 h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
        <span>New Trips</span>
      </button>
    </Link>
  );
};

export default OpenNewTripButton;
