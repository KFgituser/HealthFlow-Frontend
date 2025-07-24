
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from "react-router-dom";
import styles from '../styles/HomePage.module.css';
import '../styles/DoctorDashboard.css'

export default function DoctorDashboard(){
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [view, setView] = useState('dashboard'); // or 'viewSchedule', 'editSlot'

    // State for form
    const [selectedDay, setSelectedDay] = useState('');
    const [repeat, setRepeat] = useState('none');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [specificDate, setSpecificDate] = useState('');
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
      api.get('/doctors')
        .then(res => setDoctors(res.data))
        .catch(err => console.error(err));
    }, []);

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
    
    const handleSave = () => {
        // Example logic - send availability to backend
        console.log('Saving availability:', { selectedDay, repeat, startTime, endTime, specificDate });
        // TODO: call API to save availability
      };

      const handleCancel = () => {
        setSelectedDay('');
        setRepeat('none');
        setStartTime('');
        setEndTime('');
        setSpecificDate('');
      };

      const handleDateChange = (e) => {
        const date = e.target.value;
        // You could fetch appointments for this date from backend
        console.log('Date changed:', date);
        setSpecificDate(date);
      };

      const openAddSlotForm = () => {
        // If you're toggling views/forms, you can change a state here
        console.log('Opening add slot form...');
      };

      // "+ Add Availability Slot"
      const handleAddSlotClick = () => {
        setView('/doctor/availability'); // change this path to your actual route
      };
      //Dashboard Overview
      const DashboardOverview = () => (
        <div className="dashboard-overview">
          <h2>Welcome to your dashboard</h2>

          <div className="dashboard-cards">
            <div className="dashboard-card clickable" onClick={() => setView('viewSchedule')}>
              <div className="card-image">
                <img src="/images/schedule-icon.png" alt="My Schedule" />
              </div>
              <div className="card-label">
                <h4>My Schedule</h4>
              </div>
            </div>

            <div className="dashboard-card clickable" onClick={() => setView('editSlot')}>
              <div className="card-image">
                <img src="/images/edit-icon.png" alt="Edit Availability" />
              </div>
              <div className="card-label">
                <h4>Edit Availability</h4>
              </div>
              </div>
            </div>
        </div>

      );

      const ScheduleViewer = () => (
        <div>
          <h3>Schedule Viewer</h3>
          <p>09:00 | Available</p>
          <p>10:30 | Booked - John Doe</p>
          <p>11:30 | Available</p>
          <button onClick={() => setView('dashboard')}>Back</button>
        </div>
      );

      const AvailabilityForm = () => (
      <div className="availability-form section">
        <h2>Doctor Dashboard</h2>
        <h3>Add / Edit Availability Slot</h3>

        <div className="days-selector">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
            <button
              key={day}
              className={`day-button ${selectedDay === day ? 'selected' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="repeat-options">
          <label>Repeat:</label>
          <button
            className={`button-outline ${repeat === 'none' ? 'active' : ''}`}
            onClick={() => setRepeat('none')}
          >
            None
          </button>
          <button
            className={`button-outline ${repeat === 'weekly' ? 'active' : ''}`}
            onClick={() => setRepeat('weekly')}
          >
            Weekly
          </button>
        </div>

          <div className="time-options">
            <label>Start Time:</label>
            <input type="time" onChange={e => setStartTime(e.target.value)} />
            <label>End Time:</label>
            <input type="time" onChange={e => setEndTime(e.target.value)} />
          </div>

          <label>Or Select a Date:</label>
          <input type="date" onChange={e => setSpecificDate(e.target.value)} />

          <div className="form-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleCancel}>back to board</button>
          </div>
        </div>
      );

    return(
        <div >  
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

                <div className="container mt-4">
                  {/*  View Switching Logic */}
                  {view === 'dashboard' && <DashboardOverview />}
                  {view === 'editSlot' && <AvailabilityForm />}
                </div>

                {/*  schedule-view */}
         {view === 'viewSchedule' && (
          <div className="schedule-view-wrapper">
            <h4>Today, {new Date().toLocaleDateString()}</h4>

            <div className="calendar-selector">
              <input type="date" onChange={handleDateChange} />
            </div>

            <div className="appointments-box">
              {appointments.length > 0 ? (
                appointments.map((slot, idx) => (
                  <p key={idx}>
                    {slot.time} | {slot.status} {slot.patient && `- ${slot.patient}`}
                  </p>
                ))
              ) : (
                <p>No appointments found</p>
              )}
            </div>

            <button onClick={handleAddSlotClick} className="your-button-class">+ Add Availability Slot</button>

            <div className="form-buttons">
              <button onClick={() => setView('dashboard')}>Okay</button>
              <button onClick={() => setView('dashboard')}>Cancel</button>
            </div>
          </div>

        )}
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
}