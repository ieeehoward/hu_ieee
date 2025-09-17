import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Clock } from "lucide-react"
import { externalLinks } from "@/constants/static"
import Image from "next/image"

export function ContactSection() {
  const currentYear = new Date().getFullYear()

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background via-secondary to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-header text-foreground mb-6">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about our programs, want to collaborate, or interested in joining? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16 max-w-4xl mx-auto">
          <Card className="bg-card/80 dark:bg-gray-900 border-border text-center">
            <CardContent className="p-8">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">Get in touch for any inquiries</p>
              <a
                href={externalLinks.email}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ieeehowardbison@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/80 dark:bg-gray-900 border-border text-center">
            <CardContent className="p-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground mb-4">Find us on campus</p>
              <p className="text-foreground">
                Howard University
                <br />
                College of Architecture and Engineering
                <br />
                Washington, DC
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image src="/ieee-logo.png" alt="IEEE Logo" width={50} height={50} />
              <span className="text-foreground font-semibold">Howard University IEEE Student Branch</span>
            </div>
            <p className="text-muted-foreground">© {currentYear} Howard University IEEE Student Branch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
