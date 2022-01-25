import Header from "./components/Header/Header.jsx";
import Search from "./components/Search/Search.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import Home from "./components/Home/Home.jsx";
import Collection from "./components/Collection/Collection.jsx";
import NFTDetails from "./components/NFTDetails/NFTDetails.jsx";
import CollectionDetails from "./components/CollectionDetails/CollectionDetails.jsx";
import Slideshow from "./components/Slideshow/Slideshow.jsx";

import "./App.css";
import "./styles/partials/_globals.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/search/:NFTAddy/:NFTID" element={<NFTDetails />} />
          <Route path="/collection/:NFTID" element={<CollectionDetails />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/gallery" element={<Slideshow />} />

          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
