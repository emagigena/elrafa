import React from "react";
import Home from "./Home.js";
import "./HomeContainer.css";
import Home2 from "./Home2.js";
import Home3 from "./Home3.js";
import WhatsAppButton from "../WhatsappButton/WhatsAppButton.js";

const isMobile = window.innerWidth <= 767;

export default function HomeContainer() {
  return (
    <div>
      <div className="homeContainer">
        {isMobile ? <WhatsAppButton /> : ""}

        <li>
          <Home />
        </li>
        <li>
          <Home2 />
        </li>
        <li>
          <Home3 />
        </li>
      </div>
    </div>
  );
}
