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
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("token")).userId;

  const handleImage = (el) => {
    setImage(el.target.files["0"]);
    setPreviewUrl(URL.createObjectURL(el.target.files[0]));
    console.log(el.target.files["0"]);
  };

  const handleSave = (e) => {
    const formData = new FormData();

    // formData.append("country", setUser.country);
    // formData.append("city", setUser.city);
    // formData.append("phone", setUser.phone);
    if (image) {
      console.log(image);
      formData.append("avatar", image);
    }
    (async () => {
      dispatch(userUpdate(userId, formData));
    })();
    console.log(formData);
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", background: Theme[mode].primary }}
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
          <NameInput name="name" label="Name" value={firstName} />

          <NameInput name="lastName" label="Last Name" value={lastName} />
        </Box>
        <Box sx={{ padding: "8px" }}>
          <EmailAddress email={email} />
        </Box>
        <Box>
          <CountryUser country={country} />
        </Box>
        <Box>
          <CityUser city={city} />
        </Box>
        <Box>
          <PhoneUser phone={phone} />
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
