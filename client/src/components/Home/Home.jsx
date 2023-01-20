import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Thunks/Producst";

import GPUimage from "../assets/rtx3090_1.png";
import amdImage from "../assets/amd-default-social-image-1200x628.webp"
import intelImage from "../assets/Intel-nuevo-logo-2-1200x900.png"
import nvidiaImage from "../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png"

export default function Home() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { products, isLoading} = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
}, [dispatch])  

  return (
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
        <Box sx={{ height:"calc(100vh - 64px)", width: "calc(100% - 80px)", display: "flex", flexDirection:"column" ,gap:"30px", padding: "40px", overflow: "scroll"}}>
        <Box sx={{ display: "flex", marginLeft:"auto", marginRight:"auto", position:"relative"}}>
              <img style={{ width: "1335px", height: "514px"}} src={GPUimage} alt="gpu"/>
              <Box sx={{ position:"absolute", bottom:" -109px"}}>
                <img style={{width: "276.61px", height:"218px", borderRadius:"1rem", marginLeft:"200px", filter: "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))"}} src={nvidiaImage} alt="Nvidia"/>
                <img style={{width: "276.61px", height:"218px", marginLeft:"60px", borderRadius:"1rem", filter: "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))"}} src={intelImage} alt="Intel"/>
                <img style={{width: "276.61px", height:"218px", marginLeft:"60px", borderRadius:"1rem", filter: "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))"}} src={amdImage} alt="Amd"/>
              </Box>
        </Box>
        <Box sx={{display:"flex", gap: "30px", padding:"20px", marginTop: "150px"}}>
          { isLoading ? (<div></div>)
            :
            products?.[0].map((el, id) => {
            return(
                <Cards 
                  id = {id}
                  img = {el.img}
                  name = {el.name}
                  description = {el.description}
                  rating = {el.rating}
                  price = {el.price}
                />
              )
            })      
          }
        </Box>
        </Box>  
      </Box>
    </Box>
  );
}
