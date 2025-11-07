import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const { isAuthenticated, user } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (user?.id) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } else {
      setFavorites([])
    }
  }, [user?.id])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (user?.id && favorites.length >= 0) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites))
    }
  }, [favorites, user?.id])

  const addToFavorites = (property) => {
    if (!isAuthenticated) return
    setFavorites(prev => {
      if (prev.some(p => p.id === property.id)) return prev
      return [...prev, property]
    })
  }

  const removeFromFavorites = (propertyId) => {
    if (!isAuthenticated) return
    setFavorites(prev => prev.filter(p => p.id !== propertyId))
  }

  const isFavorite = (propertyId) => {
    return favorites.some(p => p.id === propertyId)
  }

  const toggleFavorite = (property) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id)
    } else {
      addToFavorites(property)
    }
  }

  const LoginPrompt = () => {
    if (!showLoginPrompt) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-gray-600 mb-4">Please login to add properties to your favorites.</p>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowLoginPrompt(false)
                window.location.href = '/login'
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="flex-1 border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
      <LoginPrompt />
    </FavoritesContext.Provider>
  )
}