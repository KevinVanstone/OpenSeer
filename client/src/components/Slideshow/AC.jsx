import React from "react";
// import "./styles.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

export default function AC() {
  return (
    <div className="App">
     <AliceCarousel autoPlay autoPlayInterval="3000">
      <img src="https://www.w3schools.com/howto/img_nature_wide.jpg" className="sliderimg" alt=""/>
      <img src="https://www.w3schools.com/howto/img_snow_wide.jpg" className="sliderimg" alt=""/>
      <img src="https://www.w3schools.com/howto/img_nature_wide.jpg" className="sliderimg" alt=""/>
      <img src="https://www.w3schools.com/howto/img_nature_wide.jpg" className="sliderimg" alt=""/>
    </AliceCarousel>
    </div>
  );
}
