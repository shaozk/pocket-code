import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { login, autoLogin, logout } from './authSlice';

interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token, userInfo } = response.data;
      dispatch(login({ token, userInfo, rememberMe: credentials.rememberMe }));
      return { token, userInfo };
    } catch (error) {
      throw new Error('登录失败');
    }
  }
);

export const autoLoginThunk = createAsyncThunk(
  'auth/autoLogin',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        const response = await axios.get('/auth/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { userInfo } = response.data;
        const rememberMe = !!localStorage.getItem('token');
        dispatch(autoLogin({ token, userInfo, rememberMe }));
        return { token, userInfo };
      }
      throw new Error('无token');
    } catch (error) {
      dispatch(logout());
      throw new Error('自动登录失败');
    }
  }
);
