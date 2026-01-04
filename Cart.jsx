import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
    clearCart,
  } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Chưa đăng nhập -> chuyển đến trang login
      navigate('/login', { 
        state: { from: '/cart' },
        replace: false 
      })
      // Hiển thị thông báo
      alert('Vui lòng đăng nhập để tiếp tục thanh toán!')
    } else {
      // Đã đăng nhập -> tiến hành thanh toán
      alert('Chức năng thanh toán đang phát triển!')
      // TODO: Chuyển sang trang checkout hoặc xử lý thanh toán
      // navigate('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal >= 5000000 ? 0 : 50000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Tiếp tục mua sắm</span>
        </button>

        <h1 className="text-4xl font-bold mb-2">Giỏ hàng</h1>
        <p className="text-gray-600 mb-8">Bạn có {cart.length} sản phẩm trong giỏ hàng</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  <Link to={`/products/${item.id}`}>
                    <div className="w-32 h-32 bg-gray-50 rounded-lg border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </Link>

                  <div className="flex-1">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-bold text-lg hover:text-blue-600 transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4">{item.brand}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price)} x {item.quantity}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn xóa tất cả?')) clearCart()
              }}
              className="w-full py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
            >
              Xóa tất cả
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Miễn phí</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 text-center">
                    ⚠️ Vui lòng đăng nhập để thanh toán
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl hover:scale-[1.02] transition-all mb-4"
              >
                {isAuthenticated ? 'Thanh toán' : 'Đăng nhập để thanh toán'}
              </button>

              <Link
                to="/products"
                className="block w-full py-3 bg-gray-100 text-center rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart