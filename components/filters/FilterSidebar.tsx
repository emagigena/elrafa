"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
  filters: {
    name: string
    brand: string
    caliber: string
    type: string
    sort: string
  }
  onFilterChange: (name: string, value: string) => void
  brands: any[]
  calibers: any[]
  types: any[]
  isArmeria: boolean
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  brands,
  calibers,
  types,
  isArmeria,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name-filter" className="text-sm font-medium">
              Buscar
            </Label>
            <Input
              id="name-filter"
              placeholder="Buscar por nombre"
              value={filters.name}
              onChange={(e) => onFilterChange("name", e.target.value)}
              className="border-gray-300"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-medium">Marca</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="all-brands"
                  checked={filters.brand === "all"}
                  onCheckedChange={() => onFilterChange("brand", "all")}
                />
                <label htmlFor="all-brands" className="ml-2 text-sm">
                  Todas las marcas
                </label>
              </div>

              {brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brand === brand}
                    onCheckedChange={() => onFilterChange("brand", brand)}
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {isArmeria && (
            <>
              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Tipo</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-types"
                      checked={filters.type === "all"}
                      onCheckedChange={() => onFilterChange("type", "all")}
                    />
                    <label htmlFor="all-types" className="ml-2 text-sm">
                      Todos los tipos
                    </label>
                  </div>

                  {types.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type === type}
                        onCheckedChange={() => onFilterChange("type", type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Calibre</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-calibers"
                      checked={filters.caliber === "all"}
                      onCheckedChange={() => onFilterChange("caliber", "all")}
                    />
                    <label htmlFor="all-calibers" className="ml-2 text-sm">
                      Todos los calibres
                    </label>
                  </div>

                  {calibers.map((caliber) => (
                    <div key={caliber} className="flex items-center">
                      <Checkbox
                        id={`caliber-${caliber}`}
                        checked={filters.caliber === String(caliber)}
                        onCheckedChange={() => onFilterChange("caliber", String(caliber))}
                      />
                      <label htmlFor={`caliber-${caliber}`} className="ml-2 text-sm">
                        {caliber}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <h3 className="font-medium">Ordenar por</h3>
            <Select value={filters.sort} onValueChange={(value) => onFilterChange("sort", value)}>
              <SelectTrigger id="sort-filter" className="border-gray-300">
                <SelectValue placeholder="Sin orden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sin orden</SelectItem>
                <SelectItem value="price-high">Mayor precio</SelectItem>
                <SelectItem value="price-low">Menor precio</SelectItem>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="popular">Más populares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" variant="outline">
            Limpiar filtros
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
