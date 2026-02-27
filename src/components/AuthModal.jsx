import { useState, useEffect } from 'react'
import { signIn, signUp, signInWithGoogle } from '../backend/auth'

export default function AuthModal({ open, onClose }) {
    const [mode, setMode] = useState('login') // 'login' | 'signup'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!open) {
            setEmail('')
            setPassword('')
            setUsername('')
            setError(null)
            setSuccess(null)
            setLoading(false)
            setGoogleLoading(false)
        }
    }, [open])

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        if (open) window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [open, onClose])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setLoading(true)

        if (mode === 'signup') {
            const { error } = await signUp(email, password, username)
            if (error) {
                setError(error.message)
            } else {
                setSuccess('Account created! Check your email to confirm, then log in.')
                setMode('login')
            }
        } else {
            const { error } = await signIn(email, password)
            if (error) setError(error.message)
        }
        setLoading(false)
    }

    const handleGoogle = async () => {
        setGoogleLoading(true)
        setError(null)
        const { error } = await signInWithGoogle()
        if (error) {
            setError(error.message)
            setGoogleLoading(false)
        }
        // On success, Supabase redirects — page will leave
    }

    return (
        <div
            className={`auth-modal-overlay ${open ? 'open' : ''}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className={`auth-modal-card ${open ? 'open' : ''}`}>
                {/* Close button */}
                <button className="auth-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="auth-modal-header">
                    <div className="auth-logo" style={{ marginBottom: 4 }}>MANGALIST</div>
                    <p className="auth-tagline">
                        {mode === 'login' ? 'Welcome back! Sign in to continue.' : 'Create your free account.'}
                    </p>
                </div>

                {/* Google Sign-In Button */}
                <button
                    className="google-btn"
                    onClick={handleGoogle}
                    disabled={googleLoading || loading}
                    type="button"
                >
                    {googleLoading ? (
                        <div className="search-spinner" style={{ width: 16, height: 16, margin: '0 auto' }} />
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                {/* Divider */}
                <div className="auth-divider"><span>or</span></div>

                {/* Mode tabs */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => { setMode('login'); setError(null); setSuccess(null) }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => { setMode('signup'); setError(null); setSuccess(null) }}
                    >
                        Create Account
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {mode === 'signup' && (
                        <div className="auth-field">
                            <label className="auth-label">Username</label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="chrollo"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">{success}</div>}

                    <button type="submit" className="auth-submit" disabled={loading || googleLoading}>
                        {loading
                            ? 'Please wait...'
                            : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch">
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        className="auth-switch-btn"
                        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
                    >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )
}
