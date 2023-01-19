import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
const NameInput = ({ handleChange, handleBlur, form, error }) => {
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
        Name
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-name"
        name="name"
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.name}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        required
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon
                icon="mdi:user"
                style={{ color: Theme[mode].textPrimary }}
              />
            </IconButton>
          </InputAdornment>
        }
        label="Name"
      />
    </FormControl>
  );
};
export default NameInput;
