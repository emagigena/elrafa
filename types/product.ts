export interface Product {
  id: string
  NOMBRE: string
  PRECIO?: number
  CATEGORÍA: string
  MARCA?: string
  STOCK: number
  FOTOS: string[]
  TIPO?: string
  CALIBRE?: number
  DESCRIPCION?: string
  ESTADO?: "activo" | "inactivo"
}
