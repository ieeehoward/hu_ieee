import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    try {
      // First check if we have a valid session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // No session exists (possibly due to password reset), just clear local state
        console.log("No valid session found, clearing local state")
        setUser(null)
        setSession(null)
        return null
      }

      // Check if session is still valid by making a simple request
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        // Session is invalid (likely due to password reset), clear local state
        console.log("Session invalid, clearing local state:", userError?.message)
        setUser(null)
        setSession(null)
        return null
      }

      // Try to sign out from Supabase with local scope first
      let { error } = await supabase.auth.signOut({ scope: 'local' })
      
      // If local scope fails, try without scope parameter
      if (error) {
        console.warn("Local logout failed, trying without scope:", error)
        const result = await supabase.auth.signOut()
        error = result.error
      }
      
      if (error) {
        console.error("Supabase logout error:", error)
        // Even if Supabase logout fails, clear local state
        setUser(null)
        setSession(null)
        return error
      }

      // Clear local state on successful logout
      setUser(null)
      setSession(null)
      return null
    } catch (error) {
      console.error("Logout error:", error)
      // Clear local state even if there's an error
      setUser(null)
      setSession(null)
      return error
    }
  }

  return {
    user,
    session,
    loading,
    signOut,
  }
}
