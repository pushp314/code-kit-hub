import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import AssetDetailsPage from './pages/marketplace/AssetDetailsPage';
import CategoryPage from './pages/marketplace/CategoryPage';

// Dashboard Pages
// import DashboardHome from './pages/dashboard/DashboardHome';
// import MyAssetsPage from './pages/dashboard/MyAssetsPage';
// import PurchasesPage from './pages/dashboard/PurchasesPage';
// import UploadAssetPage from './pages/dashboard/UploadAssetPage';
// import ProfilePage from './pages/dashboard/ProfilePage';
// import WishlistPage from './pages/dashboard/WishlistPage';

// Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageUsersPage from './pages/admin/ManageUsersPage';
// import ManageAssetsPage from './pages/admin/ManageAssetsPage';

// Guards
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="marketplace/asset/:id" element={<AssetDetailsPage />} />
        <Route path="marketplace/category/:category" element={<CategoryPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        {/*
        <Route index element={<DashboardHome />} />
        <Route path="my-assets" element={<MyAssetsPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="upload" element={<UploadAssetPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="wishlist" element={<WishlistPage />} /> */}
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        {/* 
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="assets" element={<ManageAssetsPage />} />   
         */}
      </Route>
    </Routes>
    
  );
}

export default App;