import React from "react";
import "./Attractions.css";

function Attractions({ nearBy }) {
  return (
    <div className="main-container attractions">
      <div className="inner-container">
        <div className="head text-center">
          {/* <span className="font-20">AIRPORT, RESTAURANTS AND CAFES </span> */}
          <h2>Photo Album</h2>
        </div>
      </div>
      <div className="grid">
        {nearBy.map((n, i) => {
          return (
            <figure className="effect-lily" key={i}>
              <img src={n.img} alt="Gibbons Park" />
              <figcaption>
                <div>
                  <h2 className="image-text mb-4 bold">{n.title}</h2>
                  <p className="font-15">{n.desc}</p>
                </div>
                <a href="#">View more</a>
              </figcaption>
            </figure>
          )
        })}

    
     </div>

    </div>

  );
}

export default Attractions;
