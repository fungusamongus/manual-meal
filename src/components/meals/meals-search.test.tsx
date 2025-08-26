import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import MealsSearch from "./meals-search";

describe("MealsSearch component", () => {
  const mockSetSearchQuery = jest.fn();
  const mockOnSearch = jest.fn();
  const mockSetSearchResults = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the search query value", () => {
    const testQuery = "pasta";
    render(
      <MealsSearch
        searchQuery={testQuery}
        setSearchQuery={mockSetSearchQuery}
        onSearch={mockOnSearch}
        setSearchResults={mockSetSearchResults}
      />
    );

    const input = screen.getByPlaceholderText("Input a dish name") as HTMLInputElement;
    expect(input.value).toBe(testQuery);
  });

  it("calls onSearch when button is clicked", async () => {
    const testQuery = "chicken";
    render(
      <MealsSearch
        searchQuery={testQuery}
        setSearchQuery={mockSetSearchQuery}
        onSearch={mockOnSearch}
        setSearchResults={mockSetSearchResults}
      />
    );

    const button = screen.getByRole("button", { name: "Search" });
    await userEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it("disables button when search query is empty", () => {
    render(
      <MealsSearch
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        onSearch={mockOnSearch}
        setSearchResults={mockSetSearchResults}
      />
    );

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeDisabled();
  });

  it("disables button when search query is only whitespace", () => {
    render(
      <MealsSearch
        searchQuery="   "
        setSearchQuery={mockSetSearchQuery}
        onSearch={mockOnSearch}
        setSearchResults={mockSetSearchResults}
      />
    );

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeDisabled();
  });

  it("enables button when search query has content", () => {
    render(
      <MealsSearch
        searchQuery="pasta"
        setSearchQuery={mockSetSearchQuery}
        onSearch={mockOnSearch}
        setSearchResults={mockSetSearchResults}
      />
    );

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).not.toBeDisabled();
  });
});
