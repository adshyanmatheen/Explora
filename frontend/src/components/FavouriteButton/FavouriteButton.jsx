import React, { useState } from "react";
import { Heart } from "lucide-react";

const FavouriteButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      className="fixed right-6 top-6 z-50 rounded-full bg-white p-4 text-black hover:bg-getstarted-light dark:bg-black dark:text-white dark:hover:bg-getstarted-dark"
      onClick={handleClick}
    >
      <Heart
        className={`mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7 ${isClicked ? "animate-fill-and-stroke-pink" : ""}`}
      />
    </button>
  );
};

export default FavouriteButton;
