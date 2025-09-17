import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { Course, TeamMember, Project, Instructor, CourseDetails } from '@/types'

// Courses CRUD operations (server-side)
export const courseServiceServer = {
  async getAll(): Promise<Course[]> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching courses:', error)
      return []
    }
    return data || []
  },

  async getById(id: string): Promise<Course | null> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching course:', error)
      return null
    }
    return data
  },

  async getBySlug(slug: string): Promise<Course | null> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching course by slug:', error)
      return null
    }
    return data
  }
}

// Course Details CRUD operations (server-side)
export const courseDetailsServiceServer = {
  async getByCourseId(courseId: string): Promise<CourseDetails | null> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('course_details')
      .select('*')
      .eq('course_id', courseId)
      .single()
    
    if (error) {
      console.error('Error fetching course details:', error)
      return null
    }
    return data
  },

  async getByCourseSlug(slug: string): Promise<CourseDetails | null> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // First get the course by slug
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (courseError || !course) {
      console.error('Error fetching course by slug:', courseError)
      return null
    }

    // Then get the course details
    return this.getByCourseId(course.id)
  }
}

// Team Members CRUD operations (server-side)
export const teamMemberServiceServer = {
  async getAll(): Promise<TeamMember[]> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team members:', error)
      return []
    }
    return data || []
  }
}

// Projects CRUD operations (server-side)
export const projectServiceServer = {
  async getAll(): Promise<Project[]> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  }
}

// Instructors CRUD operations (server-side)
export const instructorServiceServer = {
  async getAll(): Promise<Instructor[]> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching instructors:', error)
      return []
    }
    return data || []
  }
}
