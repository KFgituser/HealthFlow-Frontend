import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from '../styles/RegisterPage.module.css';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/LoginPage.module.css';
import axios from 'axios';

  export default function RegisterPage() {   
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
      const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          dob: '',
          sex: '',
          role: '',
          specialty: '',
          phone: '',
          email: '',
          homeAddress: '',
          workLocation: '',
          password: '',
          confirmPassword: '',
      });

      function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
         // Step 1: Check if passwords match
          if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
          }
          // Remove confirmPassword from the data sent to backend
            const {
              confirmPassword,
              ...userData
            } = formData;

          // Step 2: Remove confirmPassword before sending
        try {
          // POST to backend endpoint Step 3: Send only userData (without confirmPassword)
          await axios.post(`${API_BASE}/api/users/register`, userData, {
            withCredentials: false, // override just for this request
          });  // POST to backend

          alert('you have registered successfully!');   
          navigate('/login');
        } catch (error) {
          console.error(error);
          alert('Registration failed!');
        }
      }
      
      
      
    

    return (
      <div>
          <div className="container mt-4 mb-5">
          {/* Top Navbar */}
              <div className="bg-white border-bottom">
                <div className="container d-flex justify-content-between align-items-center" style={{ height: "108px" }}>
                  <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
                    <img
                      src="/images/logo.png"
                      alt="HealthFlow Logo"
                      style={{ height: "30px", marginRight: "10px", verticalAlign: "middle" }}
                    />
                    <h4 className="mb-0 text-dark">HealthFlow</h4>
                  </Link>
                  <div className="d-flex align-items-center gap-3">
                      <Link to="/help" className="btn btn-outline-secondary me-2">Help</Link>
                      <Link to="/register" className="btn btn-outline-success">Sign Up</Link> 
                  </div>
                </div>
              </div>

            {/* Breadcrumb */}
              <Breadcrumb
              items={[
                  { label: "Home", link: "/" },
                  { label: "Create your account" }
              ]}
              />

            <h5 className="text-center mb-4 fw-bold mt-5 ">Create your account</h5>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label>First Name</label>
                  <input name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>
            
              <div className="row mb-3">
                <div className="col">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="col">
                  <label className="form-label d-block">Sex</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="sex" value="male" onChange={handleChange} />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="sex" value="female" onChange={handleChange} />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="sex" value="other" onChange={handleChange} />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label>Role</label><br />
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="role" value="doctor" onChange={handleChange} />
                  <label className="form-check-label">Doctor</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="role" value="patient" onChange={handleChange} />
                  <label className="form-check-label">Patient</label>
                </div>
              </div>
              {formData.role === 'doctor' && (
              <div className="mb-3">
                <label>Specialty</label>
                <select
                  name="specialty"
                  className="form-control"
                  value={formData.specialty}
                  onChange={handleChange}
                >
                  <option value="">Select a specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Practice">General Practice</option>
                </select>
              </div>
          )}


              <div className="mb-3">
                <label>Phone Number</label>
                <input name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label>Home Address</label>
                <input name="homeAddress" className="form-control" value={formData.homeAddress} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label>Work Location (Optional)</label>
                <input name="workLocation" className="form-control" value={formData.workLocation} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
              </div>

              <div className="mb-4">
                <label>Re-enter Password</label>
                <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
              </div>
            </form>     
          </div>

            {/* Footer1 */}
          <div className={styles["footer-section"]}>
          <div className="container">
              <div className="row">
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