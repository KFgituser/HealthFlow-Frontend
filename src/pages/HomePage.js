import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from '../styles/HomePage.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
     const { user, logout } = useAuth();
    return (
        <div>
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
                {user && (
                    <Link to="/appointments" className="btn btn-outline-primary me-2">My Apts</Link>
                )}
                <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                {user ? (
                    <>
                    <span className="me-2">Hi, {user.firstName}!</span>
                    <a href="#" onClick={logout} className="btn btn-outline-danger">Log Out</a>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="btn btn-outline-primary me-2">Log in</Link>
                    <Link to="/register" className="btn btn-outline-success">Sign Up</Link>
                    </>
                )}
                </div>
            </nav>

            <div className="container mt-5">
            <h2 className="mb-3">Find your doctor</h2>
            {/* Search Section */}
                <div className="container my-5">
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="Condition or Specialty" />
                        </div>
                        
                         <div className="d-flex align-items-center border rounded px-2" style={{ maxWidth: "450px", height: "47px" }}>
                            <FaMapMarkerAlt className="me-2 text-muted" />
                            <input
                                type="text"
                                className="form-control border-0 p-0"
                                placeholder="Location (Eircode or city)"
                                style={{ boxShadow: "none" }}
                            />
                        </div>
                        
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100">Find a Match</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Promotional Section */}
            <div className="bg-light text-center py-5">
                <h5 className="fw-bold">News, Activities and Website Promotion</h5>
                <p>Stay tuned for the latest updates and health tips.</p>
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
        </div>
    );
}