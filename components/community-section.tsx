import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, UserPlus, Instagram, Linkedin, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { externalLinks, socialLinks } from "@/constants/static"

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  link: ExternalLink,
}

export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-header text-foreground mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with fellow engineers, collaborate on exciting projects, and be part of a vibrant community that's
            shaping the future of technology. Your journey starts here.
          </p>
        </div>

        {/* Call to Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-card/60 dark:bg-black/40 border-border hover:border-primary/50 transition-colors group relative z-10">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Join Our GroupMe</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Stay connected with daily updates, event announcements, and engage in technical discussions with your
                peers.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                <Link href={externalLinks.groupme} target="_blank" rel="noopener noreferrer">
                  Join GroupMe Chat
                  <MessageCircle className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/60 dark:bg-black/40 border-border hover:border-primary/50 transition-colors group relative z-10">
            <CardContent className="p-8 text-center">
              <UserPlus className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Official Membership</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Become an official IEEE member and unlock exclusive benefits, resources, and networking opportunities.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                <Link href={externalLinks.registrationForm} target="_blank" rel="noopener noreferrer">
                  Sign Up Now
                  <UserPlus className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Follow Us</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap]
              return (
                <Button
                  key={link.name}
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-primary hover:border-primary transition-all duration-300 group bg-transparent"
                >
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {link.name}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
