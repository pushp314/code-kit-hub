import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, SortAsc, X } from 'lucide-react';
import { RootState, AppDispatch } from '../../store';
import { fetchAssets } from '../../store/slices/assetSlice';
import { setCategory, setPriceRange, setSort, clearFilters } from '../../store/slices/uiSlice';
import AssetCard from '../../components/marketplace/AssetCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { ASSET_CATEGORIES } from '../../config';

const MarketplacePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showFilters, setShowFilters] = useState(false);
  const { assets, loading, totalPages, currentPage } = useSelector((state: RootState) => state.assets);
  const { searchQuery, filters } = useSelector((state: RootState) => state.ui);
  const { wishlist } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAssets({
      page: currentPage,
      category: filters.category,
      search: searchQuery,
      sort: filters.sort
    }));
  }, [dispatch, currentPage, filters.category, searchQuery, filters.sort]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSort(sort));
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    dispatch(setPriceRange(range));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const isInWishlist = (assetId: string) => {
    return wishlist.some(item => item._id === assetId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="mt-2 text-gray-600">
              Discover high-quality code assets from our community
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="form-input pr-8"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Filters Sidebar */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {ASSET_CATEGORIES.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.priceRange[1] === 0}
                      onChange={() => handlePriceRangeChange([0, 0])}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Free</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.priceRange[1] === 1000}
                      onChange={() => handlePriceRangeChange([0, 1000])}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Assets Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {assets.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No assets found matching your criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assets.map((asset) => (
                      <AssetCard
                        key={asset._id}
                        asset={asset}
                        inWishlist={isInWishlist(asset._id)}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => dispatch(fetchAssets({ page: index + 1 }))}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;