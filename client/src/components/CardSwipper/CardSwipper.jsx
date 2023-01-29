import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import "./swiper.css"

const CardSwipper = () => {
    const { tempProducts, isLoading } = useSelector((state) => state.products);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
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
                            <Cards
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
    )
}

export default CardSwipper