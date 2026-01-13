import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // On mount, check if user exists in localStorage
    const stored = localStorage.getItem('aqo_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
    setIsLoading(false)
  }, [])

  function login(email, name) {
    // Validate input
    if (!email || !name) {
      throw new Error('Email and name are required')
    }
    
    const userData = {
      id: Date.now().toString(),
      email,
      name,
      joinedAt: new Date().toISOString()
    }
    setUser(userData)
    localStorage.setItem('aqo_user', JSON.stringify(userData))
    return userData
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('aqo_user')
  }

  function updateUser(updates) {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('aqo_user', JSON.stringify(updated))
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = React.useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
