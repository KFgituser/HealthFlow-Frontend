import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';

    export default function LoginPage() {
      const [emailOrPhone, setEmailOrPhone] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();

      async function handleLogin(e) {
        e.preventDefault();
        console.log('📤 Sending login request to backend...');
        try {
          const response = await api.post('/api/users/auth/login', {
            login: emailOrPhone.trim(),
            password: password.trim()
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true  
          });
          const { token, role, ...user } = response.data;
          // Save token for later requests
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('user', JSON.stringify(user)); 
          alert('Login successful!');

            if (role === 'doctor') {
            navigate('/doctor-dashboard');
          } else {
            navigate('/patient-dashboard');
          }
          
        } catch (err) {
          console.error(err);
          console.log('❌ Login error details:', err.response?.data || err.message);
          alert('Login failed!');
        }
      }
      
     

      return (
        <div className={styles.page}>
          
           {/* Top Navbar */}
            <nav className="navbar navbar-light justify-content-between px-4 py-2">
                
                <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
                  <img
                    src="/images/logo.png"
                    alt="HealthFlow Logo"
                    style={{ height: "30px", marginRight: "10px", verticalAlign: "middle" }}
                  />
                  <h4 className="mb-0 text-dark">HealthFlow</h4>
                </Link>
                <div>
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <Link to="/register" className="btn btn-outline-success">Sign Up</Link> 
                </div>
            </nav>

          {/* login form starts here */}
          <div className={styles.container2}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email or Phone </label>
                <input
                  type="email"
                  placeholder="Email or Phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
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