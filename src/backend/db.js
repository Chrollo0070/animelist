import { supabase } from './supabaseClient'

// ── snake_case (DB) ↔ camelCase (app) ────────────────────────────
function dbToApp(row) {
    return {
        id: row.id,
        malId: row.mal_id,
        title: row.title,
        author: row.author,
        year: row.year,
        genres: row.genres ?? [],
        status: row.status,
        chaptersRead: row.chapters_read,
        totalChapters: row.total_chapters,
        volumesRead: row.volumes_read,
        totalVolumes: row.total_volumes,
        rating: row.rating,
        notes: row.notes,
        synopsis: row.synopsis,
        coverUrl: row.cover_url,
    }
}

function appToDb(manga, userId) {
    return {
        user_id: userId,
        mal_id: manga.malId ?? null,
        title: manga.title,
        author: manga.author ?? '',
        year: manga.year ?? null,
        genres: manga.genres ?? [],
        status: manga.status ?? 'Plan to Read',
        chapters_read: manga.chaptersRead ?? 0,
        total_chapters: manga.totalChapters ?? 0,
        volumes_read: manga.volumesRead ?? 0,
        total_volumes: manga.totalVolumes ?? 0,
        rating: manga.rating ?? 0,
        notes: manga.notes ?? '',
        synopsis: manga.synopsis ?? '',
        cover_url: manga.coverUrl ?? '',
    }
}

// ── CRUD ─────────────────────────────────────────────────────────

export async function fetchMangaList(userId) {
    const { data, error } = await supabase
        .from('manga_list')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
    if (error) throw error
    return data.map(dbToApp)
}

export async function addManga(manga, userId) {
    const { data, error } = await supabase
        .from('manga_list')
        .insert(appToDb(manga, userId))
        .select()
        .single()
    if (error) throw error
    return dbToApp(data)
}

export async function updateManga(id, patch, userId) {
    // Convert camelCase patch keys to snake_case
    const dbPatch = {}
    if (patch.status !== undefined) dbPatch.status = patch.status
    if (patch.chaptersRead !== undefined) dbPatch.chapters_read = patch.chaptersRead
    if (patch.volumesRead !== undefined) dbPatch.volumes_read = patch.volumesRead
    if (patch.rating !== undefined) dbPatch.rating = patch.rating
    if (patch.notes !== undefined) dbPatch.notes = patch.notes

    const { data, error } = await supabase
        .from('manga_list')
        .update(dbPatch)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()
    if (error) throw error
    return dbToApp(data)
}

export async function deleteManga(id, userId) {
    const { error } = await supabase
        .from('manga_list')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
    if (error) throw error
}
