import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from '../styles/ResetPasswordPage.module.css';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';

        export default function ResetPasswordPage() {
        const API_BASE = process.env.REACT_APP_API_BASE_URL;
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            emailOrPhone: '',
            verificationCode: '',
            newPassword: '',
            confirmPassword: '',
        });

        function handleChange(e) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

        async function handleSubmit(e) {
          e.preventDefault();

          if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
          }
          
 const data = {
    emailOrPhone: formData.emailOrPhone,
    verificationCode: formData.verificationCode,
    newPassword: formData.newPassword
  };

  try {
    await axios.post(`${API_BASE}/api/users/reset-password`, data, {
      withCredentials: true, // 如果后端用 cookie 认证就加上，否则可以省略
      headers: {
        'Content-Type': 'application/json'
      }
    });

            alert('Password reset successfully!');
            navigate('/login');
          } catch (error) {
            console.error("Reset failed:", error.response?.data || error.message);
            alert('Reset failed!');
          }
        }

        return (
            <div>
            
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
            
          
            {/* Breadcrumb */}
            <Breadcrumb
            items={[
                { label: "Home", link: "/" },
                { label: "Login", link: "/" },
                { label: "Reset your password" }
            ]}
            />
           

            <div className={styles.container}>
                <h2 className={styles.heading}>Reset my password</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email address or phone number</label>
                    <input
                    name="emailOrPhone"
                    className="form-control"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label>Enter the verification code you received</label>
                    <input
                    name="verificationCode"
                    className="form-control"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label>Input your new password</label>
                    <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label>Re-enter password</label>
                    <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className={styles.buttonRow}>
                    <button type="submit" className={styles.okButton}>Okay</button>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>cancel</button>
                    <button type="button" className={styles.homeButton} onClick={() => navigate('/')}>Home</button>
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