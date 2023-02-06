import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import uno from "../../assets/gamepad.png";
import dos from "../../assets/laptop.png";
import SwiperCore, { Autoplay } from "swiper";
import "./SwipeImage.css";
import { Box } from "@mui/system";
SwiperCore.use([Autoplay]);
function SwipeImage() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      autoplay={{ delay: 1000 }}
      className="mySwiper"
      style={{ height: "max-content" }}
    >
      <SwiperSlide>
        <Box width={{ xs: "150px", md: "250px", lg: "450px" }}>
          <img src={uno} alt="Gamepad" style={{ width: "100%" }} />
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box width={{ xs: "150px", md: "250px", lg: "450px" }}>
          <img src={dos} alt="Gamepad" style={{ width: "100%" }} />
        </Box>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwipeImage;
