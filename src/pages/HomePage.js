import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from '../styles/HomePage.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import symptomToSpecialtyMap from '../data/symptomToSpecialtyMap';
import Breadcrumb from '../components/Breadcrumb';
import StatsSection from "../components/StatsSection";


export default function HomePage() {
    
    const { currentUser, logout } = useAuth();
    //filters and navigation
    const [specialty, setSpecialty] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const formatSpecialty = (str) =>
            str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        let resolvedSpecialty = specialty.trim().toLowerCase();

        //Mapping:symptom keywords => specialty names
        if (symptomToSpecialtyMap[resolvedSpecialty]) {
            resolvedSpecialty = symptomToSpecialtyMap[resolvedSpecialty];
        } else {
            resolvedSpecialty = formatSpecialty(specialty);
        }

        const query = new URLSearchParams();
        if (resolvedSpecialty) query.append("specialty", resolvedSpecialty);
        if (location) query.append("distance", location);
        if (city) query.append("city", city);
        navigate(`/dashboard?${query.toString()}`);
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
                    <Link to="/appointments" className="btn btn-outline-primary me-2">My Apts</Link>
                )}
                <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                {currentUser ? (
                    <>
                    <span className="me-2">Hi, {currentUser.firstName}!</span>
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
            
           

            <div className="container mt-5">
            <h2 className="mb-3">Find your doctor</h2>
            {/* Search Section */}
                <div className="container my-5" >
                    <div className="row mb-3">
                       <div className="col-md-5" >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Condition or Specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                            />
                        </div>
                         <div className="col-md-2">
                            <div className="d-flex align-items-center border rounded px-2" style={{  height: "47px" }}>
                                <FaMapMarkerAlt className="me-2 text-muted" />
                                <input
                                    type="text"
                                    className="form-control border-0 p-0"
                                    placeholder="Distance(km)"
                                    style={{ boxShadow: "none" }}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                         </div> 
                         <div className="col-md-2">
                            <select
                                className="form-select"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">All Cities</option>
                                {["Dublin", "Cork", "Limerick", "Galway", "Waterford"].map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                         </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={handleSearch}>
                                Find a Match
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             
             <StatsSection />                   
            
                 {/* image Section1 */}
                <div className="bg-light py-5 ">
                    <div className="container d-flex align-items-center">
                        {/* left side */}
                        <div className="text-start me-4" style={{ flex: 1 }}>
                        <h2 className="mb-3">HealthFlow Medical Service Platform</h2>
                        <p>We are committed to providing every patient with fast, reliable, and convenient medical care.</p>
                        </div>

                        {/* right side*/}
                        <img
                        src="/images/promotion.png"
                        alt="Promotional"
                        style={{
                            width: '800px',
                            maxHeight: '450px',
                            height: '100%',
                            objectFit: 'cover',
                            flexShrink: 0
                        }}
                        />
                    </div>
                </div>

             {/* image Section2 */}
                <div className="bg-light py-5 ">
                    <div className="container d-flex flex-wrap align-items-center gap-4">
                        {/* left side */}
                         <img
                        src="/images/medicalConsultation.png"
                        alt="Promotional"
                        style={{
                            width: '800px',
                            maxHeight: '450px',
                            height: '100%',
                            objectFit: 'cover',
                            flexShrink: 0
                        }}
                        />
                       
                        {/* right side*/}
                        <div className="text-start me-4" style={{ flex: 1, minWidth: "300px" }}>
                        <h2 className="mb-3">Your Trusted Healthcare Partner</h2>
                        <p>  HealthFlow helps you connect with the right doctor quickly and easily. 
        From general practitioners to specialists, we streamline your medical journey.</p>
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
                <small>© 2025 HealthFlow.    Terms | Privacy </small>
            </footer>
        </div>
    );
}