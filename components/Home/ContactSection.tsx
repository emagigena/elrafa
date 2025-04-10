"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import contactData from "@/data/contact.json"

interface ContactPerson {
  nombre: string
  telefono: number
  img: string[]
}

interface ContactItem {
  [key: string]: ContactPerson
}

export default function ContactSection() {
  const message = encodeURIComponent(
    "¡Hola!, me gustaría realizar una consulta desde la pagina web, espero su respuesta con paciencia, muchas gracias",
  )

  // Get the first contact person for the quick contact card
  const firstContactType = Object.keys(contactData[0])[0]
  const firstContact = contactData[0][firstContactType] as ContactPerson

  return (
    <section className="py-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl">Contacto Rápido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Teléfono</h3>
              <p className="text-sm text-muted-foreground">Llámanos para consultas inmediatas</p>
              <a href={`tel:${firstContact.telefono}`} className="text-blue-600 hover:underline">
                {firstContact.telefono}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Escríbenos por WhatsApp</p>
              <Button className="mt-2 bg-green-600 hover:bg-green-700" asChild size="sm">
                <a
                  href={`https://wa.me/${firstContact.telefono}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar ahora
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Horarios</h3>
              <p className="text-sm text-muted-foreground">Lun a Vie 8.30H a 12:30H - 16.30H 20.30H</p>
              <p className="text-sm text-muted-foreground">Sab de 8:30H a 12:30H</p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/contacto">
              <Button className="w-full">Ver todos los contactos</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
