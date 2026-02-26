import { useState } from 'react'
import { signIn, signUp } from '../backend/auth'

export default function AuthPage() {
    const [mode, setMode] = useState('login') // 'login' | 'signup'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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

    return (
        <div className="auth-page">
            {/* Background decoration */}
            <div className="auth-bg-orb auth-orb-1" />
            <div className="auth-bg-orb auth-orb-2" />

            <div className="auth-card">
                {/* Logo */}
                <div className="auth-logo">MANGALIST</div>
                <p className="auth-tagline">Your personal manga universe</p>

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

                    <button type="submit" className="auth-submit" disabled={loading}>
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
