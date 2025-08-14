import axios from './axios';

interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  token: string;
  userInfo: {
    username: string;
    email: string;
    registrationDate: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const getUserInfo = async (): Promise<{ userInfo: LoginResponse['userInfo'] }> => {
  const response = await axios.get('/auth/userinfo');
  return response.data;
};
