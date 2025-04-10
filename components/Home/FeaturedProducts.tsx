"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query, limit, where } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import ProductCard from "@/components/product/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productsRef = collection(db, "PRODUCTOS")
        const q = query(productsRef, where("STOCK", ">", 0), limit(8))

        const querySnapshot = await getDocs(q)
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]

        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Productos Destacados</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Productos Destacados</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 staggered-fade-in">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
