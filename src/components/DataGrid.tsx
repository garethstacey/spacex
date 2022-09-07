import { Rocket } from "@mui/icons-material";
import { Box } from "@mui/material";
import { CellClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { useMemo, useRef, useState } from "react";
import "./DataGrid.css";
import LaunchDetails from "./LaunchDetails";
import RocketDetails from "./RocketDetails/RocketDetails";

interface Props {
  rowData: Launch[];
}

const DataGrid = ({ rowData }: Props) => {
  const selectedRow = useRef<Launch | undefined>();
  const [showDetails, setShowDetails] = useState(false);
  const [showRocketDetails, setShowRocketDetails] = useState(false);
  const columnDefs = useMemo(
    () => [
      {
        field: "mission_name",
        sortable: true,
        flex: 1,
        headerName: "Launch Name",
        resizable: true,
      },
      {
        field: "launch_date_utc",
        sortable: true,
        flex: 1,
        headerName: "Launch Date",
        resizable: true,
        valueFormatter: (params: { value: number }) =>
          moment.utc(params.value).local().format("MMMM Do YYYY HH:mm:ss"),
      },
      {
        field: "details",
        headerName: "Details",
        flex: 2,
        resizable: true,
        cellClass: "details",
        onCellClicked: (params: CellClickedEvent<Launch, any>) => {
          if (params.value) {
            selectedRow.current = params.data;
            setShowDetails(true);
          }
        },
      },
      {
        field: "",
        flex: 0.3,
        cellRenderer: (params: CellClickedEvent<Launch, any>) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              cursor: "pointer",
              opacity: 0.75,
              "&:hover": {
                opacity: 1,
              },
            }}
            onClick={() => {
              selectedRow.current = params.data;
              setShowRocketDetails(true);
            }}
            data-testid={`rocket-details-${params.data?.flight_number}`}
          >
            <Rocket />
          </Box>
        ),
        tooltipValueGetter: () => "Rocket Details",
      },
    ],
    []
  );

  return (
    <>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        animateRows
        suppressCellFocus
      />
      <LaunchDetails
        open={showDetails}
        onClose={() => setShowDetails(false)}
        launch={selectedRow.current}
      />
      <RocketDetails
        open={showRocketDetails}
        onClose={() => setShowRocketDetails(false)}
        launch={selectedRow.current}
      />
    </>
  );
};

export default DataGrid;
