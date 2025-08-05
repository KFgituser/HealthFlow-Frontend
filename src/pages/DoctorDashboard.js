
import {  useState } from 'react';

import { useNavigate, Link } from "react-router-dom";
import styles from '../styles/HomePage.module.css';
import '../styles/DoctorDashboard.css'
import { useDoctors } from "../contexts/DoctorContext";
import { fullTimeSlots } from '../data/dummyDoctors';

export default function DoctorDashboard(){
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const {doctors = [], setDoctors} = useDoctors(); //Get the globally shared doctors from context.
    const [view, setView] = useState('dashboard'); // or 'viewSchedule', 'editSlot'
   
    
    // State for form
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState([]);
    const [repeat, setRepeat] = useState('none');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [specificDate, setSpecificDate] = useState('');
    const [appointments, setAppointments] = useState([]);


    
    //API request
    const handleCheckAppointments = () => {
    const doctorIdStr = parseInt(localStorage.getItem("doctorId"));
    const doctorId = doctorIdStr && !isNaN(doctorIdStr) ? parseInt(doctorIdStr) : null;
    console.log("Date changed:", specificDate);
    console.log("🔍 doctorId", doctorId);
    console.log("🔍 doctors", doctors);
    console.log("✅ doctorId from localStorage:", doctorId);
    if (!doctorId || !doctors.length) {
      console.warn("doctorId or doctors is not ready");
    return;
    }

    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor || !specificDate) {
      console.warn("⚠️ can't find a matched doctor");
      setAppointments([]);
      return;
    }

    // Mon, Jul 22
    const allAppointments = JSON.parse(localStorage.getItem("dummyAppointments") || "[]");

    const selectedDate = new Date(specificDate).toISOString().split("T")[0]; // 2025-07-24 

    const doctorAppointments = allAppointments.filter(
      appt => (appt.doctorId === doctorId || appt.doctor?.id === doctorId) && appt.date === selectedDate
    );

    // 
    if (doctorAppointments.length === 0) {
      setAppointments([]);
    } else {
      setAppointments(
        doctorAppointments.map(appt => ({
          startTime: appt.startTime,
          endTime: appt.endTime,
          date: appt.date,
          status: appt.status,
          patientName: appt.patientName || "N/A",
          patientAvatar: appt.patientAvatar || null,
        }))
      );
    }


    };
      function addHalfHour(timeStr) {
      const [h, m] = timeStr.split(":").map(Number);
      const date = new Date();
      date.setHours(h);
      date.setMinutes(m + 30);
      return date.toTimeString().slice(0, 5); // "HH:mm"
    }

     const handleLogout = async () => {
            try {
            await fetch(`${API_BASE}/api/users/logout`,{
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
  const doctorId = parseInt(localStorage.getItem("doctorId"));
  if (!doctorId || !specificDate || !startTime) {
    alert("Missing information to save availability");
    return;
  }
const dateObj = new Date(specificDate);
 const formattedDate = dateObj.toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
}); // 会直接输出与原有数据格式一致的 "Mon, Jul 29"

  const timeToAdd = startTime;

  setDoctors(prevDoctors => {
    const updatedDoctors = prevDoctors.map(doc => {
      if (doc.id !== doctorId) return doc;

      const availability = [...doc.availability];
      let daySlot = availability.find(slot => slot.date === formattedDate.trim());

      if (!daySlot) {
        // 新建日期 slot
        daySlot = {
          date: formattedDate.trim(),
          slots: 0,
          times: fullTimeSlots.map(time => ({
            time,
            available: false
          }))
        };
        availability.push(daySlot);
      }

      // 更新时间段
      let slotToUpdate = daySlot.times.find(slot => slot.time === timeToAdd);
if (!slotToUpdate) {
  // 👇 时间段不存在就添加进去
  slotToUpdate = {
    time: timeToAdd,
    available: true
  };
  daySlot.times.push(slotToUpdate);
  daySlot.slots += 1;
} else if (!slotToUpdate.available) {
  // 👇 已存在但不可用，更新为可用
  slotToUpdate.available = true;
  daySlot.slots += 1;
}

      return { ...doc, availability };
    });

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    return updatedDoctors;
  });

  alert("Availability slot added successfully.");
  setSelectedDay('');
  setRepeat('none');
  setStartTime('');
  setEndTime('');
  setSpecificDate('');
};

      const handleCancel = () => {
        setSelectedDay('');
        setRepeat('none');
        setStartTime('');
        setEndTime('');
        setSpecificDate('');
      };

      const handleDateChange = (e) => {
        const date = new Date(e.target.value);
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
      //availability form
      const AvailabilityForm = () => (
      <div className="availability-form section">
        <h2>Doctor Dashboard</h2>
        <h3>Add / Edit Availability Slot</h3>

        <div className="days-selector">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
            <button
              key={day}
              className={`day-button ${selectedDays.includes(day) ? 'selected' : ''}`}
             onClick={() => {
                setSelectedDays(prev =>
                  prev.includes(day)
                    ? prev.filter(d => d !== day)  // remove if already selected
                    : [...prev, day]               // add if not selected
                );
              }}
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
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            <label>End Time:</label>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>

          <label>Or Select a Date:</label>
          <input type="date" value={specificDate} onChange={e => setSpecificDate(e.target.value)} />

          <div className="form-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={() => setView('viewSchedule')}>back to MySchedule</button>
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
                {view === 'addAvailability' && (
                  <AvailabilityForm /> //
                )}  
                {/*  schedule-view */}
         {view === 'viewSchedule' && (
          <div className="schedule-view-wrapper">
            <h4>Today, 21 July</h4>

            <div className="calendar-selector">
              <input type="date" onChange={handleDateChange} />
            </div>

            <div className="appointments-box">
            {appointments.length > 0 ? (
              appointments.map((appt, idx) => (
                <div key={idx} className="appointment-card-doctor mb-3 d-flex align-items-center justify-content-center gap-5">
                  <div>
                    <h5>{appt.patientName}</h5>
                    <p>Date: {appt.date}</p>
                    <p>Time: {appt.startTime} - {appt.endTime}</p>
                    <p>Status: {appt.status}</p>
                  </div>
                  <div>
                    <img src={appt.patientAvatar || "/images/patient-avatar-eric.png"} alt="Patient" style={{ width: "80px", borderRadius: "50%" }} />
                  </div>
                </div>
              ))
            ) : (
              <p>No appointments found</p>
            )}
          </div>

           <button onClick={() => setView('addAvailability')}>+ Add Availability Slot</button>
            

            <div className="form-buttons">
              <button onClick={handleCheckAppointments} className="btn btn-primary">
                Check Appointments
              </button>
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
      
    )
}