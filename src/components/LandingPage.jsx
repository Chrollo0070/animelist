import { useState } from 'react'
import DarkVeil from './DarkVeil'
import AuthModal from './AuthModal'

const FEATURES = [
    {
        icon: '📚',
        title: 'Track Everything',
        desc: 'Log manga you\'re reading, plan to read, or have completed — all in one place.',
    },
    {
        icon: '⭐',
        title: 'Rate & Review',
        desc: 'Give scores, write notes, and keep your personal opinions front and center.',
    },
    {
        icon: '🔍',
        title: 'Search & Discover',
        desc: 'Search millions of titles via the MyAnimeList API and add them instantly.',
    },
    {
        icon: '📊',
        title: 'Visual Progress',
        desc: 'See chapter progress bars, status badges, and stunning 3D book covers.',
    },
    {
        icon: '🌙',
        title: 'Dark & Light Mode',
        desc: 'Switch between sleek dark and clean light themes whenever you like.',
    },
    {
        icon: '☁️',
        title: 'Synced to Cloud',
        desc: 'Your list is saved securely in the cloud — access it from any device.',
    },
]

export default function LandingPage() {
    const [authOpen, setAuthOpen] = useState(false)

    return (
        <div className="landing-root">
            {/* Navigation */}
            <nav className="landing-nav">
                <span className="landing-nav-logo">MANGALIST</span>
                <button className="landing-nav-cta" onClick={() => setAuthOpen(true)}>
                    Sign In
                </button>
            </nav>

            {/* Hero with DarkVeil background */}
            <section className="landing-hero">
                {/* DarkVeil fills the full hero area */}
                <div className="landing-darkveil-bg">
                    <DarkVeil
                        hueShift={0}
                        noiseIntensity={0}
                        scanlineIntensity={0}
                        speed={0.5}
                        scanlineFrequency={0}
                        warpAmount={0}
                    />
                </div>

                {/* Overlay gradient so text stays readable */}
                <div className="landing-hero-overlay" />

                {/* Hero content */}
                <div className="landing-hero-content">
                    <div className="landing-hero-badge">✦ Your Personal Manga Universe</div>
                    <h1 className="landing-hero-title">
                        Track.<br />
                        <span className="landing-gradient-text">Discover.</span><br />
                        Obsess.
                    </h1>
                    <p className="landing-hero-sub">
                        The most beautiful manga tracking app ever built. Organize your reading list,
                        rate titles, and never lose track of where you left off.
                    </p>
                    <div className="landing-hero-actions">
                        <button className="landing-cta-primary" onClick={() => setAuthOpen(true)}>
                            <span>Start Creating</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button className="landing-cta-secondary" onClick={() => {
                            document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
                        }}>
                            See Features
                        </button>
                    </div>
                </div>
            </section>

            {/* App Screenshot / Demo Preview */}
            <section className="landing-preview-section">
                <div className="landing-preview-label">✦ See it in action</div>
                <div className="landing-preview-frame">
                    <div className="landing-preview-toolbar">
                        <span className="landing-preview-dot red" />
                        <span className="landing-preview-dot yellow" />
                        <span className="landing-preview-dot green" />
                        <span className="landing-preview-bar" />
                    </div>
                    <img
                        src="/app-preview.png"
                        alt="MangaList app screenshot"
                        className="landing-preview-img"
                    />
                </div>
            </section>

            {/* Features */}
            <section id="features" className="landing-features">
                <div className="landing-section-header">
                    <div className="landing-section-eyebrow">Everything You Need</div>
                    <h2 className="landing-section-title">Built for manga lovers,<br />by manga lovers</h2>
                </div>
                <div className="landing-features-grid">
                    {FEATURES.map((f) => (
                        <div className="landing-feature-card" key={f.title}>
                            <div className="landing-feature-icon">{f.icon}</div>
                            <h3 className="landing-feature-title">{f.title}</h3>
                            <p className="landing-feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-cta-section">
                <div className="landing-cta-glow" />
                <h2 className="landing-cta-title">Ready to build your list?</h2>
                <p className="landing-cta-sub">Join manga lovers and start tracking today.</p>
                <button className="landing-cta-primary" onClick={() => setAuthOpen(true)}>
                    <span>Start Creating</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <span className="landing-nav-logo" style={{ fontSize: 14 }}>MANGALIST</span>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>Your personal manga universe</span>
            </footer>

            {/* Auth Modal */}
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
    )
}
