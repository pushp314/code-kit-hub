import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Package, ShoppingBag, Upload, 
  User, Heart, Settings, ChevronRight, ChevronLeft,
  LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../store/slices/authSlice';
import { APP_NAME } from '../config';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isSeller } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  // Close sidebar when route changes (on mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 flex md:hidden transition-opacity ease-linear duration-300 ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        }`} onClick={() => setSidebarOpen(false)}></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Package className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">{APP_NAME}</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <DashboardLink to="/dashboard" icon={<Home />} text="Dashboard" />
              <DashboardLink to="/dashboard/my-assets" icon={<Package />} text="My Assets" />
              <DashboardLink to="/dashboard/purchases" icon={<ShoppingBag />} text="Purchases" />
              {isSeller && (
                <DashboardLink to="/dashboard/upload\" icon={<Upload />} text="Upload Asset" />
              )}
              <DashboardLink to="/dashboard/wishlist" icon={<Heart />} text="Wishlist" />
              <DashboardLink to="/dashboard/profile" icon={<User />} text="Profile" />
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center mt-1"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Package className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">{APP_NAME}</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <DashboardLink to="/dashboard" icon={<Home />} text="Dashboard" />
                <DashboardLink to="/dashboard/my-assets" icon={<Package />} text="My Assets" />
                <DashboardLink to="/dashboard/purchases" icon={<ShoppingBag />} text="Purchases" />
                {isSeller && (
                  <DashboardLink to="/dashboard/upload\" icon={<Upload />} text="Upload Asset" />
                )}
                <DashboardLink to="/dashboard/wishlist" icon={<Heart />} text="Wishlist" />
                <DashboardLink to="/dashboard/profile" icon={<User />} text="Profile" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center mt-1"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface DashboardLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-primary-50 text-primary-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-500' : 'text-gray-500 group-hover:text-gray-500'}`}>
            {icon}
          </div>
          {text}
        </>
      )}
    </NavLink>
  );
};

export default DashboardLayout;