import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { socialLinks, externalLinks } from "@/constants/data"
import Link from "next/link"
import {
  Mail,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  ExternalLink,
  Send,
  MessageCircle,
  Users,
  Calendar,
} from "lucide-react"
import Image from "next/image"

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  link: ExternalLink,
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch for any inquiries or questions",
    contact: "ieeehowardbison@gmail.com",
    action: externalLinks.email,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Find us on the Howard University campus",
    contact: "College of Architecture and Engineering, Washington, DC",
    action: externalLinks.location,
  }
]

const quickActions = [
  {
    icon: MessageCircle,
    title: "Join GroupMe",
    description: "Connect with our community chat",
    action: externalLinks.groupme,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    icon: Users,
    title: "Become a Member",
    description: "Sign up for official membership",
    action: externalLinks.registrationForm,
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    icon: Calendar,
    title: "View Events",
    description: "Check out our upcoming events",
    action: "/calendar",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
]

export default function ContactPage() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Have questions about our programs, want to collaborate, or interested in joining? We'd love to hear from you
            and help you get involved.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How to Reach Us</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the method that works best for you. We're here to help and answer any questions you might have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-black/40 border-gray-800 hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <method.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                  <div className="text-primary font-medium text-sm mb-4">{method.contact}</div>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-primary hover:border-primary bg-transparent"
                  >
                    <Link href={method.action} target={method.action.startsWith("http") ? "_blank" : undefined}>
                      Contact
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible. We typically respond within 24
                hours.
              </p>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          className="bg-black/40 border-gray-700 text-white focus:border-primary"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          className="bg-black/40 border-gray-700 text-white focus:border-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-black/40 border-gray-700 text-white focus:border-primary"
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-white">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        className="bg-black/40 border-gray-700 text-white focus:border-primary"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        rows={5}
                        className="bg-black/40 border-gray-700 text-white focus:border-primary resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <Link
                          href={action.action}
                          target={action.action.startsWith("http") ? "_blank" : undefined}
                          className="flex items-center group"
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${action.color}`}>
                            <action.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold group-hover:text-primary transition-colors">
                              {action.title}
                            </h4>
                            <p className="text-gray-400 text-sm">{action.description}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="space-y-4">
                  {socialLinks.map((link) => {
                    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
                    return (
                      <Card
                        key={link.name}
                        className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-colors"
                      >
                        <CardContent className="p-4">
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center group"
                          >
                            <IconComponent className="w-6 h-6 text-primary mr-4" />
                            <span className="text-white group-hover:text-primary transition-colors font-medium">
                              {link.name}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors ml-auto" />
                          </Link>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <Card className="bg-primary/10 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-white">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">
                    For urgent matters or immediate assistance, join our GroupMe chat where our team and community
                    members are active throughout the day.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                    <Link href={externalLinks.groupme} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join GroupMe
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Howard University</h4>
                    <p className="text-gray-300">
                      College of Architecture and Engineering
                      <br />
                      2366 Sixth Street NW
                      <br />
                      Washington, DC 20059
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Link href={externalLinks.location} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monday - Friday</span>
                      <span className="text-white">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Saturday</span>
                      <span className="text-white">By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sunday</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Office hours are during the academic year. Summer hours may vary.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image src="/ieee-logo.png" alt="IEEE Logo" width={32} height={32} />
              <span className="text-white font-semibold">Howard University IEEE Student Branch</span>
            </div>
            <p className="text-gray-400">© {currentYear} Howard University IEEE Student Branch. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
