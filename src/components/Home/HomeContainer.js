import React from "react";
import Home from "./Home.js";
import "./HomeContainer.css";
import Footer from "../Footer/Footer";
import Home2 from "./Home2.js";
import Home3 from "./Home3.js";

export default function HomeContainer() {
  return (
    <div>
      <div className="homeContainer">
        <li>
          <Home/>
        </li>
        <li>
          <Home2/>
        </li>
        <li>
          <Home3/>
        </li>
      </div>
      <Footer />
    </div>
  );
}
