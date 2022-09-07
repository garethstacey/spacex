import styled from "@emotion/styled";
import { Check, Clear } from "@mui/icons-material";
import { Typography } from "@mui/material";

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const NameValue = ({
  name,
  value,
}: {
  name: string;
  value?: string | boolean | number | string[];
}) => (
  <>
    {value !== null && value !== undefined ? (
      <TextContainer>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        {typeof value === "boolean" ? (
          value ? (
            <Check />
          ) : (
            <Clear />
          )
        ) : (
          <Typography variant="subtitle1">
            {Array.isArray(value) ? value.join(", ") : value}
          </Typography>
        )}
      </TextContainer>
    ) : null}
  </>
);

export default NameValue;
