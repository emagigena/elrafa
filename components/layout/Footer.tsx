import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="red-gradient text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795488/DESTACADAS/logo-removebg-preview_5_wj9h8h.png"
              alt="El Rafa Logo"
              width={90}
              height={90}
              className="mb-4"
            />
          </Link>

          <h3 className="text-xl font-bold mb-4">El Rafa Armeria y Náutica</h3>

          <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>

          <div className="flex space-x-6 mb-6">
            <a
              href="https://www.facebook.com/armeriaynauticaelrafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/armeriaynauticaelrafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=3425152705&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>

          <div className="text-center mt-6">
            <p className="font-medium">© El Rafa™</p>
            <p className="text-sm mt-4">Developed by Emanuel Gigena</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
