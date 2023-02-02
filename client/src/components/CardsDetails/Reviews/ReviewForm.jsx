import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Stack, Rating } from '@mui/material';
import { saveReview } from '../../../Redux/Thunks/reviews';


const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams(); //Product Id
    const {userId} = JSON.parse(localStorage.getItem("token"));
    console.log(id, userId)
    const handleRating = e => {
        setRating(e.target.value);
    };

    const handleReviews = e => {
        setReview(e.target.value);
    };

    const handleForm = () => {
        dispatch(saveReview(userId, id, parseFloat(rating), review));
        //console.log(rating, typeof(rating))
    }

    return(
        <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            marginTop={"5rem"}
        >
             <Stack spacing={1} marginLeft="3px">
                <Rating 
                    name="simple-controlled"
                    size='large'
                    precision={0.5}
                    value={parseFloat(rating)}
                    onChange={event => handleRating(event)}
                />
             </Stack>
             <TextField
                id="filled-basic"
                multiline   
                rows={4}
                label="Deja tu resena" 
                variant="filled"
                value={review}
                onChange={event => handleReviews(event)}
             >
             </TextField>
             <Box>
                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleForm()}
                > Postear</Button>
             </Box>
        </Box>
    )
}

export default ReviewForm