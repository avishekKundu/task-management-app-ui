import React from "react";
import TaskRow from "./TaskRow";

export default function TaskList({ tasks, onView, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) return <div>No tasks</div>;
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: 6, overflow: "hidden" }}
    >
      {tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
