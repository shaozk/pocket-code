import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import axios from '../api/axios';

jest.mock('../api/axios');

const mockStore = createStore(() => ({
  auth: {
    isLoggedIn: false,
    token: null,
    userInfo: null,
    rememberMe: false,
  },
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders login form', () => {
    expect(screen.getByLabelText('用户名/邮箱:')).toBeInTheDocument();
    expect(screen.getByLabelText('密码:')).toBeInTheDocument();
    expect(screen.getByLabelText('记住我')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
  });

  test('displays error message for empty username', async () => {
    fireEvent.click(screen.getByRole('button', { name: '登录' }));
    await waitFor(() => {
      expect(screen.getByText('用户名/邮箱不能为空')).toBeInTheDocument();
    });
  });

  test('displays error message for empty password', async () => {
    fireEvent.change(screen.getByLabelText('用户名/邮箱:'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByRole('button', { name: '登录' }));
    await waitFor(() => {
      expect(screen.getByText('密码不能为空')).toBeInTheDocument();
    });
  });

  test('displays error message for short password', async () => {
    fireEvent.change(screen.getByLabelText('用户名/邮箱:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('密码:'), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: '登录' }));
    await waitFor(() => {
      expect(screen.getByText('密码长度至少为6个字符')).toBeInTheDocument();
    });
  });

  test('successful login', async () => {
    const mockResponse = {
      data: {
        token: 'mockToken',
        userInfo: {
          username: 'testuser',
          email: 'test@example.com',
          registrationDate: '2023-01-01',
        },
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    fireEvent.change(screen.getByLabelText('用户名/邮箱:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('密码:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(screen.getByText('登录成功！')).toBeInTheDocument();
    });
  });

  test('failed login', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('登录失败'));

    fireEvent.change(screen.getByLabelText('用户名/邮箱:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('密码:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(screen.getByText('登录失败，请检查用户名/邮箱和密码或网络连接')).toBeInTheDocument();
    });
  });
});
