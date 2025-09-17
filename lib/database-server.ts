import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { Course, TeamMember, Project, Instructor } from '@/types'

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
