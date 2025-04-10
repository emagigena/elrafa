"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin" && password === "admin") {
      // Store authentication in sessionStorage
      sessionStorage.setItem("adminAuthenticated", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795488/DESTACADAS/logo-removebg-preview_5_wj9h8h.png"
              alt="El Rafa Logo"
              width={100}
              height={100}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl text-center">Panel de Administración</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ingrese su usuario"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese su contraseña"
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <a href="/">Volver a la tienda</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
