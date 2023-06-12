import React, { useEffect, useState } from "react";
import ItemList from "../../components/ItemList/ItemList.js";
import "./ItemListConteiner.css";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Footer from "../Footer/Footer";

export default function ItemListConteiner() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoriaID } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const queryDb = collection(db, "productos");

    const queryAFiltrar = categoriaID
      ? query(queryDb, where("categoria", "==", categoriaID))
      : queryDb;

    getDocs(queryAFiltrar)
      .then((respuesta) => {
        setProductos(
          respuesta.docs.map((item) => ({ id: item.id, ...item.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoriaID]);

  return (
    <div>
      <div className="ItemsContainer">
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <ItemList productos={productos} />
        )}
      </div>
      <Footer />
    </div>
  );
}
