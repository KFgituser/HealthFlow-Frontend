import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from '../styles/HomePage.module.css';


    const Appointment = () => {
        const navigate = useNavigate();
  
        //logout  
        const handleLogout = async () => {
            try {
            await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include", // Important for session cookies
            });
            // Optionally clear any local state or context
            navigate("/login");
            } catch (error) {
            console.error("Logout failed:", error);
            }
        };
    
    
        return (
            <>
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
                    <Link to="/patient-dashboard" className="btn btn-outline-primary me-2">
                        My Dashboard
                    </Link>
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <a href="#" className="btn btn-outline-danger" onClick={handleLogout}>Log Out</a> 
                </div>
            </nav>


        <div style={{ padding: '40px' }}>
        <h2>My Appointments</h2>
        <div style={{ marginTop: '30px' }}>
            <div style={{ border: '2px solid #6f42c1', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#eee' }}>
            <p><strong>Dr. Sarah Murphy | Cardiology</strong></p>
            <p>12 Jul 2025, 10:30 AM</p>
            <p>Status: Confirmed</p>
            <button style={{ marginRight: '10px' }}>Reschedule</button>
            <button>Cancel</button>
            </div>

            <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#ddd' }}>
            <p><strong>Dr. Sarah Murphy | Cardiology</strong></p>
            <p>2 Jul 2025, 2:30 PM</p>
            <p>Status: Confirmed</p>
            <button style={{ marginRight: '10px' }}>Reschedule</button>
            <button>Cancel</button>
            </div>
        </div>
         </div>
                    {/* Footer section */}
                <div className={styles["footer-section"]}>
                <div className="container">
                    <div className="row">
                {/* Footer1 */}
                    {/* HealthFlow Section */}
                    <div className="col-md-2">
                        <h5 className="text-white mb-3">HealthFlow</h5>
                        <p className=" mb-1">Home</p>
                        <p className=" mb-1">About us</p>
                        <p className=" mb-1">Careers</p>
                        <p className=" mb-1">Contact</p>
                        <p className=" mb-1">Help</p>
                    </div>

                    {/* Discover Section */}
                    <div className="col-md-3">
                        <h5 className="text-white mb-3">Discover</h5>
                        <p className=" mb-1">Patient Stories</p>
                        <p className=" mb-1">Resources for Providers</p>
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
                        <img src="/images/appstore.png" alt="App Store" className="mb-2" width="120" />
                        <br />
                        <img src="/images/googleplay.png" alt="Google Play" width="120" />
                    </div>

                    </div>
                </div>
                </div>
                {/* Footer2 */}
                <footer className="bg-dark text-white text-center py-3">
                    <small>© 2025 HealthFlow.    Terms | Privacy </small>
                </footer>
       
        </>
    );
    };

export default Appointment;