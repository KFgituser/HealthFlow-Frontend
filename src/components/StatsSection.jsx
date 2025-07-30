import { useEffect, useState } from "react";
import { FaUserFriends, FaUserMd, FaClock } from "react-icons/fa";

const StatCard = ({ icon, label, value, color }) => (
  <div
    className="d-flex align-items-center rounded p-4"
    style={{
      backgroundColor: color.bg,
      color: "#000", 
      minWidth: "250px",
      flex: 1
    }}
  >
    <div
      className="d-flex align-items-center justify-content-center rounded me-3"
      style={{
        backgroundColor: color.iconBg,
        width: "50px",
        height: "50px",
        color: color.iconColor
      }}
    >
      {icon}
    </div>
    <div>
      <div className="text-muted fw-semibold">{label}</div>
      <div className="fs-4 fw-bold">{value.toLocaleString()}</div>
    </div>
  </div>
);

const StatsSection = () => {
      //data on homepage
  const [members, setMembers] = useState(2314);
  const [doctors, setDoctors] = useState(124);
  const [access] = useState("24/8");
// simulate numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setMembers((prev) => prev + Math.floor(Math.random() * 3));
      setDoctors((prev) => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-5" style={{ backgroundColor: "#f9fafe" }}>
      <div className="container d-flex justify-content-between gap-4 flex-wrap">
        <StatCard
          icon={<FaUserFriends size={24} />}
          label="Members"
          value={members}
          color={{  bg: "#e9f3ff", iconBg: "#4da4ff", iconColor: "#ffffff" }}
        />
        <StatCard
          icon={<FaUserMd size={24} />}
          label="Doctors"
          value={doctors}
          color={{ bg: "#f1ebff", iconBg: "#a48bff", iconColor: "#ffffff" }}
        />
        <StatCard
          icon={<FaClock size={24} />}
          label="Access"
          value={access}
          color={{ bg: "#fff3e6", iconBg: "#f89e4b", iconColor: "#ffffff"  }}
        />
      </div>
    </div>
  );
};

export default StatsSection;