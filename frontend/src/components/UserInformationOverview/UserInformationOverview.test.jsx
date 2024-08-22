import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserInformationOverview from "./UserInformationOverview";

describe("UserInformationOverview", () => {
  it("renders the component and displays the placeholder text for adding a new task", () => {
    render(
      <MemoryRouter>
        <UserInformationOverview />
      </MemoryRouter>,
    );

    const headingElement = screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "Profile";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child),
      );

      return nodeHasText && childrenDontHaveText;
    });

    expect(headingElement).toBeInTheDocument();
  });
});
