import React from "react";
import Item from "../../components/Item/Item.js";
import "./ItemList.css";

function ItemList({ productos }) {
  return productos.map((prod) => <Item key={prod.id} prod={prod} />);
}

export default ItemList;