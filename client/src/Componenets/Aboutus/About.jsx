import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { ReactComponent as CozyRoom } from "../../images/ammenitites/cozyRoom.svg";
import { ReactComponent as Offers } from "../../images/ammenitites/offers.svg";
import Parser from "html-react-parser";

function About({ aboutUS }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="about main-container" id="about-us">
      <div className="about-row inner-container p-lg-5">
        <div className="about-grid">
          <div className="about-grid-item-1">
            <span className="font-20">{aboutUS.sunTitle}</span>
            <h2 className="mb-5">{aboutUS.title}</h2>
            <div className="font-18 about_desc">{Parser(aboutUS.desc)}</div>
            <div className="mt-5 mb-5">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                onClick={scrollToTop}
              >
                GET STARTED
              </Button>
            </div>
          </div>
          <div className="about-grid-item-2">
            {/* <div className="gallery"> */}
            {/* <div className="about-right"> */}
            {/* <div className="solid-container aboutImage">
                 
                </div> */}
            <img src={aboutUS.featur1} className="w-100 h-100" alt="about-us" />
            {/* </div> */}
            {/* <div className="about-right">
                <div className="image-container hover01">
                  <div className="about-figure" style={{ backgroundImage: `url(${aboutUS.featur2})` }}>
                  </div>
                </div>

                <div className="solid-container aboutImage1">
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
