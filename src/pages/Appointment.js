import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from '../styles/HomePage.module.css';
import '../styles/Appointments.css';
import axios from 'axios';

    const Appointment = () => {
        const navigate = useNavigate();
  
        //logout  
        const handleLogout = async () => {
            try {
            await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include", // for session cookies
            });
            navigate("/login");
            } catch (error) {
            console.error("Logout failed:", error);
            }
        };
        
        //Appointments
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            console.log("User:", user);
            axios.get(`/api/appointments/user/${user.id}`, {
                withCredentials: true
            })
                .then(response => {
            console.log("Fetched appointments:", response.data);
                setAppointments(response.data);
                })
            .catch(error => console.error(error));
            }, []);
        //define handleReschedule and handleCancel
        //Reschedule
        const handleReschedule = async (id) => {
            const confirmed = window.confirm("This will delete your current appointment. Continue?");
            if (!confirmed) return;

            try {
                await axios.delete(`/api/appointments/${id}`, { withCredentials: true });
                
                setAppointments(prev => prev.filter(appt => appt.appointmentId !== id));

                // then navigate
                navigate('/patient-dashboard');
            } catch (error) {
                alert("Failed to reschedule.");
                console.error("Reschedule error", error);
            }
        };

        //cancel appointment
        const handleCancel = async (id) => {
               if (!id) {
                    alert("Invalid appointment ID");
                    return;
                }
            
            try {
                const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
                if (!confirmed) return;

                await axios.delete(`/api/appointments/${id}`, {
                    withCredentials: true
                });
                // now deleted appointment before alert
                  setAppointments(prev => prev.filter(appt => appt.appointmentId !== id));

                alert("Appointment cancelled successfully.");
            } catch (error) {
                console.error("Failed to cancel appointment:", error);
                alert("Failed to cancel appointment.");
            }
        };
        // initialize appointments and setAppointments
        const [appointments, setAppointments] = useState([]);
      

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


            {/* reschedule and cancel */}
             <div className="appointments-container">
                <h2>My Appointments</h2>
                {appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    appointments.map((appt, index) => {
                    console.log("Appointment object:", appt); 
                    return (
                        <div className="appointment-card" key={index}>
                        <h3>{appt.doctorName} | {appt.specialty}</h3>
                        <p>Date: {appt.appointmentDate}</p>
                        <p>Time: {appt.startTime} - {appt.endTime}</p>
                        <p>Status: {appt.status}</p>
                        <div className="appointment-actions">
                            <button onClick={() => handleReschedule(appt.appointmentId)}>Reschedule</button>
                            <button onClick={() => handleCancel(appt.appointmentId)}>Cancel</button>
                        </div>
                        </div>
                    );
                    })
                )}
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
       
        </>
    );
    };

export default Appointment;