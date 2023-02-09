import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, TextField, Stack, Rating, Typography } from "@mui/material";
import { saveReview } from "../../../Redux/Thunks/reviews";
import { Icon } from "@iconify/react";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Toast from "../../Toast/Toast";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const { id } = useParams(); //Product Id
  const userId = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token")).userId
    : null;
  const { isLog = false } = useSelector((store) => store.users);
  const { isLoading } = useSelector((store) => store.reviews);
  const { yourReview } = useSelector((store) => store.reviews);
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleReviews = (e) => {
    setReview(e.target.value);
  };

  const handleForm = () => {
    dispatch(saveReview(userId, id, parseFloat(rating), review));
    //console.log(rating, typeof(rating))
  };

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
      }}
      noValidate
      autoComplete="off"
      marginTop={"5rem"}
    >
      <Box>
        <Typography fontSize={"18px"} sx={{ color: theme[mode].textPrimary }}>
          Agregar Reseña
        </Typography>
      </Box>
      <Stack spacing={1} marginLeft="3px">
        <Rating
          name="simple-controlled"
          size="large"
          precision={0.5}
          value={
            yourReview ? parseFloat(yourReview.rating) : parseFloat(rating)
          }
          readOnly={yourReview !== null}
          onChange={(event) => handleRating(event)}
        />
      </Stack>
      <Box display={"flex"} alignItems="center" gap={"20px"} padding="20px">
        <TextField
          id="filled-basic"
          multiline
          label="Deja tu resena"
          variant="outlined"
          defaultValue={yourReview?.review}
          value={yourReview ? yourReview.review : review}
          readOnly={yourReview !== null}
          onChange={(event) => handleReviews(event)}
          sx={{ color: theme[mode].textPrimary }}
        ></TextField>
        <Box>
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={<Icon icon="material-symbols:send-rounded" />}
            variant="contained"
            color="secondary"
            disabled={yourReview !== null}
            onClick={() => {
              if (isLog) {
                handleForm();
              } else {
                Toast.fire({ icon: "warning", title: "No estas registrado!" });
              }
            }}
          >
            Postear
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewForm;
