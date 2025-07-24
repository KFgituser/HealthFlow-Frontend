import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/ResetPasswordPage.module.css';

        export default function ResetPasswordPage() {
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

        function handleSubmit(e) {
            e.preventDefault();
            if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
            }
            // call backend API here
            alert('Password reset request submitted!');
            navigate('/login');
        }

        return (
            <div className={styles.page}>
            
            <div className={styles.topBar}>
                <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
                  <img
                    src="/images/logo.png"
                    alt="HealthFlow Logo"
                    style={{ height: "30px", marginRight: "10px", verticalAlign: "middle" }}
                  />
                  <h4 className="mb-0 text-dark">HealthFlow</h4>
                </Link>
                <div className={styles.signUpBlock}>
                    <span className={styles.signUpText}>Not have an account yet?</span>
                    <Link to="/register" className="btn btn-outline-success">Sign Up</Link>
                 </div>
            </div>

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
            </div>
        );
        }