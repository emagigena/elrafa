import Hero from "../components/Home/Hero"
import CategorySection from "../components/Home/CategorySection"
import ContactSection from "@/components/Home/ContactSection"
import MapSection from "@/components/Home/MapSection"
import FeaturedProducts from "@/components/Home/FeaturedProducts"
import AllProducts from "@/components/Home/AllProducts"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <FeaturedProducts />
        <CategorySection />
        <AllProducts />
        <div className="grid md:grid-cols-2 gap-8">
          <MapSection />
          <ContactSection />
        </div>
      </div>
    </div>
  )
}
