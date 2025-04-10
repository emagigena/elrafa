"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartContext } from "@/lib/context/CartContext"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const categories = [
  { name: "ARMERÍA", path: "/categoria/ARMERÍA" },
  { name: "MUNICIONES", path: "/categoria/MUNICIONES" },
  { name: "NÁUTICA", path: "/categoria/NÁUTICA" },
  { name: "PESCA", path: "/categoria/PESCA" },
]

export default function Navbar() {
  const { getTotalItems } = useCartContext()
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleResize()
    handleScroll()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchTerm)}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795488/DESTACADAS/logo-removebg-preview_5_wj9h8h.png"
              alt="El Rafa Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.path}
                href={category.path}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
            >
              CONTACTANOS
            </Link>
          </nav>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-xs w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-1 h-9 border-gray-300"
              />
            </div>
            <Button type="submit" size="sm" variant="ghost" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Menú</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2">
                      Buscar
                    </Button>
                  </form>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      href="/contacto"
                      className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CONTACTANOS
                    </Link>
                  </nav>

                  <div className="mt-auto pt-6">
                    <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Ver carrito ({getTotalItems()})
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
