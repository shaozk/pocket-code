import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>欢迎回来, {userInfo?.username || '用户'}!</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>用户信息</h3>
        <p>用户名: {userInfo?.username || '暂无'}</p>
        <p>邮箱: {userInfo?.email || '暂无'}</p>
        <p>注册日期: {userInfo?.registrationDate || '暂无'}</p>
      </div>
      <button
        onClick={handleLogout}
        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        退出登录
      </button>
    </div>
  );
};

export default HomePage;
