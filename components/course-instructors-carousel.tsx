import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buildTimeDatabase } from "@/lib/database-build"
import { Mail, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function CourseInstructorsCarousel() {
  const instructors = await buildTimeDatabase.getAllInstructors()
  return (
    <div className="w-full">
      <Carousel autoPlay autoPlayInterval={5000} className="w-full">
        {instructors.map((instructor) => (
          <CarouselItem key={instructor.id}>
            <Card className="bg-card border-border overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardContent className="lg:col-span-2 p-8 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{instructor.name}</h3>
                    <p className="text-primary font-semibold text-lg mb-2">{instructor.title}</p>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{instructor.department}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">{instructor.bio}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {instructor.expertise.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-primary/20 text-primary border-primary/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                      <Link
                        href={`mailto:${instructor.email}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {instructor.email}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
