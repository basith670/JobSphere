import { FaBell, FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "28px 34px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(15,23,42,.06)",
        marginBottom: "28px",
      }}
    >
      {/* Left */}

      <div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: "10px",
          }}
        >
          Welcome Back, {user?.username} 👋
        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "20px",
          }}
        >
          Ready to move one step closer to your next opportunity?
        </p>
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Search */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "14px 20px",
            width: "320px",
          }}
        >
          <FaSearch
            style={{
              color: "#94A3B8",
              marginRight: "12px",
            }}
          />

          <input
            type="text"
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Notification */}

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <FaBell color="#0F766E" />

          <span
            style={{
              position: "absolute",
              top: "3px",
              right: "4px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#EF4444",
              color: "#fff",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </div>

        {/* User */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#0F766E",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {user?.username?.charAt(0)}
          </div>

          <div>
            <h4
              style={{
                margin: 0,
                color: "#0F172A",
              }}
            >
              {user?.username}
            </h4>

            <span
              style={{
                color: "#64748B",
                textTransform: "capitalize",
              }}
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}