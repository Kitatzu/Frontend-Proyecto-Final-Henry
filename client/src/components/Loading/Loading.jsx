import React from 'react'
import {Box} from "@mui/material"
import spin from "../assets/spin.png"
const Loading = () => {
  return (
    <Box
    display={ "flex" }
    justifyContent="center" 
    alignItems="center"
    position="absolute" 
    bottom={"0"}
    right="0"
    padding={"20px"}
    width="100%"  height="100vh"
    background="white"
  >
    <img className="spin" src={spin} alt="spin" />
  </Box>
  )
}

export default Loading