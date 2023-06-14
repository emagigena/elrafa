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
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1686608029/el%20rafa/18-2_iijsda.jpg"
          />
          <Card.Body>
            <Card.Title>Armeria</Card.Title>
            <Card.Text>
              Descubre nuestra selección de armas de calidad para tus
              actividades de caza y tiro.
            </Card.Text>
            <Link to="/CATEGORÍA/ARMERÍA" className="btn btn-primary">
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1686608029/el%20rafa/19-1_s3wqsf.jpg"
          />
          <Card.Body>
            <Card.Title>Nautica</Card.Title>
            <Card.Text>
              Embarcaciones, Aceites, Motores Kayaks y accesorios para navegación.
            </Card.Text>
            <Link to="/CATEGORÍA/NÁUTICA" className="btn btn-primary">
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1686608029/el%20rafa/20-2_v5qp0p.jpg"
          />
          <Card.Body>
            <Card.Title>Camping</Card.Title>
            <Card.Text>
              Equípate con nuestras mejores opciones de camping, carpas, sacos de dormir y más.
            </Card.Text>
            <Link to="/CATEGORÍA/CAMPING" className="btn btn-primary">
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex">
        <Card className="cards" style={{ width: "16rem" }}>
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/dhrfu31jp/image/upload/v1686608029/el%20rafa/2-1_qo3tj5.jpg"
          />
          <Card.Body>
            <Card.Title>Pesca</Card.Title>
            <Card.Text>
              Descubre nuestra selección de cañas, reels, señuelos y todo lo
              que necesitas.
            </Card.Text>
            <Link to="/CATEGORÍA/PESCA" className="btn btn-primary">
              Ver productos
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
