import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductFilter from '../components/product/ProductFilter'
import { products, sortOptions } from '../data/products'

const ProductList = () => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    brand: 'Tất cả',
    priceRange: { min: 0, max: Infinity },
  })
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')

  // Lấy brand và search từ URL
  useEffect(() => {
    const brandFromUrl = searchParams.get('brand') || 'Tất cả'
    const searchFromUrl = searchParams.get('search') || ''
    
    setFilters((prev) => ({
      ...prev,
      brand: brandFromUrl,
    }))
    setSearchQuery(searchFromUrl)
  }, [searchParams])

  // Lọc sản phẩm - CHỈ TÌM THEO TÊN
  const filteredProducts = products.filter((product) => {
    // Lọc theo hãng
    const matchBrand = filters.brand === 'Tất cả' || product.brand === filters.brand
    
    // Lọc theo giá
    const matchPrice =
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    
    // TÌM KIẾM CHỈ TRONG TÊN SẢN PHẨM (không tìm trong brand)
    const matchSearch = 
      searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    
    return matchBrand && matchPrice && matchSearch
  })

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name-asc':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const handleResetAll = () => {
    setSearchQuery('')
    setFilters({ brand: 'Tất cả', priceRange: { min: 0, max: Infinity } })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Danh sách sản phẩm</h1>
          <p className="text-gray-600">
            Tìm thấy {sortedProducts.length} sản phẩm
            {searchQuery && ` với từ khóa "${searchQuery}"`}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên sản phẩm (VD: iPhone, Samsung S24, Xiaomi...)"
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Xóa tìm kiếm"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
          
          {searchQuery && (
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Đang tìm kiếm: <span className="font-semibold text-blue-600">"{searchQuery}"</span>
              </div>
              {sortedProducts.length === 0 && (
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Xóa từ khóa
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilter onFilterChange={setFilters} currentFilters={filters} />
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sắp xếp:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || filters.brand !== 'Tất cả' || filters.priceRange.min > 0 || filters.priceRange.max < Infinity) && (
                <button
                  onClick={handleResetAll}
                  className="text-sm text-gray-600 hover:text-red-600 font-semibold"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? (
                      <>
                        Không có sản phẩm nào có tên chứa <span className="font-bold text-blue-600">"{searchQuery}"</span>
                        <br />
                        <span className="text-sm text-gray-500">Gợi ý: Thử tìm "iPhone", "Samsung", "Xiaomi"...</span>
                      </>
                    )
                    : 'Thử thay đổi bộ lọc hoặc tìm kiếm khác'
                  }
                </p>
                <button
                  onClick={handleResetAll}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transition-all"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProductList