import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Smartphone, User, LogOut, Heart, Search } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useFavorite } from '../../context/FavoriteContext'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getCartCount } = useCart()
  const { getFavoriteCount } = useFavorite()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hidden sm:block">
              PhoneStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              Trang chủ
            </Link>
            <Link to="/products" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              Sản phẩm
            </Link>
            <Link to="/favorites" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              Yêu thích
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên..."
              className="w-full pl-10 pr-20 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all text-sm"
            >
              Tìm
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link to="/favorites" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-6 h-6 hover:text-red-600 transition-colors" />
              {getFavoriteCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getFavoriteCount()}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 hover:text-blue-600 transition-colors" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden xl:block font-medium">{user?.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all whitespace-nowrap"
              >
                <User className="w-4 h-4" />
                <span>Đăng nhập</span>
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên sản phẩm..."
                className="w-full pl-10 pr-16 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md font-semibold text-sm"
              >
                Tìm
              </button>
            </form>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              Trang chủ
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              Sản phẩm
            </Link>
            <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              Yêu thích
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-blue-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header