import React from "react";
import "./Map.css";
import { Container, Image } from "react-bootstrap";
import mapImage from "./map.png";

const Map = () => {
  return (
    <>
      <Container
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="sm:mt-15 mx-auto max-w-7xl mb-10 px-4 sm:px-6 lg:px-8"
      >
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <h1 className="text-2xl font-semibold text-black text-center">
            NUESTRA UBICACIÓN
          </h1>
        </div>
        <a
          href="https://goo.gl/maps/pRXzw7VCNT9yUwaeA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="image-container" style={{ borderRadius: "10px" }}>
            <Image
              src={mapImage}
              alt={""}
              fluid
              className="image"
              rounded
              style={{
                objectFit: "contain"
              }}
            />
            <div className="overlay">
              <p className="overlay-text">Ver ubicación</p>
            </div>
          </div>
        </a>
      </Container>
    </>
  );
};

export default Map;
