import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loadUser } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  isSeller: false,
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(loadUser());
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  // Determine if user is admin or seller
  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller' || isAdmin;

  const value = {
    isAuthenticated,
    isAdmin,
    isSeller,
    user,
    loading: loading || !authChecked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};