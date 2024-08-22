import SecondPreviousButton from "../components/SecondPreviousButton/SecondPreviousButton";
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import ChecklistOverview from "../components/ChecklistOverview/ChecklistOverview";

const Checklist = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <SecondPreviousButton></SecondPreviousButton>
        <NavigationLinksButton></NavigationLinksButton>
        <div className="flex h-screen flex-col items-center justify-center">
          <ChecklistOverview></ChecklistOverview>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
