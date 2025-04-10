"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = "¡Hola, Escribo desde la pagina web y estoy interesado!"
    const phoneNumber = "3425152705"
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-50">
      <Button
        onClick={handleWhatsAppClick}
        size="icon"
        className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Contactar por WhatsApp</span>
      </Button>
    </div>
  )
}
