import { createContext, useContext, useState } from "react";


export const useCartContext = () => useContext(CartContext)
const CartContext = createContext([])

 function CartContextProvider({ children }){
    const [cartList, setCartList] = useState([])

    const agregarCart = (Item) =>{
        const index = cartList.find((prod) => prod.id === Item.id)
        index ? index.cantidad += Item.cantidad : setCartList( [...cartList,Item] )
    }
    const borrarItem = (id) =>{
        setCartList( cartList.filter((prod) => prod.id !== id))
    }
    const vaciarCart = ()=>{
        setCartList( [] )
    }
    const calcularTotal = () => {
        let suma = 0;
        cartList.forEach(element => {
            suma += element.cantidad * element.precio;
        });
        return suma
   }
   const productosAgregados = () => {
        let suma = 0;
        cartList.forEach(element => {
            suma += element.cantidad
        });
    return suma
   }
    return (
        <CartContext.Provider value={{
            cartList, agregarCart, vaciarCart, borrarItem, calcularTotal, productosAgregados}}>
            {children}
        </CartContext.Provider>
    )
 }
 export default CartContextProvider 