"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import categoryData from "@/data/categories.json"

interface CategoryItem {
  nombre: string
  to: string
  text: string
  img: string[]
}

interface CategoryData {
  [key: string]: CategoryItem
}

export default function CategorySection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Update category paths to match the new URL structure
  const updatedCategories = categoryData.map((category) => {
    const categoryType = Object.keys(category)[0]
    const data = { ...(category[categoryType] as CategoryItem) }

    // Update the path to match the new URL structure
    if (data.to.startsWith("/CATEGORÍA/")) {
      const categoryName = data.to.split("/")[2]
      data.to = `/categoria/${categoryName}`
    }

    return { [categoryType]: data }
  })

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Nuestras Categorías</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 staggered-fade-in">
        {updatedCategories.map((category, idx) => {
          const categoryType = Object.keys(category)[0]
          const data = category[categoryType] as CategoryItem

          return (
            <Card key={idx} className="overflow-hidden product-card-transition">
              <div className="relative h-36 md:h-48">
                <Image src={data.img[0] || "/placeholder.svg"} alt={data.nombre} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-1">{data.nombre}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{data.text}</p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href={data.to}>Ver productos</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
