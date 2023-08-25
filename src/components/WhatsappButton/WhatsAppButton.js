import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = "¡Hola, Escribo desde la pagina web y estoy interesado!"; // Mensaje editable
    const phoneNumber = "3425152705"; // Número de WhatsApp al que se enviará el mensaje
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="whatsapp-button"
      style={{ position: "fixed", bottom: "130px", right: "20px", zIndex: 999 }}
    >
      <button
        onClick={handleWhatsAppClick}
        style={{
          backgroundColor: "#25D366",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
        }}
      >
        <WhatsAppIcon
          style={{ color: "#FFF", width: "40px", height: "40px" }}
        />
      </button>
    </div>
  );
};

export default WhatsAppButton;
