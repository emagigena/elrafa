import React, { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import "./Cart.css";
import { Button, Container, Form, Image, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  documentId,
  writeBatch,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import Footer from "../Footer/Footer";
import IrWhatsapp from "../irWhatsapp/IrWhatsapp";

function Cart() {
  const [compraTerminada, setCompraTerminada] = useState(false);
  const [idOrden, setIdOrden] = useState(null);
  const [dataFormulario, setDataFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });
  const {
    cartList,
    vaciarCart,
    borrarItem,
    calcularTotal,
    productosAgregados,
  } = useCartContext();
  const navegar = useNavigate();

  const generarOrden = async (e) => {
    e.preventDefault();
    if (Object.values(dataFormulario).some((value) => value === "")) {
      alert("Todos los campos son requeridos");
    } else {
      let ORDEN = {};
      ORDEN.COMPRADOR = dataFormulario;
      ORDEN.TOTAL = calcularTotal();
      ORDEN.ITEM = cartList.map((cartItem) => {
        const id = cartItem.id;
        const nombre = cartItem.NOMBRE;
        const precio = cartItem.PRECIO;
        return { id, nombre, precio };
      });
      const db = getFirestore();
      const queryOrdenes = collection(db, "ORDEN");
      addDoc(queryOrdenes, ORDEN)
        .then((res) => setIdOrden(res.id))
        .catch((err) => console.log(err))
        .finally(() => vaciarCart());

      const queryProductos = collection(db, "PRODUCTOS");

      const queryProductosFillter = query(
        queryProductos,
        where(
          documentId(),
          "in",
          cartList.map((item) => item.id)
        )
      );

      const batch = writeBatch(db);

      getDocs(queryProductosFillter)
        .then((resp) =>
          resp.docs.forEach((res) =>
            batch.update(res.ref, {
              stock:
                res.data().STOCK -
                cartList.find((item) => item.id === res.id).cantidad,
            })
          )
        )
        .finally(setCompraTerminada(true));
      window.scroll(1, 1);
    }
  };

  const handleOnChange = (e) => {
    setDataFormulario({ ...dataFormulario, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container>
        {compraTerminada ? (
          <Container>
            <div style={{ textAlign: "center", margin: "30px" }}>
              <h3>{dataFormulario.nombre}</h3>
              <h3>Gracias por comprar en el Rafa</h3>
              <h3>
                Pronto nos comunicaremos con usted para coordinar el envío a{" "}
                {dataFormulario.direccion}
              </h3>
              <h3>El codigo de su compra es: </h3>
              <h4>{idOrden}</h4>
              <Button className="btn btn-warning" onClick={() => navegar("/")}>
                Volver al Inicio
              </Button>
            </div>
          </Container>
        ) : (
          <Container className="my-4 bg-white text-center">
            {productosAgregados() === 0 ? (
              <div>
                <h4>No hay productos en tu Carrito de compras</h4>
                <Button
                  className="btn btn-success mx-2"
                  onClick={() => navegar("/")}
                >
                  Inicio
                </Button>
              </div>
            ) : (
              <div className="my-1">
                <h2>Carrito de compras:</h2>
                <hr />

                <div className="Cart">
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr className="font-weight-bold">
                        <th>Productos</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Quitar del Carrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="ProductInfo">
                              <Image
                                src={item.FOTOS[0]}
                                rounded
                                width={50}
                                alt={item.NOMBRE}
                                className="ProductImage"
                              />
                              <span>{item.NOMBRE}</span>
                            </div>
                          </td>
                          <td>${item.PRECIO}</td>
                          <td>{item.cantidad}</td>
                          <td>${item.cantidad * item.PRECIO}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => borrarItem(item.id)}
                            >
                              Quitar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <hr />
                <h2>Total: ${calcularTotal()}</h2>

                <div className="formulario">
                  <h2>Formulario de Pedido:</h2>
                  <Form onSubmit={generarOrden}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        type="text"
                        placeholder="Ingrese su Nombre"
                        value={dataFormulario.nombre}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        name="apellido"
                        type="text"
                        placeholder="Ingrese su Apellido"
                        value={dataFormulario.apellido}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        name="telefono"
                        type="text"
                        placeholder="Ingrese su Teléfono"
                        value={dataFormulario.telefono}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        name="direccion"
                        type="text"
                        placeholder="Ingrese su dirección"
                        value={dataFormulario.direccion}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                    <Container style={{ marginTop: "10px" }}>
                      {Object.values(dataFormulario).some(
                        (value) => value !== ""
                      ) ? (
                        <IrWhatsapp
                          cartList={cartList}
                          dataFormulario={dataFormulario}
                          generarOrden={generarOrden}
                        />
                      ) : (
                        ""
                      )}
                    </Container>
                    {/* <Button
                      onClick={generarOrden}
                      className="btn btn-success"
                      type="submit"
                    >
                      Finalizar el pedido
                    </Button> */}
                  </Form>

                  <Button onClick={vaciarCart} className="btn btn-danger">
                    Vaciar el carrito
                  </Button>
                  <Button
                    onClick={() => navegar("/")}
                    className="btn btn-primary"
                  >
                    Volver al Catálogo
                  </Button>
                </div>
              </div>
            )}
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
