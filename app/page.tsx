import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CoursesPreview } from "@/components/courses-preview"
import { CommunitySection } from "@/components/community-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ contain: "layout style" }}>
      <HeroSection />
      <AboutSection />
      <CoursesPreview />
      <CommunitySection />
      <ContactSection />
    </main>
  )
}
