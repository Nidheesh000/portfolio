import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        // Configure authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await authAxios.get('/api/auth/profile', config);
        setAdmin(data);
      } catch (error) {
        console.error('Session expired or invalid token');
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (username, password) => {
    try {
      const { data } = await authAxios.post('/api/auth/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setAdmin({ _id: data._id, username: data.username });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
