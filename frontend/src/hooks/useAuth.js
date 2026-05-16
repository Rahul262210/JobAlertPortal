import { create } from 'zustand';
import { authService } from '../services/api';

export const useAuthStore = create((set) => ({
  isAuthenticated: authService.isAuthenticated(),
  token: authService.getToken(),

  setAuthenticated: (value) => set({ isAuthenticated: value }),

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  logout: () => {
    set({ isAuthenticated: false, token: null });
    localStorage.removeItem('token');
  },
}));
