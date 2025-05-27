import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, Users, Package,
  Settings, Bell, LogOut, Shield
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../store/slices/authSlice';
import { APP_NAME } from '../config';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
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

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
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
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold text-white">{APP_NAME} Admin</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <AdminLink to="/admin" icon={<LayoutDashboard />} text="Dashboard" exact={true} />
              <AdminLink to="/admin/users" icon={<Users />} text="Manage Users" />
              <AdminLink to="/admin/assets" icon={<Package />} text="Manage Assets" />
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-400 hover:text-white flex items-center mt-1"
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
          <div className="flex flex-col h-0 flex-1 bg-gray-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Shield className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold text-white">{APP_NAME} Admin</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <AdminLink to="/admin" icon={<LayoutDashboard />} text="Dashboard" exact={true} />
                <AdminLink to="/admin/users" icon={<Users />} text="Manage Users" />
                <AdminLink to="/admin/assets" icon={<Package />} text="Manage Assets" />
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <Link
                    to="/"
                    className="text-xs font-medium text-gray-400 hover:text-white"
                  >
                    View site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 md:block hidden">Admin Dashboard</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Bell className="h-6 w-6" />
              </button>
              <Link
                to="/dashboard"
                className="ml-3 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-3 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
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

interface AdminLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  exact?: boolean;
}

const AdminLink: React.FC<AdminLinkProps> = ({ to, icon, text, exact }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        isActive
          ? 'bg-gray-800 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <div className="mr-3 h-5 w-5">{icon}</div>
      {text}
    </NavLink>
  );
};

export default AdminLayout;