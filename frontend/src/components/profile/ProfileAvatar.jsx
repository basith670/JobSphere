const ProfileAvatar = ({ profile }) => {
    return (
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            fontSize: "40px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {profile.username.charAt(0).toUpperCase()}
        </div>
  
        <div style={{ flex: 1 }}>
          <h2>{profile.username}</h2>
  
          <p
            style={{
              color: "#6b7280",
              marginTop: "5px",
            }}
          >
            {profile.headline || "Add your professional headline"}
          </p>
  
          <div
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "6px 14px",
              borderRadius: "50px",
              background: "#dbeafe",
              color: "#1d4ed8",
              fontWeight: "600",
            }}
          >
            {profile.role.toUpperCase()}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileAvatar;