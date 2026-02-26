const FILTERS = ['All', 'Reading', 'Plan to Read', 'Completed']

const DOTS = {
    Reading: '#38bdf8',
    'Plan to Read': '#a78bfa',
    Completed: '#4ade80',
}

export default function FilterSidebar({ filterStatus, setFilterStatus, counts }) {
    return (
        <div className="filter-sidebar">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    className={`filter-tab ${filterStatus === f ? 'active' : ''}`}
                    onClick={() => setFilterStatus(f)}
                    title={`${f} (${counts[f] ?? counts['All']})`}
                >
                    {f === 'All' ? `ALL · ${counts.All}` : `${f} · ${counts[f] ?? 0}`}
                </button>
            ))}
        </div>
    )
}
