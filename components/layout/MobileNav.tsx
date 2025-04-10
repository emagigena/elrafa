"use client"

import Link from "next/link"
import { Crosshair, Anchor, Fish, Home } from "lucide-react"

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link href="/categoria/ARMERÍA" className="flex flex-col items-center justify-center w-1/5">
          <Crosshair className="h-5 w-5" />
          <span className="text-xs font-semibold mt-1">ARMAS</span>
        </Link>

        <Link href="/categoria/MUNICIONES" className="flex flex-col items-center justify-center w-1/5">
          <Crosshair className="h-5 w-5" />
          <span className="text-xs font-semibold mt-1">BALAS</span>
        </Link>

        <Link href="/" className="flex flex-col items-center justify-center w-1/5">
          <Home className="h-5 w-5" />
          <span className="text-xs font-semibold mt-1">INICIO</span>
        </Link>

        <Link href="/categoria/NÁUTICA" className="flex flex-col items-center justify-center w-1/5">
          <Anchor className="h-5 w-5" />
          <span className="text-xs font-semibold mt-1">NÁUTICA</span>
        </Link>

        <Link href="/categoria/PESCA" className="flex flex-col items-center justify-center w-1/5">
          <Fish className="h-5 w-5" />
          <span className="text-xs font-semibold mt-1">PESCA</span>
        </Link>
      </div>
    </nav>
  )
}
