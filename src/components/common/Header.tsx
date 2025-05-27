import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Menu, X, Search, ShoppingBag, User, Heart, 
  LogOut, ChevronDown, Settings, DollarSign, 
  Package, Shield, Grid 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../store/slices/authSlice';
import { setSearchQuery } from '../../store/slices/uiSlice';
import { APP_NAME } from '../../config';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const { isAuthenticated, isAdmin, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setProfileDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchText));
    navigate('/marketplace');
    setSearchOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Package className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">{APP_NAME}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">
              Home
            </Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">
              Marketplace
            </Link>
            <div className="relative group">
              <button className="text-gray-700 group-hover:text-primary-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to="/marketplace/category/ui-kits" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">UI Kits</Link>
                  <Link to="/marketplace/category/templates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">Templates</Link>
                  <Link to="/marketplace/category/mini-projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">Mini Projects</Link>
                  <Link to="/marketplace/category/utilities" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">Code Utilities</Link>
                  <Link to="/marketplace/category/api-collections" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">API Collections</Link>
                  <Link to="/marketplace/category/snippets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">Snippets & Components</Link>
                  <Link to="/marketplace/category/project-starters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">Project Starters</Link>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">
              About
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition duration-150 ease-in-out"
            >
              <Search className="h-5 w-5" />
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard/wishlist" className="p-2 text-gray-600 hover:text-primary-600 transition duration-150 ease-in-out">
                  <Heart className="h-5 w-5" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-1 p-2 text-gray-600 hover:text-primary-600 transition duration-150 ease-in-out"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center"
                        >
                          <Grid className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          to="/dashboard/purchases"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Purchases
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-outline text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center -mr-2 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition duration-150 ease-in-out"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary-600 transition duration-150 ease-in-out"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition duration-150 ease-in-out"
            >
              Marketplace
            </Link>
            <div className="py-2">
              <div className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 transition duration-150 ease-in-out">
                Categories
              </div>
              <div className="pl-6 space-y-1">
                <Link to="/marketplace/category/ui-kits" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">UI Kits</Link>
                <Link to="/marketplace/category/templates" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">Templates</Link>
                <Link to="/marketplace/category/mini-projects" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">Mini Projects</Link>
                <Link to="/marketplace/category/utilities" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">Code Utilities</Link>
                <Link to="/marketplace/category/api-collections" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">API Collections</Link>
                <Link to="/marketplace/category/snippets" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">Snippets & Components</Link>
                <Link to="/marketplace/category/project-starters" onClick={() => setMobileMenuOpen(false)} className="block pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50">Project Starters</Link>
              </div>
            </div>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition duration-150 ease-in-out"
            >
              About
            </Link>
          </div>
          
          {/* Mobile menu authenticated actions */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/purchases"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Purchases
                  </Link>
                  <Link
                    to="/dashboard/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Wishlist
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1 px-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center px-4 py-2 rounded-md text-base font-medium text-gray-600 bg-gray-50 hover:text-gray-900 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center px-4 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-16 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for assets, templates, code snippets..."
                className="w-full p-4 pr-12 border-0 focus:ring-0 rounded-t-lg text-gray-900"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
              <div className="absolute right-4 top-4 flex space-x-2">
                <button type="submit" className="text-gray-600 hover:text-primary-600">
                  <Search className="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-600 hover:text-primary-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </form>
            <div className="border-t border-gray-200 py-3 px-4">
              <p className="text-xs text-gray-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['React components', 'Admin templates', 'Authentication', 'API utilities', 'E-commerce starter'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchText(term);
                      handleSearch(new Event('submit') as any);
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;