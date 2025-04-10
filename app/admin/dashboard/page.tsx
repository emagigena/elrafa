"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initFirebase } from "@/lib/firebase"
import type { Product } from "@/types/product"
import AdminProductList from "@/components/admin/AdminProductList"
import AdminHeader from "@/components/admin/AdminHeader"

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    categories: 0,
    inactive: 0,
  })

  const fetchProducts = async () => {
    try {
      setLoading(true)
      initFirebase()
      const db = getFirestore()
      const productsRef = collection(db, "PRODUCTOS")
      const querySnapshot = await getDocs(productsRef)

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]

      setProducts(productsData)

      // Calculate stats
      const categories = new Set(productsData.map((p) => p.CATEGORÍA)).size
      const lowStock = productsData.filter((p) => (p.STOCK || 0) < 5).length
      const inactive = productsData.filter((p) => p.ESTADO === "inactivo").length

      setStats({
        totalProducts: productsData.length,
        lowStock,
        categories,
        inactive,
      })
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Set admin authentication in session storage
    sessionStorage.setItem("adminAuthenticated", "true")
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader title="Panel de Administración" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Productos</CardTitle>
            <CardDescription>Total de productos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Stock Bajo</CardTitle>
            <CardDescription>Productos con menos de 5 unidades</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.lowStock}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Categorías</CardTitle>
            <CardDescription>Total de categorías</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.categories}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Inactivos</CardTitle>
            <CardDescription>Productos desactivados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.inactive}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos los productos</TabsTrigger>
          <TabsTrigger value="low-stock">Stock bajo</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AdminProductList products={products} loading={loading} onProductUpdate={fetchProducts} />
        </TabsContent>

        <TabsContent value="low-stock">
          <AdminProductList
            products={products.filter((p) => (p.STOCK || 0) < 5)}
            loading={loading}
            onProductUpdate={fetchProducts}
          />
        </TabsContent>

        <TabsContent value="inactive">
          <AdminProductList
            products={products.filter((p) => p.ESTADO === "inactivo")}
            loading={loading}
            onProductUpdate={fetchProducts}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
