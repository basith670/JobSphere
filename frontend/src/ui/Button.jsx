export default function Button({
    children,
    onClick,
    type = "button",
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "14px 28px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "16px",
          transition: ".25s",
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
        }}
      >
        {children}
      </button>
    );
  }