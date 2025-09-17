import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { externalLinks } from "@/constants/static"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ExternalLink, Plus } from "lucide-react"

const upcomingEvents: {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  attendees: number;
  maxAttendees: number;
}[] = []

const eventTypeColors = {
  Workshop: "bg-primary/20 text-primary border-primary/30",
  Panel: "bg-green-500/20 text-green-400 border-green-500/30",
  Showcase: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Meeting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

export default function CalendarPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-foreground mb-6">Event Calendar</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Stay up-to-date with all our workshops, meetings, and special events. Join us for hands-on learning and
            networking opportunities.
          </p>
        </div>
      </section>

      {/* Calendar Integration */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card/80 dark:bg-black/40 border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-foreground flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary mr-3" />
                Full Calendar View
              </CardTitle>
              <p className="text-muted-foreground">
                View our complete event calendar with all workshops, meetings, and special events.
              </p>
            </CardHeader>
            <CardContent>
            <iframe 
              src={externalLinks.calendarEmbed} 
              className="w-full h-[600px] border-0 rounded-lg"
              title="IEEE Calendar"
            ></iframe>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground">Don't miss these exciting opportunities to learn and connect.</p>
            </div>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
              <Link href="/community">
                <Plus className="w-4 h-4 mr-2" />
                Suggest Event
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      className={eventTypeColors[event.type as keyof typeof eventTypeColors] || eventTypeColors.Meeting}
                    >
                      {event.type}
                    </Badge>
                    <div className="text-muted-foreground text-sm">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 text-primary mr-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 text-primary mr-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Users className="w-4 h-4 text-primary mr-3" />
                      <span>
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-full bg-muted rounded-full h-2 mr-4">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      />
                    </div>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href="/community">Register</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Event Types</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We host a variety of events throughout the semester to cater to different interests and skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/60 dark:bg-black/40 border-border text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Workshops</h3>
                <p className="text-muted-foreground text-sm">Hands-on technical sessions covering cutting-edge technologies</p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 dark:bg-black/40 border-border text-center hover:border-green-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Panel Discussions</h3>
                <p className="text-muted-foreground text-sm">Industry insights and career guidance from professionals</p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 dark:bg-black/40 border-border text-center hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Showcases</h3>
                <p className="text-muted-foreground text-sm">Present and celebrate student projects and achievements</p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 dark:bg-black/40 border-border text-center hover:border-yellow-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Meetings</h3>
                <p className="text-muted-foreground text-sm">Regular organizational meetings and planning sessions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Calendar */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Never Miss an Event</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Subscribe to our calendar to get automatic updates about all our events directly in your calendar app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={externalLinks.calendarView} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Subscribe to Calendar
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Link href="/community">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
