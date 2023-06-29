import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Item.css";
import ShowCarousel from "./Carousel/Carousel";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function Item({ prod }) {
  return (
    <li>
      <Card className="card1">
        {prod.STOCK > 0 ? (
          <div style={{display: "flex", justifyContent: "space-between", }}>
            <Badge style={{borderRadius: "0px", width: "100%"}}>EN STOCK</Badge>
            <Badge bg="success" style={{borderRadius: "0px", width: "100%"}}>¡OFERTA!</Badge>
          </div>
        ) : (
          ""
        )}
        {/* {prod ? (
          <div class="flex">
            <Badge bg="success">OFERTA</Badge>
          </div>
        ) : (
          ""
        )} */}
        <ShowCarousel fotos={prod.FOTOS} />
        <Card.Body>
          <Card.Title className="ProductName">{prod.NOMBRE}</Card.Title>
          <Card.Title>$ {prod.PRECIO}</Card.Title>
          <Link to={`/detalle/${prod.id}`}>
            <Button
              variant="none"
              className="btn"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Ver Detalle
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </li>
  );
}

export default Item;
