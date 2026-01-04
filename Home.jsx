import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/products'
import { useState, useEffect } from "react"

const Home = () => {
  // Lọc sản phẩm có rating >= 4.8
  const featuredProducts = products.filter((p) => p.rating >= 4.8).slice(0, 8)
  
  const bannerData = [
    {
      title: "Điện thoại chính hãng",
      highlight: "Giá tốt nhất",
      desc: "Hàng nghìn sản phẩm chính hãng. Ưu đãi lên đến 30%",
    },
    {
      title: "iPhone chính hãng",
      highlight: "Ưu đãi hấp dẫn",
      desc: "Giảm giá sâu · Trả góp 0%",
    },
    {
      title: "Samsung mới nhất",
      highlight: "Hiệu năng mạnh mẽ",
      desc: "Quà tặng giá trị · Bảo hành chính hãng",
    },
  ]

  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length)
    }, 3000) // Giảm xuống 3 giây
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Transparent Glass Effect */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              
              {/* Left: Text Content */}
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">Ưu đãi đặc biệt</span>
                </div>

                <div key={currentBanner} className="banner-image-animate">
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
                    {bannerData[currentBanner].title}
                  </h1>
                  <h2 className="text-3xl md:text-5xl font-black mb-6">
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      {bannerData[currentBanner].highlight}
                    </span>
                  </h2>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed" key={`desc-${currentBanner}`}>
                  {bannerData[currentBanner].desc}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/products"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Mua ngay</span>
                  </Link>
                  
                  <Link
                    to="/products"
                    className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                  >
                    Khám phá
                  </Link>
                </div>

                {/* Banner Indicators */}
                <div className="flex gap-2 pt-4">
                  {bannerData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBanner(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentBanner === index 
                          ? 'w-8 bg-gradient-to-r from-blue-600 to-cyan-600' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Featured Product Image */}
              <div className="relative hidden md:block">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-xl">
                  <div className="aspect-square flex items-center justify-center">
                    <img 
                      src={featuredProducts[currentBanner]?.image || "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg"}
                      alt="Featured Product"
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-500 banner-image-animate drop-shadow-2xl"
                      key={currentBanner}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* White Container for Featured Products */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full border border-blue-200 mb-4">
                <span className="text-sm font-bold text-gray-800">⭐ Đánh giá cao</span>
              </div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="gradient-text">Sản phẩm nổi bật</span>
              </h2>
              <p className="text-gray-700 text-lg">Những sản phẩm được khách hàng đánh giá từ 4.8 sao trở lên</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
          
          </div> {/* Close white container */}
        </div>
      </section>
    </div>
  )
}

export default Home