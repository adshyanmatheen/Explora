import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import SecondPreviousButton from "../components/SecondPreviousButton/SecondPreviousButton";
import UserInformationOverview from "../components/UserInformationOverview/UserInformationOverview";

const UserInformation = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <SecondPreviousButton to="/home"></SecondPreviousButton>
        <NavigationLinksButton></NavigationLinksButton>
        <div className="flex h-screen items-center justify-center">
          <UserInformationOverview></UserInformationOverview>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
