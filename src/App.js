import React, { useState } from 'react';
import useOnceEffect from './hooks/useOnceEffect';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/api';
import TaskList from './components/TaskList';
import TaskViewDialog from './components/TaskViewDialog';
import TaskEditDialog from './components/TaskEditDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import SnackbarUndo from './components/SnackbarUndo';
import { taskComparator, computeROI } from './utils/sortAndCalculation';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);

  useOnceEffect(() => {
    load();
  });

  const load = async () => {
    try {
      const data = await fetchTasks();
      const normalized = data.map(d => ({
        ...d,
        roi: d.roi === null || d.roi === undefined ? computeROI(d.revenue, d.timeTaken) : Number(d.roi)
      }));
      normalized.sort(taskComparator);
      setTasks(normalized);
      console.log('tasks loaded', normalized.length);
    } catch (err) {
      console.error('failed fetch', err);
    }
  };

  const handleView = (task) => setSelected(task);

  const handleCreate = () => {
    setEditing({ title: '', notes: '', revenue: 0, timeTaken: 0, priority: 'MEDIUM', status: 'TODO' });
  };

  const handleEdit = (task) => setEditing(task);

  const handleDelete = (task) => setDeleting(task);

  const confirmDelete = async (task) => {
    try {
      setTasks(prev => prev.filter(t => t.id !== task.id));
      setLastDeleted(task);
      setSnackOpen(true);
      await deleteTask(task.id);
    } catch (err) {
      console.error('delete error', err);
      alert('Failed to delete');
      load();
    } finally {
      setDeleting(null);
    }
  };

  const handleUndo = async () => {
    if (!lastDeleted) return;
    try {
      const created = await createTask(lastDeleted);
      setTasks(prev => {
        const next = [...prev, created];
        next.sort(taskComparator);
        return next;
      });
    } catch (err) {
      console.error('Undo failed', err);
    } finally {
      setSnackOpen(false);
      setLastDeleted(null);
    }
  };


  const onSnackClose = () => {
    setSnackOpen(false);
    setLastDeleted(null);
  };

  const handleSave = async (task) => {
    try {
      if (task.id) {
        const updated = await updateTask(task.id, {
          title: task.title,
          notes: task.notes,
          revenue: Number(task.revenue),
          timeTaken: Number(task.timeTaken),
          priority: task.priority,
          status: task.status
        });
        const normalized = { ...updated, roi: updated.roi === null ? computeROI(updated.revenue, updated.timeTaken) : Number(updated.roi) };
        setTasks(prev => prev.map(p => p.id === normalized.id ? normalized : p).sort(taskComparator));
      } else {
        const created = await createTask({
          title: task.title,
          notes: task.notes,
          revenue: Number(task.revenue),
          timeTaken: Number(task.timeTaken),
          priority: task.priority,
          status: task.status
        });
        setTasks(prev => {
          const next = [...prev, { ...created, roi: created.roi === null ? computeROI(created.revenue, created.timeTaken) : Number(created.roi) }];
          next.sort(taskComparator);
          return next;
        });
      }
    } catch (err) {
      console.error('save failed', err);
    } finally {
      setEditing(null);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Task Management App</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={handleCreate}>New Task</button>
        <button onClick={load} style={{ marginLeft: 8 }}>Reload</button>
      </div>
      <TaskList tasks={tasks} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      <TaskViewDialog task={selected} onClose={() => setSelected(null)} />
      {editing && (
        <TaskEditDialog
          task={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
      <ConfirmDeleteDialog task={deleting} onConfirm={confirmDelete} onClose={() => setDeleting(null)} />
      <SnackbarUndo open={snackOpen} message={`Deleted "${lastDeleted?.title || ''}"`} onClose={onSnackClose} onUndo={handleUndo} />
    </div>
  );
}

export default App;
