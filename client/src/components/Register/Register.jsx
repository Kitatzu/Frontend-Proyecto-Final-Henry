import { Box } from "@mui/system";
import AgeInput from "./Inputs/AgeInput";
import LastNameInput from "./Inputs/LastNameInput";
import NameInput from "./Inputs/NameInput";
import CountrySelect from "./Inputs/CountriesInput";
import PasswordRegisterInput from "./Inputs/PasswordRegisterInput";
import PasswordVerifyInput from "./Inputs/PasswordVerify";
import { Button } from "@mui/material";
const Register = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <Box
      className="Login-form-control"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <NameInput />
      <LastNameInput />
      <AgeInput handleChange={handleChange} />
      <CountrySelect />
      <PasswordRegisterInput />
      <PasswordVerifyInput />
      <Button
        variant="contained"
        color="secondary"
        // startIcon={<Icon className="IconL" icon="ph:sign-in-light" />}
        className="Form-button register-button"
        // onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  );
};
export default Register;
