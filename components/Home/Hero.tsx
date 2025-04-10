"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchTerm)}`)
    } else {
      router.push("/busqueda")
    }
  }

  const backgroundImageMobile =
    'url("https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795977/DESTACADAS/14A2C2E2-6024-4015-8F44-994A9224B1B6_1_fsc4je.png")'

  const backgroundImageDesktop =
    'url("https://res.cloudinary.com/ddoc1iaed/image/upload/v1692796034/DESTACADAS/elrafa44_lbwzh5.jpg")'

  const backgroundImage = isMobile ? backgroundImageDesktop : backgroundImageMobile

  return (
    <section
      className="w-full h-[300px] md:h-[350px] bg-cover bg-center flex items-center justify-center flex-col relative"
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl w-full">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Armería, Náutica, Pesca & Camping
        </h1>

        <p className="text-white text-base md:text-lg mb-6">
          Encontrá todo lo que necesitas para tus aventuras al aire libre.
        </p>

        <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="h-10 pl-10 pr-4 rounded-l-md border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button type="submit" className="h-10 rounded-l-none bg-blue-600 hover:bg-blue-700">
            Buscar
          </Button>
        </form>

        <p className="text-white font-medium mt-4 text-sm md:text-base">
          Lun a Vie 8.30H a 12:30H - 16.30H 20.30H | Sab de 8:30H a 12:30H.
        </p>
      </div>
    </section>
  )
}
