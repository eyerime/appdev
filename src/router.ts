import { useEffect, useState } from 'react'

/**
 * Tiny hash-based router. Hash routing keeps the app working on any static
 * host (GitHub Pages, Netlify drop, `vite preview`) without server rewrites.
 */
const read = () => window.location.hash.replace(/^#/, '') || '/'

export function usePath() {
  const [path, setPath] = useState(read)
  useEffect(() => {
    const onChange = () => {
      setPath(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return path
}

export const navigate = (to: string) => {
  window.location.hash = to
}

export const segments = (path: string) => path.split('?')[0].split('/').filter(Boolean)
