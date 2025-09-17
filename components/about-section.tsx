import { TeamCarousel } from "@/components/team-carousel"
import { ProjectCarousel } from "@/components/project-carousel"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-header text-foreground mb-6">About Us</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Howard University IEEE Student Branch is a dynamic community of engineering and technology students
              dedicated to advancing innovation and professional development. As part of the world's largest technical
              professional organization, we provide our members with unparalleled opportunities to grow, learn, and
              lead.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through cutting-edge workshops, collaborative research projects, and industry partnerships, we bridge the
              gap between academic learning and real-world application. Our mission is to cultivate the next generation
              of technology leaders who will shape the future of engineering.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Meet Our Leadership</h3>
          <TeamCarousel />
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Featured Projects</h3>
          <ProjectCarousel />
        </div>
      </div>
    </section>
  )
}
