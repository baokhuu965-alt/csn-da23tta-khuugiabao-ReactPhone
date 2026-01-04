import { brands, priceRanges } from '../../data/products'

const ProductFilter = ({ onFilterChange, currentFilters }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-6">Bộ lọc</h3>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Hãng</h4>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="brand"
              checked={currentFilters.brand === brand}
              onChange={() => onFilterChange({ ... currentFilters, brand })}
              className="w-4 h-4"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Khoảng giá</h4>
        {priceRanges.map((range, idx) => (
          <label key={idx} className="flex items-center space-x-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={
                currentFilters.priceRange. min === range.min &&
                currentFilters.priceRange. max === range.max
              }
              onChange={() =>
                onFilterChange({ ...currentFilters, priceRange: range })
              }
              className="w-4 h-4"
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() =>
          onFilterChange({ brand: 'Tất cả', priceRange: { min: 0, max: Infinity } })
        }
        className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Xóa bộ lọc
      </button>
    </div>
  )
}

export default ProductFilter