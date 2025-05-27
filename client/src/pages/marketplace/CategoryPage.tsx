import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { RootState, AppDispatch } from '../../store';
import { fetchAssets } from '../../store/slices/assetSlice';
import { setCategory } from '../../store/slices/uiSlice';
import AssetCard from '../../components/marketplace/AssetCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { ASSET_CATEGORIES } from '../../config';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { assets, loading } = useSelector((state: RootState) => state.assets);
  const { wishlist } = useSelector((state: RootState) => state.users);

  const categoryInfo = ASSET_CATEGORIES.find(cat => cat.id === category);

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category));
      dispatch(fetchAssets({ category }));
    }
  }, [dispatch, category]);

  const isInWishlist = (assetId: string) => {
    return wishlist.some(item => item._id === assetId);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Category not found</h2>
          <Link to="/marketplace" className="mt-4 text-primary-600 hover:text-primary-700">
            Return to marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to marketplace
        </Link>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.name}</h1>
          <p className="mt-2 text-gray-600 max-w-3xl">{categoryInfo.description}</p>
        </div>

        {/* Assets Grid */}
        {loading ? (
          <LoadingSpinner />
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

        {/* Empty State */}
        {!loading && assets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assets found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;