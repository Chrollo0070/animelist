import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useMangaList } from './hooks/useMangaList'
import { useLocalStorage } from './hooks/useLocalStorage'
import { signOut } from './backend/auth'
import Navbar from './components/Navbar'
import FilterSidebar from './components/FilterSidebar'
import MangaGrid from './components/MangaGrid'
import BookModal from './components/BookModal'
import SearchMangaModal from './components/SearchMangaModal'
import AuthPage from './components/AuthPage'

export default function App() {
  const { user, loading: authLoading } = useAuth()
  const { mangaList, add, update, remove } = useMangaList(user)

  const [selectedId, setSelectedId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [theme, setTheme] = useLocalStorage('mangalist-theme', 'dark')
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // ── Derived list ──────────────────────────────────
  const filtered = mangaList
    .filter((m) => filterStatus === 'All' || m.status === filterStatus)
    .filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'az') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return (b.year ?? 0) - (a.year ?? 0)
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      return 0
    })

  const selectedManga = mangaList.find((m) => m.id === selectedId) ?? null

  const handleDelete = (id) => {
    remove(id)
    setSelectedId(null)
  }

  // ── Loading splash ────────────────────────────────
  if (authLoading) {
    return (
      <div data-theme={theme} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div className="search-spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
      </div>
    )
  }

  // ── Auth gate ─────────────────────────────────────
  if (!user) {
    return (
      <div data-theme={theme} style={{ height: '100%', width: '100%' }}>
        <AuthPage />
      </div>
    )
  }

  // ── Main app ──────────────────────────────────────
  return (
    <div data-theme={theme} style={{ height: '100%', width: '100%' }}>
      <Navbar
        count={filtered.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onAdd={() => setShowAdd(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onSignOut={signOut}
      />

      <FilterSidebar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        counts={{
          All: mangaList.length,
          Reading: mangaList.filter((m) => m.status === 'Reading').length,
          'Plan to Read': mangaList.filter((m) => m.status === 'Plan to Read').length,
          Completed: mangaList.filter((m) => m.status === 'Completed').length,
        }}
      />

      <div className="grid-container">
        <MangaGrid manga={filtered} onSelect={(id) => setSelectedId(id)} />
      </div>

      <BookModal
        manga={selectedManga}
        onClose={() => setSelectedId(null)}
        onUpdate={(patch) => update(selectedId, patch)}
        onDelete={() => handleDelete(selectedId)}
      />

      <SearchMangaModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={add}
        existingIds={mangaList.map((m) => m.malId).filter(Boolean)}
      />
    </div>
  )
}
