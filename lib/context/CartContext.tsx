"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/types/product"

interface CartItem extends Product {
  cantidad: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  calculateTotal: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeItem: () => {},
  clearCart: () => {},
  calculateTotal: () => 0,
  getTotalItems: () => 0,
})

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, cantidad: cartItem.cantidad + item.cantidad } : cartItem,
        ),
      )
    } else {
      setCartItems([...cartItems, item])
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.PRECIO || 0) * item.cantidad
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        clearCart,
        calculateTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
