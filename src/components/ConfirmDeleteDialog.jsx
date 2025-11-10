import React from "react";

export default function ConfirmDeleteDialog({ task, onConfirm, onClose }) {
  if (!task) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
    >
      <p>
        Delete task <strong>{task.title}</strong>?
      </p>
      <button
        onClick={() => {
          onConfirm(task);
        }}
      >
        Delete
      </button>
      <button onClick={onClose} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </div>
  );
}
