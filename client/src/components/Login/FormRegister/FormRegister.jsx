import React from "react";
//import "./FormRegister.scss";
import imgDefault from "../../assets/imgDefault.png";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import NameInput from "./Inputs/NameInput";
import { Box } from "@mui/system";
import LastNameInput from "./Inputs/LastNameInput";
import AgeInput from "./Inputs/AgeInput";
import PasswordRegisterInput from "./Inputs/PasswordRegisterInput";
import PasswordVerifyInput from "./Inputs/PasswordVerify";
import EmailRegisterInput from "./Inputs/EmailRegisterInput";
import { Alert } from "@mui/material";
import CountriesInput from "./Inputs/CountriesInput";

const FormRegister = ({
  handleChange,
  handleBlur,
  handleSubmit,
  handleImage,
  form,
  errors,
  image,
  previewUrl,
}) => {
  return (
    <form className="Form">
      <h2>REGISTER</h2>
      <Box>
        <input type="file" onChange={handleImage} />
        <img
          src={image ? previewUrl : imgDefault}
          alt="imgDefault"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        />
      </Box>
      <Box
        className="Login-form-control"
        display="flex-column"
        justifyContent="center"
      >
        <NameInput
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          form={form}
          error={errors.name !== undefined}
        />
        {errors.name !== undefined ? (
          <Alert severity="error" sx={{ margin: "15px 0" }}>
            {errors.name}
          </Alert>
        ) : null}

        <LastNameInput
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          form={form}
          error={errors.lastName !== undefined}
        />
      </Box>

      {errors.lastname !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.lastname}
        </Alert>
      ) : null}

      <AgeInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        error={errors.age !== undefined}
        form={form}
      />
      {errors.age !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.age}
        </Alert>
      ) : null}

      <EmailRegisterInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        error={errors.registerEmail !== undefined}
        form={form}
      />
      {errors.registerEmail !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.registerEmail}
        </Alert>
      ) : null}
      <CountriesInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        form={form}
      />
      {errors.Country !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.Country}
        </Alert>
      ) : null}
      <PasswordRegisterInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        error={errors.registerpassword !== undefined}
        form={form}
      />
      {errors.registerpassword !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.registerpassword}
        </Alert>
      ) : null}
      <PasswordVerifyInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.verifypassword !== undefined}
        handleSubmit={handleSubmit}
        form={form}
      />
      {errors.verifypassword !== undefined ? (
        <Alert severity="error" sx={{ margin: "15px 0" }}>
          {errors.verifypassword}
        </Alert>
      ) : null}

      <Box 
        display="flex" 
        justifyContent="space-around" 
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Icon className="IconL" icon="ph:sign-in-light" />}
          className="Form-button register-button"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Box>
    </form>
  );
};

export default FormRegister;
