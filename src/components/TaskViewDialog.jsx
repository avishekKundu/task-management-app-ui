import React from "react";

export default function TaskViewDialog({ task, onClose }) {
  if (!task) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        background: "#fff",
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
    >
      <h3>{task.title}</h3>
      <p>
        <strong>Notes:</strong> {task.notes}
      </p>
      <p>
        <strong>Revenue:</strong> {task.revenue}
      </p>
      <p>
        <strong>Time taken:</strong> {task.timeTaken}
      </p>
      <p>
        <strong>ROI:</strong>{" "}
        {task.roi === null ? "—" : Number(task.roi).toFixed(2)}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
