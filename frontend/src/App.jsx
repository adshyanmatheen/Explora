// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import Trip from "./pages/Trip";
import CreateNewTrip from "./pages/CreateNewTrip";
import HomeOverview from "./pages/HomeOverview";
import Checklist from "./pages/Checklist";
import UserInformation from "./pages/UserInformation";
import TripDetails from "./pages/TripDetails";
import ExistingTripsList from "./pages/ExistingTripsList";
import ExpenseTracker from "./pages/ExpenseTracker";
import CreateJournal from "./pages/CreateJournal";
import ExistingJournalsList from "./pages/ExistingJournalsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/createnewtrip" element={<CreateNewTrip />} />
        <Route path="/home" element={<HomeOverview />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/profile" element={<UserInformation />} />
        <Route path="/tripdetails/:tripId" element={<TripDetails />} />
        <Route path="/existingtrips" element={<ExistingTripsList />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/createnewjournal" element={<CreateJournal />} />
        <Route path="/existingjournals" element={<ExistingJournalsList />} />
      </Routes>
    </Router>
  );
}

export default App;
