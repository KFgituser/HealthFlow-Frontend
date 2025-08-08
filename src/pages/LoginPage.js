import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';
import '../styles/HomePage.module.css';
import axios from 'axios';
import SuccessPopup from "../components/SuccessPopup";
import ErrorPopup from '../components/ErrorPopup';

    export default function LoginPage() {
      const API_BASE = process.env.REACT_APP_API_BASE_URL;
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showSuccess, setShowSuccess] = useState(false);
      const [showError, setShowError] = useState(false);
      const navigate = useNavigate();
      const { setCurrentUser } = useAuth();

      async function handleLogin(e) {
        
       
        e.preventDefault();
        console.log('📤 Sending login request to backend...');
        console.log("🔍 emailOrPhone:", email);
        console.log("🔍 password:", password);
          const payload = {
            email,
            password
          };
          try {
          const response = await axios.post(`${API_BASE}/api/users/login`, payload, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            },
          });

          const { token, role, ...user } = response.data;
          // Save token for later requests
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          setCurrentUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));  

          //Set the default Authorization header for all Axios requests.
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          if (role === 'doctor' && response.data.id) {
            localStorage.setItem("doctorId", response.data.id);
          }
          setShowSuccess(true); // login successful
           setTimeout(() => {
            const userReady = localStorage.getItem("user");
            if (userReady) {
              navigate(role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
            } else {
              console.warn("⚠️ User not saved in localStorage yet.");
            }
          }, 2000);
          

        } catch (err) {
          console.error("❌ wrong status:", err.response?.status);
          console.error("❌ wrong message:", err.response?.data || err.message);
          setShowError(true);   // login failed
          setTimeout(() => setShowError(false), 2000);  
        }
      }
      
     

      return (
        
        <div className={styles.page}>  
        {showSuccess && <SuccessPopup />}
        {showError && <ErrorPopup />}  
           {/* Top Navbar */}
            <div className="bg-white border-bottom">
              <div className="container d-flex justify-content-between align-items-center" style={{ height: "108px" }}>
                <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
                  <img
                    src="/images/logo.png"
                    alt="HealthFlow Logo"
                    style={{ height: "30px", marginRight: "10px", verticalAlign: "middle" }}
                  />
                  <h4 className="mb-0 text-dark">HealthFlow</h4>
                </Link>
                <div className="d-flex align-items-center gap-3">
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <Link to="/register" className="btn btn-outline-success">Sign Up</Link> 
                </div>
              </div>
            </div>

          {/* login form starts here */}
          <div className={styles.container2}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email or Phone </label>
                <input
                  type="email"
                  placeholder="Enter your email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
      
              <div className={styles.actionsRow}>
                <button className="btn btn-primary">
                  Login
                </button>

                <div className={styles.bottom2}>
                  <span className={styles.forgotText}>Forget your password?</span>
                  <a href="/reset-password" className={styles.resetpassword}>
                    reset my password
                  </a>
                </div>
              </div>
            </form>
          </div>
          
          {/* Footer1 */}
          <div className={styles["footer-section"]}>
            <div className="container">
              <div className="row">
                {/* HealthFlow Section */}
                <div className="col-md-2">
                  <h5 className="text-white mb-3">HealthFlow</h5>
                  <p className="mb-1">Home</p>
                  <p className="mb-1">About us</p>
                  <p className="mb-1">Careers</p>
                  <p className="mb-1">Contact</p>
                  <p className="mb-1">Help</p>
                </div>

                {/* Discover Section */}
                <div className="col-md-3">
                  <h5 className="text-white mb-3">Discover</h5>
                  <p className="mb-1">Patient Stories</p>
                  <p className="mb-1">Resources for Providers</p>
                  <p className="mb-1">Community Guidelines</p>
                  <p className="mb-1">Data & Privacy</p>
                  <p className="mb-1">Verified Reviews</p>
                </div>

                {/* Doctor Service Section */}
                <div className="col-md-4">
                  <h5 className="text-white mb-3">Are you a doctor or health service?</h5>
                  <p className="mb-1">List your practice</p>
                  <p className="mb-1">Partner with HealthFlow</p>
                  <p className="mb-1">Access for Developers</p>
                </div>

                {/* App Section */}
                <div className="col-md-3">
                  <h5 className="text-white mb-3">Get the HealthFlow App</h5>
                   <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                      <img src="/images/appstore.png" alt="App Store" className="mb-2" width="120" />
                  </a>
                  <br />
                  <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                    <img src="/images/googleplay.png" alt="Google Play" width="120" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Footer2 */}
          <footer className="bg-dark text-white text-center py-3">
            <small>© 2025 HealthFlow. Terms | Privacy </small>
          </footer>
        </div>
      );
    }