import React, { useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import "./ItemCounter.css";

export default function ItemCount({ stock, initial, onAdd }) {
  if (stock === 0) initial = 0;
  const [count, setCount] = useState(initial);
  const rest = () => {
    if (count > 1) setCount(count - 1);
  };
  const sum = () => {
    if (count < stock) setCount(count + 1);
  };

  return (
    <div className="CountCard">
      <Card.Text style={{ marginTop: "20px" }}>({stock} disponibles)</Card.Text>
      {/* <div
        style={{ alignItems: "center", justifyContent: "center" }}
        className="InputCantidad"
      > */}
      {/* <InputGroup style={{ width: "30%" }}>
          <Button variant="outline-secondary" onClick={rest}>
            -
          </Button>
          <FormControl className="Agregar" type="text" placeholder={count} />
          <Button variant="outline-secondary" onClick={sum}>
            +
          </Button>
        </InputGroup> */}
      {/* </div> */}
      <div className="d-grip gap-2">
        <Button
          variant="outline-none"
          className="btn"
          style={{ backgroundColor: "red", color: "white" }}
          size="lg"
          onClick={(event) => {
            onAdd(count);
          }}
        >
          Consultar por este producto{" "}
        </Button>
      </div>
    </div>
  );
}
