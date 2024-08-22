/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import PreviousButton from "../components/PreviousButton/PreviousButton";

const ExistingTripsList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsCollectionRef = collection(firestore, "Trips");
        const tripsSnapshot = await getDocs(tripsCollectionRef);
        const tripsList = tripsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripsList);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <NavigationLinksButton />
        <PreviousButton />
        <div className="flex h-screen items-center justify-center">
          <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
            <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
              Welcome To Trips
            </h1>
            <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
              Let's See Your Existing Trips
            </h2>
            <div className="flex flex-col items-center justify-center">
              <h1 className="pb-3 font-semibold dark:text-white">
                Existing Trips
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between rounded-lg bg-gray-200 p-4 shadow-md"
                  >
                    <div>
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mr-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-black">
                        {trip.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Location: {trip.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date: {trip.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Description: {trip.description}
                      </p>
                    </div>
                    <Link
                      to={`/tripdetails/${trip.id}`}
                      className="rounded-md bg-black px-4 py-2 text-white hover:bg-white hover:text-black"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingTripsList;
