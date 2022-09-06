import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getLatestLaunches } from "./api/launches";

jest.mock("./components/DataGrid", () => () => <div>data grid</div>);
jest.mock("./api/launches", () => ({
  getLatestLaunches: jest.fn().mockResolvedValue([]),
}));

test("renders App", async () => {
  render(<App />);
  const container = screen.getByTestId("app-container");
  expect(container).toBeInTheDocument();
  await waitFor(() => {
    const hiddenSpinner = screen.queryByTestId("spinner");
    expect(hiddenSpinner).not.toBeInTheDocument();
  });
});

test("initially renders spinner", async () => {
  render(<App />);
  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
  await waitFor(() => {
    const hiddenSpinner = screen.queryByTestId("spinner");
    expect(hiddenSpinner).not.toBeInTheDocument();
  });
});

test("renders data grid", async () => {
  (getLatestLaunches as jest.Mock).mockImplementation(() =>
    Promise.resolve([])
  );
  render(<App />);
  const dataGrid = await screen.findByText("data grid");
  expect(dataGrid).toBeInTheDocument();
});

test("handles error", async () => {
  (getLatestLaunches as jest.Mock).mockImplementation(() => Promise.reject());
  render(<App />);
  const error = await screen.findByText("Failed to retrieve recent launches");
  expect(error).toBeInTheDocument();
});
