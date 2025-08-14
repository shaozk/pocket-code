import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  username: string;
  email: string;
  registrationDate: string;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  rememberMe: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
  rememberMe: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; userInfo: UserInfo; rememberMe: boolean }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.rememberMe = action.payload.rememberMe;
      if (action.payload.rememberMe) {
        localStorage.setItem('token', action.payload.token);
      } else {
        sessionStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
      state.rememberMe = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    autoLogin: (state, action: PayloadAction<{ token: string; userInfo: UserInfo; rememberMe: boolean }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.rememberMe = action.payload.rememberMe;
    },
  },
});

export const { login, logout, autoLogin } = authSlice.actions;
export default authSlice.reducer;
