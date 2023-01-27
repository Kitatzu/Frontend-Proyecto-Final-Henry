// import { Box } from "@mui/system";
import AgeInput from "../Login/FormRegister/Inputs/AgeInput";
import LastNameInput from "../Login/FormRegister/Inputs/LastNameInput";
import NameInput from "../Login/FormRegister/Inputs/NameInput";
import CountrySelect from "../Login/FormRegister/Inputs/CountriesInput";
import PasswordRegisterInput from "../Login/FormRegister/Inputs/PasswordRegisterInput";
import PasswordVerifyInput from "../Login/FormRegister/Inputs/PasswordVerify";
// import { Button } from "@mui/material";
// const Register = () => {
//   return (
//     <Box className="Login-form-control"
//     display="flex"
//     flexDirection="column"
//     justifyContent="center">
//      <NameInput/>
//      <LastNameInput/>
//       <AgeInput />
//       <CountrySelect />
//       <PasswordRegisterInput/>
//       <PasswordVerifyInput/>
//       <Button
//           variant="contained"
//           color="secondary"
//           // startIcon={<Icon className="IconL" icon="ph:sign-in-light" />}
//           className="Form-button register-button"
//           // onClick={handleSubmit}
//         >
//           Register
//         </Button>
//     </Box>
//   );
// };
// export default Register;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from "@mui/material/TextField";
import {  RegisterUser } from '../../Redux/Thunks/register';
import {Button} from "@mui/material"
import {useFormik} from "formik"
import * as yup from 'yup';


function Register() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthday: '',
      userName: '',
      email: '',
      password: '',
      
    },
    validationSchema: yup.object({
      firstName: yup.string()
        .required('El nombre es requerido'),
      lastName: yup.string()
        .required('El apellido es requerido'),
      birthday: yup.string()
        .required('La fecha de nacimiento es requerida'),
      userName: yup.string()
        .required('El nombre de usuario es requerido'),
      email: yup.string()
        .email('Ingresa un correo electronico valido')
        .required('El correo electronico es requerido'),
      password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),
     
    }),
    onSubmit:  (values) => {
      try {
        setIsLoading(true);
         dispatch(RegisterUser(values));
        setIsLoading(false);
        setIsSuccess(true);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    },
  });

  if (isSuccess) {
    return <div>Usuario registrado con exito!</div>;
  }

  return (
    <form  onSubmit={formik.handleSubmit}>
     <NameInput
    id="first-name"
    label="Nombre"
    name= "firstName"
    value={formik.values.firstName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.firstName && formik.errors.firstName}
    helperText={formik.touched.firstName && formik.errors.firstName}
/>
<LastNameInput
    id="last-name"
    label="Apellido"
    name= "lastName"
    value={formik.values.lastName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.lastName && formik.errors.lastName}
    helperText={formik.touched.lastName && formik.errors.lastName}
/>
<AgeInput
    id="fecha-nacimiento"
    // label="Fecha de Nacimiento"
    type="date"
    name="birthday"
    value={formik.values.birthday}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.birthday && formik.errors.birthday}
    helperText={formik.touched.birthday && formik.errors.birthday}
    />
    <TextField
    id="user-name"
    label="Nombre de Usuario"
    name= "userName"
    value={formik.values.userName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.userName && formik.errors.userName}
    helperText={formik.touched.userName && formik.errors.userName}
/>
<TextField
    id="email"
    label="Correo Electrónico"
    type="email"
    name= "email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.email && formik.errors.email}
    helperText={formik.touched.email && formik.errors.email}
/>
<TextField
    id="password"
    label="Contraseña"
    type="password"
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.password && formik.errors.password}
    helperText={formik.touched.password && formik.errors.password}
/>


<Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={formik.isSubmitting || !formik.isValid}
>
    {isLoading ? 'Cargando...' : 'Registrarse'}
</Button>
{error && <div>{error}</div>}
</form>
  )}
  export default Register;