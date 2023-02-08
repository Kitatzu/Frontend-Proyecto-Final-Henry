import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPrice, filterProduct } from "../../Redux/Slices";


function FilterPrice() {
    const dispatch = useDispatch();
    const { mode } = useSelector((store) => store.theme);
    const theme = useSelector((store) => store.theme);
    function handlePrice(e) {
        dispatch(filterPrice({ name: e.target.name, value: e.target.value }));
        dispatch(filterProduct());
    }
    return (
        <Box display={"flex"} gap="20px" flexWrap={"wrap"} >
            <Box>
                <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary }}
                >
                    Precio minimo:
                </Typography>
                <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="min"
                    onChange={e => handlePrice(e)}
                    style={{
                        padding: "10px",
                        border: "none",
                        background: "#ececec",
                        borderRadius: "10px",
                    }}
                />
            </Box>
            <Box>
                <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary }}
                >
                    Precio maximo:
                </Typography>
                <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="max"
                    onChange={e => handlePrice(e)}
                    style={{
                        padding: "10px",
                        border: "none",
                        background: "#ececec",
                        borderRadius: "10px",
                    }}
                />
            </Box>
        </Box>

    );
}

export default FilterPrice;
