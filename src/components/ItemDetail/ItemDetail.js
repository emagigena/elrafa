import React, { useState } from "react";
import "./ItemDetail.css";
import { Container, Row, Col } from "react-bootstrap";
import ItemCount from "../ItemCount/ItemCounter";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";

export default function ItemDetail({ producto }) {
  const [state, setState] = useState(true);
  const [foto, setFoto] = useState(producto.fotos[0]);
  const { agregarCart } = useCartContext();

  const cambiarFoto = (index) => {
    setFoto(producto.fotos[index]);
  };

  const onAdd = (cantidad) => {
    if (cantidad !== 0) {
      setState(false);
    }
    agregarCart({ ...producto, cantidad: cantidad });
  };

  return (
    <div className="ItemDetail text-center">
      <Container>
        <Row>
          <Col>
            <div className="ImageContainer">
              <img src={foto} alt="Foto principal" />
              <ul className="PhotoList">
                {producto.fotos.map((foto, index) => (
                  <li key={index} onClick={() => cambiarFoto(index)}>
                    <img src={foto} alt={`Foto ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col>
            <div className="InfoContainer">
              <h2 className="ProductName">{producto.nombre}</h2>
              <h3>$ {producto.precio}</h3>
              <p>
                Este es un producto de nuestra página web. Para comprar, canjear
                o consultar, por favor envía un mensaje de WhatsApp al siguiente
                número: 342111111111. ¡Gracias!
              </p>
              {state ? (
                <ItemCount stock={producto.stock} initial={1} onAdd={onAdd} />
              ) : (
                <Link to="/Cart">
                  <button variant="primary" size="lg">
                    Comprar ahora
                  </button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
