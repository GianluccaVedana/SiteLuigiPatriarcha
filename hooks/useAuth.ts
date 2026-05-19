import { useState, useEffect } from 'react'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth(): AuthState & {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (data: Partial<User> & { password: string }) => Promise<boolean>
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem('luigi_cup_user')
    if (stored) {
      try {
        const user = JSON.parse(stored) as User
        setState({ user, isLoading: false, isAuthenticated: true })
      } catch {
        setState({ user: null, isLoading: false, isAuthenticated: false })
      }
    } else {
      setState(s => ({ ...s, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    if (email === 'admin@luigipatriarcha.com' && password === 'admin123') {
      const user: User = {
        id: 'admin-1', name: 'Administrador', email, role: 'admin',
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('luigi_cup_user', JSON.stringify(user))
      setState({ user, isLoading: false, isAuthenticated: true })
      return true
    }
    if (password.length >= 6) {
      const user: User = {
        id: `user-${Date.now()}`, name: email.split('@')[0], email, role: 'user',
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('luigi_cup_user', JSON.stringify(user))
      setState({ user, isLoading: false, isAuthenticated: true })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('luigi_cup_user')
    setState({ user: null, isLoading: false, isAuthenticated: false })
  }

  const register = async (data: Partial<User> & { password: string }): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000))
    const user: User = {
      id: `user-${Date.now()}`,
      name: data.name || 'Usuário',
      email: data.email || '',
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem('luigi_cup_user', JSON.stringify(user))
    setState({ user, isLoading: false, isAuthenticated: true })
    return true
  }

  return { ...state, login, logout, register }
}
