import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Verificar el tamaño de la pantalla al cargar el componente

    window.addEventListener("resize", handleResize); // Agregar listener para cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Eliminar listener al desmontar el componente
    };
  }, []);

  const backgroundImageMobile =
    'url("https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795977/DESTACADAS/14A2C2E2-6024-4015-8F44-994A9224B1B6_1_fsc4je.png")';

  const backgroundImageDesktop =
    'url("https://res.cloudinary.com/ddoc1iaed/image/upload/v1692796034/DESTACADAS/elrafa44_lbwzh5.jpg")';

  const backgroundImage = isMobile
    ? backgroundImageDesktop
    : backgroundImageMobile;

  return (
    <section
      className="section hero-section custom-section w-full"
      style={{
        backgroundImage: backgroundImage,
        width: "100%",
        height: isMobile ? "350px" : "490px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      <h1 className="mt-1 text-center font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-7xl bottom-text-title">
        <span className="block text-white">
          Tienda online de Armería, Náutica, Pesca & Camping
        </span>
      </h1>

      {isMobile ? (
        <>
          <span className="text-white bottom-text">
            <h>Encontrá todo lo que necesitas</h>
            <tr />
            <h> para tus aventuras al aire libre.</h>
          </span>
          <span className="text-white bottom-text-hours">
            Lun a Vie 8.30H a 12:30H - 16.30H 20.30H <tr /> Sab de 8:30H a
            12:30H.
          </span>
        </>
      ) : (
        <>
          <span className="text-white bottom-text">
            Encontrá todo lo que necesitas para tus aventuras al aire libre.
          </span>
          <span className="text-white bottom-text-hours">
            Lun a Vie 8.30H a 12:30H - 16.30H 20.30H | Sab de 8:30H a 12:30H.
          </span>
        </>
      )}
    </section>
  );
};

export default Home;
