import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import EmailAddress from "./Inputs/EmailAddress";
import NameInput from "./Inputs/NameInput";
import UserName from "./Inputs/UserName";
import { useSelector } from "react-redux";
const ProfileSettings = () => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  let avatar = null;
  if (JSON.parse(localStorage.getItem("token")) !== null) {
    avatar = JSON.parse(localStorage.getItem("token")).avatar;
  }
  console.log(avatar);
  const { firstName, lastName, email, linkName } = useSelector(
    (store) => store.users
  );
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
            src={avatar}
            sx={{ width: "60px !important", height: "60px !important" }}
          />
          <Button>Change</Button>
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
          <UserName userName={linkName} />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ background: Theme[mode].buttonPrimary }}
        >
          Guardar
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProfileSettings;
