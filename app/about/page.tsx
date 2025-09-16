import { Card, CardContent } from "@/components/ui/card"
import { TeamCarousel } from "@/components/team-carousel"
import { ProjectCarousel } from "@/components/project-carousel"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { Users, Target, Award, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-white mb-6">About IEEE Howard</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover our mission, values, and the passionate team driving innovation in engineering and technology at
            Howard University.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Our Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  The Howard University IEEE Student Branch serves as a catalyst for technological innovation and
                  professional development within our engineering community. We are committed to fostering an
                  environment where students can explore cutting-edge technologies, develop practical skills, and build
                  meaningful connections that will shape their careers.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Through hands-on workshops, collaborative research projects, and industry partnerships, we bridge the
                  gap between academic theory and real-world application. Our goal is to empower students with the
                  knowledge, skills, and network necessary to become leaders in the rapidly evolving field of
                  technology.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-black/40 border-gray-800 text-center">
                <CardContent className="p-6">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400 text-sm">Pushing boundaries in technology and engineering</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-gray-800 text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                  <p className="text-gray-400 text-sm">Building lasting professional relationships</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-gray-800 text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Excellence</h3>
                  <p className="text-gray-400 text-sm">Maintaining the highest standards in all endeavors</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-gray-800 text-center">
                <CardContent className="p-6">
                  <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Learning</h3>
                  <p className="text-gray-400 text-sm">Continuous growth and skill development</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Leadership Team</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated individuals who guide our organization and drive our mission forward through their
              expertise and passion for technology.
            </p>
          </div>
          <TeamCarousel />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Featured Projects</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore some of the innovative projects our members have developed, showcasing the practical application
              of engineering principles and cutting-edge technology.
            </p>
          </div>
          <ProjectCarousel />
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What Our Members Say</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hear from current students and alumni about their experiences with IEEE Howard and how it has impacted
              their careers.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* History & Achievements */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From our founding to today, we've consistently pushed the boundaries of what's possible in engineering
              education and student engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-gray-800 text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Students Reached</h3>
                <p className="text-gray-400">Through workshops, events, and programs</p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-gray-800 text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Technical Workshops</h3>
                <p className="text-gray-400">Covering cutting-edge technologies</p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-gray-800 text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Industry Partners</h3>
                <p className="text-gray-400">Collaborating on real-world projects</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
