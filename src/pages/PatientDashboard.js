
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from "react-router-dom";  //for mapping doctors
import styles from '../styles/HomePage.module.css';


    export default function PatientDashboard(){

        const [doctors, setDoctors] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        
        const navigate = useNavigate();
        const handleViewProfile = (id) => {
            navigate(`/doctor/${id}`);  // Go to the right doctor profile URL
        };
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

            

        useEffect(() => {
        // Fetch doctor list from backend
        api.get('/doctors')
        .then((res) => {
            setDoctors(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError('Failed to load doctors');
            setLoading(false);
        });
        }, []);

        
    

        return(

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
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <a href="#" className="btn btn-outline-danger" onClick={handleLogout}>Log Out</a> 
                </div>
            </nav>
            
            <div className="container mt-5">
                <h2>Available Doctors</h2>
                <input type="text" className="form-control" placeholder="Search condition, specialty, or location" />

                <div className="mt-4">

                    {/* loop doctor results here*/}
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Dr.John Doe</h5>
                            <p className="card-text">Specialty: Dermatology</p>
                            <p className="card-text">⭐ 4.5 | 1.3km away</p>
                            <button className="btn btn-success me-2">Book Appointment</button>
                            <button className="btn btn-outline-secondary" onClick={() => handleViewProfile(1)}>View Profile</button>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Dr.Alice Smith</h5>
                            <p className="card-text">Specialty: Cardiology</p>
                            <p className="card-text">⭐ 4.8 | 2km away</p>
                            <button className="btn btn-success me-2">Book Appointment</button>
                            <button className="btn btn-outline-secondary" onClick={() => handleViewProfile(2)}>View Profile</button>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Dr.David Tan </h5>
                            <p className="card-text">Specialty: Orthopedics</p>
                            <p className="card-text">⭐ 4.6 | 2.3km away</p>
                            <button className="btn btn-success me-2">Book Appointment</button>
                            <button className="btn btn-outline-secondary" onClick={() => handleViewProfile(3)}>View Profile</button>
                        </div>
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
        </div> 
        )

    };