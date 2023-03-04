import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Grid, Autoplay, Pagination } from "swiper";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
export const breakPoints = {
  0: {
    slidesPerView: 2,
  },
  400: {
    slidesPerView: 2,
  },
  600: {
    slidesPerView: 3,
  },
  700: {
    slidesPerView: 4,
  },
  1000: {
    slidesPerView: 4,
  },
  1200: {
    slidesPerView: 4,
  },
};
function Attractions({ nearBy , title}) {
  return (
      <div className="Accomodation-head">
        <div className="text-center mb-5">
          <h2>{title}</h2>
        </div>
        <LightgalleryProvider>
        <Swiper
          pagination={{ clickable: true }}
          breakpoints={breakPoints}
          spaceBetween={10}
          centeredSlides={false}
          centerInsufficientSlides={true}
          edgeSwipeThreshold={50}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          slidesPerGroup={4}
          className="mySwiper-attraction position-relative"
          modules={[Autoplay, Pagination]}
        >
          {nearBy.map((n, i) => {
            return (
              <SwiperSlide className="effect-lily" key={i}>
                <LightgalleryItem group="group1" src={n}>
                  <img src={n} alt="Gibbons Park" />
                </LightgalleryItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LightgalleryProvider>
      </div>
  );
}

export default Attractions;
