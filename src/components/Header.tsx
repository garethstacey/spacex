import { Cancel } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  alpha,
  InputBase,
  styled,
  IconButton,
} from "@mui/material";
import { ChangeEvent, useCallback, useRef, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme, disabled }) => ({
  "& svg": {
    fill: theme.palette.common.white,
    opacity: disabled ? 0.2 : 1,
  },
}));
interface Props {
  onSearch: (value: string) => void;
}

const Header = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchChange(e.target.value || "");
    },
    [setSearchChange]
  );

  const onSearchReset = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    setSearchChange("");
  }, [setSearchChange]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SpaceX Recent Launches
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search", ref: searchRef }}
              onChange={handleSearchChange}
            />
            <StyledIconButton
              aria-label="reset search"
              onClick={onSearchReset}
              disabled={!searchValue}
            >
              <Cancel />
            </StyledIconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
