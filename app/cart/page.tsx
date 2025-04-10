"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartContext } from "@/lib/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getFirestore, collection, addDoc, documentId, writeBatch, getDocs, where, query } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import WhatsAppCheckout from "@/components/cart/WhatsAppCheckout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function CartPage() {
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
  })

  const { cartItems, clearCart, removeItem, calculateTotal, getTotalItems } = useCartContext()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (Object.values(formData).some((value) => value === "")) {
      alert("Todos los campos son requeridos")
      return
    }

    try {
      initFirebase()
      const db = getFirestore()

      // Create order
      const order = {
        COMPRADOR: formData,
        TOTAL: calculateTotal(),
        ITEM: cartItems.map((item) => ({
          id: item.id,
          nombre: item.NOMBRE,
          precio: item.PRECIO,
        })),
        fecha: new Date(),
      }

      // Add order to Firestore
      const ordersRef = collection(db, "ORDEN")
      const orderDoc = await addDoc(ordersRef, order)
      setOrderId(orderDoc.id)

      // Update product stock
      const batch = writeBatch(db)
      const productsRef = collection(db, "PRODUCTOS")
      const q = query(
        productsRef,
        where(
          documentId(),
          "in",
          cartItems.map((item) => item.id),
        ),
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.docs.forEach((doc) => {
        const item = cartItems.find((item) => item.id === doc.id)
        if (item) {
          batch.update(doc.ref, {
            STOCK: doc.data().STOCK - item.cantidad,
          })
        }
      })

      await batch.commit()
      clearCart()
      setOrderCompleted(true)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">¡Pedido realizado con éxito!</AlertTitle>
          <AlertDescription className="text-green-700">
            Gracias {formData.nombre} por comprar en El Rafa. Pronto nos comunicaremos contigo.
          </AlertDescription>
        </Alert>

        <div className="text-center mt-8 space-y-6">
          <div className="bg-muted p-4 rounded-md inline-block">
            <h3 className="text-lg font-medium">El código de tu compra es:</h3>
            <p className="text-xl font-bold mt-2">{orderId}</p>
          </div>

          <Button onClick={() => router.push("/")} className="mt-4">
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  if (getTotalItems() === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Alert>
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Tu carrito está vacío</AlertTitle>
          <AlertDescription>No hay productos en tu carrito de pedidos</AlertDescription>
        </Alert>

        <Button onClick={() => router.push("/")} className="mt-8">
          Ir al Inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de Pedidos</h1>

      <div className="grid md:grid-cols-[1fr_400px] gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <Image
                              src={item.FOTOS[0] || "/placeholder.svg"}
                              alt={item.NOMBRE}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.NOMBRE}</p>
                            <p className="text-sm text-muted-foreground">$ Consultar</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                Vaciar carrito
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Seguir comprando</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Formulario de Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={createOrder}>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    placeholder="Ingrese su apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Separator className="my-4" />

                {Object.values(formData).every((value) => value !== "") && (
                  <WhatsAppCheckout cartItems={cartItems} formData={formData} onSubmit={createOrder} />
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
