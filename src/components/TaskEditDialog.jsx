import React, { useState, useEffect } from "react";
import { computeROI } from "../utils/sortAndCalculation";

export default function TaskEditDialog({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    notes: "",
    revenue: null,
    timeTaken: null,
    priority: "MEDIUM",
    status: "TODO",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        notes: task.notes || "",
        revenue: task.revenue ?? null,
        timeTaken: task.timeTaken ?? null,
        priority: task.priority || "MEDIUM",
        status: task.status || "TODO",
      });
    }
  }, [task]);

  if (!task && !onSave) return null;

  const validateAndCompute = () => {
    const { title, revenue, timeTaken } = form;

    if (!title) {
      setError("Title is required.");
      return null;
    }
    if(revenue === null || timeTaken === null) {
      setError("Revenue or Time cannot be null.");
      return null;
    }

    const rev = Number(revenue);
    const time = Number(timeTaken);

    if (isNaN(rev) || rev < 0) {
      setError("Revenue must be a valid/non-negative number.");
      return null;
    }
    if (isNaN(time) || time < 0) {
      setError("Time taken must be a valid/non-negative number.");
      return null;
    }
    if (time === 0) {
      setError("");
      return 0;
    }

    const roi = computeROI(rev, time);

    if (roi === null || !isFinite(roi)) {
      setError("Unable to calculate ROI. Please check inputs.");
      return null;
    }
    setError("");
    return roi;
  };

  const handleSave = () => {
    const roi = validateAndCompute();
    if (roi === null) {
      return;
    }
    onSave({
      ...task,
      title: form.title.trim(),
      notes: form.notes,
      revenue: form.revenue === "" ? null : Number(form.revenue),
      timeTaken: form.timeTaken === "" ? null : Number(form.timeTaken),
      roi,
      priority: form.priority,
      status: form.status,
    });
  };

  const handleInputChange = (field, value) => {
    const val = value === "" ? null : value;
    setForm((prev) => ({ ...prev, [field]: val }));
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
        borderRadius: 8,
      }}
    >
      <h3>{task && task.id ? "Edit Task" : "Create Task"}</h3>
      {error && <div style={{ color: "red", marginBottom: 8 }}>⚠️{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Title"
          value={form.title  ?? ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea
          placeholder="Notes"
          value={form.notes ?? ""}
          onChange={(e) => handleInputChange("notes", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Revenue"
          value={form.revenue ?? ""}
          onChange={(e) => handleInputChange("revenue", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Time Taken"
          value={form.timeTaken ?? ""}
          onChange={(e) => handleInputChange("timeTaken", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <select
          value={form.priority ?? ""}
          onChange={(e) => handleInputChange("priority", e.target.value)}
        >
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
        <select
          style={{ marginLeft: 8 }}
          value={form.status ?? ""}
          onChange={(e) => handleInputChange("status", e.target.value)}
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
