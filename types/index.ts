export interface Course {
  id: string
  title: string
  description: string
  year: string
  semester: string
  thumbnail: string
  slug: string
  status: "current" | "past"
  duration: string
  enrolled: number
  created_at?: string
  updated_at?: string
}

export interface SyllabusItem {
  week: number
  topic: string
  description: string
}

export interface CourseDetails {
  id: string
  course_id: string
  level: string
  instructor: string
  max_capacity: number
  prerequisites: string[]
  learning_objectives: string[]
  syllabus: SyllabusItem[]
  resources: string[]
  created_at?: string
  updated_at?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  created_at?: string
  updated_at?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  course: string
  members: string[]
  created_at?: string
  updated_at?: string
}

export interface Instructor {
  id: string
  name: string
  title: string
  department: string
  image: string
  bio: string
  expertise: string[]
  email: string
  created_at?: string
  updated_at?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ExternalLinks {
  email: string
  location: string
  groupme: string
  registrationForm: string
  calendarEmbed: string
  calendarView: string
  communityJoin: string
}
