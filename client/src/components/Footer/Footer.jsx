import React, { useState, useEffect } from "react";
import "./Footer.scss";


const Footer = () => {

  let [aboutStyle, setAboutStyle] = useState("foot-nav-initial");
  let [collectionStyle, setCollectionStyle] = useState("foot-nav-initial");
  let [galleryStyle, setGalleryStyle] = useState("foot-nav-initial");

  useEffect(() => {
    if (isWithinURL("about")) {
      setAboutStyle("foot-nav-current");
    } if (isWithinURL("collection")) {
      setCollectionStyle("foot-nav-current");
    } if (isWithinURL("gallery")) {
      setGalleryStyle("foot-nav-current");
    }
    
  }, []);

  function isWithinURL(page) {
    if (window.location.pathname.includes(page)) return true;
    else return false;
  }


    return (
      <footer>
        <div className="foot-nav">
          <a className={aboutStyle} href="/about">
            <p>About</p>
          </a>
          <a className={collectionStyle} href="/collection">
            <p>Collection</p>
          </a>
          <a className={galleryStyle} href="/gallery">
            <p>Gallery</p>
          </a>
        </div>
      </footer>
    );
}

export default Footer;
