import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";
import amdImage from "../../assets/amd-default-social-image-1200x628.webp";
import intelImage from "../../assets/Intel-nuevo-logo-2-1200x900.png";
import nvidiaImage from "../../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png";

import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import CardBrand from "./CardBrand";
function SwipperBrand() {
  const { brands } = useSelector((store) => store.brands);
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      spaceBetween={10}
      slidesPerView={3}
      scrollbar={{ draggable: true }}
      navigation
      modules={[Navigation, Pagination, A11y]}
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
      {brands
        ? brands.map((b) => (
            <SwiperSlide>
              <CardBrand img={b.img} />
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
}

export default SwipperBrand;
