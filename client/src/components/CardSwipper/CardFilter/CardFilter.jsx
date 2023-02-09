import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CardCategories from "../../Home/CardCategories/CardCategories";
import Loading from "../../Loading/Loading"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../swiper.css";

const CardFilter = () => {
    
    const [widScreen, setWidScreen] = useState(878);
    const [numberCard, setNumberCard] = useState(3);
    const { isLoading } = useSelector(state => state.products)
    const categories = useSelector((store) => store.categories.categories);

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

    return(
        <Swiper
            pagination={{
                clickable: true,
            }}
            slidesPerView={numberCard}
            spaceBetween={10}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            // autoplay={{ delay: 1000 }}
            className="mySwiper"
            style={{ width: "100%", padding: "1px" }}
        >
            {isLoading && <Loading />}
            {categories && categories.map((el, key) => (
                <SwiperSlide>
                    <CardCategories 
                        value={el.name}
                        img={el.img}
                        id={el.id}
                        key={key}
                    />
                </SwiperSlide>
                
            ))}
        </Swiper>
    )
}

export default CardFilter;