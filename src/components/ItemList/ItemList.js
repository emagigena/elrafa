import React, { useState } from "react";
import Item from "../../components/Item/Item.js";
import "./ItemList.css";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar.js";
import SidebarMobile from "../SideBarMobile/SideBarMobile.js";

function ItemList({ productos }) {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroCalibre, setFiltroCalibre] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

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

  const handleTipoChange = (event) => {
    setFiltroTipo(event.target.value);
  };
  const handleOrdenChange = (event) => {
    setOrden(event.target.value);
  };

  const marcas = [...new Set(productos.map((prod) => prod.MARCA))];
  const calibres = [...new Set(productos.map((prod) => prod.CALIBRE))];
  const tipos = [...new Set(productos.map((prod) => prod.TIPO))];
  const categoria = productos.some((prod) => prod.CATEGORÍA === "ARMERÍA");
console.log(categoria);
  const filteredProductos = productos
    .filter((prod) => {
      const nombre = prod.NOMBRE ? prod.NOMBRE.toLowerCase() : "";
      const marca = prod.MARCA ? prod.MARCA.toLowerCase() : "";
      const tipo = prod.TIPO ? prod.TIPO.toLowerCase() : "";
      const calibre = prod.CALIBRE;

      return (
        nombre.includes(filtroNombre.toLowerCase()) &&
        (filtroCalibre === "" || calibre === parseInt(filtroCalibre)) &&
        (filtroMarca === "" || marca === filtroMarca.toLowerCase()) &&
        (filtroTipo === "" || tipo === filtroTipo.toLowerCase())
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
    <div className="item-list-container">
      <div className="sidebar">
        <Sidebar
          filtroNombre={filtroNombre}
          filtroMarca={filtroMarca}
          filtroTipo={filtroTipo}
          filtroCalibre={filtroCalibre}
          tipos={tipos}
          orden={orden}
          marcas={marcas}
          calibres={calibres}
          handleNombreChange={handleNombreChange}
          handleMarcaChange={handleMarcaChange}
          handleFiltroCalibre={handleFiltroCalibre}
          handleTipoChange={handleTipoChange}
          handleOrdenChange={handleOrdenChange}
          categoria={categoria}
        />
      </div>

      <Container>
        <div className="sidebar-mobile">
          <SidebarMobile
            filtroNombre={filtroNombre}
            filtroMarca={filtroMarca}
            filtroTipo={filtroTipo}
            filtroCalibre={filtroCalibre}
            tipos={tipos}
            orden={orden}
            marcas={marcas}
            calibres={calibres}
            handleNombreChange={handleNombreChange}
            handleMarcaChange={handleMarcaChange}
            handleFiltroCalibre={handleFiltroCalibre}
            handleTipoChange={handleTipoChange}
            handleOrdenChange={handleOrdenChange}
          />
        </div>
        <div className="item-list">
          {filteredProductos.map((prod) => (
            <Item key={prod.id} prod={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ItemList;
