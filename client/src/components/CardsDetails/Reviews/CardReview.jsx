import { useSelector } from "react-redux";
import {
  Box,
  Rating,
  Typography,
  Avatar,
} from "@mui/material";

const CardReview = ({ rating, review, user, avatar }) => {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      sx={{
        background: theme[mode].card,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "20px",
        width: { xs: "100%", md: "max-content" },
        borderRadius: "20px",
        margin: "20px 0px",
      }}
    >
      <Box width="100%" display={"flex"} gap="20px" alignItems={"center"}>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          gap="5px"
        >
          <Avatar src={avatar} alt={user} />
          <Typography>{user}</Typography>
        </Box>
        <Rating
          name="simple-controlled"
          size="medium"
          precision={0.5}
          value={parseFloat(rating)}
          readOnly
        />
      </Box>
      <Box width={"100%"} padding="20px 0px">
        <Typography sx={{ width: "100%", textAlign: "left" }}>
          {review}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardReview;
