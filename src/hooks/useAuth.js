import { useState, useEffect } from 'react'
import { supabase } from '../backend/supabaseClient'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get current session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen to auth changes (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    return { user, loading }
}
