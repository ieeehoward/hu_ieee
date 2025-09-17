import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseServiceServer, courseDetailsServiceServer } from "@/lib/database-server"
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

  // Get course details from database
  const courseDetails = await courseDetailsServiceServer.getByCourseSlug(params.slug)

  if (!courseDetails) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-background via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
              <Link href="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={course.status === "current" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
                  {course.status === "current" ? "Current" : "Completed"}
                </Badge>
                <Badge variant="outline" className="bg-primary text-primary-foreground border-primary">
                  {course.semester} {course.year}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{course.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">{course.description}</p>

              {/* Course Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">{courseDetails.level}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">
                    {course.enrolled}/{courseDetails.max_capacity}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm">{courseDetails.instructor}</span>
                </div>
              </div>

              {course.status === "current" && (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Learning Objectives */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Target className="w-6 h-6 text-primary mr-3" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {courseDetails.learning_objectives.map((objective, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Syllabus */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Calendar className="w-6 h-6 text-primary mr-3" />
                    Course Syllabus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseDetails.syllabus.map((week) => (
                      <div key={week.week} className="border-l-2 border-primary/30 pl-4">
                        <div className="flex items-center mb-2">
                          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold mr-3">
                            Week {week.week}
                          </span>
                          <h4 className="text-foreground font-semibold">{week.topic}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">{week.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Prerequisites */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseDetails.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start text-muted-foreground text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">Course Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseDetails.resources.map((resource, index) => (
                      <li key={index} className="flex items-start text-muted-foreground text-sm">
                        <ExternalLink className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructor */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold">{courseDetails.instructor}</h4>
                      <p className="text-muted-foreground text-sm">Chair</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {course.status === "current" && (
                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-foreground font-semibold mb-2">Ready to Join?</h3>
                    <p className="text-muted-foreground text-sm mb-4">Spaces are limited. Enroll now to secure your spot.</p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
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
