import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const loadingToast = toast.loading(t('loading.signIn'))
    
    try {
      console.log('Attempting login to:', api.defaults.baseURL + '/auth/login')
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const responseData = response.data
      console.log('Login successful:', responseData)
      
      // Handle the nested response format: { success, message, data: { user, token } }
      const { data } = responseData
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response format')
      }
      
      setToken(data.token)
      setUser(data.user)
      
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      
      toast.success(t('success.welcomeBack', { name: data.user.name }), { id: loadingToast })
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Login failed'
      toast.error(errorMessage, { id: loadingToast })
      throw new Error(errorMessage)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    const loadingToast = toast.loading(t('loading.signUp'))
    
    try {
      console.log('Attempting registration to:', api.defaults.baseURL + '/auth/register')
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      const responseData = response.data
      console.log('Registration successful:', responseData)
      
      // Handle the nested response format: { success, message, data: { user, token } }
      const { data } = responseData
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response format')
      }
      
      setToken(data.token)
      setUser(data.user)
      
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      
      toast.success(t('success.welcomeNew', { name: data.user.name }), { id: loadingToast })
    } catch (error: any) {
      console.error('Registration error:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed'
      toast.error(errorMessage, { id: loadingToast })
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    const userName = user?.name || 'user'
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    toast.success(t('success.logout', { name: userName }))
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
