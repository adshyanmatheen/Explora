import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GetStarted from "./GetStarted";

test("GetStarted component renders with the correct to prop", () => {
  render(
    <Router>
      <GetStarted to="/signup" />
    </Router>,
  );
  const linkElement = screen.getByRole("link", { name: /get started/i });
  expect(linkElement).toHaveAttribute("href", "/signup");
});
