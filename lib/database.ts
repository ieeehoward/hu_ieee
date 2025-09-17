import { createClient } from '@/utils/supabase/client'
import type { Course, TeamMember, Project, Instructor } from '@/types'

const supabase = createClient()

// Courses CRUD operations
export const courseService = {
  async getAll(): Promise<Course[]> {
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

  async create(course: Omit<Course, 'id'>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating course:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<Omit<Course, 'id'>>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating course:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting course:', error)
      return false
    }
    return true
  }
}

// Team Members CRUD operations
export const teamMemberService = {
  async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching team members:', error)
      return []
    }
    return data || []
  },

  async getById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching team member:', error)
      return null
    }
    return data
  },

  async create(member: Omit<TeamMember, 'id'>): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .insert(member)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating team member:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<Omit<TeamMember, 'id'>>): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating team member:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting team member:', error)
      return false
    }
    return true
  }
}

// Projects CRUD operations
export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  },

  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching project:', error)
      return null
    }
    return data
  },

  async create(project: Omit<Project, 'id'>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<Omit<Project, 'id'>>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating project:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      return false
    }
    return true
  }
}

// Instructors CRUD operations
export const instructorService = {
  async getAll(): Promise<Instructor[]> {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching instructors:', error)
      return []
    }
    return data || []
  },

  async getById(id: string): Promise<Instructor | null> {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching instructor:', error)
      return null
    }
    return data
  },

  async create(instructor: Omit<Instructor, 'id'>): Promise<Instructor | null> {
    const { data, error } = await supabase
      .from('instructors')
      .insert(instructor)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating instructor:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<Omit<Instructor, 'id'>>): Promise<Instructor | null> {
    const { data, error } = await supabase
      .from('instructors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating instructor:', error)
      return null
    }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('instructors')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting instructor:', error)
      return false
    }
    return true
  }
}
