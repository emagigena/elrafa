import React from 'react'

export default function ItemCart(Item) {
  return (
    <div>
       <li>
           <h1>Nombre: {Item.NOMBRE}</h1>
           <h3>Cantidad: {Item.cantidad}</h3>
           <h3>Precio: {Item.PRECIO}</h3>
       </li>
    </div>
  )
}