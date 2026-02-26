import { useRef } from 'react'

const STATUS_DOT = {
    'Reading': 'reading',
    'Completed': 'completed',
    'Plan to Read': 'plan',
}

export default function MangaCard({ manga, onClick }) {
    const bookRef = useRef(null)
    const glareRef = useRef(null)

    const chPct = manga.totalChapters > 0
        ? (manga.chaptersRead / manga.totalChapters) * 100
        : 0
    const firstGenre = manga.genres[0] ?? ''
    const dotClass = STATUS_DOT[manga.status] ?? 'plan'

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const xRel = (e.clientX - rect.left) / rect.width
        const yRel = (e.clientY - rect.top) / rect.height
        const rotY = -28 + xRel * 20
        const rotX = 4 - yRel * 8

        if (bookRef.current) {
            bookRef.current.style.transition = 'none'
            bookRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`
        }
        if (glareRef.current) {
            glareRef.current.style.opacity = '0.8'
            glareRef.current.style.background = `radial-gradient(circle at ${xRel * 100}% ${yRel * 100}%, rgba(255,255,255,0.25) 0%, transparent 65%)`
        }
    }

    const handleMouseEnter = () => {
        if (bookRef.current) {
            bookRef.current.style.transition = 'transform 0.3s ease'
        }
    }

    const handleMouseLeave = () => {
        if (bookRef.current) {
            bookRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
            bookRef.current.style.transform = 'rotateY(-22deg)'
        }
        if (glareRef.current) {
            glareRef.current.style.opacity = '0'
        }
    }

    return (
        <div
            className="card-wrapper"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="manga-book-3d" ref={bookRef}>
                {/* Spine */}
                <div className="book-spine" />
                {/* Pages */}
                <div className="book-pages" />
                {/* Cover face */}
                <div className="book-cover-face">
                    <img
                        src={manga.coverUrl}
                        alt={manga.title}
                        draggable={false}
                        onError={(e) => { e.target.src = 'https://placehold.co/200x300/111/444?text=No+Cover' }}
                    />

                    {/* Glare */}
                    <div className="book-glare" ref={glareRef} />

                    {/* Rating badge */}
                    {manga.rating > 0 && (
                        <div className="card-rating">
                            <svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {manga.rating}
                        </div>
                    )}

                    {/* Ch badge */}
                    <div className="card-ch">CH {manga.chaptersRead}</div>

                    {/* Status dot */}
                    <div className={`status-dot ${dotClass}`} />

                    {/* Bottom info */}
                    <div className="card-info">
                        <div className="card-genre">{firstGenre}</div>
                        <div className="card-title">{manga.title}</div>
                        <div className="card-progress-bar">
                            <div className="card-progress-fill" style={{ width: `${chPct}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
