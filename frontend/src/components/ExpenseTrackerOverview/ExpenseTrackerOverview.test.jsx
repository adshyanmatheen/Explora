import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExpenseTrackerOverview from "./ExpenseTrackerOverview";

describe("ExpenseTrackerOverview", () => {
  it("renders the component", () => {
    render(
      <MemoryRouter>
        <ExpenseTrackerOverview />
      </MemoryRouter>,
    );

    expect(screen.getByText("Expense Tracker")).toBeInTheDocument();
  });

  it("adds a new expense", () => {
    render(
      <MemoryRouter>
        <ExpenseTrackerOverview />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Enter Your Expenses");
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.click(screen.getByTestId("add-task-button"));

    expect(input.value).toBe("100");
  });
});
