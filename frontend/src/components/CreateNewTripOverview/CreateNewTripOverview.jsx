import React, { useState } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ImagePlus, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateNewTripOverview = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => ({ file, url: URL.createObjectURL(file) })));
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const tripCollectionRef = collection(firestore, "Trips");
      const tripDocRef = await addDoc(tripCollectionRef, {
        name: tripName,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        details: details,
        images: images.map((image) => image.url),
      });
      alert(`Trip added successfully with ID: ${tripDocRef.id}`);
      navigate(`/tripdetails/${tripDocRef.id}`);
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <br />
      <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        Welcome To Trips
      </h1>
      <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
        Add New Adventureous Trip
      </h2>
      <form
        onSubmit={handleAddTrip}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="text"
          id="tripName"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
          placeholder="Enter Your Trip Name"
          className="w-80 rounded-lg bg-getstarted-input px-5 py-3 leading-tight placeholder-getstarted-placeholderlight mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
        />
        <div className="pt-6">
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="Enter Your Destination"
            className="w-80 rounded-lg bg-getstarted-input px-5 py-3 leading-tight placeholder-getstarted-placeholderlight mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
          />
        </div>
        <div className="pt-6">
          <input
            type="text"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            placeholder="Enter Your Start Date"
            className="w-80 rounded-lg bg-getstarted-input px-5 py-3 leading-tight placeholder-getstarted-placeholderlight mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
          />
        </div>
        <div className="pt-6">
          <input
            type="text"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            placeholder="Enter Your End Date"
            className="w-80 rounded-lg bg-getstarted-input px-5 py-3 leading-tight placeholder-getstarted-placeholderlight mobile:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base"
          />
        </div>
        <div className="flex items-center justify-center pt-7">
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center rounded-full bg-black px-4 py-2 font-primary font-semibold text-white hover:bg-getstarted-dark mobile:px-4 mobile:py-2 mobile:text-xs sm:px-4 sm:py-2 sm:text-xs md:px-5 md:py-3 md:text-sm lg:px-5 lg:py-3 lg:text-sm xl:px-5 xl:py-3 xl:text-sm"
          >
            <ImagePlus className="mr-2 h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <br />
        <button
          type="submit"
          className="flex items-center rounded-full bg-black p-3 px-10 font-primary font-semibold text-white hover:bg-getstarted-dark mobile:px-9 mobile:py-2 mobile:text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base lg:px-5 lg:py-3 lg:text-base xl:px-10 xl:py-3 xl:text-sm dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
        >
          <CirclePlus className="mr-2 h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
          <span>Add Trip</span>
        </button>
      </form>
    </div>
  );
};

export default CreateNewTripOverview;
