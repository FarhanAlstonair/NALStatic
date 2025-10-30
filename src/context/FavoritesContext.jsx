import { createContext, useContext, useState } from 'react'
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
  const { isAuthenticated } = useAuth()

  const addToFavorites = (property) => {
    setFavorites(prev => [...prev, property])
  }

  const removeFromFavorites = (propertyId) => {
    setFavorites(prev => prev.filter(p => p.id !== propertyId))
  }

  const isFavorite = (propertyId) => {
    return favorites.some(p => p.id === propertyId)
  }

  const toggleFavorite = (property) => {
    if (!isAuthenticated) {
      alert('Please login to add properties to favorites')
      return
    }
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id)
    } else {
      addToFavorites(property)
    }
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
    </FavoritesContext.Provider>
  )
}