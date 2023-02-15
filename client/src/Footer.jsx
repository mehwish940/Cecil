import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaTwitter, FaInstagram } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import Logo from './images/c_images/Logofooter.png';

function Footer({ query, setquery }) {
  const [useremail, setemail] = useState('');
  function subscribeFunction(e) {
    e.preventDefault();
    fetch('/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: useremail }),
    }).then((SigninResp) => {
      if (!SigninResp.ok) {
        throw Error('could not fetch the data for that resorce')
      }
      return SigninResp.json()
    }).then((JsonResp) => {
      setemail('')

    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <div className="main-container bg-black text-white" id="contact-us">
        <div className="contact-info-inner inner-container d-flex alignItem-center about-row">
          <div className="footer-left">
            <img src={Logo} alt="logo" className="footerLogo"></img>
            {/* <h4 className="mb-5 text-uppercase">{query.hotelDetails.weblist[0].navbar.title}</h4> */}
            <h5 className="font-20 mbb-4"><TfiLocationPin className="text-secondary-default f-20 verticale-align" />&nbsp;{query.hotelDetails.weblist[0].footer.address}</h5>
            <p className="font-14">
              IF YOU HAVE QUESTIONS OR NEED ADDITIONAL INFORMATION, <span>PLEASE CALL US:</span>
            </p>
            <div className="d-flex alignItem-center py-3">
              <div className="phone-call-icon">
              </div>
              <div className="phone-numbers">
                <h5 className="font-15 line-height-0">
                  <FiPhoneCall className="text-secondary-default f-20 verticale-align-middle" />&nbsp;&nbsp;
                  <a href={`tel:${query.hotelDetails.weblist[0].footer.phone}`}>{query.hotelDetails.weblist[0].footer.phone}</a></h5>
                <h5 className="font-15">
                  <FiMail className="text-secondary-default f-20 verticale-align-middle"/>&nbsp;&nbsp;
                  <a href={`mailto:${query.hotelDetails.weblist[0].footer.email}`}>{query.hotelDetails.weblist[0].footer.email}</a>
                </h5>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="social-icon d-flex">
              {query.hotelDetails.weblist[0].footer.twiter ?

                <a href={query.hotelDetails.weblist[0].footer.twiter} target="_blank" rel="noreferrer" className="s-icons">
                  <FaTwitter />
                </a> : null}
              {query.hotelDetails.weblist[0].footer.insta ?
                <a href={query.hotelDetails.weblist[0].footer.insta} target="_blank" rel="noreferrer" className="s-icons" >
                  <FaInstagram />
                </a> : null}
              {query.hotelDetails.weblist[0].footer.facebook ?
                <a target="_blank" href={query.hotelDetails.weblist[0].footer.facebook} rel="noreferrer" className="s-icons">
                  <FaFacebookF />
                </a> : null}
              {query.hotelDetails.weblist[0].footer.google ?
                <a href={query.hotelDetails.weblist[0].footer.google} target="_blank" rel="noreferrer" className="s-icons">
                  <FaGooglePlusG />
                </a> : null}

            </div>
            <h5 className="font-20 bold mb-5">STAY IN TOUCH</h5>
            <form onSubmit={subscribeFunction}>
              <div className="subscribe d-flex">
                <input type="email" placeholder="Your email address here" value={useremail} onChange={(e) => setemail(e.target.value)} required />
                <button type="submit" className="btn btn--primary">SUBSCRIBE</button>
              </div>
            </form>

          </div>
        </div>


      </div>
      <div className="footer-content font-15 text-capitalized">
        <p>Copyright &copy; {new Date().getFullYear()} Cecil All rights reserved</p>
      </div>
    </>
  );
}

export default Footer;