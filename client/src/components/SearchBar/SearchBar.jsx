import { Search, SearchIconWrapper, StyledInputBase } from "./Search/Search";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getProducts, getProductsByName } from "../../Redux/Thunks/Products";
export default function SearchBar() {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByName(e.target.value));
    }
  };

  return (
    <Search onChange={handleChange}>
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
