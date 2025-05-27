import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Heart, Download, ExternalLink, Tag, Check, 
  Star, Clock, User, Shield, ArrowLeft 
} from 'lucide-react';
import { RootState, AppDispatch } from '../../store';
import { fetchAssetById } from '../../store/slices/assetSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/userSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

const AssetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { asset, loading } = useSelector((state: RootState) => state.assets);
  const { wishlist } = useSelector((state: RootState) => state.users);
  const { isAuthenticated } = useAuth();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssetById(id));
    }
  }, [dispatch, id]);

  const isInWishlist = asset ? wishlist.some(item => item._id === asset._id) : false;

  const handleWishlist = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (asset) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(asset._id));
      } else {
        dispatch(addToWishlist(asset._id));
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Asset not found</h2>
          <Link to="/marketplace" className="mt-4 text-primary-600 hover:text-primary-700">
            Return to marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to marketplace
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="p-6">
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={asset.previewImages[activeImage] || 'https://images.pexels.com/photos/5926387/pexels-photo-5926387.jpeg'}
                  alt={asset.title}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {asset.previewImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {asset.previewImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative rounded-md overflow-hidden ${
                        activeImage === index ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Asset Details */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{asset.title}</h1>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      <span className="ml-1 text-sm text-gray-600">
                        {asset.rating || '5.0'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {asset.downloadCount || 0} downloads
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {new Date(asset.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full ${
                    isInWishlist
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isInWishlist ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={asset.seller?.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'}
                    alt={asset.seller?.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {asset.seller?.name}
                      {asset.seller?.isVerified && (
                        <Shield className="inline-block h-4 w-4 ml-1 text-primary-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{asset.seller?.bio}</p>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-600">{asset.description}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Features</h3>
                  <ul className="mt-2 space-y-2">
                    {asset.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Technologies</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {asset.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between py-4 border-t border-gray-200">
                    <span className="text-xl font-bold text-gray-900">
                      {asset.isFree ? 'Free' : `$${asset.price}`}
                    </span>
                    <div className="space-x-4">
                      {asset.demoUrl && (
                        <a
                          href={asset.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                      <button className="btn-primary">
                        <Download className="h-4 w-4 mr-2" />
                        Download Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;