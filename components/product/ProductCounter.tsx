"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface ProductCounterProps {
  stock: number
  quantity: number
  onChange: (quantity: number) => void
}

export default function ProductCounter({ stock, quantity, onChange }: ProductCounterProps) {
  const increment = () => {
    if (quantity < stock) {
      onChange(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1)
    }
  }

  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" onClick={decrement} disabled={quantity <= 1}>
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-12 text-center font-medium">{quantity}</span>

      <Button variant="outline" size="icon" onClick={increment} disabled={quantity >= stock}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
