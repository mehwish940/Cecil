import "./App.css";
import Header from "./Componenets/HeaderSection/Header";
import Accomodation from "./Componenets/Accomodation/Accomodation";
import RoyalFacilities, { Events } from "./Componenets/RoyalFacilities/RoyalFacilities";
import About from "./Componenets/Aboutus/About";
import Footer from "./Footer";
import Attractions from "./Componenets/Attractions/Attractions";
import Reviews from "./Componenets/Reviews/Reviews";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AnchorUp from "./Componenets/BasicUtillities/AnchorUp";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Loading } from 'react-loading-dot'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addDays } from 'date-fns';
import moment from 'moment';
import PropertyListing from "./Componenets/Accomodation/PropertyListing";

function App() {
  const [query, setquery] = useState({
    adults: '',
    check_in: moment().format("YYYY-MM-DD"),
    check_out: moment().add('2', 'days').format("YYYY-MM-DD"),
    rooms: '',
    child: '',
    hotelDetails: '',
    loading: false,
    AccomodationLoading: false,
  });


  useEffect(() => {
    console.clear();
    fetch('/hotel').then(response => {
      if (!response.ok) {
        throw Error('could not fetch the data for that resorce')
      }
      return response.json();

    }).then((data) => {
      // console.log(data);
      setquery({ ...query, hotelDetails: data, loading: true });
      document.documentElement.style.setProperty('--CustomBlue', data.weblist[0].primaryColor)
      document.documentElement.style.setProperty('--textDark', data.weblist[0].textDark)
      document.documentElement.style.setProperty('--CustomYellow', data.weblist[0].secondaryColor)
      document.documentElement.style.setProperty('--textLight', data.weblist[0].textLight)
      let link = document.querySelector("link[rel~='icon']");
      link.href = data.weblist[0].favIcon;
      document.title = data.weblist[0].navbar.title;

    }).catch(error => {
      console.log(error)
    })

  }, []);


  return (
    <SkeletonTheme baseColor="#CCCCCC" highlightColor="rgba(0, 0, 0, 0.1)">      
    {query.loading ?
      <>
        <Header setquery={setquery} query={query} />
        <PropertyListing query={query} setquery={setquery}/>
        <RoyalFacilities amen={query.hotelDetails.weblist[0]?query.hotelDetails.weblist[0].amenities:''}/>
        <Events />
        <About aboutUS={query.hotelDetails.weblist[0]?query.hotelDetails.weblist[0].about:''} />
        <Attractions nearBy={query.hotelDetails.weblist[0]?query.hotelDetails.weblist[0].nearby:''}/>
        <Reviews Review={query.hotelDetails.weblist[0]?query.hotelDetails.weblist[0].reviews:''} testimonials={query.hotelDetails.weblist[0]?query.hotelDetails.weblist[0].testimonials:''}/>
        <Footer setquery={setquery} query={query} />
        <AnchorUp />
      </> : <Loading dots={4} background="#333333" />}

    </SkeletonTheme>
  );
}

export default App;