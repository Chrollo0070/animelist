import MangaCard from './MangaCard'

export default function MangaGrid({ manga, onSelect }) {
    if (manga.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <div className="empty-state-text">No manga found</div>
            </div>
        )
    }

    return (
        <div className="manga-grid">
            {manga.map((m) => (
                <MangaCard key={m.id} manga={m} onClick={() => onSelect(m.id)} />
            ))}
        </div>
    )
}
