"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartContext } from "@/lib/context/CartContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2, MessageCircle, CheckCircle2 } from "lucide-react"
import type { Product } from "@/types/product"
import ProductCounter from "./ProductCounter"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.FOTOS[0])
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCartContext()

  const handleAddToCart = () => {
    addToCart({
      ...product,
      cantidad: quantity,
    })
    setAddedToCart(true)
  }

  const getProductDescription = () => {
    if (product.DESCRIPCION) {
      return product.DESCRIPCION
    }

    return "Este es un producto de nuestra página web. Para consultar, por favor envía un mensaje de WhatsApp ¡Gracias!"
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4 text-sm">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href={`/CATEGORÍA/${product.CATEGORÍA}`} className="text-blue-600 hover:text-blue-800">
          {product.CATEGORÍA}
        </Link>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left column - Images */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="relative h-[500px]">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product.NOMBRE}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.FOTOS.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(photo)}
                className={`relative h-20 w-20 border-2 rounded overflow-hidden flex-shrink-0 ${
                  selectedImage === photo ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={`${product.NOMBRE} - Imagen ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right column - Product info */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-500">Nuevo | {product.STOCK} vendidos</span>
              <div className="flex ml-auto">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-medium mb-2">{product.NOMBRE}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-blue-600 ml-2 hover:underline cursor-pointer">45 opiniones</span>
            </div>

            {product.STOCK > 0 && <Badge className="bg-green-600 text-white mb-4">¡OFERTA ESPECIAL!</Badge>}

            <div className="mb-6">
              <p className="text-3xl font-semibold">$ Consultar</p>
              <p className="text-sm text-gray-500">Precio exclusivo web</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-green-600">
                <Truck className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Envío gratis a todo el país</p>
                  <p className="text-xs text-gray-600">Conoce los tiempos y formas de envío</p>
                </div>
              </div>

              <div className="flex items-center text-green-600">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Stock disponible</p>
                  <p className="text-xs text-gray-600">{product.STOCK} unidades disponibles</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {!addedToCart ? (
                <>
                  <div className="flex items-center">
                    <span className="mr-4">Cantidad:</span>
                    <ProductCounter stock={product.STOCK} quantity={quantity} onChange={setQuantity} />
                    <span className="ml-4 text-sm text-gray-500">({product.STOCK} disponibles)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={product.STOCK === 0}
                    >
                      Agregar al carrito
                    </Button>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                      disabled={product.STOCK === 0}
                    >
                      Consultar ahora
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800">¡Producto agregado al carrito!</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild className="w-full">
                      <Link href="/cart">Ver carrito</Link>
                    </Button>

                    <Button variant="outline" asChild className="w-full">
                      <Link href="/">Seguir comprando</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm">Garantía de satisfacción - 30 días para devoluciones</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product details tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="description" className="text-base">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="details" className="text-base">
              Características
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base">
              Opiniones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-6 bg-white rounded-md border">
            <h3 className="text-xl font-medium mb-4">Descripción del producto</h3>
            <p className="whitespace-pre-line">{getProductDescription()}</p>
          </TabsContent>

          <TabsContent value="details" className="p-6 bg-white rounded-md border">
            <h3 className="text-xl font-medium mb-4">Características</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.MARCA && (
                  <div className="flex">
                    <span className="font-medium w-32">Marca:</span>
                    <span>{product.MARCA}</span>
                  </div>
                )}
                {product.CATEGORÍA && (
                  <div className="flex">
                    <span className="font-medium w-32">Categoría:</span>
                    <span>{product.CATEGORÍA}</span>
                  </div>
                )}
                {product.TIPO && (
                  <div className="flex">
                    <span className="font-medium w-32">Tipo:</span>
                    <span>{product.TIPO}</span>
                  </div>
                )}
                {product.CALIBRE && (
                  <div className="flex">
                    <span className="font-medium w-32">Calibre:</span>
                    <span>{product.CALIBRE}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-medium w-32">Stock:</span>
                  <span>{product.STOCK} unidades</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="p-6 bg-white rounded-md border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Opiniones del producto</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Escribir opinión
              </Button>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">hace 2 meses</span>
                  </div>
                  <p className="font-medium mb-1">Cliente {review}</p>
                  <p className="text-gray-600">
                    Excelente producto, muy buena calidad y el envío fue rápido. Totalmente recomendado.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
