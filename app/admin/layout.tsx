import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Portal - Howard University IEEE",
  description: "Administrative portal for managing IEEE chapter content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {children}
    </div>
  )
}
