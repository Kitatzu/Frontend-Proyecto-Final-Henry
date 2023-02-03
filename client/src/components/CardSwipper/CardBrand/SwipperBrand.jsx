import React, { useEffect, useState } from "react";
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
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);

function SwipperBrand() {
  const scale = window.screen.width;
  const [widScreen, setWidScreen] = useState(false);
  const [numberCard, setNumberCard] = useState(3);
  useEffect(() => {
    setWidScreen(scale);
    if (widScreen <= 877) {
      setNumberCard(2);
    }
    if (widScreen <= 551) {
      setNumberCard(1);
    }
    if (widScreen > 877) {
      setNumberCard(3);
    }
  }, [scale]);

  console.log(widScreen);
  // let numberCard = 3;
  // if (widScreen <= 877) {
  //   numberCard = 2;
  // } else if (widScreen <= 551) {
  //   numberCard = 1;
  // } else {
  //   numberCard = 3;
  // }
  const { brands } = useSelector((store) => store.brands);
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      slidesPerView={numberCard}
      spaceBetween={30}
      loop={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      autoplay={{ delay: 1000 }}
      className="mySwiper"
      style={{ width: "100%", padding: "20px" }}
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
