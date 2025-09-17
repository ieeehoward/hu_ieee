import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buildTimeDatabase } from "@/lib/database-build"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, BookOpen, Clock, Users, GraduationCap } from "lucide-react"
import { CourseInstructorsCarousel } from "@/components/course-instructors-carousel"

export default async function CoursesPage() {
  const courses = await buildTimeDatabase.getAllCourses()
  const currentCourses = courses.filter((course) => course.status === "current")
  const pastCourses = courses.filter((course) => course.status === "past")
  
  // Calculate total enrollment across all courses
  const totalEnrollment = courses.reduce((total, course) => total + course.enrolled, 0)

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-foreground mb-6">Our Courses</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive course offerings designed to equip you with cutting-edge technical skills and
            practical experience in engineering and technology.
          </p>
        </div>
      </section>

      {/* Course Statistics */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{courses.length}</div>
              <p className="text-muted-foreground">Total Courses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{currentCourses.length}</div>
              <p className="text-muted-foreground">Current Offerings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{totalEnrollment}+</div>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Instructors */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary mr-4" />
              Meet Our Instructors
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn from experienced faculty and industry professionals who bring real-world expertise to every course.
            </p>
          </div>
          <CourseInstructorsCarousel />
        </div>
      </section>

      {/* Current Courses */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center">
                <BookOpen className="w-8 h-8 text-primary mr-4" />
                Current Courses
              </h2>
              <p className="text-lg text-muted-foreground">
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
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
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
                    <Badge className="bg-primary text-primary-foreground">Current</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary text-primary-foreground border-primary">
                      {course.semester} {course.year}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors text-xl">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.enrolled}+ enrolled</span>
                    </div>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
          <div className="text-center bg-card/60 dark:bg-black/40 rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Learning?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our current courses and gain hands-on experience with the latest technologies. All skill levels
              welcome!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link href="/community">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Past Courses */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center">
              <Clock className="w-8 h-8 text-muted-foreground mr-4" />
              Past Courses
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our previous course offerings and see the breadth of topics we've covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-card/50 dark:bg-black/40 border-border hover:border-muted transition-colors group"
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
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                      Completed
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {course.semester} {course.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-foreground text-lg group-hover:text-muted-foreground transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-accent bg-transparent"
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
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Don't See What You're Looking For?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're always looking to expand our course offerings based on student interest and industry demand. Let us
            know what you'd like to learn!
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-accent bg-transparent px-8"
          >
            <Link href="/contact">Request a Course</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
