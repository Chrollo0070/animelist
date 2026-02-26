import { useState, useEffect, useCallback } from 'react'
import { fetchMangaList, addManga, updateManga, deleteManga } from '../backend/db'

export function useMangaList(user) {
    const [mangaList, setMangaList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Load from Supabase when user is available
    useEffect(() => {
        if (!user) { setMangaList([]); return }
        setLoading(true)
        fetchMangaList(user.id)
            .then((list) => setMangaList(list))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [user])

    // Add manga — optimistic update
    const add = useCallback(async (manga) => {
        if (!user) return
        try {
            const saved = await addManga(manga, user.id)
            setMangaList((prev) => [...prev, saved])
        } catch (e) {
            setError(e.message)
        }
    }, [user])

    // Update manga — optimistic update
    const update = useCallback(async (id, patch) => {
        // Optimistic
        setMangaList((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
        try {
            await updateManga(id, patch, user.id)
        } catch (e) {
            setError(e.message)
            // Revert on failure
            fetchMangaList(user.id).then(setMangaList)
        }
    }, [user])

    // Delete manga
    const remove = useCallback(async (id) => {
        setMangaList((prev) => prev.filter((m) => m.id !== id))
        try {
            await deleteManga(id, user.id)
        } catch (e) {
            setError(e.message)
            fetchMangaList(user.id).then(setMangaList)
        }
    }, [user])

    return { mangaList, loading, error, add, update, remove }
}
