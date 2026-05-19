import api from './axiosInstance';

const TOKEN_KEY = 'auth_token';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });

    const token = response.data.token;
    localStorage.setItem(TOKEN_KEY, token);

    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};

export default authService;