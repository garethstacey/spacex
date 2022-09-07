import { Typography } from "@mui/material";
import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => (
  <Typography variant="h6">{children}</Typography>
);

export default Heading;
