import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
const EmailRegisterInput = ({ handleChange, handleBlur, form, error }) => {
  console.log(form);
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      className="Login-form-control"
    >
      <InputLabel
        htmlFor="outlined-adornment-email"
        style={{ color: Theme[mode].textPrimary }}
      >
        E-mail
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        name="registerEmail"
        type={"email"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.registerEmail}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        error={error}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon
                icon="ic:outline-email"
                style={{ color: Theme[mode].textPrimary }}
              />
            </IconButton>
          </InputAdornment>
        }
        label="E-mail"
      />
    </FormControl>
  );
};
export default EmailRegisterInput;
