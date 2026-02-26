import { useState, useEffect, useRef } from 'react'

// Map Jikan API status → our app status
function mapStatus(jikanStatus) {
    if (!jikanStatus) return 'Plan to Read'
    const s = jikanStatus.toLowerCase()
    if (s.includes('publishing') || s.includes('ongoing')) return 'Reading'
    if (s.includes('finished') || s.includes('complete')) return 'Plan to Read'
    return 'Plan to Read'
}

// Map Jikan manga object → our app manga format
function mapJikanToManga(item) {
    return {
        id: Date.now() + Math.random(),
        title: item.title_english || item.title || 'Unknown',
        author: item.authors?.[0]?.name?.split(', ').reverse().join(' ') ?? 'Unknown',
        year: item.published?.prop?.from?.year ?? item.year ?? new Date().getFullYear(),
        genres: item.genres?.map((g) => g.name) ?? [],
        status: 'Plan to Read',
        chaptersRead: 0,
        totalChapters: item.chapters ?? 0,
        volumesRead: 0,
        totalVolumes: item.volumes ?? 0,
        rating: item.score ? Math.round(item.score) : 0,
        notes: '',
        synopsis: item.synopsis ?? '',
        coverUrl: item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? '',
        malId: item.mal_id,
    }
}

export default function SearchMangaModal({ open, onClose, onSubmit, existingIds = [] }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [added, setAdded] = useState(new Set())
    const debounceRef = useRef(null)
    const inputRef = useRef(null)

    // Focus input when modal opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
            setQuery('')
            setResults([])
            setError(null)
            setAdded(new Set())
        }
    }, [open])

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setError(null)
            return
        }
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query.trim())}&limit=18&order_by=popularity`
                )
                if (!res.ok) throw new Error('API error')
                const data = await res.json()
                setResults(data.data ?? [])
            } catch {
                setError('Could not fetch results. Try again in a moment.')
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 500)
        return () => clearTimeout(debounceRef.current)
    }, [query])

    const handleAdd = (item) => {
        const manga = mapJikanToManga(item)
        onSubmit(manga)
        setAdded((prev) => new Set([...prev, item.mal_id]))
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    if (!open) return null

    return (
        <div className="search-modal-overlay" onClick={handleOverlayClick}>
            <div className="search-modal">
                {/* Header */}
                <div className="search-modal-header">
                    <div>
                        <h2 className="search-modal-title">Search Manga</h2>
                        <p className="search-modal-sub">Powered by Jikan / MyAnimeList</p>
                    </div>
                    <button className="modal-close" onClick={onClose} style={{ position: 'relative', top: 'auto', right: 'auto' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search input */}
                <div className="search-modal-input-wrap">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-modal-input"
                        placeholder="Type a manga title... e.g. Berserk, Naruto, One Piece"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && <div className="search-spinner" />}
                </div>

                {/* Results grid */}
                <div className="search-results-wrap">
                    {error && (
                        <div className="search-error">{error}</div>
                    )}

                    {!query.trim() && !loading && (
                        <div className="search-empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                            <p>Search for any manga to add it to your list</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="search-results-grid">
                            {results.map((item) => {
                                const isAdded = added.has(item.mal_id)
                                const coverUrl = item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? ''
                                const title = item.title_english || item.title || 'Unknown'
                                const score = item.score ? item.score.toFixed(1) : 'N/A'
                                const chapters = item.chapters ?? '?'
                                const genre = item.genres?.[0]?.name ?? ''

                                return (
                                    <div key={item.mal_id} className="search-result-card">
                                        {/* Cover */}
                                        <div className="search-result-cover">
                                            {coverUrl ? (
                                                <img
                                                    src={coverUrl}
                                                    alt={title}
                                                    onError={(e) => { e.target.style.display = 'none' }}
                                                />
                                            ) : (
                                                <div className="search-result-no-cover">No Cover</div>
                                            )}
                                            {genre && <span className="search-result-genre">{genre}</span>}
                                        </div>

                                        {/* Info */}
                                        <div className="search-result-info">
                                            <div className="search-result-title" title={title}>{title}</div>
                                            <div className="search-result-meta">
                                                {score !== 'N/A' && <span className="search-result-score">★ {score}</span>}
                                                <span className="search-result-ch">CH {chapters}</span>
                                            </div>
                                        </div>

                                        {/* Add button */}
                                        <button
                                            className={`search-result-add-btn ${isAdded ? 'added' : ''}`}
                                            onClick={() => !isAdded && handleAdd(item)}
                                            disabled={isAdded}
                                        >
                                            {isAdded ? '✓ Added' : '+ Add'}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {query.trim() && !loading && results.length === 0 && !error && (
                        <div className="search-empty-state">
                            <p>No results found for "<strong>{query}</strong>"</p>
                            <p style={{ fontSize: '12px', opacity: 0.6 }}>Try a different spelling or English title</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
