import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useFavorite } from '../../context/FavoriteContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorite()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  // Tính % giảm giá tự động
  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100
      return Math.round(discount) // Làm tròn
    }
    return 0
  }

  const discountPercent = calculateDiscount()

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  return (
    <div className="bg-white rounded-2xl p-5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden border border-gray-100 shadow-md">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-5 left-5 z-10 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
          -{discountPercent}%
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-5 right-5 z-10 p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-gray-200"
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${
            isFavorite(product.id) 
              ? 'text-red-600 fill-red-600 scale-110' 
              : 'text-gray-400 group-hover:text-red-600'
          }`}
        />
      </button>

      <Link to={`/products/${product.id}`} className="relative z-0">
        {/* Product Image */}
        <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Brand Badge */}
      <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full mb-3">
        <span className="text-xs font-semibold gradient-text">{product.brand}</span>
      </div>

      {/* Product Name */}
      <Link to={`/products/${product.id}`}>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:gradient-text transition-all duration-300 leading-snug">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
        </div>
        <span className="text-xs text-gray-500">({product.reviews} đánh giá)</span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          addToCart(product)
          alert('✅ Đã thêm vào giỏ hàng!')
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Thêm vào giỏ</span>
      </button>
    </div>
  )
}

export default ProductCard