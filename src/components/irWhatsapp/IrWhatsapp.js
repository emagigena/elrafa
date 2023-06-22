import React from "react";
import { Button, Container } from "react-bootstrap";
import "./IrWhatsapp.css";

const IrWhatsapp = ({ cartList, dataFormulario, generarOrden }) => {
  const contactarVentas = () => {
    const productosInfo = cartList.map(
      (item) => `${item.NOMBRE} - ${item.cantidad}`
    );
    const message = `Mis Nombre: ${
      dataFormulario.nombre
    }, Estoy interesado por: ${productosInfo.join()}`;
    const url = `https://wa.me/3425152705?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Container
      className="section hero-section custom-section w-full"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dhrfu31jp/image/upload/v1687436633/el%20rafa/slides%20home/2_uwhk57.png")',
        // minHeight: "100vh",
        width: "100%",
        height: "300px",
        // filter: "brightness(0.8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "50px",
        borderRadius: "10px",
      }}
    >

      <Button
        className="btn btn-success"
        type="submit"
        onClick={() => {
          contactarVentas();
        }}
      >
        <Button type="submit" hidden onClick={generarOrden}></Button>
        Terminar Pedido
      </Button>
    </Container>
  );
};
export default IrWhatsapp;
