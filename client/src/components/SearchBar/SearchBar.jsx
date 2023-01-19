import { Search, SearchIconWrapper, StyledInputBase } from "./Search/Search";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
