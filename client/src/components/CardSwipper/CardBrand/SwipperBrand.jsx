import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import amdImage from "../../assets/amd-default-social-image-1200x628.webp";
import intelImage from "../../assets/Intel-nuevo-logo-2-1200x900.png";
import nvidiaImage from "../../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png";
import { Box } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./brandSwiper.css"

function SwipperBrand() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={1000}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Box
          sx={{
            
            width: { xs: "200px", sm: "200" },
            height: { xs: "150px", sm: "150px" },
            minWidth: { xs: "150px", sm: "240px" },
            borderRadius: "20px",
            background: `url(${intelImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginLeft: "20px"
            
          }}
        ></Box>
        <Box
          sx={{
            
            width: { xs: "200px", sm: "200" },
            height: { xs: "150px", sm: "150px" },
            minWidth: { xs: "150px", sm: "240px" },
            borderRadius: "20px",
            background: `url(${amdImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginLeft: "20px"
            
          }}
        ></Box>

        <Box
          sx={{
            
            width: { xs: "200px", sm: "200" },
            height: { xs: "150px", sm: "150px" },
            minWidth: { xs: "150px", sm: "240px" },
            borderRadius: "20px",
            background: `url(${nvidiaImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginLeft: "20px"
            
          }}
        ></Box>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwipperBrand;
