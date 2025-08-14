import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axios from '../api/axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (location.state?.from) {
      setSuccessMessage('请登录后继续访问');
    }
    usernameRef.current?.focus();
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errorMessage = '';
    if (!username) {
      errorMessage = '用户名/邮箱不能为空';
    } else if (!password) {
      errorMessage = '密码不能为空';
    } else if (password.length < 6) {
      errorMessage = '密码长度至少为6个字符';
    }
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', { username, password, rememberMe });
      const { token, userInfo } = response.data;
      dispatch(login({ token, userInfo, rememberMe }));
      setSuccessMessage('登录成功！');
      setTimeout(() => {
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }, 2000);
    } catch (err) {
      setError('登录失败，请检查用户名/邮箱和密码或网络连接');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement | null>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc'
      }} role="region" aria-label="登录表单">
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>登录</h2>
        {successMessage && <div style={{ color: '#28a745', backgroundColor: '#d4edda', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }} role="status">{successMessage}</div>}
        {error && <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }} role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>用户名/邮箱:</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black'
              }}
              aria-required="true"
              aria-label="用户名或邮箱"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>密码:</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, rememberMeRef)}
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black'
              }}
              aria-required="true"
              aria-label="密码"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
              <input
                type="checkbox"
                ref={rememberMeRef}
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                onKeyDown={(e) => handleKeyDown(e, submitRef)}
                style={{ marginRight: '10px' }}
                aria-label="记住我"
              />
              记住我
            </label>
          </div>
          <button
            type="submit"
            ref={submitRef}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
            aria-label="登录按钮"
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="/forgot-password" style={{ color: '#007bff', textDecoration: 'none', marginRight: '15px' }} aria-label="忘记密码链接">忘记密码？</a>
          <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }} aria-label="注册账号链接">注册账号</a>
        </div>
        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }} role="status" aria-label="加载中">
            <div style={{ border: '4px solid rgba(0, 123, 255, 0.2)', borderRadius: '50%', borderTop: '4px solid #007bff', width: '30px', height: '30px', animation: 'spin 2s linear infinite', margin: '0 auto' }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
