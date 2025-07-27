import React, { createContext, useState, useContext } from 'react';
import dummyDoctors from '../data/dummyDoctors';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
     localStorage.removeItem("doctors");
  const initialDoctors = JSON.parse(localStorage.getItem("doctors")) || dummyDoctors;
  const [doctors, setDoctors] = useState(initialDoctors);

  const updateDoctorSlots = (doctorId, dateStr, delta) => {
    setDoctors(prevDoctors => {
      const updated = prevDoctors.map(doc => {
        if (doc.id !== doctorId) return doc;

        return {
          ...doc,
          availability: doc.availability.map(slot => {
            const parsedSlotDate = new Date(`${slot.date}, ${new Date().getFullYear()}`);
            const formattedSlotDate = parsedSlotDate.toISOString().split("T")[0];

            if (formattedSlotDate === dateStr) {
              console.log(`✅ Matching slot found for doctor ${doctorId} on ${dateStr}, updating ${slot.slots} ➡ ${slot.slots + delta}`);
              return { ...slot, slots: slot.slots + delta };
            }

            return slot;
          })
        };
      });

      // localStorage
      localStorage.setItem("doctors", JSON.stringify(updated));
      return updated;
    });
  };
  //Share the doctor data and update functions with child components across the entire application
  return (
    <DoctorContext.Provider value={{ doctors, setDoctors, updateDoctorSlots }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => useContext(DoctorContext);