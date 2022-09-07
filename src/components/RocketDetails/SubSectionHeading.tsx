import { Box } from "@mui/material";
import { ReactNode } from "react";
import Heading from "./Heading";
import Section from "./Section";
import SubSection from "./SubSection";

const SubSectionHeading = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <SubSection sx={{ flexDirection: "column" }}>
    <Heading>{title}</Heading>
    <Section>{children}</Section>
  </SubSection>
);

export default SubSectionHeading;
