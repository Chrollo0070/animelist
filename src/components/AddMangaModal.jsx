import { useState } from 'react'

const EMPTY = {
    title: '',
    author: '',
    year: new Date().getFullYear(),
    genres: '',
    status: 'Plan to Read',
    totalChapters: 0,
    totalVolumes: 0,
    coverUrl: '',
    synopsis: '',
}

export default function AddMangaModal({ open, onClose, onSubmit }) {
    const [form, setForm] = useState(EMPTY)

    const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.title.trim()) return
        onSubmit({
            ...form,
            year: parseInt(form.year) || new Date().getFullYear(),
            totalChapters: parseInt(form.totalChapters) || 0,
            totalVolumes: parseInt(form.totalVolumes) || 0,
            genres: form.genres ? form.genres.split(',').map((g) => g.trim()).filter(Boolean) : ['Unknown'],
            rating: 0,
        })
        setForm(EMPTY)
    }

    const handleClose = () => {
        setForm(EMPTY)
        onClose()
    }

    return (
        <div className={`add-modal-wrap ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}>
            <div className="add-modal">
                <div className="add-modal-title">
                    Add New Manga
                    <button
                        onClick={handleClose}
                        style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
                    >×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group full">
                            <label className="form-label">Title *</label>
                            <input className="form-input" placeholder="Jujutsu Kaisen" value={form.title} onChange={set('title')} required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Author</label>
                            <input className="form-input" placeholder="Gege Akutami" value={form.author} onChange={set('author')} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Year</label>
                            <input className="form-input" type="number" placeholder="2018" value={form.year} onChange={set('year')} />
                        </div>

                        <div className="form-group full">
                            <label className="form-label">Genres (comma-separated)</label>
                            <input className="form-input" placeholder="Action, Dark Fantasy, Supernatural" value={form.genres} onChange={set('genres')} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Total Chapters</label>
                            <input className="form-input" type="number" placeholder="271" value={form.totalChapters} onChange={set('totalChapters')} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Total Volumes</label>
                            <input className="form-input" type="number" placeholder="30" value={form.totalVolumes} onChange={set('totalVolumes')} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-input" value={form.status} onChange={set('status')} style={{ cursor: 'pointer' }}>
                                <option value="Plan to Read">Plan to Read</option>
                                <option value="Reading">Reading</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Cover URL</label>
                            <input className="form-input" placeholder="https://..." value={form.coverUrl} onChange={set('coverUrl')} />
                        </div>

                        <div className="form-group full">
                            <label className="form-label">Synopsis</label>
                            <textarea
                                className="form-input modal-notes"
                                placeholder="Brief description..."
                                value={form.synopsis}
                                onChange={set('synopsis')}
                                style={{ minHeight: 60, resize: 'vertical' }}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Add to List</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
