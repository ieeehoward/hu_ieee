import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseServiceServer } from "@/lib/database-server"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, BookOpen, Clock, Users, GraduationCap } from "lucide-react"
import { CourseInstructorsCarousel } from "@/components/course-instructors-carousel"

export default async function CoursesPage() {
  const courses = await courseServiceServer.getAll()
  const currentCourses = courses.filter((course) => course.status === "current")
  const pastCourses = courses.filter((course) => course.status === "past")
  
  // Calculate total enrollment across all courses
  const totalEnrollment = courses.reduce((total, course) => total + course.enrolled, 0)

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-white mb-6">Our Courses</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive course offerings designed to equip you with cutting-edge technical skills and
            practical experience in engineering and technology.
          </p>
        </div>
      </section>

      {/* Course Statistics */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{courses.length}</div>
              <p className="text-gray-300">Total Courses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{currentCourses.length}</div>
              <p className="text-gray-300">Current Offerings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{totalEnrollment}+</div>
              <p className="text-gray-300">Students Enrolled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Instructors */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary mr-4" />
              Meet Our Instructors
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Learn from experienced faculty and industry professionals who bring real-world expertise to every course.
            </p>
          </div>
          <CourseInstructorsCarousel />
        </div>
      </section>

      {/* Current Courses */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-8 h-8 text-primary mr-4" />
                Current Courses
              </h2>
              <p className="text-lg text-gray-300">
                Join our active courses and start building your technical expertise today.
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
              Fall 2025
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {currentCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">Current</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary text-white border-primary">
                      {course.semester} {course.year}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-primary transition-colors text-xl">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.enrolled}+ enrolled</span>
                    </div>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <Link href={`/courses/${course.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enrollment CTA */}
          <div className="text-center bg-black/40 rounded-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our current courses and gain hands-on experience with the latest technologies. All skill levels
              welcome!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              <Link href="/community">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Past Courses */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center">
              <Clock className="w-8 h-8 text-gray-400 mr-4" />
              Past Courses
            </h2>
            <p className="text-lg text-gray-300">
              Explore our previous course offerings and see the breadth of topics we've covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-black/40 border-gray-800 hover:border-gray-700 transition-colors group"
              >
                <div className="relative h-40 overflow-hidden rounded-t-lg">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      Completed
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {course.semester} {course.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-gray-300 transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Link href={`/courses/${course.slug}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Request */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Don't See What You're Looking For?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            We're always looking to expand our course offerings based on student interest and industry demand. Let us
            know what you'd like to learn!
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-8"
          >
            <Link href="/contact">Request a Course</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
