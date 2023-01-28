import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductByID } from "../../Redux/Thunks/Products";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { Box, Typography, Stack, Rating } from "@mui/material";

const CardsDetails = () => {
    const mode = useSelector((store) => store.theme.mode);
    const theme = useSelector((store) => store.theme);
    const { products } = useSelector(store => store.products);
    const dispatch = useDispatch()
    const { id } = useParams();
    console.log(products)

    useEffect(() => {
        dispatch(getProductByID(id))
    },[dispatch, id])

    return( 
        <Box
            sx={{
                background: theme[mode].primary,
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <NavBar />
            <Box display={"flex"}>
                <SideBar />
                <Box
                    display={'flex'}
                    alignItems='center'
                    justifyContent={'center'} 
                    marginLeft = {"100px"}  
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
            </Box>
        </Box>
    )
}

export default CardsDetails;