"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query, where, limit } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import ProductCard from "./ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productsRef = collection(db, "PRODUCTOS")
        const q = query(productsRef, where("CATEGORÍA", "==", category), limit(4))

        const querySnapshot = await getDocs(q)
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]

        // Filter out current product
        const filteredProducts = productsData.filter((product) => product.id !== currentProductId)

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [category, currentProductId])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
