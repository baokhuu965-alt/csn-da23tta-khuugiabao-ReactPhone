import { createContext, useContext, useState, useEffect } from 'react'

const FavoriteContext = createContext()

export const useFavorite = () => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavorite must be used within FavoriteProvider')
  }
  return context
}

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('phoneFavorites')
      return savedFavorites ? JSON.parse(savedFavorites) : []
    } catch (error) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('phoneFavorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  const getFavoriteCount = () => {
    return favorites.length
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    clearFavorites,
  }

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  )
}