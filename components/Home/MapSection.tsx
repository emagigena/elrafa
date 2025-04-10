import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin } from "lucide-react"

export default function MapSection() {
  return (
    <section className="py-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl">Nuestra Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-[200px] w-full overflow-hidden rounded-md">
            <Image src="/placeholder.svg?height=400&width=800" alt="Mapa de ubicación" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-medium">Ver en mapa</p>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-4">
            <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Dirección</h3>
              <p className="text-sm text-muted-foreground">Av. Aristóbulo del Valle 6351, Santa Fe, Argentina</p>
            </div>
          </div>

          <Button className="w-full mt-4" asChild>
            <a href="https://goo.gl/maps/pRXzw7VCNT9yUwaeA" target="_blank" rel="noopener noreferrer">
              Ver en Google Maps
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
