import React, { useState, useEffect } from "react";
import { computeROI } from "../utils/sortAndCalculation";

export default function TaskEditDialog({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    notes: "",
    revenue: "",
    timeTaken: "",
    priority: "MEDIUM",
    status: "TODO",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        notes: task.notes || "",
        revenue: task.revenue || "",
        timeTaken: task.timeTaken || "",
        priority: task.priority || "MEDIUM",
        status: task.status || "TODO",
      });
    }
  }, [task]);

  if (!task && !onSave) return null;

  const handleSave = () => {
    if (!form.title || form.title.trim() === "") return alert("Title required");
    const revenue = Number(form.revenue);
    const timeTaken = Number(form.timeTaken);
    if (isNaN(revenue) || isNaN(timeTaken))
      return alert("Revenue and Time must be numbers");
    const roi = computeROI(revenue, timeTaken);

    onSave({
      ...task,
      title: form.title,
      notes: form.notes,
      revenue,
      timeTaken,
      roi,
      priority: form.priority,
      status: form.status,
    });
  };

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
      <h3>{task && task.id ? "Edit Task" : "Create Task"}</h3>
      <div>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="Revenue"
          value={form.revenue}
          onChange={(e) => setForm({ ...form, revenue: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="Time Taken"
          value={form.timeTaken}
          onChange={(e) => setForm({ ...form, timeTaken: e.target.value })}
        />
      </div>
      <div>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
