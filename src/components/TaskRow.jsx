import React from "react";

export default function TaskRow({ task, onView, onEdit, onDelete }) {
  return (
    <div
      onClick={() => onView(task)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 12,
        borderBottom: "1px solid #eee",
        cursor: "pointer",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: "#666" }}>
          ROI: {task.roi === null ? "—" : Number(task.roi).toFixed(2)}
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          style={{ marginRight: 8 }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
