import { OutlinedInput, FormControl } from "@mui/material";

import { useSelector } from "react-redux";
const AgeInput = ({ handleChange }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      className="Login-form-control register-age"
    >
      <OutlinedInput
        id="outlined-adornment-lastname"
        name="date"
        onChange={handleChange}
        type={"date"}
        style={{ color: Theme[mode].textPrimary }}
        required
      />
    </FormControl>
  );
};
export default AgeInput;
