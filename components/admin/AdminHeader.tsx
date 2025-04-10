import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface AdminHeaderProps {
  title: string
  backLink?: string
}

export default function AdminHeader({ title, backLink }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {backLink && (
          <Button variant="outline" size="icon" asChild>
            <Link href={backLink}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/">Ver tienda</Link>
        </Button>
      </div>
    </div>
  )
}
