import { render, screen } from "@testing-library/react";
import DataGrid from "../DataGrid";

const rowData = [
  {
    flight_number: 110,
    mission_name: "CRS-21",
    launch_date_utc: "2020-12-06T16:17:00.000Z",
    details: "SpaceX's 21st ISS resupply mission on behalf of NASA.",
  },
  {
    flight_number: 108,
    mission_name: "Sentinel-6 Michael Freilich",
    launch_date_utc: "2020-11-21T17:17:00.000Z",
    details:
      "SpaceX will launch Sentinel-6 Michael Freilich into low Earth orbit for NASA, NOAA, ESA, and the European Organization for the Exploitation of Meteorological Satellites aboard a Falcon 9 from SLC-4E, Vandenberg Air Force Station.",
  },
] as unknown as Launch[];

test("renders Data Grid headers", async () => {
  render(<DataGrid rowData={rowData} />);
  expect(screen.getByText("Launch Name")).toBeInTheDocument();
  expect(screen.getByText("Launch Date")).toBeInTheDocument();
  expect(screen.getByText("Details")).toBeInTheDocument();
});

test("renders Data Grid Data", async () => {
  render(<DataGrid rowData={rowData} />);
  expect(screen.getByText(rowData[0].mission_name)).toBeInTheDocument();
  expect(screen.getByText("December 6th 2020 16:17:00")).toBeInTheDocument();
  expect(screen.getByText(rowData[0].details)).toBeInTheDocument();
  expect(screen.getByText(rowData[1].mission_name)).toBeInTheDocument();
  expect(screen.getByText("November 21st 2020 17:17:00")).toBeInTheDocument();
  expect(screen.getByText(rowData[1].details)).toBeInTheDocument();
});
