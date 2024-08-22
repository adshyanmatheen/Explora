import GetStarted from "../components/GetStarted/GetStarted";

const Welcome = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="heading-animate p-3 pb-14 font-primary text-5xl font-bold uppercase tracking-widest text-white sm:text-5xl md:text-6xl xl:text-8xl">
            Explora
          </h1>
          <GetStarted to="/signup"></GetStarted>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
