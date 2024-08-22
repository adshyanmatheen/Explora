import React from "react";
import SecondPreviousButton from "../components/SecondPreviousButton/SecondPreviousButton";
import NavigationLinksButton from "../components/NavigationLinksButton/NavigationLinksButton";
import ExpenseTrackerOverview from "../components/ExpenseTrackerOverview/ExpenseTrackerOverview";

const ExpenseTracker = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-[url('https://cdn.dribbble.com/userupload/12608757/file/original-7c0e168619a01690aeee929e3f60cd13.jpg?resize=2400x1803')] bg-cover bg-center">
      <SecondPreviousButton></SecondPreviousButton>
      <NavigationLinksButton></NavigationLinksButton>
      <div className="flex h-screen items-center justify-center">
        <ExpenseTrackerOverview></ExpenseTrackerOverview>
      </div>
    </div>
  );
};

export default ExpenseTracker;
