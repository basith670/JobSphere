export default function ProfileActions({
    saving,
    onSave,
  }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
        }}
      >
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            padding: "14px 32px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
            transition: "0.3s",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    );
  }