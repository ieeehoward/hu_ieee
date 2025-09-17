import { createClient } from '@supabase/supabase-js'
import type { Course, TeamMember, Project, Instructor, CourseDetails } from '@/types'

// Build-time database client (no cookies needed)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// Build-time database functions for static generation
export const buildTimeDatabase = {
  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching courses for build:', error)
      return []
    }
    return data || []
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching course by slug for build:', error)
      return null
    }
    return data
  },

  async getAllTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team members for build:', error)
      return []
    }
    return data || []
  },

  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects for build:', error)
      return []
    }
    return data || []
  },

  async getAllInstructors(): Promise<Instructor[]> {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching instructors for build:', error)
      return []
    }
    return data || []
  },

  async getCourseDetailsBySlug(slug: string): Promise<CourseDetails | null> {
    // First get the course by slug
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (courseError || !course) {
      console.error('Error fetching course by slug for build:', courseError)
      return null
    }

    // Then get the course details
    const { data, error } = await supabase
      .from('course_details')
      .select('*')
      .eq('course_id', course.id)
      .single()
    
    if (error) {
      console.error('Error fetching course details for build:', error)
      return null
    }
    return data
  }
}
