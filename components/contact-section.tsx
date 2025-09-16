import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  const currentYear = new Date().getFullYear()

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-header text-white mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our programs, want to collaborate, or interested in joining? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="p-8">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 mb-4">Get in touch for any inquiries</p>
              <a
                href="mailto:ieee@howard.edu"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ieee@howard.edu
              </a>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="p-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400 mb-4">Find us on campus</p>
              <p className="text-white">
                Howard University
                <br />
                School of Engineering
                <br />
                Washington, DC
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="p-8">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Office Hours</h3>
              <p className="text-gray-400 mb-4">When we're available</p>
              <p className="text-white">
                Monday - Friday
                <br />
                2:00 PM - 6:00 PM
                <br />
                <span className="text-gray-400 text-sm">During Academic Year</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">IEEE</span>
              </div>
              <span className="text-white font-semibold">Howard University IEEE Student Branch</span>
            </div>
            <p className="text-gray-400">© {currentYear} Howard University IEEE Student Branch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
