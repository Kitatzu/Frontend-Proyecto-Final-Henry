import { InputLabel, OutlinedInput, FormControl } from "@mui/material";
import { useSelector } from "react-redux";

const NameInput = ({ name, label, value }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      className="Login-form-control register-name"
    >
      <InputLabel
        htmlFor="outlined-adornment-name"
        style={{ color: Theme[mode].textPrimary }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-name"
        name={name}
        type={"text"}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        defaultValue={value}
        disabled
        label={label}
        inputProps={{ readOnly: true }}
      />
    </FormControl>
  );
};

export default NameInput;
