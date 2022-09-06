import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

const SEARCH_QUERY = "Sentinel";

test("renders Header", async () => {
  render(<Header onSearch={() => null} />);
  expect(screen.getByText("SpaceX Recent Launches")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
});

test("entering search input calls onSearch", async () => {
  const onSearch = jest.fn();
  render(<Header onSearch={onSearch} />);
  fireEvent.change(screen.getByLabelText("search"), {
    target: { value: SEARCH_QUERY },
  });
  expect(screen.getByDisplayValue(SEARCH_QUERY)).toBeInTheDocument();
  expect(onSearch).toHaveBeenCalledWith(SEARCH_QUERY);
});

test("reset clears calls onSearch", async () => {
  const onSearch = jest.fn();
  render(<Header onSearch={onSearch} />);
  fireEvent.change(screen.getByLabelText("search"), {
    target: { value: SEARCH_QUERY },
  });
  expect(screen.getByDisplayValue(SEARCH_QUERY)).toBeInTheDocument();
  onSearch.mockClear();
  fireEvent.click(screen.getByLabelText("reset search"));
  expect(onSearch).toHaveBeenCalledWith("");
  expect(screen.getByDisplayValue("")).toBeInTheDocument();
});
