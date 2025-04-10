"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/types/product"
import { Loader2, Plus, Trash2, Upload, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AdminProductFormProps {
  product: Product
  onSave: (product: Product) => void
  saving: boolean
  isNew?: boolean
}

export default function AdminProductForm({ product, onSave, saving, isNew = false }: AdminProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    ...product,
  })
  const [activeTab, setActiveTab] = useState("general")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePhotoChange = (index: number, value: string) => {
    const updatedPhotos = [...formData.FOTOS]
    updatedPhotos[index] = value
    setFormData((prev) => ({ ...prev, FOTOS: updatedPhotos }))
  }

  const addPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      FOTOS: [...prev.FOTOS, ""],
    }))
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = [...formData.FOTOS]
    updatedPhotos.splice(index, 1)
    setFormData((prev) => ({ ...prev, FOTOS: updatedPhotos }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.NOMBRE) {
      newErrors.NOMBRE = "El nombre del producto es obligatorio"
    }

    if (!formData.CATEGORÍA) {
      newErrors.CATEGORÍA = "La categoría es obligatoria"
    }

    if (formData.STOCK === undefined || formData.STOCK < 0) {
      newErrors.STOCK = "El stock debe ser un número mayor o igual a 0"
    }

    if (formData.FOTOS.length === 0 || formData.FOTOS.some((photo) => !photo)) {
      newErrors.FOTOS = "Todas las fotos deben tener una URL válida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const categories = ["ARMERÍA", "MUNICIONES", "NÁUTICA", "PESCA"]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="NOMBRE" className={errors.NOMBRE ? "text-destructive" : ""}>
                  Nombre del producto*
                </Label>
                <Input
                  id="NOMBRE"
                  name="NOMBRE"
                  value={formData.NOMBRE || ""}
                  onChange={handleInputChange}
                  className={errors.NOMBRE ? "border-destructive" : ""}
                  required
                />
                {errors.NOMBRE && <p className="text-sm text-destructive">{errors.NOMBRE}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="CATEGORÍA" className={errors.CATEGORÍA ? "text-destructive" : ""}>
                  Categoría*
                </Label>
                <Select
                  value={formData.CATEGORÍA || ""}
                  onValueChange={(value) => handleSelectChange("CATEGORÍA", value)}
                >
                  <SelectTrigger id="CATEGORÍA" className={errors.CATEGORÍA ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.CATEGORÍA && <p className="text-sm text-destructive">{errors.CATEGORÍA}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="MARCA">Marca</Label>
                <Input id="MARCA" name="MARCA" value={formData.MARCA || ""} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="DESCRIPCION">Descripción</Label>
                <Textarea
                  id="DESCRIPCION"
                  name="DESCRIPCION"
                  value={formData.DESCRIPCION || ""}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="TIPO">Tipo</Label>
                <Input id="TIPO" name="TIPO" value={formData.TIPO || ""} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="CALIBRE">Calibre</Label>
                <Input
                  id="CALIBRE"
                  name="CALIBRE"
                  type="number"
                  value={formData.CALIBRE || ""}
                  onChange={handleNumberChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="STOCK" className={errors.STOCK ? "text-destructive" : ""}>
                  Stock*
                </Label>
                <Input
                  id="STOCK"
                  name="STOCK"
                  type="number"
                  min="0"
                  value={formData.STOCK || 0}
                  onChange={handleNumberChange}
                  className={errors.STOCK ? "border-destructive" : ""}
                  required
                />
                {errors.STOCK && <p className="text-sm text-destructive">{errors.STOCK}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="PRECIO">Precio</Label>
                <Input
                  id="PRECIO"
                  name="PRECIO"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.PRECIO || 0}
                  onChange={handleNumberChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ESTADO">Estado</Label>
                <Select
                  value={formData.ESTADO || "activo"}
                  onValueChange={(value) => handleSelectChange("ESTADO", value)}
                >
                  <SelectTrigger id="ESTADO">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.FOTOS && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.FOTOS}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Agrega las URLs de las imágenes del producto</p>
                <Button type="button" variant="outline" size="sm" onClick={addPhoto}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar foto
                </Button>
              </div>

              <div className="space-y-4">
                {formData.FOTOS.map((photo, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 rounded overflow-hidden bg-muted">
                      {photo ? (
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Foto ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <Input
                      value={photo}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                      placeholder="URL de la imagen"
                      className="flex-1"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePhoto(index)}
                      disabled={formData.FOTOS.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isNew ? "Crear producto" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  )
}
