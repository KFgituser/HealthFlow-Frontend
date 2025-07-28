import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link, useLocation } from "react-router-dom";  //for mapping doctors
import styles from '../styles/HomePage.module.css';
import '../styles/PatientDashboard.css';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDoctorContext } from '../contexts/DoctorContext';
import Breadcrumb from '../components/Breadcrumb';


    export default function PatientDashboard(){
         const API_BASE = process.env.REACT_APP_BACKEND_URL;
        const { currentUser } = useAuth();
        //use dummy doctor data
        const { doctors, updateDoctorSlots } = useDoctorContext();
      
        const navigate = useNavigate();
        
        //For bookAppointment
        const [showTimeModal, setShowTimeModal] = useState(false);
        const [selectedDoctor, setSelectedDoctor] = useState(null);
        const [selectedDate, setSelectedDate] = useState(null);
        const [selectedTime, setSelectedTime] = useState('');
        const timeSlots = [
            "09:30", "10:00", "10:30", "11:00",
            "13:00", "13:30", "14:00", "15:00",
            "15:30", "16:00"
        ];

        //handle bookAppointment
        const handleBookAppointment = (doctor, slot) => {
            if (slot.slots === 0) return;
            setSelectedDoctor(doctor);
            setSelectedDate(slot.date);
            setShowTimeModal(true);
        };

        
        // For confirmBooking
        const confirmBooking = () => {
             
            if (!selectedDoctor || typeof selectedDoctor.id === 'undefined') {
                alert("Error: No doctor selected.");
                return;
            }
            const user = JSON.parse(localStorage.getItem("user"));
            const [hour, minute] = selectedTime.split(':').map(Number);
            const date = new Date();
            date.setHours(hour);
            date.setMinutes(minute + 30);
            const endTime = date.toTimeString().slice(0, 5);  // "HH:MM"

            // selectedDate
            const [dayOfWeek, monthStr, dayStr] = selectedDate.split(' ');
            const currentYear = new Date().getFullYear();
            const fullDateStr = `${monthStr} ${dayStr}, ${currentYear}`; // "Jul 24, 2025"
            const formattedDate = new Date(fullDateStr).toISOString().split("T")[0]; // "2025-07-24"
            
            
           const appointment = {
            doctorId: selectedDoctor.id,
            patientId: currentUser.id,
            appointmentDate: formattedDate,
            startTime: selectedTime,
            endTime: endTime,
            status: "Confirmed",
    
            };

             api.post(`${API_BASE}/api/appointments`, appointment, { withCredentials: true })
                .then(() => {
                    //update slots No.
                     updateDoctorSlots(selectedDoctor.id, formattedDate, -1);   
                      alert("Appointment booked!");
                      navigate("/appointments");
                })
                .catch(error => {
                    const status = error.response?.status ?? 'unknown';
                    const data = error.response?.data ?? 'No response data';
                    console.error('📛 Booking failed:', status, data);
                alert(`Booking failed. Status ${status}`);
                });
                
            };
        
            
        // the map expanded:
        const [isMapExpanded, setIsMapExpanded] = useState(false);
        
        //filters
        const [selectedSpecialty, setSelectedSpecialty] = useState('');
        const [selectedDistance, setSelectedDistance] = useState('');
        const [selectedCity, setSelectedCity] = useState('');
        //logout  
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
        
        const location = useLocation();
            useEffect(() => {
            const params = new URLSearchParams(location.search);
            const specialtyParam = params.get("specialty");
            const distanceParam = params.get("distance");
            const cityParam = params.get("city");
            if (cityParam) setSelectedCity(cityParam);
            if (specialtyParam) setSelectedSpecialty(specialtyParam);
            if (distanceParam) setSelectedDistance(Number(distanceParam));
            if (cityParam) setSelectedCity(cityParam);
        }, []);

        return(
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
                  <h3 className="mb-0 text-dark">HealthFlow</h3>
                </Link>
                <div className="d-flex align-items-center gap-3">
                    <Link to="/appointments" className="btn btn-outline-primary me-2">My Apts</Link>
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <a href="#" className="btn btn-outline-danger" onClick={handleLogout}>Log Out</a> 
                </div>
              </div>
            </div>
             {/* Breadcrumb */}
            <Breadcrumb
            items={[
                { label: "Home", link: "/" },
                { label: "My Dashboard" }
            ]}
            />
             {/* provider and date */}
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
                         style={{ width: "220px" }}  
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
                    <div className="form-group mb-0">
                    <label htmlFor="citySelect" className="form-label me-2">City:</label>
                        <select
                            id="citySelect"
                            className="form-select"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            style={{ width: "180px" }}
                        >
                            <option value="">All</option>
                            {["Dublin", "Cork", "Limerick", "Galway", "Waterford"].map((city, i) => (
                            <option key={i} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            <div className="main-dashboard d-flex">
                
   
                {/* Doctor List */}
                <div className="doctor-list flex-grow-1 p-3">
                    {doctors
                        .filter((doctor) =>
                            (selectedSpecialty === '' || doctor.specialty .trim().toLowerCase() 
                            === selectedSpecialty.trim().toLowerCase()) &&
                            (selectedDistance === '' || doctor.distance <= selectedDistance) &&
                            (selectedCity === '' || doctor.city?.toLowerCase() === selectedCity.toLowerCase())
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
                                    className={`availability-button ${slot.slots === 0 ? 'no-slots' : 'has-slots'}`}
                                    onClick={() => handleBookAppointment(doctor, slot)}
                                    style={{ cursor: slot.slots > 0 ? 'pointer' : 'default' }}
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
              {/* appointment modal */}
             {showTimeModal && (
        <div className="modal-backdrop">
            <div className="modal-content">
            <h5 className="modal-title">Book an appointment</h5>
            <div className="appointment-info-row">
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
            </div>
            <p>What time would you like to book?</p>

            <div className="time-slot-list">
  {(() => {
    const todaySlot = selectedDoctor?.availability.find(slot => slot.date === selectedDate);
    const times = todaySlot?.times || [];

    return timeSlots.map((time, i) => {
      const match = times.find(t => t.time === time);
      const isAvailable = match?.available || false;
      const isSelected = selectedTime === time;

      return (
        <div
          key={i}
          className={`time-slot-row ${isSelected ? 'selected' : ''}`}
          onClick={() => isAvailable && setSelectedTime(time)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 8px',
            fontSize: '19px',
            backgroundColor: isSelected ? '#b2f0b2' : '#f4f4f4',
            color: isAvailable ? '#007500' : '#999',
            fontWeight: isAvailable ? '600' : 'normal',
            borderBottom: '1px solid #ccc',
            cursor: isAvailable ? 'pointer' : 'default'
          }}
        >
          <span>{time}</span>
          <span className="slot-status">{isAvailable ? 'Available' : 'no'}</span>
        </div>
      );
    });
  })()}
</div>

            <div className="modal-buttons">
                <button
                    className="btn btn-success"
                    disabled={!selectedDoctor || !selectedDate || !selectedTime}
                    onClick={confirmBooking}
                    >
                    Confirm booking
                </button>
                <button className="btn btn-secondary" onClick={() => setShowTimeModal(false)}>
                Cancel
                </button>
            </div>
        </div>
    </div>
    )}

       
        </div>
        )
    };