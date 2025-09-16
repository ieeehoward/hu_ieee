import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, ArrowLeft } from "lucide-react"

export default function CourseNotFound() {
  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-black">
      <div className="text-center max-w-md mx-auto px-4">
        <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          The course you're looking for doesn't exist or may have been moved. Check out our available courses instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
