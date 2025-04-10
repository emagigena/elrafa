"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, getFirestore } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminProductForm from "@/components/admin/AdminProductForm"
import { toast } from "@/components/ui/use-toast"

export default function NewProductPage() {
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Producto vacío inicial
  const emptyProduct: Product = {
    id: "",
    NOMBRE: "",
    CATEGORÍA: "",
    STOCK: 0,
    FOTOS: [""],
    MARCA: "",
    TIPO: "",
    DESCRIPCION: "",
  }

  const handleSave = async (product: Product) => {
    try {
      setSaving(true)
      initFirebase()
      const db = getFirestore()
      const productsRef = collection(db, "PRODUCTOS")

      // Eliminar el id ya que Firebase lo generará automáticamente
      const { id, ...productData } = product

      // Añadir el producto a Firestore
      const docRef = await addDoc(productsRef, productData)

      toast({
        title: "Producto creado",
        description: "El producto ha sido creado correctamente",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: "No se pudo crear el producto",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader title="Crear Nuevo Producto" backLink="/admin/dashboard" />

      <AdminProductForm product={emptyProduct} onSave={handleSave} saving={saving} isNew={true} />
    </div>
  )
}
