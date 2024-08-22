/* eslint-disable react/no-unescaped-entities */
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import OpenExistingTripButton from "../components/OpenExistingTripButton/OpenExistingTripButton";
import OpenNewTripButton from "../components/OpenNewTripButton/OpenNewTripButton";
import PreviousButton from "../components/PreviousButton/PreviousButton";

const Trip = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <NavigationLinksButton></NavigationLinksButton>
        <PreviousButton to="/home"></PreviousButton>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
            <br />
            <h1 className="pb-10 text-center font-primary font-semibold uppercase tracking-wider mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
              Welcome To Trips
            </h1>
            <h2 className="pb-12 text-center font-primary mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-white">
              Let's Plan Your Upcoming Trips
            </h2>
            <div className="flex items-center justify-center">
              <div className="pr-5">
                <OpenNewTripButton></OpenNewTripButton>
              </div>
              <div>
                <OpenExistingTripButton></OpenExistingTripButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
