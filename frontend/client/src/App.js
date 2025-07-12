import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import DetailedUserProfile from './pages/DetailedUserProfile';
import SwapRequestDashboard from './pages/SwapRequestDashboard';
import SignupPage from './pages/SignupPage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/detailed-profile/:id"
            element={
              <PrivateRoute>
                <DetailedUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/swap-request"
            element={
              <PrivateRoute>
                <SwapRequestDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '10px', color: '#666666', fontSize: '12px', borderTop: '1px solid #D1D5DB' }}>
          Powered by xAI
        </footer>
      </div>
    </Router>
  );
}

export default App;