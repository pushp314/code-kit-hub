import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Heart, Star, Download, ExternalLink } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '../../store/slices/userSlice';
import { useAuth } from '../../contexts/AuthContext';

interface AssetCardProps {
  asset: any;
  inWishlist?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, inWishlist = false }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    if (inWishlist) {
      dispatch(removeFromWishlist(asset._id));
    } else {
      dispatch(addToWishlist(asset._id));
    }
  };

  // Use a default image if no preview images are available
  const imageUrl = asset.previewImages && asset.previewImages.length > 0
    ? asset.previewImages[0]
    : 'https://images.pexels.com/photos/5926387/pexels-photo-5926387.jpeg';

  return (
    <Link to={`/marketplace/asset/${asset._id}`} className="group">
      <div className="card hover:translate-y-[-4px] transition-all duration-300">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={asset.title} 
            className="w-full h-48 object-cover object-center rounded-t-lg"
          />
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            } shadow-sm transition-colors`}
          >
            <Heart className="h-4 w-4" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/80 rounded-full px-2 py-1 text-xs font-medium">
            <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
            <span>{asset.rating || '5.0'}</span>
          </div>
          {asset.category && (
            <div className="absolute bottom-3 right-3 bg-primary-600 text-white rounded-full px-2 py-1 text-xs font-medium">
              {asset.category}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {asset.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {asset.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src={asset.seller?.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'} 
                  alt={asset.seller?.name || 'Seller'} 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700">{asset.seller?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                {asset.isFree ? 'Free' : `$${asset.price || '19.99'}`}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              <span>{asset.downloadCount || 0} downloads</span>
            </div>
            {asset.demoUrl && (
              <div className="flex items-center">
                <ExternalLink className="h-3 w-3 mr-1" />
                <span>Live demo</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;