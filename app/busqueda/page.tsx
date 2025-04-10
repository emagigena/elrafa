"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import ProductGrid from "@/components/product/ProductGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchQuery)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        initFirebase()
        const db = getFirestore()
        const productsRef = collection(db, "PRODUCTOS")

        // Get all products
        const querySnapshot = await getDocs(productsRef)

        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]

        setProducts(allProducts)

        // Filter products if search term exists
        if (searchQuery.trim()) {
          const searchLower = searchQuery.toLowerCase()
          const filtered = allProducts.filter((product) => {
            return (
              (product.NOMBRE && product.NOMBRE.toLowerCase().includes(searchLower)) ||
              (product.DESCRIPCION && product.DESCRIPCION.toLowerCase().includes(searchLower)) ||
              (product.MARCA && product.MARCA.toLowerCase().includes(searchLower)) ||
              (product.CATEGORÍA && product.CATEGORÍA.toLowerCase().includes(searchLower)) ||
              (product.TIPO && product.TIPO.toLowerCase().includes(searchLower))
            )
          })
          setFilteredProducts(filtered)
        } else {
          // Show all products if no search term
          setFilteredProducts(allProducts)
        }
      } catch (error) {
        console.error("Error searching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL without refreshing the page
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchTerm)
    window.history.pushState({}, "", url)

    // Filter products based on search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      const filtered = products.filter((product) => {
        return (
          (product.NOMBRE && product.NOMBRE.toLowerCase().includes(searchLower)) ||
          (product.DESCRIPCION && product.DESCRIPCION.toLowerCase().includes(searchLower)) ||
          (product.MARCA && product.MARCA.toLowerCase().includes(searchLower)) ||
          (product.CATEGORÍA && product.CATEGORÍA.toLowerCase().includes(searchLower)) ||
          (product.TIPO && product.TIPO.toLowerCase().includes(searchLower))
        )
      })
      setFilteredProducts(filtered)
    } else {
      // Show all products if search term is cleared
      setFilteredProducts(products)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      {searchQuery && (
        <p className="mb-6 text-gray-600">
          Resultados para: <span className="font-medium">{searchQuery}</span>
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} productos encontrados</p>
              <ProductGrid products={filteredProducts} />
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium">No se encontraron productos</h3>
              <p className="text-muted-foreground mt-2">
                No hay resultados para "{searchQuery}". Intenta con otros términos.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
