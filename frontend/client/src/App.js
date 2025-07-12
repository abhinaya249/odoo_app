import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import DetailedUserProfile from './pages/DetailedUserProfile';
import SwapRequestDashboard from './pages/SwapRequestDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/detailed-profile" element={<DetailedUserProfile />} />
          <Route path="/swap-request" element={<SwapRequestDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;