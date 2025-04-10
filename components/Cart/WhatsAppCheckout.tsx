"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface WhatsAppCheckoutProps {
  cartItems: (Product & { cantidad: number })[]
  formData: {
    nombre: string
    apellido: string
  }
  onSubmit: (e: React.FormEvent) => void
}

export default function WhatsAppCheckout({ cartItems, formData, onSubmit }: WhatsAppCheckoutProps) {
  const contactarVentas = () => {
    const productosInfo = cartItems.map((item) => `${item.NOMBRE} - ${item.cantidad} unidades`)
    const message = `Hola, mi nombre es ${formData.nombre} ${formData.apellido}. Escribo desde la página web y estoy interesado en los siguientes productos: ${productosInfo.join(", ")}`
    const url = `https://wa.me/3425152705?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={contactarVentas}>
        Contactar por WhatsApp
      </Button>

      <Button type="submit" className="w-full" onClick={onSubmit}>
        Finalizar Pedido
      </Button>
    </div>
  )
}
