import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { FleetSection } from '@/components/FleetSection'
import { ToursSection } from '@/components/ToursSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FleetSection />
      <ToursSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
