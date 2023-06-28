import React, { useState } from "react";
import Item from "../../components/Item/Item.js";
import "./ItemList.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function ItemList({ productos }) {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroCalibre, setFiltroCalibre] = useState("");
  const [orden, setOrden] = useState("");

  const handleNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleMarcaChange = (event) => {
    setFiltroMarca(event.target.value);
  };

  const handleFiltroCalibre = (event) => {
    setFiltroCalibre(event.target.value);
  };

  const handleOrdenChange = (event) => {
    setOrden(event.target.value);
  };

  const marcas = [...new Set(productos.map((prod) => prod.MARCA))];
  const calibres = [...new Set(productos.map((prod) => prod.CALIBRE))];

  const filteredProductos = productos
    .filter((prod) => {
      const nombre = prod.NOMBRE ? prod.NOMBRE.toLowerCase() : "";
      const marca = prod.MARCA ? prod.MARCA.toLowerCase() : "";
      const calibre = prod.CALIBRE;
      return (
        nombre.includes(filtroNombre.toLowerCase()) &&
        (filtroCalibre === "" || calibre === parseInt(filtroCalibre)) &&
        (filtroMarca === "" || marca === filtroMarca.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (orden === "mayorPrecio") {
        return b.PRECIO - a.PRECIO;
      } else if (orden === "menorPrecio") {
        return a.PRECIO - b.PRECIO;
      } else {
        return 0;
      }
    });

  return (
    <div>
      <Container>
        <div className="filters">
          <FloatingLabel
            className="filter"
            controlId="floatingInput"
            label="Ingrese un nombre"
          >
            <Form.Control
              aria-label="Floating label input example"
              id="filtroNombre"
              value={filtroNombre}
              onChange={handleNombreChange}
            />
          </FloatingLabel>
          <FloatingLabel
            className="filter"
            controlId="floatingSelect"
            label="Seleccione Marca"
          >
            <Form.Select
              aria-label="Floating label select example"
              id="filtroMarca"
              value={filtroMarca}
              onChange={handleMarcaChange}
            >
              <option value="">Todas</option>
              {marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="filter"
            id="floatingSelect"
            label="Seleccione el Calibre"
          >
            <Form.Select
              aria-label="Floating label select example"
              id="filtroCalibre"
              value={filtroCalibre}
              onChange={handleFiltroCalibre}
            >
              <option value=""></option>
              {calibres.map((calibre) => (
                <option key={calibre} value={calibre}>
                  Calibre: {calibre}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="filter"
            controlId="floatingSelect"
            label="Ordenar por"
          >
            <Form.Select
              aria-label="Floating label select example"
              id="orden"
              value={orden}
              onChange={handleOrdenChange}
            >
              <option value="">Sin orden</option>
              <option value="mayorPrecio">Mayor Precio</option>
              <option value="menorPrecio">Menor Precio</option>
            </Form.Select>
          </FloatingLabel>
        </div>
      </Container>
      <div className="item-list">
        {filteredProductos.map((prod) => (
          <Item key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
