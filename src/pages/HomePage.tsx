import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Package, Sparkles, PenTool as Tool, Server, Shield, Code2, Rocket } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { fetchFeaturedAssets } from '../store/slices/assetSlice';
import AssetCard from '../components/marketplace/AssetCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ASSET_CATEGORIES } from '../config';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredAssets, loading } = useSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatch(fetchFeaturedAssets());
  }, [dispatch]);

  const getIconForCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'ui-kits':
        return <Package className="h-6 w-6" />;
      case 'templates':
        return <Code2 className="h-6 w-6" />;
      case 'mini-projects':
        return <Sparkles className="h-6 w-6" />;
      case 'utilities':
        return <Tool className="h-6 w-6" />;
      case 'api-collections':
        return <Server className="h-6 w-6" />;
      case 'snippets':
        return <Code2 className="h-6 w-6" />;
      case 'project-starters':
        return <Rocket className="h-6 w-6" />;
      default:
        return <Package className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Premium Code Assets for Modern Developers
            </h1>
            <p className="mt-6 text-xl text-white opacity-90 max-w-3xl">
              Discover high-quality UI kits, templates, utilities, and complete project starters to accelerate your development workflow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/marketplace" className="btn-accent text-base px-6 py-3">
                Explore Marketplace
              </Link>
              <Link to="/register" className="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20 text-base px-6 py-3">
                Join CodeKitHub
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 -mr-48 md:mr-0 md:top-24 transform translate-x-1/3 opacity-20 md:opacity-30">
          <svg viewBox="0 0 200 200" width="600" height="600">
            <path fill="#FFFFFF" d="M45.3,-57.4C60.9,-47.3,77.3,-36.7,83.4,-21.3C89.5,-5.9,85.3,14.4,75.5,30.5C65.8,46.6,50.5,58.6,33.9,67.8C17.3,77,0.5,83.5,-18.3,82.7C-37.2,81.9,-58,73.9,-71.6,58.5C-85.2,43.1,-91.5,20.6,-87.7,1.1C-83.9,-18.5,-69.9,-36.9,-54.4,-47.2C-38.9,-57.5,-21.9,-59.6,-4.5,-54.1C12.9,-48.6,29.7,-67.5,45.3,-57.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore by Category</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect assets to accelerate your development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {ASSET_CATEGORIES.map((category) => (
            <Link 
              key={category.id}
              to={`/marketplace/category/${category.id}`}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {getIconForCategory(category.id)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {category.description}
                </p>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-primary-600">Browse category</span>
                <ArrowRight className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Featured Assets Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Assets</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked selections from our marketplace
            </p>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {featuredAssets.slice(0, 6).map((asset) => (
                <AssetCard key={asset._id} asset={asset} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/marketplace" className="btn-primary text-base px-6 py-3">
              View All Assets
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to buy and sell development assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h3>
            <p className="text-gray-600">
              Sign up for a free account to browse assets or become a seller to share your work.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Assets</h3>
            <p className="text-gray-600">
              Browse our marketplace for high-quality code assets and resources.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Download & Use</h3>
            <p className="text-gray-600">
              Instantly download assets and integrate them into your projects.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to accelerate your development?
          </h2>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            Join thousands of developers who are building better projects faster with CodeKitHub.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register" className="btn-accent text-base px-8 py-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;