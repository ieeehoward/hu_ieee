import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Electrical Engineering Junior",
    content:
      "The machine learning workshop series completely changed my career trajectory. I'm now pursuing an internship at a top tech company thanks to the skills I learned here.",
    year: "Class of 2025",
  },
]

export function TestimonialCarousel() {
  return (
    <div className="w-full">
      <Carousel autoPlay autoPlayInterval={7000} className="w-full">
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-50" />
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
                  "{testimonial.content}"
                </blockquote>
                <div className="space-y-1">
                  <h4 className="text-foreground font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-primary font-medium">{testimonial.role}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.year}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
