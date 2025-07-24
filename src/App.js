
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorCard from './pages/DoctorCard';
import ResetPasswordPage from './pages/ResetPasswordPage';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'

import logo from './logo.svg';
import './App.css';

function App() {
  // keep logged in
  

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/:id" element={<DoctorCard />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* add more routes here */}
      </Routes>
    </AuthProvider>
  );
}
  

export default App;
