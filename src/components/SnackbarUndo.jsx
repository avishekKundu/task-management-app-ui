import React, { useEffect } from "react";

export default function SnackbarUndo({ open, message, onClose, onUndo }) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#333",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: 6,
      }}
    >
      <span style={{ marginRight: 12 }}>{message}</span>
      <button
        onClick={() => {
          onUndo();
          onClose();
        }}
        style={{ marginRight: 8 }}
      >
        Undo
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
