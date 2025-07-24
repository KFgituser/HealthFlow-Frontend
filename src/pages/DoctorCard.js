import { useParams } from "react-router-dom";

const DoctorCard = () => {
  const { id } = useParams();
 // Dummy doctor data 
  const doctors = [
    { id: '1', name: 'Dr. John Doe', specialty: 'Dermatology', rating: 4.5 },
    { id: '2', name: 'Dr. Alice Smith', specialty: 'Cardiology', rating: 4.8 },
    { id: '3', name: 'Dr. David Tan', specialty: 'Orthopedics', rating: 4.6 },
    // ...
  ];

  const doctor = doctors.find(doc => doc.id === id);

  if (!doctor) return <p>Doctor not found.</p>;

  return (
    <div className="container">
      <h2>{doctor.name}</h2>
      <p>Specialty: {doctor.specialty}</p>
      <p>Rating: {doctor.rating}</p>
      {/* more details */}
    </div>
  );
};

export default DoctorCard;
