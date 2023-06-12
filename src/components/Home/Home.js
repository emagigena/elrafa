import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      className="hero-section custom-section w-full"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dhrfu31jp/image/upload/v1686607178/el%20rafa/Dise%C3%B1o_sin_t%C3%ADtulo_q9w2a6.png")',
        // minHeight: "100vh",
        width: "100%",
        height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // padding: "0 50px",
      }}
    >
      <p>
        <span className="text-white">EL RAFA</span>
      </p>
      <p>
        <span className="text-white">
          Tienda Online de Armeria, Nautica, Pesca & Camping{" "}
        </span>
      </p>
      <p className="text-white">
        Encontrá todo lo que necesitas para tus aventuras al aire libre.
      </p>
      <Link to="/productos" className="btn btn-primary">
        Ver productos
      </Link>
    </section>
  );
};

export default Home;
