import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import "./swiper.css";
import CradProduct from "./CardProduct/CardProduct";
import Loading from "../Loading/Loading";
import SwiperCore, { Autoplay } from "swiper";
import { useEffect, useState } from "react";
import { getPopularProducts } from "../../Redux/Thunks/Products";
SwiperCore.use([Autoplay]);

const CardSwipper = ({ origin }) => {
  const dispatch = useDispatch();

  const [widScreen, setWidScreen] = useState(878);
  const [numberCard, setNumberCard] = useState(3);
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

    dispatch(getPopularProducts());
  }, [dispatch, widScreen, numberCard]);

  const { popularProducts, isLoading } = useSelector((state) => state.products);

  return (
    <>
      <Swiper
        slidesPerView={numberCard}
        spaceBetween={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        autoplay={{ delay: 1000 }}
        style={{ height: "max-content", padding: "20px" }}
        className="mySwiper"
      >
        {isLoading && <Loading />}
        {popularProducts
          ? popularProducts.map((el, key) => {
              return (
                <SwiperSlide>
                  <CradProduct
                    origin={origin}
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
