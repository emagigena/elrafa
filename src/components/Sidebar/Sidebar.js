import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./Sidebar.css";

function Sidebar({
  filtroNombre,
  filtroMarca,
  filtroCalibre,
  filtroTipo,
  orden,
  tipos,
  marcas,
  calibres,
  handleNombreChange,
  handleMarcaChange,
  handleFiltroCalibre,
  handleOrdenChange,
  handleFiltroTipo,
  categoria,
}) {
  return (
    <div className="sidebar-content" style={{ marginTop: "135px" }}>
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
      {categoria ? (
        <>
          <FloatingLabel
            className="filter"
            id="floatingSelect"
            label="Seleccione Tipo"
          >
            <Form.Select
              aria-label="Floating label select example"
              id="filtroTipo"
              value={filtroTipo}
              onChange={handleFiltroTipo}
            >
              <option value="">Todas</option>
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="filter"
            id="floatingSelect"
            label="Seleccione Calibre"
          >
            <Form.Select
              aria-label="Floating label select example"
              id="filtroCalibre"
              value={filtroCalibre}
              onChange={handleFiltroCalibre}
            >
              <option value="">Todas</option>
              {calibres.map((calibre) => (
                <option key={calibre} value={calibre}>
                  {calibre}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </>
      ) : (
        ""
      )}
      <FloatingLabel
        className="filter"
        controlId="floatingSelect"
        label="Filtrar por"
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
  );
}

export default Sidebar;
