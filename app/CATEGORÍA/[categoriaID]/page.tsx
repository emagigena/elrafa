"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import ProductGrid from "@/components/product/ProductGrid"
import FilterSidebar from "@/components/filters/FilterSidebar"
import MobileFilters from "@/components/filters/MobileFilters"
import { Skeleton } from "@/components/ui/skeleton"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function CategoryPage({ params }: { params: { categoriaID: string } }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: "",
    brand: "all",
    caliber: "all",
    type: "all",
    sort: "default",
  })

  const { categoriaID } = params

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        initFirebase()
        const db = getFirestore()
        const productsRef = collection(db, "PRODUCTOS")
        const q = query(productsRef, where("CATEGORÍA", "==", decodeURIComponent(categoriaID)))

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
  }, [categoriaID])

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const filteredProducts = products
    .filter((product) => {
      const productName = product.NOMBRE?.toLowerCase() || ""
      const productBrand = product.MARCA?.toLowerCase() || ""
      const productType = product.TIPO?.toLowerCase() || ""
      const productCaliber = product.CALIBRE

      return (
        productName.includes(filters.name.toLowerCase()) &&
        (filters.brand === "all" || productBrand === filters.brand.toLowerCase()) &&
        (filters.caliber === "all" || productCaliber === Number(filters.caliber)) &&
        (filters.type === "all" || productType === filters.type.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (filters.sort === "price-high") {
        return (b.PRECIO || 0) - (a.PRECIO || 0)
      } else if (filters.sort === "price-low") {
        return (a.PRECIO || 0) - (b.PRECIO || 0)
      } else if (filters.sort === "newest") {
        // Assuming newer products have higher IDs
        return b.id.localeCompare(a.id)
      } else if (filters.sort === "popular") {
        // For now, just use stock as a proxy for popularity
        return (b.STOCK || 0) - (a.STOCK || 0)
      }
      return 0
    })

  const brands = [...new Set(products.map((product) => product.MARCA))]
  const calibers = [...new Set(products.map((product) => product.CALIBRE))]
  const types = [...new Set(products.map((product) => product.TIPO))]
  const isArmeria = categoriaID === "ARMERÍA"

  const categoryName = decodeURIComponent(categoriaID)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categorias">Categorías</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">{categoryName}</h1>

      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            brands={brands}
            calibers={calibers}
            types={types}
            isArmeria={isArmeria}
          />
        </div>

        <div className="space-y-6">
          <MobileFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            brands={brands}
            calibers={calibers}
            types={types}
            isArmeria={isArmeria}
          />

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
              <p className="text-sm text-gray-500">{filteredProducts.length} productos encontrados</p>
              <ProductGrid products={filteredProducts} />
            </>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium">No se encontraron productos</h3>
              <p className="text-muted-foreground mt-2">Intenta cambiar los filtros o busca otro término</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
