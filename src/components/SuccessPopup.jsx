import React from "react";
import ReactDOM from "react-dom";

export default function SuccessPopup({ message = "Login successful!" }) {
  return ReactDOM.createPortal(
    <>
      {/* 遮罩背景，全页面覆盖 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: 9998
        }}
      />

      {/* 弹窗内容 */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          background: "white",
          padding: "30px 40px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <img
          src="/images/success.png"
          alt="Success"
          style={{ width: "60px", height: "60px" }}
        />
        <h4 className="mb-0" style={{ color: "green", fontWeight: "600" }}>
           {message}
        </h4>
      </div>
    </>,
    document.body
  );
}