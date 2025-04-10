"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query, limit } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import ProductCard from "@/components/product/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleProducts, setVisibleProducts] = useState(8)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productsRef = collection(db, "PRODUCTOS")
        const q = query(productsRef, limit(20)) // Limit to 20 products initially

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

  const showMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, products.length))
  }

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Todos los Productos</h2>

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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Todos los Productos</h2>
        <Link href="/busqueda?q=">
          <Button variant="outline">Ver todos</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 staggered-fade-in">
        {products.slice(0, visibleProducts).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts < products.length && (
        <div className="mt-8 text-center">
          <Button onClick={showMoreProducts} size="lg">
            Cargar más productos
          </Button>
        </div>
      )}
    </section>
  )
}
