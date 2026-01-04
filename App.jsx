import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { FavoriteProvider } from './context/FavoriteContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'

// Background Animation Component
const BackgroundAnimation = () => {
  useEffect(() => {
    // Create particles
    const particlesContainer = document.createElement('div')
    particlesContainer.className = 'particles'
    document.body.appendChild(particlesContainer)

    // Generate random particles (30 particles thay vì 20)
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 10 + 's'
      particle.style.animationDuration = (8 + Math.random() * 7) + 's' // 8-15 giây thay vì 15-25
      particlesContainer.appendChild(particle)
    }

    return () => {
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer)
      }
    }
  }, [])

  return (
    <div className="floating-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </div>
  )
}

// ScrollToTop Component - Tự động scroll lên đầu khi đổi route
const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll mượt mà
    })
  }, [location.pathname]) // Chạy mỗi khi pathname thay đổi

  return null
}

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <CartProvider>
          <BrowserRouter>
            <BackgroundAnimation />
            <ScrollToTop /> {/* Thêm component ScrollToTop */}
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </FavoriteProvider>
    </AuthProvider>
  )
}

export default App