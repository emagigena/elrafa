import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      className="section hero-section custom-section w-full"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dhrfu31jp/image/upload/v1687436634/el%20rafa/slides%20home/1_tf2dym.png")',
        width: "100%",
        height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-2xl font-semibold text-white">EL RAFA</h1>
      <h1 className="mt-1 text-center font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-7xl">
        <span className="block text-white">
          Tienda Online de Armeria, Nautica, Pesca & Camping
        </span>
      </h1>
      <p className="text-white">
        Encontrá todo lo que necesitas para tus aventuras al aire libre.
      </p>
      <Link to="/CATEGORÍA/ARMERÍA" className="btn btn-primary">
        Ver productos
      </Link>
    </section>
  );
};

export default Home;
