import { Rocket } from "@mui/icons-material";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { useMemo } from "react";

interface Props {
  rowData: Launch[];
}

const RocketDetails = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <Rocket />
  </Box>
);

const DataGrid = ({ rowData }: Props) => {
  const columnDefs = useMemo(
    () => [
      {
        field: "mission_name",
        sortable: true,
        flex: 1,
        headerName: "Launch Name",
      },
      {
        field: "launch_date_utc",
        sortable: true,
        flex: 1,
        headerName: "Launch Date",
        valueFormatter: (params: { value: number }) =>
          moment.utc(params.value).local().format("MMMM Do YYYY HH:mm:ss"),
      },
      {
        field: "details",
        headerName: "Details",
        flex: 2,
        sortable: false,
      },
      {
        field: "",
        flex: 0.5,
        cellRenderer: RocketDetails,
      },
    ],
    []
  );

  return (
    <AgGridReact
      columnDefs={columnDefs}
      rowData={rowData}
      animateRows
      suppressCellFocus
    />
  );
};

export default DataGrid;
