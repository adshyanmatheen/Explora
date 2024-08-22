import React from "react";
import { render, screen } from "@testing-library/react";
import ChecklistOverview from "./ChecklistOverview";

describe("ChecklistOverview", () => {
  it("renders the component and displays the placeholder text for adding a new task", () => {
    render(<ChecklistOverview />);

    const inputPlaceholder = screen.getByPlaceholderText("Enter Your New Task");
    expect(inputPlaceholder).toBeTruthy();
  });
});
