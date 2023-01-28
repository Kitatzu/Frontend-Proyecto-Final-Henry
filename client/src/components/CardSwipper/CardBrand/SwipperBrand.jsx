import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import amdImage from "../../assets/amd-default-social-image-1200x628.webp";
import intelImage from "../../assets/Intel-nuevo-logo-2-1200x900.png";
import nvidiaImage from "../../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png";

import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function SwipperBrand() {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      spaceBetween={10}
      slidesPerView={3}
      //   scrollbar={{ draggable: true }}
      //   navigation
      modules={[Pagination, A11y]}
      className="mySwiper"
      loop="true"
      style={{ width: "100%", padding: "20px" }}
      onSlideChange={(s) => console.log("slide change", s)}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <Box
          sx={{
            filter:
              "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
            width: "240px",
            height: "150px",
            minWidth: "240px",
            borderRadius: "20px",
            background: `url(${intelImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "inline-block",
          }}
        ></Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box
          sx={{
            filter:
              "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
            width: "240px",
            height: "150px",
            minWidth: "240px",
            borderRadius: "20px",
            background: `url(${amdImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "inline-block",
          }}
        ></Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box
          sx={{
            filter:
              "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
            width: "240px",
            height: "150px",
            minWidth: "240px",
            borderRadius: "20px",
            background: `url(${nvidiaImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "inline-block",
          }}
        ></Box>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwipperBrand;
