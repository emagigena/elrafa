import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Truck } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden product-card-transition border-none shadow-md hover:shadow-xl">
      <Link href={`/detalle/${product.id}`} className="block">
        <div className="relative">
          {product.STOCK > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-green-600 text-white rounded-sm px-2 py-1">¡OFERTA!</Badge>
            </div>
          )}

          <div className="relative h-56 bg-white">
            <Image
              src={product.FOTOS[0] || "/placeholder.svg"}
              alt={product.NOMBRE}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">(45)</span>
          </div>

          <h3 className="font-medium text-sm line-clamp-2 h-10 mb-2 hover:text-blue-600 transition-colors">
            {product.NOMBRE}
          </h3>

          <div className="space-y-2">
            <p className="text-xl font-semibold">$ Consultar</p>

            {product.STOCK > 0 ? (
              <div className="flex items-center text-green-600 text-xs">
                <Truck className="h-3 w-3 mr-1" />
                <span>Envíos a todo el país</span>
              </div>
            ) : (
              <div className="text-orange-500 text-xs font-medium">Último disponible!</div>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link href={`/detalle/${product.id}`}>Ver Detalle</Link>
        </Button>
      </div>
    </Card>
  )
}
