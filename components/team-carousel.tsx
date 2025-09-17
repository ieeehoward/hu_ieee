import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { teamMemberServiceServer } from "@/lib/database-server"
import Image from "next/image"

export async function TeamCarousel() {
  const teamMembers = await teamMemberServiceServer.getAll()
  return (
    <div className="w-full" style={{ contain: "layout style paint" }}>
      <Carousel autoPlay autoPlayInterval={4000} className="w-full">
        {teamMembers.map((member) => (
          <CarouselItem key={member.id}>
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-64 md:h-80">
                  <Image 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardContent className="md:col-span-2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4 text-lg">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </CardContent>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
