"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Eye, Search, Trash2, AlertTriangle } from "lucide-react"
import type { Product } from "@/types/product"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"

interface AdminProductListProps {
  products: Product[]
  loading: boolean
  onProductUpdate: () => void
}

export default function AdminProductList({ products, loading, onProductUpdate }: AdminProductListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [productToToggle, setProductToToggle] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.MARCA?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.CATEGORÍA.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteProduct = async () => {
    if (!productToDelete) return

    try {
      initFirebase()
      const db = getFirestore()
      await deleteDoc(doc(db, "PRODUCTOS", productToDelete))

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
      })

      onProductUpdate()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      })
    } finally {
      setProductToDelete(null)
    }
  }

  const handleToggleProductStatus = async () => {
    if (!productToToggle) return

    try {
      initFirebase()
      const db = getFirestore()
      const productRef = doc(db, "PRODUCTOS", productToToggle.id)

      const newStatus = productToToggle.ESTADO === "inactivo" ? "activo" : "inactivo"

      await updateDoc(productRef, {
        ESTADO: newStatus,
      })

      toast({
        title: `Producto ${newStatus === "activo" ? "activado" : "desactivado"}`,
        description: `El producto ha sido ${newStatus === "activo" ? "activado" : "desactivado"} correctamente`,
      })

      onProductUpdate()
    } catch (error) {
      console.error("Error updating product status:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del producto",
        variant: "destructive",
      })
    } finally {
      setProductToToggle(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/admin/productos/nuevo">Nuevo Producto</Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No se encontraron productos que coincidan con la búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className={product.ESTADO === "inactivo" ? "bg-gray-50" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden">
                        <Image
                          src={product.FOTOS[0] || "/placeholder.svg"}
                          alt={product.NOMBRE}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium line-clamp-1">{product.NOMBRE}</span>
                        <span className="text-xs text-gray-500">{product.MARCA}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.CATEGORÍA}</TableCell>
                  <TableCell>
                    {(product.STOCK || 0) > 0 ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        {product.STOCK} unidades
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                        Sin stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.ESTADO === "inactivo" ? (
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        Inactivo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Activo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/detalle/${product.id}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/productos/${product.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      {/* Botón para activar/desactivar */}
                      <AlertDialog
                        open={productToToggle?.id === product.id}
                        onOpenChange={() => setProductToToggle(null)}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setProductToToggle(product)}
                            className={product.ESTADO === "inactivo" ? "text-blue-600" : "text-amber-600"}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {product.ESTADO === "inactivo" ? "¿Activar producto?" : "¿Desactivar producto?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {product.ESTADO === "inactivo"
                                ? "El producto volverá a estar visible para los clientes."
                                : "El producto no estará visible para los clientes, pero se conservarán todos sus datos."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleToggleProductStatus}
                              className={product.ESTADO === "inactivo" ? "bg-blue-600" : "bg-amber-600"}
                            >
                              {product.ESTADO === "inactivo" ? "Activar" : "Desactivar"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Botón para eliminar */}
                      <AlertDialog open={productToDelete === product.id} onOpenChange={() => setProductToDelete(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            onClick={() => setProductToDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600">
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
