import React, { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { Spinner } from "react-bootstrap";
import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Footer from "../Footer/Footer";

export default function ItemDetailContainer({}) {
  const { detalleID } = useParams();

  const [item, setItem] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const queryDb = doc(db, "PRODUCTOS", detalleID);
    getDoc(queryDb)
      .then((respuesta) => setItem({ id: respuesta.id, ...respuesta.data() }))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="ItemDetailContainer">
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <ItemDetail producto={item} />
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
}