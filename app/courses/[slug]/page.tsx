import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseServiceServer } from "@/lib/database-server"
import { buildTimeDatabase } from "@/lib/database-build"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Users, BookOpen, Target, CheckCircle, ExternalLink, User } from "lucide-react"

interface CoursePageProps {
  params: {
    slug: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await courseServiceServer.getBySlug(params.slug)

  if (!course) {
    notFound()
  }

  // Mock additional course data that would typically come from a CMS or database
  const courseDetails = {
    duration: "12 weeks",
    level: "Intermediate",
    instructor: "Dr. Sarah Johnson",
    enrolled: 28,
    maxCapacity: 30,
    prerequisites: ["Basic programming knowledge", "Familiarity with electronics (recommended)"],
    learningObjectives: [
      "Understand fundamental concepts of embedded systems architecture",
      "Program microcontrollers using C/C++ and Arduino IDE",
      "Design and implement sensor-based projects",
      "Debug and troubleshoot embedded systems",
      "Apply best practices for embedded software development",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Embedded Systems",
        description: "Overview of embedded systems, microcontrollers vs microprocessors",
      },
      {
        week: 2,
        topic: "Arduino Fundamentals",
        description: "Arduino IDE, basic programming, digital I/O",
      },
      {
        week: 3,
        topic: "Analog Input/Output",
        description: "ADC, PWM, sensor interfacing",
      },
      {
        week: 4,
        topic: "Communication Protocols",
        description: "UART, SPI, I2C communication",
      },
      {
        week: 5,
        topic: "Interrupts and Timers",
        description: "Hardware interrupts, timer configurations",
      },
      {
        week: 6,
        topic: "Project Development",
        description: "Hands-on project work and implementation",
      },
    ],
    resources: [
      "Arduino Uno R3 Kit (provided)",
      "Online course materials and videos",
      "Weekly lab sessions",
      "Project starter code repository",
    ],
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              <Link href="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={course.status === "current" ? "bg-primary text-white" : "bg-gray-700 text-gray-300"}>
                  {course.status === "current" ? "Current" : "Completed"}
                </Badge>
                <Badge variant="outline" className="bg-primary text-white border-primary">
                  {course.semester} {course.year}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{course.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">{course.description}</p>

              {/* Course Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">{courseDetails.duration}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <BookOpen className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">{courseDetails.level}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">
                    {courseDetails.enrolled}/{courseDetails.maxCapacity}
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <User className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">Dr. Johnson</span>
                </div>
              </div>

              {course.status === "current" && (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/community">Enroll Now</Link>
                </Button>
              )}
            </div>

            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Learning Objectives */}
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-6 h-6 text-primary mr-3" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {courseDetails.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Syllabus */}
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-6 h-6 text-primary mr-3" />
                    Course Syllabus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseDetails.syllabus.map((week) => (
                      <div key={week.week} className="border-l-2 border-primary/30 pl-4">
                        <div className="flex items-center mb-2">
                          <span className="bg-primary text-white px-2 py-1 rounded text-sm font-semibold mr-3">
                            Week {week.week}
                          </span>
                          <h4 className="text-white font-semibold">{week.topic}</h4>
                        </div>
                        <p className="text-gray-400 text-sm">{week.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Prerequisites */}
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseDetails.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Course Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseDetails.resources.map((resource, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <ExternalLink className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructor */}
              <Card className="bg-black/40 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{courseDetails.instructor}</h4>
                      <p className="text-gray-400 text-sm">Faculty Advisor</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Professor of Electrical Engineering with expertise in embedded systems and IoT applications.
                  </p>
                </CardContent>
              </Card>

              {course.status === "current" && (
                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white font-semibold mb-2">Ready to Join?</h3>
                    <p className="text-gray-300 text-sm mb-4">Spaces are limited. Enroll now to secure your spot.</p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                      <Link href="/community">Enroll Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Generate static params for all courses
export async function generateStaticParams() {
  const courses = await buildTimeDatabase.getAllCourses()
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

// Generate metadata for each course
export async function generateMetadata({ params }: CoursePageProps) {
  const course = await buildTimeDatabase.getCourseBySlug(params.slug)

  if (!course) {
    return {
      title: "Course Not Found",
    }
  }

  return {
    title: `${course.title} - Howard University IEEE`,
    description: course.description,
  }
}
