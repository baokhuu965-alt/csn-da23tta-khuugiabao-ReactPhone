import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, Star, Minus, Plus, ChevronLeft, Smartphone, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useFavorite } from '../context/FavoriteContext'
import { useAuth } from '../context/AuthContext'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorite()
  const { isAuthenticated } = useAuth()

  const product = products.find((p) => p.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert('Đã thêm vào giỏ hàng!')
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Chưa đăng nhập -> chuyển đến trang login
      alert('Vui lòng đăng nhập để mua hàng!')
      navigate('/login', { 
        state: { from: `/products/${id}` }
      })
    } else {
      // Đã đăng nhập -> thêm vào giỏ và chuyển đến trang giỏ hàng
      addToCart(product, quantity)
      navigate('/cart')
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="relative">
              <div className="aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden relative group">
                <img
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.image;
                  }}
                />
                
                {/* Previous Button */}
                {product.images && product.images.length > 1 && selectedImage > 0 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                )}

                {/* Next Button */}
                {product.images && product.images.length > 1 && selectedImage < product.images.length - 1 && (
                  <button
                    onClick={() => setSelectedImage(selectedImage + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800 rotate-180" />
                  </button>
                )}

                {/* Image Counter */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-50 rounded-lg border-2 transition-all ${
                        selectedImage === index ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - ảnh ${index + 1}`} 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = product.image;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  <span className="gradient-text">{product.brand}</span>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={handleToggleFavorite}
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all group"
                  title={isFavorite(product.id) ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                >
                  <Heart 
                    className={`w-6 h-6 transition-all group-hover:scale-110 ${
                      isFavorite(product.id) 
                        ? 'text-red-600 fill-red-600' 
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-red-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Tiết kiệm {product.discount}%
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              <div className="text-green-600 font-semibold">Còn hàng ({product.stock} sản phẩm)</div>

              <div>
                <label className="block text-sm font-semibold mb-2">Số lượng:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit hover:border-blue-500 transition-colors">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  {isAuthenticated ? 'Mua ngay' : 'Đăng nhập để mua hàng'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-blue-600" />
            Thông số kỹ thuật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <h3 className="font-semibold capitalize text-gray-900">{key}:</h3>
                  <p className="text-gray-600 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Sản phẩm cùng hãng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail