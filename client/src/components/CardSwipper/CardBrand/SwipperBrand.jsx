import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import CardBrand from "./CardBrand";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);

function SwipperBrand() {
  const [widScreen, setWidScreen] = useState(878);
  const [numberCard, setNumberCard] = useState(3);
  const { brands } = useSelector((store) => store.brands);
  useEffect(() => {
    (() => {
      const scale = window.screen.width;
      setWidScreen(scale);
      if (widScreen <= 551) {
        setNumberCard(1);
      }
      if (widScreen <= 877 && widScreen >= 551) {
        setNumberCard(2);
      }
    })();
  }, [widScreen, numberCard]);

  // let numberCard = 3;
  // if (widScreen <= 877) {
  //   numberCard = 2;
  // } else if (widScreen <= 551) {
  //   numberCard = 1;
  // } else {
  //   numberCard = 3;
  // }
  
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
              <CardBrand img={b.img} key={brands.id}/>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
}

export default SwipperBrand;
