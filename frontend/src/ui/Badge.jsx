export default function Badge({ children }) {
    return (
      <span
        style={{
          padding: "8px 16px",
          borderRadius: "999px",
          background: "#EFF6FF",
          color: "#2563EB",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        {children}
      </span>
    );
  }