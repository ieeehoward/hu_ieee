import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { projectServiceServer } from "@/lib/database-server"
import Image from "next/image"

export async function ProjectCarousel() {
  const projects = await projectServiceServer.getAll()
  return (
    <div className="w-full" style={{ contain: "layout style paint" }}>
      <Carousel autoPlay autoPlayInterval={6000} className="w-full">
        {projects.map((project) => (
          <CarouselItem key={project.id}>
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-80">
                  <Image 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title} 
                    fill 
                    className="object-cover"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full border border-primary/50 shadow-lg">
                      {project.course}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-md border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
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
