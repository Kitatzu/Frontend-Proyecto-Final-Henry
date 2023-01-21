import { Search, SearchIconWrapper, StyledInputBase } from "./Search/Search";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../Redux/Thunks/Producst";
export default function SearchBar() {

  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(getProductsByName(e.target.value))
  }

  return (
    <Search onChange={handleChange}  >
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
