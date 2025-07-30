import React, { createContext, useContext, useState, useEffect } from "react";

// 创建上下文
const DoctorContext = createContext();

// Hook 简化使用
export const useDoctors = () => useContext(DoctorContext);

// Provider 包裹全局
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  // 初始化加载 doctors（从 localStorage 或 dummy 数据）
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

  // 每次变更时更新 localStorage
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  return (
    <DoctorContext.Provider value={{ doctors, setDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};
