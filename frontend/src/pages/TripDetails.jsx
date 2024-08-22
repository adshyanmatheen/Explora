// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import PreviousButton from "../components/PreviousButton/PreviousButton";
import { CircleX, SquarePen, CircleCheck } from "lucide-react";

const TripDetails = () => {
 const { tripId } = useParams();
 const [trip, setTrip] = useState(null);
 const [editingTrip, setEditingTrip] = useState(false);
 const [editedTrip, setEditedTrip] = useState({ name: '', destination: '', startDate: '', endDate: '', images: [] });
 const navigate = useNavigate();

 useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripDocRef = doc(firestore, "Trips", tripId);
        const tripDoc = await getDoc(tripDocRef);

        if (tripDoc.exists()) {
          setTrip(tripDoc.data());
          setEditedTrip(tripDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
 }, [tripId]);

 const handleEdit = () => {
    setEditingTrip(true);
 };

 const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const tripDocRef = doc(firestore, "Trips", tripId);
      await deleteDoc(tripDocRef);
      navigate('/trip');
    }
 };

 const handleSave = async () => {
    const tripDocRef = doc(firestore, "Trips", tripId);
    await updateDoc(tripDocRef, editedTrip);
    setTrip(editedTrip);
    setEditingTrip(false);
 };

 return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <PreviousButton to="/createnewtrip"></PreviousButton>
        <NavigationLinksButton></NavigationLinksButton>
        <div className="flex h-screen items-center justify-center">
          <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
            <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
              Welcome To Trips
            </h1>
            <h2 className="pb-7 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
              Your Trip Was Added Successfully
            </h2>
            <div className="flex flex-col items-center justify-center">
              {trip ? (
                editingTrip ? (
                 <>
                    <input
                      type="text"
                      value={editedTrip.name}
                      onChange={(e) => setEditedTrip({ ...editedTrip, name: e.target.value })}
                      placeholder="Trip Name"
                    />
                    <input
                      type="text"
                      value={editedTrip.destination}
                      onChange={(e) => setEditedTrip({ ...editedTrip, destination: e.target.value })}
                      placeholder="Destination"
                    />
                    <input
                      type="date"
                      value={editedTrip.startDate}
                      onChange={(e) => setEditedTrip({ ...editedTrip, startDate: e.target.value })}
                    />
                    <input
                      type="date"
                      value={editedTrip.endDate}
                      onChange={(e) => setEditedTrip({ ...editedTrip, endDate: e.target.value })}
                    />
                    <button onClick={handleSave} className="text-black hover:text-getstarted-dark dark:text-white"><CircleCheck className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6 dark:text-white" /></button>
                 </>
                ) : (
                 <>
                    <h1 className="pb-1 dark:text-white">
                      <span className="pr-1 font-semibold dark:text-white">Trip Name:</span>{" "}
                      {trip.name}
                    </h1>
                    <p className="pb-1 dark:text-white">
                      <span className="pr-1 font-semibold dark:text-white">Destination:</span>{" "}
                      {trip.destination}
                    </p>
                    <p className="pb-1 dark:text-white">
                      <span className="pr-1 font-semibold dark:text-white">Start Date:</span>{" "}
                      {trip.startDate}
                    </p>
                    <p className="pb-5 dark:text-white">
                      <span className="pr-1 font-semibold dark:text-white">End Date:</span>{" "}
                      {trip.endDate}
                    </p>
                    {trip.images &&
                      trip.images.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Trip ${trip.name} Image`}
                          className="w-70 h-40"
                        />
                      ))}
                      <div className="flex">
                    <button onClick={handleEdit} className="text-black hover:text-getstarted-dark dark:text-white pr-3"><SquarePen className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" /></button>
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300"><CircleX className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" /></button>
                    </div>
                 </>
                )
              ) : (
                <p className="dark:text-white">Loading trip details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default TripDetails;
