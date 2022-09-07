import { Theme } from "@emotion/react";
import { SxProps, Box } from "@mui/material";
import { ReactNode } from "react";

const Section = ({
  children,
  sx = {},
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
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default Section;
