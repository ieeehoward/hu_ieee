import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseServiceServer } from "@/lib/database-server"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, BookOpen } from "lucide-react"

export async function CoursesPreview() {
  const courses = await courseServiceServer.getAll()
  const currentCourses = courses.filter((course) => course.status === "current")
  const pastCourses = courses.filter((course) => course.status === "past").slice(0, 2)

  return (
    <section id="courses" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-header text-white mb-6">Our Courses</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive deep into cutting-edge technologies with our comprehensive course offerings. From embedded systems to
            machine learning, we provide hands-on learning experiences that prepare you for the future of engineering.
          </p>
        </div>

        {/* Current Courses */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <BookOpen className="w-6 h-6 text-primary mr-3" />
              Current Courses
            </h3>
            <Badge variant="secondary" className="bg-primary text-white border-primary">
              Fall 2025
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary text-white border-primary">
                      {course.semester} {course.year}
                    </Badge>
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-white group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 leading-relaxed">{course.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-primary hover:border-primary bg-transparent"
                  >
                    <Link href={`/courses/${course.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Courses Preview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
            Recent Past Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastCourses.map((course) => (
              <Card key={course.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {course.semester} {course.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-400 text-sm">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Courses CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
