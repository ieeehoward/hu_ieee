import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Users, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with technical grid pattern */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute inset-0 ieee-gradient opacity-90" />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="section-header text-white">
              Howard University
              <span className="block text-primary">IEEE Student Branch</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-300 tracking-wide">
              Innovating. Learning. Leading.
            </p>
          </div>

          {/* Mission statement */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Empowering the next generation of engineers and technologists through hands-on learning, cutting-edge
              research, and collaborative innovation. Join us in shaping the future of technology.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div className="flex flex-col items-center space-y-3 p-6 bg-black/40 rounded-lg border border-gray-800">
              <Code className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">Technical Excellence</h3>
              <p className="text-gray-400 text-center">
                Master cutting-edge technologies through hands-on projects and workshops
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-black/40 rounded-lg border border-gray-800">
              <Users className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">Community</h3>
              <p className="text-gray-400 text-center">
                Connect with like-minded engineers and build lasting professional relationships
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-black/40 rounded-lg border border-gray-800">
              <Zap className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">Innovation</h3>
              <p className="text-gray-400 text-center">
                Lead breakthrough research and develop solutions for real-world challenges
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              <Link href="/community">
                Join Our Community
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 bg-transparent"
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
