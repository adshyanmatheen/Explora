import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PreviousButton = ({ to }) => {
  return (
    <Link to={to}>
      <button className="fixed left-6 top-6 z-0 rounded-full bg-white p-4 text-black hover:bg-getstarted-light dark:bg-black dark:text-white dark:hover:bg-getstarted-dark">
        <ArrowLeft className="mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7" />
      </button>
    </Link>
  );
};

export default PreviousButton;
