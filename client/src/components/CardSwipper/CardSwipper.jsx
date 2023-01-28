import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiper.css";
import CradProduct from "./CardProduct/CardProduct";

const CardSwipper = () => {
  const { tempProducts, isLoading } = useSelector((state) => state.products);

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {isLoading && <div></div>}
        {tempProducts
          ? tempProducts?.map((el, key) => {
              return (
                <SwiperSlide>
                  <CradProduct
                    key={key}
                    id={el.id}
                    img={el.img}
                    name={el.name}
                    description={el.description}
                    rating={el.rating}
                    price={el.price}
                  />
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </>
  );
};

export default CardSwipper;
