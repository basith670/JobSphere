import "./DeleteConfirmModal.css";

export default function DeleteConfirmModal({
  open,
  title = "Delete",
  message,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="delete-modal-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}