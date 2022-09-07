import { Theme } from "@emotion/react";
import { SxProps, Box } from "@mui/material";
import { ReactNode } from "react";

const SubSection = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) => (
  <Box
    sx={{
      display: "flex",
      columnGap: "2rem",
      rowGap: 0,
      flexFlow: "wrap",
      marginLeft: "1rem",
      marginBottom: "1rem",
      border: "1px solid black",
      borderRadius: "4px",
      padding: "1rem",
      paddingBottom: 0,
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default SubSection;
