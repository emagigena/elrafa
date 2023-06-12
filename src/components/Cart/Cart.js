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

function Cart() {
  const [compraTerminada, setCompraTerminada] = useState(false);
  const [idOrden, setIdOrden] = useState(null);
  const [dataFormulario, setDataFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
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
      let orden = {};
      orden.comprador = dataFormulario;
      orden.total = calcularTotal();
      orden.items = cartList.map((cartItem) => {
        const id = cartItem.id;
        const nombre = cartItem.nombre;
        const precio = cartItem.precio;
        return { id, nombre, precio };
      });
      const db = getFirestore();
      const queryOrdenes = collection(db, "orden");
      addDoc(queryOrdenes, orden)
        .then((res) => setIdOrden(res.id))
        .catch((err) => console.log(err))
        .finally(() => vaciarCart());

      const queryProductos = collection(db, "productos");

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
                res.data().stock -
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
          <div>
            <h3>{dataFormulario.nombre}</h3>
            <h3>Gracias por comprar en Instrumental Santa Fe</h3>
            <h3>
              El Envío se realizará a la dirección: {dataFormulario.direccion}
            </h3>
            <h3>El codigo de su compra es: </h3>
            <h4>{idOrden}</h4>
            <Button className="btn btn-success" onClick={() => navegar("/")}>
              Volver al Inicio
            </Button>
          </div>
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
              <div className="my-4">
                <h4>Carrito de compras:</h4>
                <hr />

                <Table responsive>
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
                      <tr key={item.id} className="align-items-center">
                        <td>
                          <Image
                            src={item.fotos[0]}
                            rounded
                            width={50}
                            alt={item.nombre}
                          />
                          {item.nombre}
                        </td>
                        <td>${item.precio}</td>
                        <td>Cantidad: {item.cantidad}</td>
                        <td>${item.cantidad * item.precio}</td>
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

                <hr />
                <h2>Total: ${calcularTotal()}</h2>

                <div className="formulario">
                  <h2>Formulario de Compra:</h2>
                  <Form onSubmit={generarOrden}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        type="name"
                        placeholder="Ingrese su Nombre"
                        value={dataFormulario.nombre}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        name="apellido"
                        type="lastname"
                        placeholder="Ingrese su Apellido"
                        value={dataFormulario.apellido}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Ingrese su email"
                        value={dataFormulario.email}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        name="telefono"
                        type="phone"
                        placeholder="Ingrese su Teléfono"
                        value={dataFormulario.telefono}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        name="direccion"
                        type="direcction"
                        placeholder="Ingrese su dirección"
                        value={dataFormulario.direccion}
                        onChange={handleOnChange}
                      />
                    </Form.Group>

                    <Button
                      onClick={generarOrden}
                      className="btn btn-success"
                      type="submit"
                    >
                      Finalizar la compra
                    </Button>
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
