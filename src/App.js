
/*

the main component of the application. 
It serves as the root component that renders 
other components and manages the high-level layout or logic. used for:

1.Root Component
It's the starting point for rendering UI in the browser.
2. Routing
It often includes the React Router setup if you're navigating between pages.
4. State Management
Some global state or context providers may be set here.
5. UI Composition
It organizes headers, footers, navigation, and routes for the app.

*/


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HelpPage from './pages/HelpPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ResetPasswordPage from './pages/ResetPasswordPage';


import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'


import './App.css';

import Appointment from './pages/Appointment';
import { DoctorProvider } from './contexts/DoctorContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // keep logged in
  

  return (
    <AuthProvider>
      <DoctorProvider>
        
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/Help" element={<HelpPage></HelpPage>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          {/* add more routes here */}
        </Routes>
     
      </DoctorProvider>
    </AuthProvider>
  );
}
  

export default App;
