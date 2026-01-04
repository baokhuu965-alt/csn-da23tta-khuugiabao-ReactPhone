import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useFavorite } from '../context/FavoriteContext'
import { useCart } from '../context/CartContext'

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorite()
  const { addToCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Chưa có sản phẩm yêu thích</h1>
          <p className="text-gray-600 mb-8">Thêm sản phẩm yêu thích để xem sau</p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          to="/products"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Tiếp tục mua sắm</span>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Sản phẩm yêu thích</h1>
            <p className="text-gray-600">Bạn có {favorites.length} sản phẩm yêu thích</p>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm yêu thích?')) {
                  clearFavorites()
                }
              }}
              className="px-6 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-4 group relative">
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-6 right-6 z-10 p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all"
              >
                <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              </button>

              <Link to={`/products/${product.id}`}>
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
              </Link>

              <div className="text-xs text-blue-600 font-semibold mb-2">
                {product.brand}
              </div>

              <Link to={`/products/${product.id}`}>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                  {product.name}
                </h3>
              </Link>

              <div className="mb-4">
                <div className="text-2xl font-bold text-red-600">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice > product.price && (
                  <div className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  addToCart(product)
                  alert('Đã thêm vào giỏ hàng!')
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites