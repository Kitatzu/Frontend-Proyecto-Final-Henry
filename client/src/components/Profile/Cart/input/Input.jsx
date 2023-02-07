import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const Input = ({ value, label, readOnly, icon, handleChange, name }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      variant="outlined"
      className="Login-form-control"
    >
      <InputLabel
        htmlFor="outlined-adornment-email"
        style={{ color: Theme[mode].textPrimary }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        name={name}
        type={"text"}
        defaultValue={value}
        readOnly={readOnly}
        onChange={handleChange}
        sx={{
          color: Theme[mode].textPrimary,
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon icon={icon} color={Theme[mode].textPrimary} />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};
export default Input;
