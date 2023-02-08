import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useState } from "react";
import Global from "../../../../Global";
import axios from "axios";
import Swal from "sweetalert2";

const Seguridad = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  const email = useSelector((store) => store.users.email);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let infoPass = {
    email: email,
    password: input.currentPassword,
    newPassword: input.newPassword,
    confirmPassword: input.confirmPassword,
  };

  // Validador de contraseña nueva
  const submitNewPassword = async () => {
    let isValid = true;
    if (infoPass.newPassword !== infoPass.confirmPassword) {
      isValid = false;
      Swal.fire({
        icon: "error",
        title: "No coinciden",
        text: "Las contraseñas no coinciden",
      });
    } else {
      let regexPass = /(?=.*[0-9])/;
      let regexPass1 = /(?=.*[!@#$%^&*])/;
      let regexPass2 = /(?=.{8,})/;
      let regexPass3 = /(?=.*[A-Z])/;

      if (!regexPass.test(infoPass.newPassword.trim())) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Clave inválida",
          text: "Este campo requiere al menos 1 caracter numérico",
        });
      }

      if (!regexPass1.test(infoPass.newPassword.trim())) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Clave inválida",
          text: "Debe contener un caracter especial",
        });
      }

      if (!regexPass2.test(infoPass.newPassword.trim())) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Clave inválida",
          text: "Debe contener al menos 8 caracteres",
        });
      }

      if (!regexPass3.test(infoPass.newPassword.trim())) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Clave inválida",
          text: "Debe tener al menos 1 mayúscula",
        });
      }
    }

    if (isValid) {
      await axios
        .post(Global.URL + "/users/password", infoPass)
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Contraseña Cambiada!",
            text: "La contraseña ha sido cambiada exitosamente!",
            confirmButtonText: "Continuar!",
          });
        })
        .catch((response) => {
          console.log(response);
          Swal.fire({
            icon: "error",
            title: "Error de Contraseña",
            text: "Algo falló con el cambio de contraseña",
          });
        });
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        background: Theme[mode].cardSecondary,
        padding: "20px",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={Theme[mode].textPrimary}
          gutterBottom
        >
          Notificaciones
        </Typography>
        <Box component={"form"} display="flex" flexDirection={"column"}>
          <FormControl
            sx={{ m: 1, width: "100%", margin: "10px 0" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: Theme[mode].textPrimary }}
            >
              Current Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              sx={{ color: Theme[mode].textPrimary }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? (
                      <Icon
                        icon="material-symbols:visibility-off"
                        color={Theme[mode].textPrimary}
                      />
                    ) : (
                      <Icon
                        icon="material-symbols:visibility"
                        color={Theme[mode].textPrimary}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Current Password"
              onChange={handleInputChange}
              value={input.name}
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "100%", margin: "10px 0" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: Theme[mode].textPrimary }}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              sx={{ color: Theme[mode].textPrimary }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? (
                      <Icon
                        icon="material-symbols:visibility-off"
                        color={Theme[mode].textPrimary}
                      />
                    ) : (
                      <Icon
                        icon="material-symbols:visibility"
                        color={Theme[mode].textPrimary}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
              onChange={handleInputChange}
              value={input.name}
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "100%", margin: "10px 0" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: Theme[mode].textPrimary }}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              sx={{ color: Theme[mode].textPrimary }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <Icon
                        icon="material-symbols:visibility-off"
                        color={Theme[mode].textPrimary}
                      />
                    ) : (
                      <Icon
                        icon="material-symbols:visibility"
                        color={Theme[mode].textPrimary}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              onChange={handleInputChange}
              value={input.name}
            />
          </FormControl>

          {/* <Password name={"currentPassword"} label="Current Password" inputRef={currentPasswordRef}/>
            <Password name={"newPassword"} label="New Password" inputRef={newPasswordRef}/>
            <Password name={"confirmPassword"} label="Confirm Password" inputRef={confirmPasswordRef}/> */}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ background: Theme[mode].buttonPrimary }}
          onClick={submitNewPassword}
        >
          Guardar
        </Button>
      </CardActions>
    </Card>
  );
};
export default Seguridad;
