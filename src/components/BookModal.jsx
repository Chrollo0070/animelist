import { useEffect, useRef, useState } from 'react'

const STATUSES = ['Reading', 'Plan to Read', 'Completed']

function CustomSelect({ value, onChange }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                type="button"
                className="custom-select-btn"
                onClick={() => setOpen((o) => !o)}
            >
                <span>{value.toUpperCase()}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="custom-select-menu">
                    {STATUSES.map((s) => (
                        <div
                            key={s}
                            className={`custom-select-option ${value === s ? 'selected' : ''}`}
                            onClick={() => { onChange(s); setOpen(false) }}
                        >
                            {s.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function BookModal({ manga, onClose, onUpdate, onDelete }) {
    const isOpen = !!manga
    const overlayRef = useRef(null)

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const chPct = manga && manga.totalChapters > 0
        ? (manga.chaptersRead / manga.totalChapters) * 100 : 0

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose()
    }

    const markComplete = () => {
        if (!manga) return
        onUpdate({ status: 'Completed', chaptersRead: manga.totalChapters, volumesRead: manga.totalVolumes })
    }

    return (
        <div
            ref={overlayRef}
            className={`modal-overlay ${isOpen ? 'open' : ''}`}
            onClick={handleOverlayClick}
        >
            {manga && (
                <div className={`book-modal ${isOpen ? 'open' : ''}`}>
                    {/* ── LEFT PANE ── */}
                    <div className="modal-left">
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 30%, #e879f9 0%, transparent 70%)' }} />

                        <div className="modal-cover-wrap">
                            <img src={manga.coverUrl} alt={manga.title}
                                onError={(e) => { e.target.src = 'https://placehold.co/200x300/111/444?text=No+Cover' }} />
                        </div>

                        <div className="modal-meta-grid">
                            <div className="modal-meta-cell">
                                <span className="modal-meta-label">Year</span>
                                <span className="modal-meta-value">{manga.year}</span>
                            </div>
                            <div className="modal-meta-cell">
                                <span className="modal-meta-label">Author</span>
                                <span className="modal-meta-value" title={manga.author}>{manga.author}</span>
                            </div>
                            <div className="modal-meta-cell full">
                                <span className="modal-meta-label">Genres</span>
                                <span className="modal-meta-value" title={manga.genres.join(', ')}>
                                    {manga.genres.map((g) => g.toUpperCase()).join(' · ')}
                                </span>
                            </div>
                        </div>

                        <div className="modal-db-actions">
                            <button className="modal-db-btn">MAL</button>
                            <button className="modal-db-btn">AniList</button>
                            <button className="modal-db-btn">DEX</button>
                            <button className="modal-db-btn danger" onClick={() => onDelete()}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT PANE ── */}
                    <div className="modal-right">
                        <button className="modal-close" onClick={onClose}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="modal-title">{manga.title}</h2>
                        <p className="modal-subtitle">
                            {manga.author.toUpperCase()} · {manga.year} · {manga.genres.join(', ')}
                        </p>

                        {/* Shelf + Rating */}
                        <div className="modal-shelf-row">
                            <div className="modal-field">
                                <span className="modal-field-label">Shelf</span>
                                <CustomSelect
                                    value={manga.status}
                                    onChange={(val) => onUpdate({ status: val })}
                                />
                            </div>
                            <div className="modal-field">
                                <span className="modal-field-label">Rating / 10</span>
                                <div className="rating-blocks">
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                        <div
                                            key={n}
                                            className={`rating-block ${n <= (manga.rating ?? 0) ? 'filled' : ''}`}
                                            onClick={() => onUpdate({ rating: n === manga.rating ? 0 : n })}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-divider" />

                        {/* Progress Header */}
                        <div className="progress-header">
                            <span className="progress-label">Progress</span>
                            <button className="mark-complete-btn" onClick={markComplete}>
                                Mark Complete
                            </button>
                        </div>

                        {/* ── CHAPTERS SLIDER ── */}
                        <div className="progress-slider-block">
                            <div className="progress-slider-header">
                                <div className="progress-row-label">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Chapters
                                </div>
                                <div className="progress-nums">
                                    <button className="progress-arrow"
                                        onClick={() => onUpdate({ chaptersRead: Math.max(0, manga.chaptersRead - 1) })}>‹</button>
                                    <span className="progress-num">{manga.chaptersRead}</span>
                                    <span className="progress-sep">/</span>
                                    <span className="progress-total">{manga.totalChapters}</span>
                                    <button className="progress-arrow"
                                        onClick={() => onUpdate({ chaptersRead: Math.min(manga.totalChapters, manga.chaptersRead + 1) })}>›</button>
                                </div>
                            </div>
                            <div className="slider-track-wrap">
                                <input
                                    type="range"
                                    className="progress-slider"
                                    min={0}
                                    max={manga.totalChapters || 1}
                                    value={manga.chaptersRead}
                                    onChange={(e) => onUpdate({ chaptersRead: parseInt(e.target.value) })}
                                    style={{ '--pct': `${chPct}%` }}
                                />
                            </div>
                            <div className="slider-pct-label">{Math.round(chPct)}% complete</div>
                        </div>

                        {/* Synopsis */}
                        <div className="modal-section-label" style={{ marginTop: 8 }}>Synopsis</div>
                        <p className="modal-synopsis">{manga.synopsis}</p>

                        {/* Notes */}
                        <div className="modal-section-label">Personal Notes</div>
                        <textarea
                            className="modal-notes"
                            placeholder="Your thoughts, theories, favorite moments..."
                            value={manga.notes ?? ''}
                            onChange={(e) => onUpdate({ notes: e.target.value })}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
