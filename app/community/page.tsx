import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { socialLinks, externalLinks } from "@/constants/static"
import {
  MessageCircle,
  UserPlus,
  Instagram,
  Linkedin,
  Mail,
  ExternalLink,
  Calendar,
  Users,
  Zap,
  Award,
} from "lucide-react"
import Link from "next/link"

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  link: ExternalLink,
}

const benefits = [
  {
    icon: Users,
    title: "Networking Opportunities",
    description: "Connect with industry professionals, alumni, and peers who share your passion for technology.",
  },
  {
    icon: Zap,
    title: "Hands-on Workshops",
    description: "Participate in cutting-edge technical workshops covering the latest technologies and methodologies.",
  },
  {
    icon: Award,
    title: "Professional Development",
    description: "Access to IEEE resources, certifications, and career development opportunities.",
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description: "Attend member-only events, tech talks, and networking sessions with industry leaders.",
  },
]

export default function CommunityPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-header text-white mb-6">Join Our Community</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Become part of a vibrant community of engineers, innovators, and technology enthusiasts. Connect,
            collaborate, and grow with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              <Link href={externalLinks.communityJoin}>Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Join IEEE Howard?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Membership in our IEEE Student Branch opens doors to countless opportunities for personal and professional
              growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-black/40 border-gray-800 hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Get Connected</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose how you'd like to connect with our community. Join our chat for daily updates or become an official
              member for full access to all benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-colors group">
              <CardHeader className="text-center pb-4">
                <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-white">Join Our GroupMe</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Stay connected with daily updates, event announcements, and engage in technical discussions with your
                  peers. Get instant access to our community chat.
                </p>
                <ul className="text-left text-gray-300 mb-6 space-y-2">
                  <li>• Real-time event notifications</li>
                  <li>• Technical discussion channels</li>
                  <li>• Study group coordination</li>
                  <li>• Quick Q&A with peers</li>
                </ul>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link href={externalLinks.groupme} target="_blank" rel="noopener noreferrer">
                    Join GroupMe Chat
                    <MessageCircle className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-primary/50 transition-colors group">
              <CardHeader className="text-center pb-4">
                <UserPlus className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-white">Official Membership</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Become an official IEEE member and unlock exclusive benefits, resources, and networking opportunities
                  that will accelerate your career.
                </p>
                <ul className="text-left text-gray-300 mb-6 space-y-2">
                  <li>• Access to IEEE digital library</li>
                  <li>• Professional certification programs</li>
                  <li>• Exclusive networking events</li>
                  <li>• Resume and career services</li>
                </ul>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link href={externalLinks.registrationForm} target="_blank" rel="noopener noreferrer">
                    Sign Up for Membership
                    <UserPlus className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Follow Our Journey</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest projects, achievements, and community highlights across all our social
              platforms.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap]
              return (
                <Button
                  key={link.name}
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-primary hover:border-primary transition-all duration-300 group bg-transparent px-8"
                >
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    {link.name}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}