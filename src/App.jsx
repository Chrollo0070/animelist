import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Navbar from './components/Navbar'
import FilterSidebar from './components/FilterSidebar'
import MangaGrid from './components/MangaGrid'
import BookModal from './components/BookModal'
import SearchMangaModal from './components/SearchMangaModal'

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Jujutsu Kaisen',
    author: 'Gege Akutami',
    year: 2018,
    genres: ['Action', 'Dark Fantasy', 'Supernatural'],
    status: 'Reading',
    chaptersRead: 150,
    totalChapters: 271,
    volumesRead: 16,
    totalVolumes: 30,
    rating: 9,
    notes: '',
    synopsis:
      "Yuji Itadori, a kind-hearted teenager, joins his school's Occult Club for fun, but discovers that its members are actual sorcerers who can manipulate the energy between beings for their own use. He swallows a rotting finger belonging to a powerful Curse to protect his friends, becoming its host and entering the dangerous world of Jujutsu Sorcerers.",
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/210341l.jpg',
  },
  {
    id: 2,
    title: 'Vinland Saga',
    author: 'Makoto Yukimura',
    year: 2005,
    genres: ['Historical', 'Action', 'Adventure'],
    status: 'Plan to Read',
    chaptersRead: 0,
    totalChapters: 200,
    volumesRead: 0,
    totalVolumes: 27,
    rating: 10,
    notes: '',
    synopsis:
      "Young Thorfinn grew up listening to the stories of old sailors that had traveled the ocean and reached the place of legend, Vinland. It's said to be warm and fertile, a place where there would be no need for fighting—not at all like the frozen village in Iceland where he was born, and certainly not like his current life as a mercenary.",
    coverUrl: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg',
  },
  {
    id: 3,
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    year: 1998,
    genres: ['Historical', 'Martial Arts', 'Seinen'],
    status: 'Completed',
    chaptersRead: 327,
    totalChapters: 327,
    volumesRead: 37,
    totalVolumes: 37,
    rating: 10,
    notes: '',
    synopsis:
      'In 16th century Japan, Shinmen Takezou is a wild, rough young man, in both his appearance and his actions. His aggressive nature has won him the reproach and fear of his village. Running away from home, he embarks on an incredible journey to become the greatest swordsman in the world, taking the legendary name of Miyamoto Musashi.',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg',
  },
  {
    id: 4,
    title: 'Berserk',
    author: 'Kentaro Miura',
    year: 1989,
    genres: ['Dark Fantasy', 'Action', 'Tragedy'],
    status: 'Reading',
    chaptersRead: 250,
    totalChapters: 364,
    volumesRead: 25,
    totalVolumes: 41,
    rating: 10,
    notes: '',
    synopsis:
      'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart. Bound by a demonic brand, he must constantly battle monsters and demons while hunting the man who betrayed him.',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
  },
  {
    id: 5,
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    year: 2018,
    genres: ['Action', 'Dark Fantasy', 'Horror'],
    status: 'Reading',
    chaptersRead: 97,
    totalChapters: 197,
    volumesRead: 11,
    totalVolumes: 22,
    rating: 9,
    notes: '',
    synopsis:
      'Denji is a young man who lives with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been working for the yakuza while hunting devils with Pochita. One day, Denji is betrayed and killed by a devil. However, Pochita merges with his dead body and Denji is revived as the Chainsaw Man.',
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/216464l.jpg',
  },
  {
    id: 6,
    title: 'Goodnight Punpun',
    author: 'Inio Asano',
    year: 2007,
    genres: ['Slice of Life', 'Drama', 'Psychological'],
    status: 'Completed',
    chaptersRead: 147,
    totalChapters: 147,
    volumesRead: 13,
    totalVolumes: 13,
    rating: 10,
    notes: '',
    synopsis:
      `Punpun Punyama is a normal 11-year-old boy living in Japan. When he is exposed to the dysfunction of adult society—from his father's arrest to his uncle's strange coping methods—he begins to see the world in a new way. This is the haunting and unflinching story of one boy's passage through life.`,
    coverUrl: 'https://cdn.myanimelist.net/images/manga/3/182776l.jpg',
  },
]


export default function App() {
  const [mangaList, setMangaList] = useLocalStorage('mangalist-v1', INITIAL_DATA)
  const [selectedId, setSelectedId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default') // 'default' | 'az' | 'year' | 'rating'
  const [theme, setTheme] = useLocalStorage('mangalist-theme', 'dark')
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // ── Derived list ──────────────────────────────────
  const filtered = mangaList
    .filter((m) => {
      if (filterStatus === 'All') return true
      return m.status === filterStatus
    })
    .filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'az') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return b.year - a.year
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      return 0
    })

  const selectedManga = mangaList.find((m) => m.id === selectedId) ?? null

  // ── Mutations ─────────────────────────────────────
  const updateManga = (id, patch) => {
    setMangaList((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  const deleteManga = (id) => {
    setMangaList((prev) => prev.filter((m) => m.id !== id))
    setSelectedId(null)
  }

  const addManga = (newManga) => {
    const id = Date.now()
    setMangaList((prev) => [
      ...prev,
      { id, chaptersRead: 0, volumesRead: 0, notes: '', rating: 0, ...newManga },
    ])
    setShowAdd(false)
  }

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
        onUpdate={(patch) => updateManga(selectedId, patch)}
        onDelete={() => deleteManga(selectedId)}
      />

      <SearchMangaModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={addManga}
        existingIds={mangaList.map((m) => m.malId).filter(Boolean)}
      />
    </div>
  )
}
