import { useState } from 'react'

/**
 * Like useState, but syncs the value to localStorage.
 * @param {string} key   localStorage key
 * @param {*} init       default value if key not found
 */
export function useLocalStorage(key, init) {
    const [state, setRaw] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item !== null ? JSON.parse(item) : init
        } catch {
            return init
        }
    })

    const setState = (value) => {
        try {
            const next = typeof value === 'function' ? value(state) : value
            setRaw(next)
            window.localStorage.setItem(key, JSON.stringify(next))
        } catch {/* ignore */ }
    }

    return [state, setState]
}
