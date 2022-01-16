import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import "./styles/partials/_globals.scss";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    // <BrowserRouter>
    <div>
      <Header />
      <Home />
      <Footer />
      </div>
    // </BrowserRouter>
  );
}

export default App;
