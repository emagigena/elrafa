import React from "react";
import { Card } from "react-bootstrap";
import "./Home2.css";
import { Link } from "react-router-dom";

export default function Home2() {
  return (
    <div className="CardsInfo">
      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1687361643/el%20rafa/slides%20home/tpzjroajzmdeuzavvxn8.png"
          />
          <Card.Body>
            <Card.Title>Armeria</Card.Title>
            <Card.Text>
              Descubre nuestra selección de armas de calidad para tus
              actividades de caza y tiro.
            </Card.Text>
            <Link to="/CATEGORÍA/ARMERÍA" className="btn" style={{backgroundColor: "red", color: "white"}}>
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1687361644/el%20rafa/slides%20home/xps45gn51spjf7riutcz.png"
          />
          <Card.Body>
            <Card.Title>Nautica</Card.Title>
            <Card.Text>
              Embarcaciones, Aceites, Motores Kayaks y accesorios para
              navegación.
            </Card.Text>
            <Link to="/CATEGORÍA/NÁUTICA" className="btn" style={{backgroundColor: "red", color: "white"}}>
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1687361644/el%20rafa/slides%20home/dfoblc8np68ttl4kcuiz.png"
          />
          <Card.Body>
            <Card.Title>Camping</Card.Title>
            <Card.Text>
              Equípate con nuestras mejores opciones de camping, carpas, sacos
              de dormir y más.
            </Card.Text>
            <Link to="/CATEGORÍA/CAMPING" className="btn" style={{backgroundColor: "red", color: "white"}}>
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1687361644/el%20rafa/slides%20home/ikodc4jcjqpl2wkzlekj.png"
          />
          <Card.Body>
            <Card.Title>Pesca</Card.Title>
            <Card.Text>
              Descubre nuestra selección de cañas, reels, señuelos y todo lo que
              necesitas.
            </Card.Text>
            <Link to="/CATEGORÍA/PESCA" className="btn" style={{backgroundColor: "red", color: "white"}}>
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
