import React, { useState } from "react";
import "./ItemDetail.css";
import { Container, Row, Col, Button, Badge, Accordion } from "react-bootstrap";
import ItemCount from "../ItemCount/ItemCounter";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";

export default function ItemDetail({ producto }) {
  const [state, setState] = useState(true);
  const [foto, setFoto] = useState(producto.FOTOS[0]);
  const { agregarCart } = useCartContext();

  const cambiarFoto = (index) => {
    setFoto(producto.FOTOS[index]);
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
            {producto > 0 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Badge style={{ borderRadius: "0px", width: "31%" }}>
                  EN STOCK
                </Badge>
                <Badge
                  bg="success"
                  style={{ borderRadius: "0px", width: "31%" }}
                >
                  ¡OFERTA!
                </Badge>
              </div>
            ) : (
              ""
            )}
            <div className="ImageContainer">
              <img src={foto} alt="Foto principal" />
              <ul className="PhotoList">
                {producto.FOTOS.map((foto, index) => (
                  <li key={index} onClick={() => cambiarFoto(index)}>
                    <img src={foto} alt={`Foto ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col>
            <div className="InfoContainer">
              <h2 className="ProductName">{producto.NOMBRE}</h2>
              <h3>$ {producto.PRECIO}</h3>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Descripción</Accordion.Header>
                  <Accordion.Body>
                    {producto.DESCRIPCION ? (
                      <span style={{textAlign: "justify"}}><p>{producto.DESCRIPCION}</p></span>
                    ) : (
                      <p>
                        Este es un producto de nuestra página web. Para pedir,
                        canjear o consultar, por favor envía un mensaje de
                        WhatsApp al siguiente número: 342111111111. ¡Gracias!
                      </p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {state ? (
                <ItemCount stock={producto.STOCK} initial={1} onAdd={onAdd} />
              ) : (
                <Link to="/Cart">
                  <Button
                    variant="none"
                    className="btn"
                    style={{ backgroundColor: "red", color: "white" }}
                    size="lg"
                  >
                    Consultar
                  </Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
