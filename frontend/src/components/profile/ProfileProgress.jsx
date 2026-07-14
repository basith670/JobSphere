const ProfileProgress = ({ percentage }) => {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>
          Profile Completion
        </h3>
  
        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background: "#2563eb",
              transition: "0.4s",
            }}
          />
        </div>
  
        <p
          style={{
            marginTop: "12px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          {percentage}% Complete
        </p>
      </div>
    );
  };
  
  export default ProfileProgress;