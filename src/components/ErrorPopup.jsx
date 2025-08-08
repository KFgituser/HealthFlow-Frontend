
import ReactDOM from "react-dom";

export default function ErrorPopup() {
  return ReactDOM.createPortal(
    <>
      {/* full screen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: 9998,
        }}
      />

      {/* popup window */}
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
          gap: "20px",
        }}
      >
        <img
          src="/images/error.png"
          alt="Error"
          style={{ width: "60px", height: "60px" }}
        />
        <h4 className="mb-0" style={{ color: "crimson", fontWeight: "600" }}>
          Login failed!
        </h4>
      </div>
    </>,
    document.body
  );
}