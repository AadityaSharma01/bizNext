import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import API from './axios.js';
import Login from '../components/auth.components/login.jsx';
import Register from "../components/auth.components/register.jsx";
import ScannerPage from "../components/home.components/scanner.jsx";
import ProductPage from "../components/home.components/ProductPage.jsx";
import ChartComponent from "../components/home.components/ChartComponent.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('api/user/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <Routes>
      {/* Redirect if already logged in */}
      <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />

      {/* Protected Routes */}
      <Route path="/" element={user ? <ScannerPage user={user} /> : <Navigate to="/login" />} />
      <Route path="/postProd" element={<ProductPage />} />
      <Route path="/chart" element={<ChartComponent />} />
    </Routes>
  );
};

export default App;
