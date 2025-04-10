"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Simple client-side authentication check
    const checkAuth = () => {
      // Skip auth check for login page
      if (pathname === "/admin") {
        setIsLoading(false)
        return
      }

      // Check if user is authenticated
      const isLoggedIn = sessionStorage.getItem("adminAuthenticated") === "true"

      if (!isLoggedIn) {
        router.push("/admin")
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Show login page directly
  if (pathname === "/admin") {
    return <>{children}</>
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show admin content if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // This should not be visible as router.push will redirect
  return null
}
