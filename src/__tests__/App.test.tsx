import { act, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { getLatestLaunches } from "../api/launches";
import { launches } from "../mocks/launches.mock";
import Header from "../components/Header";

jest.mock(
  "../components/DataGrid",
  () =>
    ({ rowData }: { rowData: Launch[] }) =>
      (
        <>
          <div>data grid</div>
          <div>
            {rowData.map((launch) => (
              <span key={launch.flight_number}>{launch.mission_name}</span>
            ))}
          </div>
        </>
      )
);
jest.mock("../api/launches", () => ({
  getLatestLaunches: jest.fn().mockResolvedValue([]),
}));
jest.mock("../components/Header", () =>
  jest.fn().mockImplementation(() => <div>Header</div>)
);

beforeEach(() => {
  jest.clearAllMocks();
  (getLatestLaunches as jest.Mock).mockResolvedValue([]);
});

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
  (getLatestLaunches as jest.Mock).mockResolvedValue(launches);
  render(<App />);
  const dataGrid = await screen.findByText("data grid");
  expect(dataGrid).toBeInTheDocument();
  expect(screen.getByText(launches[0].mission_name)).toBeInTheDocument();
  expect(screen.getByText(launches[1].mission_name)).toBeInTheDocument();
});

test("handles error", async () => {
  (getLatestLaunches as jest.Mock).mockRejectedValue([]);
  render(<App />);
  const error = await screen.findByText("Failed to retrieve recent launches");
  expect(error).toBeInTheDocument();
});

test("filters launches by search term", async () => {
  let onSearchMock = (searchQuery: string) => {};
  (getLatestLaunches as jest.Mock).mockResolvedValue(launches);
  (Header as jest.Mock).mockImplementation(
    ({ onSearch }: { onSearch: (searchQuery: string) => void }) => {
      onSearchMock = onSearch;
      return <div />;
    }
  );
  render(<App />);
  await screen.findByText("data grid");
  act(() => {
    onSearchMock("Sentinel");
  });
  await waitFor(() => {
    const filteredLaunch = screen.queryByText(launches[0].mission_name);
    expect(filteredLaunch).not.toBeInTheDocument();
  });
  expect(screen.getByText(launches[1].mission_name)).toBeInTheDocument();
});

test("handles no search results", async () => {
  let onSearchMock = (searchQuery: string) => {};
  (getLatestLaunches as jest.Mock).mockResolvedValue(launches);
  (Header as jest.Mock).mockImplementation(
    ({ onSearch }: { onSearch: (searchQuery: string) => void }) => {
      onSearchMock = onSearch;
      return <div />;
    }
  );
  render(<App />);
  await screen.findByText("data grid");
  act(() => {
    onSearchMock("fhjgdjkhfb");
  });
  await waitFor(() => {
    const noSearchResults = screen.queryByText(
      "No launches were found for your search term"
    );
    expect(noSearchResults).toBeInTheDocument();
  });
});

test("handles no launches", async () => {
  (getLatestLaunches as jest.Mock).mockResolvedValue([]);
  render(<App />);
  await waitFor(() => {
    const noLaunches = screen.queryByText("No launches were found");
    expect(noLaunches).toBeInTheDocument();
  });
});
