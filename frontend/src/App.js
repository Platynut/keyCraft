import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/LoginPage/LoginPage.jsx';
import Register from './pages/Auth/RegisterPage/RegisterPage.jsx';
import Profile from './pages/Profile/ProfilePage/ProfilePage.jsx';
import ForgotPassword from './pages/Auth/ForgotPasswordPage/ForgotPasswordPage.jsx';
import ResetPassword from './pages/Auth/ResetPasswordPage/ResetPasswordPage.jsx'; // Attention à la casse !

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
