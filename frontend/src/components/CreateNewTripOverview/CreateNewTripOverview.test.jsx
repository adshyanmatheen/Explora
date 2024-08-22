import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateNewTripOverview from "./CreateNewTripOverview";

describe("CreateNewTripOverview", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <CreateNewTripOverview />
      </Router>,
    );

    expect(screen.getByText(/Welcome To Trips/i)).toBeInTheDocument();
  });
});
