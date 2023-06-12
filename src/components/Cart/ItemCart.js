import React from 'react'

export default function ItemCart(Item) {
  return (
    <div>
       <li>
           <h1>Nombre: {Item.nombre}</h1>
           <h3>Cantidad: {Item.cantidad}</h3>
           <h3>Precio: {Item.precio}</h3>
       </li>
    </div>
  )
}