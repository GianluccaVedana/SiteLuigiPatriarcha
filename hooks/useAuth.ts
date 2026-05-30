import { useState, useEffect } from 'react'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  created_at: string
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('luigi_cup_token')
}

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  const s = localStorage.getItem('luigi_cup_user')
  try { return s ? JSON.parse(s) : null } catch { return null }
}

export function useAuth(): AuthState & {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (data: { name: string; email: string; password: string }) => Promise<boolean>
  token: string | null
} {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true, isAuthenticated: false })
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = getStoredToken()
    const u = getStoredUser()
    if (t && u) {
      setToken(t)
      setState({ user: u, isLoading: false, isAuthenticated: true })
    } else {
      setState(s => ({ ...s, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) return false
    const { user, token: t } = await res.json()
    localStorage.setItem('luigi_cup_token', t)
    localStorage.setItem('luigi_cup_user', JSON.stringify(user))
    setToken(t)
    setState({ user, isLoading: false, isAuthenticated: true })
    return true
  }

  const register = async (data: { name: string; email: string; password: string }): Promise<boolean> => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) return false
    const { user, token: t } = await res.json()
    localStorage.setItem('luigi_cup_token', t)
    localStorage.setItem('luigi_cup_user', JSON.stringify(user))
    setToken(t)
    setState({ user, isLoading: false, isAuthenticated: true })
    return true
  }

  const logout = () => {
    localStorage.removeItem('luigi_cup_token')
    localStorage.removeItem('luigi_cup_user')
    setToken(null)
    setState({ user: null, isLoading: false, isAuthenticated: false })
  }

  return { ...state, login, logout, register, token }
}
