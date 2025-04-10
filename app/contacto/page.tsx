"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import contactData from "@/data/contact.json"

interface ContactPerson {
  nombre: string
  telefono: number
  img: string[]
}

interface ContactItem {
  [key: string]: ContactPerson
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const message = encodeURIComponent(
    "¡Hola!, me gustaría realizar una consulta desde la pagina web, espero su respuesta con paciencia, muchas gracias",
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">CONTACTÁ CON NOSOTROS</h1>
        <p className="text-lg font-medium">Lun a Vie 8.30H a 12:30H - 16.30H 20.30H | Sab de 8:30H a 12:30H.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {contactData.map((contact, index) => {
          const contactType = Object.keys(contact)[0]
          const person = contact[contactType] as ContactPerson

          return (
            <Card key={index} className="w-full max-w-xs product-card-transition">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={person.img[0] || "/placeholder.svg"}
                    alt={person.nombre}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{person.nombre}</h3>
                <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                  <a
                    href={`https://wa.me/${person.telefono}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contactar por WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
