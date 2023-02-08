import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import phone from "../../images/phone-call.svg";
import { HashLink as Link } from 'react-router-hash-link';

// import { IconContext } from "react-icons/lib";

function Navbar({ setquery, query }) {
  const [toggleNav, settoggle] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 20) {
      settoggle(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])

  return (
    <>
      {/* <IconContext.Provider value={{ color: "#fff" }}> */}
      <nav className="navbar">
        <div className="container px-3 position-relative navbar-inner">
          <ul className="nav-links-left">
            <li><Link to="#accomodation">Stay</Link></li>
            <li><Link to="#dining">dining</Link></li>
          </ul>
        <div className="logo-container" style={{backgroundImage: `url(${query.hotelDetails.weblist[0].navbar.logo})`}}>
            {/* <img src={query.hotelDetails.weblist[0].navbar.logo} className="navbar-log" alt="Brand logo" /> */}
        </div>
        <ul className="nav-links-right">
            <li><Link to="#events">events</Link></li>
            <li><Link to="#gallery">gallery</Link></li>
          </ul>
        </div>
      
        {/* <div className="navbar-container container-div">
          <Link to="/" className="logo-container">
            <img src={query.hotelDetails.weblist[0].navbar.logo} className="navbar-log" alt="Brand logo" />
            <span class="navbar-title">{query.hotelDetails.weblist[0].navbar.title}</span>
          </Link>

          <ul id="nav-links" className={toggleNav ? "#nav-links active" : '#nav-links'}>
            <li className="nav_item">
            <img src={phone} alt="Phone logo" className="phone_Contaerimg"/>
              <a
                href={`tel:${query.hotelDetails.weblist[0].navbar.phone}`}
                className="nav_inks"
              >
                CALL US {query.hotelDetails.weblist[0].navbar.phone}
              </a>
            </li>
            <li className="nav_item">
              <Link
                to="#about-us"
                className="nav_inks"
              >
                ABOUT US
              </Link>
            </li>

            <li className="nav_item">
              <Link
                to="#contact-us"
                className="nav_inks"
                smooth>
                CONTACT
              </Link>
            </li>
            <li className="nav-btn">
              <Link to="#accomodations" className="btn-link">
                <Button buttonStyle="btn--blue"> BOOK NOW</Button>
              </Link>

            </li>
          </ul>
          <div id="mobile">
            <i className={toggleNav ? "bi bi-x" : 'bi bi-list'} onClick={() => settoggle(!toggleNav)}></i>
          </div>
        </div> */}

      </nav>
      {/* </IconContext.Provider> */}
    </>
  );
}

export default Navbar;
