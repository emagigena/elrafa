"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminProductForm from "@/components/admin/AdminProductForm"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productRef = doc(db, "PRODUCTOS", id)
        const productSnap = await getDoc(productRef)

        if (productSnap.exists()) {
          setProduct({
            id: productSnap.id,
            ...productSnap.data(),
          } as Product)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el producto",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleSave = async (updatedProduct: Product) => {
    try {
      setSaving(true)
      initFirebase()
      const db = getFirestore()
      const productRef = doc(db, "PRODUCTOS", id)

      // Remove id from the data to be updated
      const { id: productId, ...productData } = updatedProduct

      await updateDoc(productRef, productData)

      toast({
        title: "Producto actualizado",
        description: "Los cambios han sido guardados correctamente",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AdminHeader title="Cargando producto..." />
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AdminHeader title="Producto no encontrado" />
        <p className="text-muted-foreground">El producto que estás buscando no existe o ha sido eliminado.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader title="Editar Producto" backLink="/admin/dashboard" />

      <AdminProductForm product={product} onSave={handleSave} saving={saving} />
    </div>
  )
}
