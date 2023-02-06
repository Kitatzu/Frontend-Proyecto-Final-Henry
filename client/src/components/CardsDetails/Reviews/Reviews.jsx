import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardReview from "./CardReview";
import ReviewForm from "./ReviewForm";

const Reviews = () => {
  const { reviews } = useSelector((store) => store.reviews);
  return (
    <Box
      width={"100%"}
      display="flex"
      justifyContent={"center"}
      flexWrap="wrap"
    >
      <ReviewForm />
      <Box
        width={"100%"}
        padding="30px"
        display={"flex"}
        justifyContent="center"
      >
        <Typography fontSize={"28px"} fontWeight="bold">
          Comentarios...
        </Typography>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexWrap={"wrap"}
        justifyContent="center"
        gap={"20px"}
      >
        {reviews
          ? reviews.map((r) => (
              <CardReview
                rating={r.rating}
                review={r.review}
                user={r.user.firstName + r.user.lastName}
                avatar={r.user.avatar}
              />
            ))
          : null}
      </Box>
    </Box>
  );
};

export default Reviews;
