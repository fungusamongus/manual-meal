import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import Meals from "@/app/meals/page";

// Mock the server action
jest.mock("@/app/meals/actions", () => ({
  searchMeals: jest.fn(),
}));

import { searchMeals, MealResult } from "@/app/meals/actions";

describe("Meals page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("accepts input and displays search results after search", async () => {
    const mockSearchMeals = searchMeals as jest.MockedFunction<typeof searchMeals>;
    const mockResults = [
      { name: "Test Recipe", url: "https://example.com", image: "https://example.com/image.jpg", ingredients: ["ingredient1", "ingredient2"] }
    ];
    mockSearchMeals.mockResolvedValueOnce(mockResults);

    render(<Meals />);

    const input = screen.getByPlaceholderText("Input a dish name") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Search" });

    const randomWord = faker.word.noun();
    await userEvent.type(input, randomWord);

    expect(input.value).toBe(randomWord);

    await userEvent.click(button);

    // Assert that the server action was called with the correct query
    expect(mockSearchMeals).toHaveBeenCalledWith(randomWord);
    expect(mockSearchMeals).toHaveBeenCalledTimes(1);

    // Wait for the search results to be displayed
    expect(await screen.findByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText("Go to Recipe →")).toBeInTheDocument();
    expect(screen.getByText(/Results for/)).toBeInTheDocument();
  });

  it("handles search with empty input", async () => {
    const mockSearchMeals = searchMeals as jest.MockedFunction<typeof searchMeals>;
    
    render(<Meals />);

    const button = screen.getByRole("button", { name: "Search" });
    await userEvent.click(button);

    // Assert that the server action was not called
    expect(mockSearchMeals).not.toHaveBeenCalled();
  });

  it("handles search with only whitespace input", async () => {
    const mockSearchMeals = searchMeals as jest.MockedFunction<typeof searchMeals>;
    
    render(<Meals />);

    const input = screen.getByPlaceholderText("Input a dish name") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Search" });

    await userEvent.type(input, "   ");
    await userEvent.click(button);

    // Assert that the server action was not called
    expect(mockSearchMeals).not.toHaveBeenCalled();
  });

  it("handles server action errors gracefully", async () => {
    const mockSearchMeals = searchMeals as jest.MockedFunction<typeof searchMeals>;
    mockSearchMeals.mockResolvedValueOnce(null);

    render(<Meals />);

    const input = screen.getByPlaceholderText("Input a dish name") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Search" });

    const randomWord = faker.word.noun();
    await userEvent.type(input, randomWord);
    await userEvent.click(button);

    // Assert that the server action was called
    expect(mockSearchMeals).toHaveBeenCalledWith(randomWord);

    // Assert that no results are displayed when server action returns null
    expect(screen.queryByText(/Results for/)).not.toBeInTheDocument();
  });

  it("shows loading animation during search", async () => {
    const mockSearchMeals = searchMeals as jest.MockedFunction<typeof searchMeals>;
    const mockResults = [
      { name: "Test Recipe", url: "https://example.com", image: "https://example.com/image.jpg", ingredients: ["ingredient1", "ingredient2"] }
    ];
    
    // Create a delayed promise to simulate loading
    let resolvePromise: (value: MealResult[] | null) => void;
    const delayedPromise = new Promise<MealResult[] | null>((resolve) => {
      resolvePromise = resolve;
    });
    mockSearchMeals.mockReturnValueOnce(delayedPromise);

    render(<Meals />);

    const input = screen.getByPlaceholderText("Input a dish name") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Search" });

    await userEvent.type(input, "pasta");
    await userEvent.click(button);

    // Check that loading animation appears
    expect(screen.getByText("Cooking")).toBeInTheDocument();

    // Resolve the promise
    resolvePromise!(mockResults);

    // Wait for loading to complete and results to appear
    expect(await screen.findByText("Test Recipe")).toBeInTheDocument();
    expect(screen.queryByText("Cooking")).not.toBeInTheDocument();
  });
});



