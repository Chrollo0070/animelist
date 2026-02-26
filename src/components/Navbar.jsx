export default function Navbar({ count, searchQuery, setSearchQuery, sortBy, setSortBy, onAdd, theme, onToggleTheme, user, onSignOut }) {
    const isDark = theme === 'dark'
    const avatarLetter = user?.email?.[0]?.toUpperCase() ?? '?'

    return (
        <nav className="navbar">
            {/* Left: Logo + count */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="navbar-logo">MangaList</span>
                <span className="count-badge">
                    showing <span>{count}</span>
                </span>
            </div>

            {/* Right: actions */}
            <div className="nav-actions">
                {/* Search */}
                <div className="search-wrapper">
                    <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search manga..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="nav-divider" />

                {/* Sort */}
                <button className={`nav-btn ${sortBy === 'az' ? 'active' : ''}`} onClick={() => setSortBy(sortBy === 'az' ? 'default' : 'az')}>A → Z</button>
                <button className={`nav-btn ${sortBy === 'year' ? 'active' : ''}`} onClick={() => setSortBy(sortBy === 'year' ? 'default' : 'year')}>Year</button>
                <button className={`nav-btn ${sortBy === 'rating' ? 'active' : ''}`} onClick={() => setSortBy(sortBy === 'rating' ? 'default' : 'rating')}>★ Rating</button>

                <div className="nav-divider" />

                {/* Theme toggle */}
                <button className="nav-btn theme-toggle-btn" onClick={onToggleTheme} title={isDark ? 'Light Mode' : 'Dark Mode'}>
                    {isDark ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                    {isDark ? 'Light' : 'Dark'}
                </button>

                <div className="nav-divider" />

                {/* Add */}
                <button className="nav-btn nav-btn-add" onClick={onAdd}>+ Add</button>

                <div className="nav-divider" />

                {/* User avatar + sign out */}
                {user && (
                    <div className="nav-user">
                        <div className="nav-avatar" title={user.email}>{avatarLetter}</div>
                        <button className="nav-btn nav-signout" onClick={onSignOut} title="Sign out">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}
