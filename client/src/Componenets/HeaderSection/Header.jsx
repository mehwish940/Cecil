import React from 'react'
import Navbar from "./Navbar";
import HeaderBook from "./HeaderBook";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Pagination } from "swiper";

function Header({ setquery, query }) {
  return (
    <div>

      <header id="headerBook">
        <div className='position-relative'>
          <Swiper
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            speed={500}
            modules={[Pagination]}
            className="heroSwiper"
          >
            <SwiperSlide style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${query.hotelDetails.weblist[0].header.image})`}} ></SwiperSlide>
            <SwiperSlide style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${query.hotelDetails.weblist[0].header.image})`}} ></SwiperSlide>
            <SwiperSlide style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${query.hotelDetails.weblist[0].header.image})`}} ></SwiperSlide>


          </Swiper>
        </div>
        <Navbar setquery={setquery} query={query} />
        <div className="mainContent-text">
          <span className='font-20 text-uppercase'>{query.hotelDetails.weblist[0].header.top}</span>
          <div className='mian-header-text mb-2'> {query.hotelDetails.weblist[0].header.title}</div>
          <div className="price-desc font-18">
            {Parser(query.hotelDetails.weblist[0].header.bottom)}
          </div>

          {/* <Link to="/" className='mt-lg-5'>
            <Button buttonStyle="btn--primary" buttonSize="btn--large">
              GET STARTED
            </Button>
          </Link> */}
        </div>
        <HeaderBook setquery={setquery} query={query} />

      </header >
    </div >
  );
}

export default Header
