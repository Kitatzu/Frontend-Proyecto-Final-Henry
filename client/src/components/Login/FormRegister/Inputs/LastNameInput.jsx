import {
  InputLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
const LastNameInput = ({ handleChange, handleBlur, form, error }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      className="Login-form-control register-Lastname"
    >
      <InputLabel
        htmlFor="outlined-adornment-lastname"
        style={{ color: Theme[mode].textPrimary }}
      >
        Lastname
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-lastname"
        name="lastname"
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.lastname}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        required
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon
                icon="icon-park-outline:edit-name"
                style={{ color: Theme[mode].textPrimary }}
              />
            </IconButton>
          </InputAdornment>
        }
        label="LastName"
      />
    </FormControl>
  );
};
export default LastNameInput;
