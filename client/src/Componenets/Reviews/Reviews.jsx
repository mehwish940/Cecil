import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ReactComponent as Qoutes } from '../../images/ammenitites/quotes.svg';

function Reviews({ Review, testimonials }) {

  const options = {
    responsiveClass: true,
    dots: true,
    autoplay: true,
    loop:true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      900: {
        items: 2,
      },
      1000: {
        items: 2,

      },
      1100: {
        items: 3,

      }
    },
  };


  return (
    <div className="main-container Reviews mt-lg-5 mt-md-3 mt-3" style={{backgroundImage: `url(${testimonials.background})`}}>
      <div className="inner-container">
        <div className="reviews-head">
          {/* <span className="font-20">{testimonials.sunTitle}</span> */}
          <h2>{testimonials.title}</h2>
        </div>
        <OwlCarousel className='owl-theme' {...options}>
          {Review.map((review, i) => {
            return (
              <div className='item' key={i}>
                <Qoutes />
                <h5 className="f-20">{review.message}</h5>
                <h4 className="text-secondary-default font-23  mt-5">{review.name}</h4>
                <h5 className="text-secondary-default f-20">{review.title}</h5>
              </div>
            )
          })
          
          }
        </OwlCarousel>
      </div >
    </div >
  );
}

export default Reviews;
