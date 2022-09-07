import { ReactNode } from "react";
import Heading from "./Heading";
import Section from "./Section";

const SectionHeading = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <Section sx={{ flexDirection: "column" }}>
    <Heading>{title}</Heading>
    {children}
  </Section>
);

export default SectionHeading;
