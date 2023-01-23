import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductByID } from "../../Redux/Thunks/Products";

import { Box, Typography, Paper, Stack, Rating } from "@mui/material";

const CardsDetails = () => {
    const { products } = useSelector(store => store.products);
    const dispatch = useDispatch()
    const { id } = useParams();
    console.log(products)

    useEffect(() => {
        dispatch(getProductByID(id))
    },[dispatch, id])

    return(
        <Paper>
            <Box
                display={'flex'}
                alignItems='center'
                justifyContent={'center'}   
            >
                <img src={products?.img} alt="Product"/>
                <Box>
                    <Typography variant="h3" gutterBottom>
                        {products?.name}
                    </Typography>
                    <Stack spacing={1}>
                        <Rating
                        name="half-rating-read"
                        defaultValue={products?.rating}
                        precision={0.5}
                        readOnly
                        />
                    </Stack>
                    <Typography>{products?.description}</Typography>
                    <Typography> ${products?.price}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default CardsDetails;