"use client"

import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"
import ProductDetail from "@/components/product/ProductDetail"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import RelatedProducts from "@/components/product/RelatedProducts"

export default function ProductDetailPage({ params }: { params: { detalleID: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { detalleID } = params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productRef = doc(db, "PRODUCTOS", detalleID)
        const productSnap = await getDoc(productRef)

        if (productSnap.exists()) {
          setProduct({
            id: productSnap.id,
            ...productSnap.data(),
          } as Product)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [detalleID])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-muted-foreground">El producto que estás buscando no existe o ha sido eliminado.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      <div className="mt-16">
        <RelatedProducts category={product.CATEGORÍA} currentProductId={product.id} />
      </div>
    </div>
  )
}
