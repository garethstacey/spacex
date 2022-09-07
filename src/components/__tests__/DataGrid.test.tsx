import { fireEvent, render, screen } from "@testing-library/react";
import DataGrid from "../DataGrid";
import { launches } from "../../mocks/launches.mock";

test("renders Data Grid headers", async () => {
  render(<DataGrid rowData={launches} />);
  expect(screen.getByText("Launch Name")).toBeInTheDocument();
  expect(screen.getByText("Launch Date")).toBeInTheDocument();
  expect(screen.getByText("Details")).toBeInTheDocument();
});

test("renders Data Grid Data", async () => {
  render(<DataGrid rowData={launches} />);
  expect(screen.getByText(launches[0].mission_name)).toBeInTheDocument();
  expect(screen.getByText("December 6th 2020 16:17:00")).toBeInTheDocument();
  expect(screen.getByText(launches[0].details)).toBeInTheDocument();
  expect(screen.getByText(launches[1].mission_name)).toBeInTheDocument();
  expect(screen.getByText("November 21st 2020 17:17:00")).toBeInTheDocument();
  expect(screen.getByText(launches[1].details)).toBeInTheDocument();
});

test("clicking details shows details dialog", async () => {
  render(<DataGrid rowData={launches} />);
  fireEvent.click(screen.getByText(launches[0].details));
  const detailsDialog = await screen.findByTestId("launch-details");
  expect(detailsDialog).toBeInTheDocument();
});

test("clicking rocket details shows rocket details dialog", async () => {
  render(<DataGrid rowData={launches} />);
  fireEvent.click(screen.getByTestId("rocket-details-108"));
  const rocketDetailsDialog = await screen.findByText(
    "Sentinel-6 Michael Freilich Rocket Details"
  );
  expect(rocketDetailsDialog).toBeInTheDocument();
});
