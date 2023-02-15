import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Grid, Autoplay, Pagination, Navigation } from "swiper";
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery,
} from "react-lightgallery";
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
function Attractions({ nearBy }) {
  return (
    <div className="main-container attractions" id="gallery">
      <div className="inner-container">
        <div className="text-center mb-5">
          <h2>Photo Album</h2>
        </div>
      </div>
      {/* <div className="grid"> */}
      <LightgalleryProvider>
        <Swiper
          pagination={{ clickable: true }}
          breakpoints={breakPoints}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper-attraction position-relative"
          modules={[Grid, Autoplay, Navigation, Pagination]}
          navigation={true}
        >
          {nearBy.map((n, i) => {
            return (
              <SwiperSlide className="effect-lily" key={i}>
                <LightgalleryItem group="group1" src={n.img}>
                  <img src={n.img} alt="Gibbons Park" />
                </LightgalleryItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LightgalleryProvider>

      {/* </div> */}
    </div>
  );
}

export default Attractions;
