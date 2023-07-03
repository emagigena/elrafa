import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Item.css";
import ShowCarousel from "./Carousel/Carousel";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function Item({ prod }) {
  return (
    <>
      {prod ? (
        <li>
          <Card className="card1">
            {prod.STOCK > 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Badge style={{ borderRadius: "0px", width: "100%" }}>
                  EN STOCK
                </Badge>
                <Badge
                  bg="success"
                  style={{ borderRadius: "0px", width: "100%" }}
                >
                  ¡OFERTA!
                </Badge>
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
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title className="ProductName">{prod.NOMBRE}</Card.Title>
              <Card.Title>
                <span style={{ color: "grey", fontSize: "15px" }}>
                  <p>$ Consultar</p>
                </span>
              </Card.Title>
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
      ) : (
        <Card className="card1">
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title className="ProductName"></Card.Title>
            <Card.Title>
              <span style={{ color: "grey", fontSize: "15px" }}>
                <p>$ Consultar</p>
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Item;
