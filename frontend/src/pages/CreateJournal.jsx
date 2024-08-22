import CreateNewJournalOverview from "../components/CreateNewJournalOverview/CreateNewJournalOverview";
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import PreviousButton from "../components/PreviousButton/PreviousButton";

const CreateJournal = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <div className="absolute left-0 top-0 h-full w-full bg-black/10">
        <PreviousButton></PreviousButton>
        <NavigationLinksButton></NavigationLinksButton>
        <div className="flex h-screen items-center justify-center">
          <CreateNewJournalOverview></CreateNewJournalOverview>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
