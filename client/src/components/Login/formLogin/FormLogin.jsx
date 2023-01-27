import { React, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

import { Box } from "@mui/system";
import PasswordInput from "./input/PasswordInput"
import { Alert } from "@mui/material";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";

import { ValidatorForm } from "react-material-ui-form-validator";
import EmailInput from "./input/EmailInput";
import { loginUser } from "../../../Redux/Thunks/loginUsers";

function FormLogin({ handleChange, handleBlur, handleSubmits, form, errors }) {
  const dispatch = useDispatch();
  const clientId =
    "797157267486-lvn1qtius6tu6hq7drjcem2os94c9t1o.apps.googleusercontent.com";
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
      });
    };
    gapi.load("client:auth2", start);
  }, []);
  const responseGooglesuccess = (response) => {
    const Token = response.accessToken;
    const formGoogle = {};
    formGoogle.firstName = response.profileObj.givenName;
    formGoogle.lastName = response.profileObj.familyName;
    formGoogle.userName =
      response.profileObj.givenName + response.profileObj.familyName + Token;
    formGoogle.email = response.profileObj.email;
    formGoogle.avatar = response.profileObj.imageUrl;
    formGoogle.password = response.Ca;
    formGoogle.country = "Google";
    console.log(formGoogle, Token);
    dispatch(loginUser("google", formGoogle, Token));
  };
  const responseGoogleFailure = (response) => {
    console.log(response);
  };
  return (
    <Box className="Form">
      <h2>LOGIN</h2>
      <EmailInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmits={handleSubmits}
        form={form}
        error={errors.email !== undefined}
      />
      {errors.email !== undefined ? (
        <Alert severity="error" sx={{ margin: "10px 0" }}>
          {errors.email}
        </Alert>
      ) : null}
      <PasswordInput
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmits={handleSubmits}
        form={form}
        error={errors.password !== undefined}
      />
      {errors.password !== undefined ? (
        <Alert severity="error" sx={{ margin: "150x 0" }}>
          {errors.password}
        </Alert>
      ) : null}

      <Box
        sx={{ margin: "5px 0" }}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          className="Form-button login-button"
          startIcon={<Icon className="IconL" icon="ph:sign-in-light" />}
          onClick={handleSubmits}
        >
          Login
        </Button>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGooglesuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </Box>
    </Box>
  );
}

export default FormLogin;

// import React, { useState } from 'react';
// import { FormControl, TextField, Button } from '@material-ui/core';
// import ValidatorForm from 'react-material-ui-form-validator';

// function FormLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
  //   // Aquí deberías enviar la información del formulario al servidor o manejar la lógica de inicio de sesión en el lado del cliente
  //   console.log(email, password);
  // }

//   return (
//     <ValidatorForm onSubmit={handleSubmit}>
//       <FormControl>
//         <TextField
//           label="Correo electrónico"
//           type="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           validators={['required', 'isEmail']}
//           errorMessages={['Este campo es requerido', 'Ingresa un correo válido']}
//         />
//         <TextField
//           label="Contraseña"
//           type="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           validators={['required']}
//           errorMessages={['Este campo es requerido']}
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Iniciar sesión
//         </Button>
//       </FormControl>
//     </ValidatorForm>
//   );
// }

// export default FormLogin;
