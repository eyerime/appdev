import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'teacher' | 'student'
export type User = { username: string; role: Role; name: string }

/**
 * Hardcoded demo accounts. There is no backend yet, so credentials live in the
 * bundle on purpose. Replace this with a real auth call once a database exists.
 */
export const ACCOUNTS: Record<Role, { username: string; password: string; name: string }> = {
  teacher: { username: 'teacher', password: 'teacher', name: 'Ms. Rivera' },
  student: { username: 'student', password: 'student', name: 'Student' },
}

const KEY = 'speakup-session'

type Auth = { user: User | null; login: (role: Role, username: string, password: string) => boolean; logout: () => void }
const AuthContext = createContext<Auth>({ user: null, login: () => false, logout: () => {} })

function restore(): User | null {
  try {
    const u = JSON.parse(sessionStorage.getItem(KEY) ?? 'null')
    return u && (u.role === 'teacher' || u.role === 'student') ? (u as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(restore)

  const login: Auth['login'] = (role, username, password) => {
    const acc = ACCOUNTS[role]
    if (username.trim().toLowerCase() !== acc.username || password !== acc.password) return false
    const u: User = { username: acc.username, role, name: acc.name }
    setUser(u)
    try { sessionStorage.setItem(KEY, JSON.stringify(u)) } catch { /* ignore */ }
    return true
  }
  const logout = () => {
    setUser(null)
    try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
