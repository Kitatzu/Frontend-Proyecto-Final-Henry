import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import EmailAddress from "./Inputs/EmailAddress";
import NameInput from "./Inputs/NameInput";
import CityUser from "./Inputs/CityUser";
import CountryUser from "./Inputs/CountryUser";
import PhoneUser from "./Inputs/PhoneUser";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userUpdate } from "../../../../Redux/Thunks/getUser";

const ProfileSettings = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  const { avatar, firstName, lastName, email, city, country, phone } =
    useSelector((store) => store.users);
  const [image, setImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [updateUser, setUpdateUser] = useState({
    city: city,
    country: country,
    phone: phone,
  });
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("token")).userId;

  const handleImage = (el) => {
    setImage(el.target.files["0"]);
    setPreviewUrl(URL.createObjectURL(el.target.files[0]));
    console.log(el.target.files["0"]);
  };

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (name, value) => {
    const errors = {};
    let regexNum = /^[0-9]*$/;
    let regexEsp = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (name === "phone" && value && !regexNum.test(value.trim())) {
      errors.phone = "Solo se permiten números";
    } else if (name === "phone" && value) errors.phone = undefined;

    if (name === "city" && value && !regexEsp.test(value.trim())) {
      errors.city = "No se permiten caracteres especiales ni números";
    } else if (name === "city" && value) errors.city = undefined;

    if (name === "country" && value && !regexEsp.test(value.trim())) {
      errors.country = "No se permiten caractere especiales ni números";
    } else if (name === "country" && value) errors.country = undefined;

    return errors;
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors({
      ...errors,
      ...validate(e.target.name, updateUser[e.target.name]),
    });
  };

  const handleSave = (e) => {
    if (
      errors.phone === undefined &&
      errors.country === undefined &&
      errors.city === undefined &&
      updateUser.phone !== undefined &&
      updateUser.country !== undefined &&
      updateUser.city !== undefined &&
      updateUser.phone !== "" &&
      updateUser.country !== "" &&
      updateUser.city !== ""
    ) {
      const formData = new FormData();

      formData.append("country", updateUser.country);
      formData.append("city", updateUser.city);
      formData.append("phone", updateUser.phone);
      if (image) {
        console.log(image);
        formData.append("avatar", image);
      }
      (async () => {
        console.log(updateUser);
        dispatch(userUpdate(userId, formData));
      })();
    }
  };

  return (
    <Card
      variant="elevation"
      sx={{ width: "100%", background: Theme[mode].cardSecondary }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, color: Theme[mode].textPrimary }}
          color="text.secondary"
          gutterBottom
        >
          Perfil
        </Typography>
        <Box sx={{ padding: "20px" }} display="flex">
          <Avatar
            alt={firstName}
            src={previewUrl ? previewUrl : avatar}
            sx={{ width: "60px !important", height: "60px !important" }}
          />
          <Button>
            <input type="file" onChange={handleImage} />
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <NameInput name="name" label="Nombre" value={firstName} />

          <NameInput name="lastName" label="Apellido" value={lastName} />
        </Box>
        <Box sx={{ padding: "8px" }}>
          <EmailAddress email={email} />
        </Box>
        <Box>
          <CountryUser country={updateUser.country ? updateUser.country : country}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.country !== undefined}
          />
          {errors.country !== undefined ? (
            <Alert severity="error" sx={{ margin: "15px 0" }}>
              {errors.country}
            </Alert>
          ) : null}
        </Box>
        <Box>
          <CityUser city={updateUser.city ? updateUser.city : city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.city !== undefined}
          />
          {errors.city !== undefined ? (
            <Alert severity="error" sx={{ margin: "15px 0" }}>
              {errors.city}
            </Alert>
          ) : null}
        </Box>
        <Box>
          <PhoneUser phone={updateUser.phone ? updateUser.phone : phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.phone !== undefined}
          />
          {errors.phone !== undefined ? (
            <Alert severity="error" sx={{ margin: "15px 0" }}>
              {errors.phone}
            </Alert>
          ) : null}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ background: Theme[mode].buttonPrimary }}
          onClick={handleSave}
        >
          Guardar
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProfileSettings;
