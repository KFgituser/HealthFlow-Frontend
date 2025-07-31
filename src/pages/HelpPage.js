
import { useNavigate, Link } from "react-router-dom"; 

import '../styles/HomePage.module.css';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/LoginPage.module.css';
import helpStyles from '../styles/Help.module.css'; // for hover-card
import styles from '../styles/RegisterPage.module.css'; 
import  '../styles/Help.module.css';

import { useAuth } from '../contexts/AuthContext';

 export default function HelpPage() {  
   const API_BASE = process.env.REACT_APP_API_BASE_URL;
   const navigate = useNavigate();
   const { currentUser, logout } = useAuth();
   //handle logout
   const handleLogout = async () => {
            try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`, {
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
                  <h5 style={{ fontSize: "35px", color: "#333" }}>HealthFlow</h5>
                </Link>
               <div className="d-flex align-items-center gap-3">
                {currentUser && (
                    currentUser.role === "doctor" ? (
                    <Link to="/doctor-dashboard" className="btn btn-outline-primary me-2">My dashboard</Link>
                    ) : (
                    <Link to="/appointments" className="btn btn-outline-primary me-2">My Apts</Link>
                    )
                )}

                <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                {currentUser ? (
                    <>
                    Hi, {currentUser.role === "doctor" ? "doctor" : currentUser.firstName}!
                    <button className="btn btn-outline-danger" onClick={logout}>Log Out</button>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="btn btn-outline-primary me-2">Log in</Link>
                    <Link to="/register" className="btn btn-outline-success">Sign Up</Link>
                    </>
                )}
                </div>
             </div>
            </div>
        {/* Breadcrumb */}
            <Breadcrumb
            items={[
                { label: "Home", link: "/" },
                { label: "Help" }
            ]}
            />
          <div className="container my-5">
  <div style={{ backgroundColor: '#f4f2ff', padding: '60px 0' }}>
  <h2 className="text-center mb-4">Patients, how can we help?</h2>
  <div className="d-flex justify-content-center mb-4">
  <input type="text" className="form-control w-50" placeholder="Search for articles..." />
  </div>
  </div>
        <div className="row g-4">
          {[
            { title: "My Account", articles: 7, icon: "👤" },
            { title: "Finding a Provider", articles: 6, icon: "🔍" },
            { title: "Appointments", articles: 18, icon: "📅" },
            { title: "Insurance", articles: 5, icon: "💳" },
            { title: "Reviews", articles: 3, icon: "⭐" },
            { title: "About HealthFlow", articles: 7, icon: "🏥" }
          ].map((item, index) => (
           
            <div className="col-md-4" key={index}>
               <Link
              to={`/help/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-decoration-none text-dark"
            >
            <div className={`card ${helpStyles["hover-card"]} text-center shadow-sm h-100 border-0`}>
              <div className="card-body">
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>{item.icon}</div>
                <h5 className="card-title">{item.title}</h5>
                <p className="text-muted">{item.articles} articles</p>
              </div>
            </div>
            </Link>
          </div>
         
          ))}
        </div>
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