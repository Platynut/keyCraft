import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/LoginPage/LoginPage.jsx';
import Register from './pages/Auth/RegisterPage/RegisterPage.jsx';
import Profile from './pages/Profile/ProfilePage/ProfilePage.jsx';
import ForgotPassword from './pages/Auth/ForgotPasswordPage/ForgotPasswordPage.jsx';
import AdminDashboard from './pages/AdminPage/Admin/admin.jsx';
import KeyboardDashboard from './pages/AdminPage/Keyboards/keyboard.jsx'
import ResetPassword from './pages/Auth/ResetPasswordPage/ResetPasswordPage.jsx'; // Attention à la casse !


import Accueil from "./components/Accueil";
import Keyboards from "./components/Keyboards";
import Configuration from "./components/Configuration";
import Keycaps from "./components/Keycaps";
import AcceuilProfile from "./components/Profile";
import Creation_compte from "./components/Creation_compte";
import Page_paiement from "./components/Page_paiement";
import KeyboardDetail from "./components/KeyboardDetail";

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Routes>

      <Route path="/" element={<Accueil />} />
      <Route path="/Keyboards" element={<Keyboards />} />
      <Route path="/Configuration" element={<Configuration />} />
      <Route path="/Keycaps" element={<Keycaps />} />
      <Route path="/AcceuilProfile" element={<AcceuilProfile />} />
      <Route path="/Creation_compte" element={<Creation_compte />} />
      <Route path="/Page_paiement" element={<Page_paiement />} />
      <Route path="/keyboard/:id" element={<KeyboardDetail />} />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/keyboard" element={<KeyboardDashboard />} />
    </Routes>
  );
}

export default App;
