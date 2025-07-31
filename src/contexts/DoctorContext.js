import { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const DoctorContext = createContext();

// Use a custom hook for simpler usage
export const useDoctors = () => useContext(DoctorContext);

//  Wrap the global app with a Provider
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  // initialization doctors from localStorage or dummy data
  useEffect(() => {
    const stored = localStorage.getItem("doctors");
    if (stored) {
      setDoctors(JSON.parse(stored));
    } else {
      import("../data/dummyDoctors").then(module => {
        setDoctors(module.default);
        localStorage.setItem("doctors", JSON.stringify(module.default));
      });
    }
  }, []);

  // Update localStorage on every change
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  return (
    <DoctorContext.Provider value={{ doctors, setDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};
