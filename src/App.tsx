import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getLatestLaunches } from "./api/launches";
import Header from "./components/Header";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Alert, Box, CircularProgress } from "@mui/material";
import DataGrid from "./components/DataGrid";

const NUMBER_OF_LAUNCHES = 50;

const AppBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url("/bg.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

function App() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const allLaunches = await getLatestLaunches(NUMBER_OF_LAUNCHES);
        setLaunches(allLaunches);
        setLoading(false);
      } catch {
        setError("Failed to retrieve recent launches");
        setLoading(false);
      }
    })();
  }, []);
  return (
    <AppBackground data-testid="app-container">
      <Header onSearch={() => null} />
      <Box
        sx={{
          m: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {loading && <CircularProgress data-testid="spinner" />}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {!loading && (
          <Box
            id="launchGrid"
            className="ag-theme-alpine-dark"
            sx={{
              flex: 1,
              width: "100%",
            }}
          >
            <DataGrid rowData={launches} />
          </Box>
        )}
      </Box>
    </AppBackground>
  );
}

export default App;
