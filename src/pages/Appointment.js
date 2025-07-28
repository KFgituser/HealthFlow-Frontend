import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from '../styles/HomePage.module.css';
import '../styles/Appointments.css';
import axios from 'axios';
import dummyDoctors from '../data/dummyDoctors';
import { useDoctorContext } from '../contexts/DoctorContext';
import Breadcrumb from '../components/Breadcrumb';

    const Appointment = () => {
        const API_BASE = process.env.REACT_APP_BACKEND_URL;
        const navigate = useNavigate();
        const { doctors, updateDoctorSlots } = useDoctorContext();
        //logout  
        const handleLogout = async () => {
            try {
            await fetch(`${API_BASE}/api/users/logout`,{
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
            axios.get(`${API_BASE}/api/appointments/user/${user.id}`, {
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
                await axios.delete(`${API_BASE}/api/appointments/${id}`, { withCredentials: true });
                
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
                //Extract the doctorId and appointmentDate for restoring the slot
                const cancelledAppointment = appointments.find(appt => appt.appointmentId === id);
                if (!cancelledAppointment) {
                alert("Appointment not found.");
                return;
                }

                const doctorId = cancelledAppointment.doctor?.id || cancelledAppointment.doctorId;
                const appointmentDate = cancelledAppointment.appointmentDate;
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/appointments/${id}`, {
                    withCredentials: true
                });
                //First update the slots (+1)
                updateDoctorSlots(doctorId, appointmentDate, +1);
                // then update the appointment status
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
                    <Link to="/patient-dashboard" className="btn btn-outline-primary me-2">
                        My Dashboard
                    </Link>
                    <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                    <a href="#" className="btn btn-outline-danger" onClick={handleLogout}>Log Out</a> 
                </div>
              </div>
            </div>
              {/* Breadcrumb */}
            <Breadcrumb
            items={[
                { label: "Home", link: "/" },
                { label: "My Appointments" }
            ]}
            />

            {/* reschedule and cancel */}
             <div className="appointments-container">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Appointments</h2>
                {appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    appointments.map((appt, index) => {
                    console.log("Appointment object:", appt); 
                    const doctorId = appt.doctor?.id || appt.doctorId;
                    const doctor = dummyDoctors.find(doc => doc.id === doctorId);
                    
                    return (
                     <div
                        className="appointment-card d-flex align-items-center justify-content-center gap-5"
                        style={{
                            padding: '20px',
                            marginBottom: '16px',
                            borderRadius: '12px'
                        }}
                        key={index}
                        >
                        
                        {/* left side */}
                        <div>
                            <h3>
                            {doctor ? (
                                <>
                                <span style={{ fontWeight: '600' }}>{doctor.name}</span>
                                <span style={{ fontSize: '0.65em', fontWeight: '500' }}> | {doctor.specialty}</span>
                                </>
                            ) : (
                                "Doctor Info Not Available"
                            )}
                            </h3>
                            <p>Date: {appt.appointmentDate}</p>
                            <p>Time: {appt.startTime} - {appt.endTime}</p>
                            <p>Status: {appt.status}</p>
                            <div className="appointment-actions">
                            <button onClick={() => handleReschedule(appt.appointmentId)}>Reschedule</button>
                            <button onClick={() => handleCancel(appt.appointmentId)}>Cancel</button>
                            </div>
                        </div>

                        {/* right side */}
                        {doctor && (
                            <img
                            src={doctor.imageUrl || '/images/default-doctor.png'}
                            alt={doctor.name}
                            className="rounded-circle"
                            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                            />
                        )}
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