"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal, Search } from "lucide-react"

interface MobileFiltersProps {
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

export default function MobileFilters({
  filters,
  onFilterChange,
  brands,
  calibers,
  types,
  isArmeria,
}: MobileFiltersProps) {
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleLocalFilterChange = (name: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    // Apply all filters at once
    Object.entries(localFilters).forEach(([key, value]) => {
      onFilterChange(key, value as string)
    })
    setOpen(false)
  }

  const resetFilters = () => {
    const resetValues = {
      name: "",
      brand: "all",
      caliber: "all",
      type: "all",
      sort: "default",
    }
    setLocalFilters(resetValues)

    // Apply reset to parent
    Object.entries(resetValues).forEach(([key, value]) => {
      onFilterChange(key, value)
    })
  }

  return (
    <div className="lg:hidden mb-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar productos"
            value={filters.name}
            onChange={(e) => onFilterChange("name", e.target.value)}
            className="pl-10"
          />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
              <div className="space-y-3">
                <h3 className="font-medium">Marca</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-brands-mobile"
                      checked={localFilters.brand === "all"}
                      onCheckedChange={() => handleLocalFilterChange("brand", "all")}
                    />
                    <label htmlFor="all-brands-mobile" className="ml-2 text-sm">
                      Todas las marcas
                    </label>
                  </div>

                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-mobile-${brand}`}
                        checked={localFilters.brand === brand}
                        onCheckedChange={() => handleLocalFilterChange("brand", brand)}
                      />
                      <label htmlFor={`brand-mobile-${brand}`} className="ml-2 text-sm">
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
                          id="all-types-mobile"
                          checked={localFilters.type === "all"}
                          onCheckedChange={() => handleLocalFilterChange("type", "all")}
                        />
                        <label htmlFor="all-types-mobile" className="ml-2 text-sm">
                          Todos los tipos
                        </label>
                      </div>

                      {types.map((type) => (
                        <div key={type} className="flex items-center">
                          <Checkbox
                            id={`type-mobile-${type}`}
                            checked={localFilters.type === type}
                            onCheckedChange={() => handleLocalFilterChange("type", type)}
                          />
                          <label htmlFor={`type-mobile-${type}`} className="ml-2 text-sm">
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
                          id="all-calibers-mobile"
                          checked={localFilters.caliber === "all"}
                          onCheckedChange={() => handleLocalFilterChange("caliber", "all")}
                        />
                        <label htmlFor="all-calibers-mobile" className="ml-2 text-sm">
                          Todos los calibres
                        </label>
                      </div>

                      {calibers.map((caliber) => (
                        <div key={caliber} className="flex items-center">
                          <Checkbox
                            id={`caliber-mobile-${caliber}`}
                            checked={localFilters.caliber === String(caliber)}
                            onCheckedChange={() => handleLocalFilterChange("caliber", String(caliber))}
                          />
                          <label htmlFor={`caliber-mobile-${caliber}`} className="ml-2 text-sm">
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
                <Select value={localFilters.sort} onValueChange={(value) => handleLocalFilterChange("sort", value)}>
                  <SelectTrigger id="mobile-sort-filter">
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
            </div>

            <SheetFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Limpiar filtros
              </Button>
              <Button onClick={applyFilters} className="w-full">
                Aplicar filtros
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
