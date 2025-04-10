import Hero from "@/components/home/Hero"
import CategorySection from "@/components/home/CategorySection"
import ContactSection from "@/components/home/ContactSection"
import MapSection from "@/components/home/MapSection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import AllProducts from "@/components/home/AllProducts"

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
