import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from "react-router-dom";  //for mapping doctors
import styles from '../styles/HomePage.module.css';
import '../styles/PatientDashboard.css';
import React from 'react';

    export default function PatientDashboard(){
        //use dummy doctor data
        const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: "John Doe",
            specialty: "Dermatology",
            rating: 4.5,
            reviewCount: 56,
            distance: 1.3,
            availability: [
            { date: "Mon, Jul 22", slots: 2 },
            { date: "Tue, Jul 23", slots: 0 },
            { date: "Wed, Jul 24", slots: 3 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 2 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 2 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 1 },
            { date: "Wed, Jul 31", slots: 0 },
            { date: "Thu, Aug 1", slots: 0 },
            { date: "Fri, Aug 2", slots: 5 },
            ],
            imageUrl: "/images/doctors/john.png"
        },

        {
            id: 2,
            name: "Alice Smith",
            specialty: "Cardiology",
            rating: 4.8,
            reviewCount: 67,
            distance: 2.0,
            availability: [],
            nextAvailable: "Mon, Aug 4",
            imageUrl: "/images/doctors/alice.png"
        },

        {
            id: 3,
            name: "David Tan",
            specialty: "Orthopedics",
            rating: 4.6,
            reviewCount: 37,
            distance: 2.7,
            availability: [],
            nextAvailable: "Thu, Aug 7",
            imageUrl: "/images/doctors/david.png"
        },
        {
        id: 4,
        name: "Sarah Johnson",
        specialty: "Pediatrics",
        rating: 4.9,
        reviewCount: 150,
        distance: 0.8,
        availability: [
            { date: "Mon, Jul 22", slots: 3 },
            { date: "Tue, Jul 23", slots: 2 },
            { date: "Wed, Jul 24", slots: 1 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 4 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 0 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 1 },
            { date: "Wed, Jul 31", slots: 0 },
            { date: "Thu, Aug 1", slots: 2 },
            { date: "Fri, Aug 2", slots: 5 },
        ],
        imageUrl: "/images/doctors/sarah.png"
        },
        {
        id: 5,
        name: "David Kim",
        specialty: "Orthopedics",
        rating: 4.0,
        reviewCount: 34,
        distance: 4.1,
        availability: [
            { date: "Mon, Jul 22", slots: 0 },
            { date: "Tue, Jul 23", slots: 0 },
            { date: "Wed, Jul 24", slots: 0 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 2 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 2 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 0 },
            { date: "Wed, Jul 31", slots: 2 },
            { date: "Thu, Aug 1", slots: 4 },
            { date: "Fri, Aug 2", slots: 0 },
        ],
        imageUrl: "/images/doctors/kim.png"
        }
        ]);
      
        const navigate = useNavigate();
       
        // the map expanded:
        const [isMapExpanded, setIsMapExpanded] = useState(false);
        
        //filters
        const [selectedSpecialty, setSelectedSpecialty] = useState('');
        const [selectedDistance, setSelectedDistance] = useState('');
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
        const containerStyle = {
        width: isMapExpanded ? '95vw' : '100%',
        height: isMapExpanded ? '80vh' : '550px',
        borderRadius: isMapExpanded ? '0' : '8px',
        transition: 'all 0.3s ease'
        };

        const center = {
        lat: 53.3498,  // Dublin
        lng: -6.2603,
        };


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
                    <Link to="/appointments" className="btn btn-outline-primary me-2">My Apts</Link>
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <a href="#" className="btn btn-outline-danger" onClick={handleLogout}>Log Out</a> 
                </div>
            </nav>
            
             {/* second Top bar */}
            <div className="result-summary d-flex justify-content-between align-items-center px-4 py-3">
                 <div className="d-flex align-items-baseline gap-2">
                    <span className="summary-count">{doctors.length}</span>
                    <span className="summary-label">providers</span>
                </div>
                    <div className="summary-dates text-muted">
                        Today, {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} – Thu, Aug 7
                    </div>
            </div>
             {/* filters */}
             <div className="filter-bar d-flex align-items-center gap-4 px-4 py-2">
                    <div className="form-group mb-0">
                        <label htmlFor="specialtySelect" className="form-label me-2">Specialty:</label>
                        <select
                        id="specialtySelect"
                        className="form-select"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        >
                        <option value="">All</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        </select>
                    </div>

                    <div className="form-group mb-0">
                        <label htmlFor="distanceSelect" className="form-label me-2">Max Distance (km):</label>
                        <select
                        id="distanceSelect"
                        className="form-select"
                        value={selectedDistance}
                        onChange={(e) => setSelectedDistance(Number(e.target.value))}
                        >
                        <option value="">Any</option>
                        <option value="1">1 km</option>
                        <option value="2">2 km</option>
                        <option value="3">3 km</option>
                        <option value="5">5 km</option>
                        </select>
                    </div>
                </div>
            <div className="main-dashboard d-flex">
                
   
                {/* Doctor List */}
                <div className="doctor-list flex-grow-1 p-3">
                    {doctors
                        .filter((doctor) =>
                            (selectedSpecialty === '' || doctor.specialty === selectedSpecialty) &&
                            (selectedDistance === '' || doctor.distance <= selectedDistance)
                        )
                        .map((doctor) => (
                    <div key={doctor.id} className="card mb-3 p-3 shadow-sm">
                        <div className="d-flex justify-content-start align-items-start gap-5">
                        <div className="d-flex flex-column align-items-center me-4">
                        <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="rounded-circle me-3"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                       <div className="text-center">
                            <h5 className="mb-1">{doctor.name}</h5>
                            <p className="mb-1 text-muted" style={{ fontSize: '16px', fontWeight: '700' }}>
                                {doctor.specialty}
                            </p>
                            <div className="d-flex align-items-center gap-1">
                                <span>⭐ {doctor.rating} | {doctor.reviewCount} reviews</span>
                            </div>
                            <p className="mb-0">{doctor.distance} km away</p>
                        </div>
                        </div>
                        <div className="availability-spacing">
                        {doctor.availability.length > 0 ? (
                           <div className="availability-wrapper mt-3"> 
                            <div className="d-flex flex-wrap gap-1 mt-2">
                            {doctor.availability.map((slot, index) => (
                             <React.Fragment key={index}>  
                                <div
                                    key={index}
                                    className={`availability-button ${slot.slots === 0 ? 'no-slots' : 'has-slots'}`}
                                    >
                                        
                                    <div>{slot.date}</div>
                                    <div>{slot.slots === 0 ? 'No appts' : `${slot.slots} appts`}</div>
                                </div>
                                
                                 {(index + 1) % 6 === 0 && <div className="w-100"></div>}
                                </React.Fragment>
                            ))}
                            </div>
                           </div>
                        ) : (
                        <div className="next-available-wrapper">
                            <div className="next-available-button">
                            Next appointment {doctor.nextAvailable}
                            </div>
                        </div>
                        )}
                        </div>
                    </div>
                    </div>
                    ))}
                </div>

            

                {/* Map Section */}
                <div className="right-panel">
                  <div className={`sticky-map-container p-3 ${isMapExpanded ? 'expanded-map' : ''}`}>
                    <button
                        className="expand-map-btn"
                        onClick={() => setIsMapExpanded(!isMapExpanded)}
                        >
                        <span className="arrow">{isMapExpanded ? '›' : '‹'}</span>
                        {isMapExpanded ? 'Collapse map' : 'Expand map'}
                    </button>
                    <LoadScript googleMapsApiKey="AIzaSyAR3q9J30gXZzRO5evQAp4f76SHeU42LL4">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        onLoad={(map) => {
                        console.log('Map loaded successfully');
                        // You can now safely use window.google here
                        }}
                    >
                        {/* Optional: Add markers or components inside */}
                    </GoogleMap>
                    </LoadScript>
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